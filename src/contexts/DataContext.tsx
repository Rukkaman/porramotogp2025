import { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSheetData, SheetData } from "@/lib/fetchSheetData";
import {
  PARTICIPANTS,
  PARTICIPANT_TOTALS,
  PARTICIPANT_GP_SCORES,
  PARTICIPANT_CUMULATIVE,
  PARTICIPANT_COLORS,
  PARTICIPANT_TEAMS,
  GRAND_PRIX,
  GP_WINNERS as STATIC_GP_WINNERS,
  GP_WIN_COUNT as STATIC_GP_WIN_COUNT,
  MOTOGP_PILOTS as STATIC_MOTOGP_PILOTS,
  MOTOGP_PILOT_SCORES,
  MOTO2_PILOTS as STATIC_MOTO2_PILOTS,
  MOTO3_PILOTS as STATIC_MOTO3_PILOTS,
  TEAMS,
} from "@/data/motogpData";

// Re-export static data that never changes
export { PARTICIPANT_COLORS, PARTICIPANT_TEAMS, TEAMS };

export interface MotogpContextData {
  loading: boolean;
  error: boolean;
  // Dynamic data (from CSV or fallback)
  PARTICIPANTS: string[];
  PARTICIPANT_TOTALS: Record<string, number>;
  PARTICIPANT_GP_SCORES: Record<string, number[]>;
  PARTICIPANT_CUMULATIVE: Record<string, number[]>;
  GP_WINNERS: Record<number, { winner: string; score: number }>;
  GP_WIN_COUNT: Record<string, number>;
  MOTOGP_PILOTS: { number: number; name: string; team: string; country: string }[];
  MOTOGP_PILOT_SCORES: Record<string, number[]>;
  MOTO2_PILOTS: { number: number; name: string; team: string; country: string }[];
  MOTO2_PILOT_SCORES: Record<string, number[]>;
  MOTO3_PILOTS: { number: number; name: string; team: string; country: string }[];
  MOTO3_PILOT_SCORES: Record<string, number[]>;
  GRAND_PRIX: typeof GRAND_PRIX;
  completedGPCount: number;
  // Static data pass-through
  PARTICIPANT_COLORS: Record<string, string>;
  PARTICIPANT_TEAMS: typeof PARTICIPANT_TEAMS;
}

function buildContextFromSheet(sheet: SheetData): MotogpContextData {
  // Map CSV pilots to the format components expect (with team/country from static data)
  const motogpPilots = sheet.motogpPilots.map((p) => {
    const staticPilot = STATIC_MOTOGP_PILOTS.find(
      (sp) => sp.number === p.number
    );
    return {
      number: p.number,
      name: p.name,
      team: staticPilot?.team || "",
      country: staticPilot?.country || "",
    };
  });

  const motogpPilotScores: Record<string, number[]> = {};
  sheet.motogpPilots.forEach((p) => {
    motogpPilotScores[p.name] = p.scores;
  });

  const moto2PilotScores: Record<string, number[]> = {};
  sheet.moto2Pilots.forEach((p) => {
    moto2PilotScores[p.name] = p.scores;
  });

  const moto3PilotScores: Record<string, number[]> = {};
  sheet.moto3Pilots.forEach((p) => {
    moto3PilotScores[p.name] = p.scores;
  });

  const moto2Pilots = sheet.moto2Pilots.map((p) => {
    const staticPilot = STATIC_MOTO2_PILOTS.find(
      (sp) => sp.number === p.number
    );
    return {
      number: p.number,
      name: p.name,
      team: staticPilot?.team || "",
      country: staticPilot?.country || "",
    };
  });

  const moto3Pilots = sheet.moto3Pilots.map((p) => {
    const staticPilot = STATIC_MOTO3_PILOTS.find(
      (sp) => sp.number === p.number
    );
    return {
      number: p.number,
      name: p.name,
      team: staticPilot?.team || "",
      country: staticPilot?.country || "",
    };
  });

  // Build GRAND_PRIX merging static calendar with dynamic GP names
  const grandPrix = GRAND_PRIX.map((gp, idx) => ({
    ...gp,
    // If CSV has GP names, we could update name, but keep static for location/flag
  }));

  // Do NOT extend beyond static GRAND_PRIX length (20 GPs for 2026)

  return {
    loading: false,
    error: false,
    PARTICIPANTS: sheet.participants,
    PARTICIPANT_TOTALS: sheet.participantTotals,
    PARTICIPANT_GP_SCORES: sheet.participantGPScores,
    PARTICIPANT_CUMULATIVE: sheet.participantCumulative,
    GP_WINNERS: sheet.gpWinners,
    GP_WIN_COUNT: sheet.gpWinCount,
    MOTOGP_PILOTS: motogpPilots,
    MOTOGP_PILOT_SCORES: motogpPilotScores,
    MOTO2_PILOTS: moto2Pilots,
    MOTO2_PILOT_SCORES: moto2PilotScores,
    MOTO3_PILOTS: moto3Pilots,
    MOTO3_PILOT_SCORES: moto3PilotScores,
    GRAND_PRIX: grandPrix,
    completedGPCount: sheet.completedGPCount,
    PARTICIPANT_COLORS,
    PARTICIPANT_TEAMS,
  };
}

// Fallback context from static data
const FALLBACK: MotogpContextData = {
  loading: false,
  error: false,
  PARTICIPANTS,
  PARTICIPANT_TOTALS,
  PARTICIPANT_GP_SCORES,
  PARTICIPANT_CUMULATIVE,
  GP_WINNERS: STATIC_GP_WINNERS,
  GP_WIN_COUNT: STATIC_GP_WIN_COUNT,
  MOTOGP_PILOTS: STATIC_MOTOGP_PILOTS,
  MOTOGP_PILOT_SCORES,
  MOTO2_PILOTS: STATIC_MOTO2_PILOTS,
  MOTO2_PILOT_SCORES: Object.fromEntries(STATIC_MOTO2_PILOTS.map(p => [p.name, []])),
  MOTO3_PILOTS: STATIC_MOTO3_PILOTS,
  MOTO3_PILOT_SCORES: Object.fromEntries(STATIC_MOTO3_PILOTS.map(p => [p.name, []])),
  GRAND_PRIX,
  completedGPCount: Object.keys(STATIC_GP_WINNERS).length,
  PARTICIPANT_COLORS,
  PARTICIPANT_TEAMS,
};

const DataContext = createContext<MotogpContextData>(FALLBACK);

export function useMotogpData() {
  return useContext(DataContext);
}

export function DataProvider({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["motogp-sheet-data", "decimals-fix-v2"],
    queryFn: fetchSheetData,
    staleTime: 5 * 60 * 1000, // 5 min cache
    retry: 2,
  });

  const value: MotogpContextData = data
    ? buildContextFromSheet(data)
    : isLoading
    ? { ...FALLBACK, loading: true }
    : isError
    ? { ...FALLBACK, error: true }
    : FALLBACK;

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
