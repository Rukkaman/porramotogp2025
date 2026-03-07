// Fetch and parse MotoGP data from published Google Sheets CSV

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSUDIX0T7IkGKr81-n2WKvi3Q_4vuFP2jPVjpdd-uct6dWwksM9lcgQd5CDZbhVFVtLFEK-N4ELjgYn/pub?output=csv";

// ---------- CSV Parser (handles quoted multiline fields) ----------

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        current.push(field);
        field = "";
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        current.push(field);
        field = "";
        rows.push(current);
        current = [];
      } else {
        field += ch;
      }
    }
  }
  current.push(field);
  if (current.some((f) => f !== "")) rows.push(current);
  return rows;
}

// ---------- Data types ----------

export interface PilotData {
  number: number;
  name: string;
  price: number;
  scores: number[];
  team?: string;
  country?: string;
}

export interface SheetData {
  participants: string[];
  participantTotals: Record<string, number>;
  participantGPScores: Record<string, number[]>;
  participantCumulative: Record<string, number[]>;
  motogpPilots: PilotData[];
  moto2Pilots: PilotData[];
  moto3Pilots: PilotData[];
  gpWinners: Record<number, { winner: string; score: number }>;
  gpWinCount: Record<string, number>;
  completedGPCount: number;
  gpHeaders: string[]; // GP names from headers, e.g. ["THAILAND", "BRAZIL", ...]
}

// ---------- Helpers ----------

const NUM_GPS = 22;

function parsePilotRow(cols: string[]): PilotData | null {
  const cell = (cols[0] || "").trim();
  const match = cell.match(/^(\d+)\s+(.+)$/);
  if (!match) return null;
  const number = parseInt(match[1], 10);
  const name = match[2].trim();
  const price = parseInt(cols[1], 10) || 0;
  const scores: number[] = [];
  for (let i = 3; i < 3 + NUM_GPS; i++) {
    scores.push(parseFloat(cols[i]) || 0);
  }
  return { number, name, price, scores };
}

function isEmptyRow(cols: string[]): boolean {
  return cols.every((c) => c.trim() === "");
}

function isSectionHeader(cols: string[], label: string): boolean {
  return (cols[0] || "").trim().toLowerCase().startsWith(label.toLowerCase());
}

function extractGPNames(headerCols: string[]): string[] {
  const names: string[] = [];
  for (let i = 3; i < 3 + NUM_GPS; i++) {
    const cell = (headerCols[i] || "").trim();
    // Format: "27FEB - 1 MAR\nGP01 THAILAND" — extract after "GPxx "
    const gpMatch = cell.match(/GP\d+\s+(.+)/);
    if (gpMatch) {
      names.push(gpMatch[1].trim());
    } else if (cell) {
      names.push(cell);
    }
  }
  return names;
}

// ---------- Main parser ----------

export function parseSheetData(rows: string[][]): SheetData {
  // Find section boundaries
  let motogpHeaderIdx = -1;
  let moto2HeaderIdx = -1;
  let moto3HeaderIdx = -1;

  for (let i = 0; i < rows.length; i++) {
    const first = (rows[i][0] || "").trim();
    if (first === "MotoGP" && motogpHeaderIdx === -1) motogpHeaderIdx = i;
    else if (first.startsWith("Moto 2") || first === "Moto2") moto2HeaderIdx = i;
    else if (first.startsWith("Moto 3") || first === "Moto3") moto3HeaderIdx = i;
  }

  // Parse GP headers from MotoGP header row
  const gpHeaders =
    motogpHeaderIdx >= 0 ? extractGPNames(rows[motogpHeaderIdx]) : [];

  // Parse pilots from each section
  function parsePilotsInSection(startIdx: number): PilotData[] {
    const pilots: PilotData[] = [];
    if (startIdx < 0) return pilots;
    for (let i = startIdx + 2; i < rows.length; i++) {
      // skip separator row after header
      if (isEmptyRow(rows[i])) break;
      const pilot = parsePilotRow(rows[i]);
      if (pilot) pilots.push(pilot);
    }
    return pilots;
  }

  const motogpPilots = parsePilotsInSection(motogpHeaderIdx);
  const moto2Pilots = parsePilotsInSection(moto2HeaderIdx);
  const moto3Pilots = parsePilotsInSection(moto3HeaderIdx);

  // Parse participant scores — rows with "*" in col 2, followed by cumulative row
  const participantGPScores: Record<string, number[]> = {};
  const participantCumulative: Record<string, number[]> = {};
  const participantTotals: Record<string, number> = {};
  const participants: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const col2 = (rows[i][2] || "").trim().replace(/\\/g, "");
    if (col2 === "*") {
      const name = (rows[i][0] || "").trim();
      if (!name) continue;
      // GP scores
      const scores: number[] = [];
      for (let j = 3; j < 3 + NUM_GPS; j++) {
        scores.push(parseFloat(rows[i][j]) || 0);
      }
      const total = parseFloat(rows[i][3 + NUM_GPS]) || scores.reduce((a, b) => a + b, 0);

      participantGPScores[name] = scores;
      participantTotals[name] = total;
      participants.push(name);

      // Next row = cumulative
      if (i + 1 < rows.length) {
        const cumRow = rows[i + 1];
        const cum: number[] = [];
        for (let j = 3; j < 3 + NUM_GPS; j++) {
          cum.push(parseFloat(cumRow[j]) || 0);
        }
        participantCumulative[name] = cum;
      }
    }
  }

  // Detect completed GPs: find last GP index where any participant has non-zero score
  let completedGPCount = 0;
  for (let gp = 0; gp < NUM_GPS; gp++) {
    const anyScore = participants.some(
      (p) => (participantGPScores[p]?.[gp] || 0) > 0
    );
    if (anyScore) completedGPCount = gp + 1;
  }

  // Derive GP winners (participant with highest score each GP)
  const gpWinners: Record<number, { winner: string; score: number }> = {};
  const gpWinCount: Record<string, number> = {};

  for (let gp = 0; gp < completedGPCount; gp++) {
    let bestName = "";
    let bestScore = 0;
    for (const p of participants) {
      const s = participantGPScores[p]?.[gp] || 0;
      if (s > bestScore) {
        bestScore = s;
        bestName = p;
      }
    }
    if (bestName) {
      gpWinners[gp + 1] = { winner: bestName, score: bestScore };
      gpWinCount[bestName] = (gpWinCount[bestName] || 0) + 1;
    }
  }

  return {
    participants,
    participantTotals,
    participantGPScores,
    participantCumulative,
    motogpPilots,
    moto2Pilots,
    moto3Pilots,
    gpWinners,
    gpWinCount,
    completedGPCount,
    gpHeaders,
  };
}

// ---------- Fetch ----------

export async function fetchSheetData(): Promise<SheetData> {
  const res = await fetch(SHEET_CSV_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);
  const text = await res.text();
  const rows = parseCSV(text);
  return parseSheetData(rows);
}
