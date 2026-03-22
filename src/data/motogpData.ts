// MotoGP Porra 2026 - Data extracted from Excel

export const GRAND_PRIX = [
  { id: 1, name: "THAILAND", date: "27 Feb - 01 Mar", location: "PT Grand Prix of Thailand", flag: "🇹🇭" },
  { id: 2, name: "BRAZIL", date: "20 - 22 Mar", location: "Estrella Galicia 0,0 Grand Prix of Brazil", flag: "🇧🇷" },
  { id: 3, name: "USA", date: "27 - 29 Mar", location: "Red Bull Grand Prix of the United States", flag: "🇺🇸" },
  { id: 4, name: "SPAIN", date: "24 - 26 Apr", location: "Estrella Galicia 0,0 Grand Prix of Spain", flag: "🇪🇸" },
  { id: 5, name: "FRANCE", date: "08 - 10 May", location: "Michelin® Grand Prix of France", flag: "🇫🇷" },
  { id: 6, name: "CATALONIA", date: "15 - 17 May", location: "Monster Energy Grand Prix of Catalunya", flag: "🇪🇸" },
  { id: 7, name: "ITALY", date: "29 - 31 May", location: "Brembo Grand Prix of Italy", flag: "🇮🇹" },
  { id: 8, name: "HUNGARY", date: "05 - 07 Jun", location: "Grand Prix of Hungary", flag: "🇭🇺" },
  { id: 9, name: "CZECHIA", date: "19 - 21 Jun", location: "Grand Prix of Czechia", flag: "🇨🇿" },
  { id: 10, name: "NETHERLANDS", date: "26 - 28 Jun", location: "Grand Prix of the Netherlands", flag: "🇳🇱" },
  { id: 11, name: "GERMANY", date: "10 - 12 Jul", location: "Liqui Moly Grand Prix of Germany", flag: "🇩🇪" },
  { id: 12, name: "GREAT BRITAIN", date: "07 - 09 Aug", location: "Qatar Airways Grand Prix of Great Britain", flag: "🇬🇧" },
  { id: 13, name: "ARAGON", date: "28 - 30 Aug", location: "Grand Prix of Aragon", flag: "🇪🇸" },
  { id: 14, name: "SAN MARINO", date: "11 - 13 Sep", location: "Red Bull Grand Prix of San Marino and the Rimini Riviera", flag: "🇸🇲" },
  { id: 15, name: "AUSTRIA", date: "18 - 20 Sep", location: "Grand Prix of Austria", flag: "🇦🇹" },
  { id: 16, name: "JAPAN", date: "02 - 04 Oct", location: "Motul Grand Prix of Japan", flag: "🇯🇵" },
  { id: 17, name: "INDONESIA", date: "09 - 11 Oct", location: "Pertamina Grand Prix of Indonesia", flag: "🇮🇩" },
  { id: 18, name: "AUSTRALIA", date: "23 - 25 Oct", location: "Grand Prix of Australia", flag: "🇦🇺" },
  { id: 19, name: "MALAYSIA", date: "30 Oct - 01 Nov", location: "Petronas Grand Prix of Malaysia", flag: "🇲🇾" },
  { id: 20, name: "QATAR", date: "06 - 08 Nov", location: "Qatar Airways Grand Prix of Qatar", flag: "🇶🇦" },
  { id: 21, name: "PORTUGAL", date: "20 - 22 Nov", location: "Repsol Grand Prix of Portugal", flag: "🇵🇹" },
  { id: 22, name: "VALENCIA", date: "27 - 29 Nov", location: "Motul Grand Prix of Valencia", flag: "🇪🇸" },
];

// Completed GPs (will be overridden by CSV data)
export const COMPLETED_GPS: number[] = [];

export const PARTICIPANTS = [
  "SORZA", "HONTZA", "IKER", "ZIKINA", "HARRAPATU", "OIER", "PETAS",
  "PANPA", "BERIS", "DAVID KTM", "MONTXO", "TUONO", "DANI IRUN",
  "BIRI", "MANEX", "MAPATXE", "AKULU", "ANDER", "BOOT"
];

// Participant total scores (start at 0 for new season, will be overridden by CSV)
export const PARTICIPANT_TOTALS: Record<string, number> = Object.fromEntries(
  PARTICIPANTS.map(p => [p, 0])
);

// Points per GP per participant (empty for new season)
export const PARTICIPANT_GP_SCORES: Record<string, number[]> = Object.fromEntries(
  PARTICIPANTS.map(p => [p, []])
);

// Cumulative points per GP (empty for new season)
export const PARTICIPANT_CUMULATIVE: Record<string, number[]> = Object.fromEntries(
  PARTICIPANTS.map(p => [p, []])
);

// MotoGP Pilots 2026
export const MOTOGP_PILOTS = [
  { number: 5, name: "Johann ZARCO", team: "Honda", country: "🇫🇷" },
  { number: 7, name: "Toprak RAZGATLIOGLU", team: "Yamaha", country: "🇹🇷" },
  { number: 10, name: "Luca MARINI", team: "Honda", country: "🇮🇹" },
  { number: 11, name: "Diogo MOREIRA", team: "Trackhouse", country: "🇧🇷" },
  { number: 12, name: "Maverick VIÑALES", team: "KTM", country: "🇪🇸" },
  { number: 20, name: "Fabio QUARTARARO", team: "Yamaha", country: "🇫🇷" },
  { number: 21, name: "Franco MORBIDELLI", team: "Pramac", country: "🇮🇹" },
  { number: 23, name: "Enea BASTIANINI", team: "KTM", country: "🇮🇹" },
  { number: 25, name: "Raul FERNANDEZ", team: "Trackhouse", country: "🇪🇸" },
  { number: 33, name: "Brad BINDER", team: "KTM", country: "🇿🇦" },
  { number: 36, name: "Joan MIR", team: "Honda", country: "🇪🇸" },
  { number: 37, name: "Pedro ACOSTA", team: "KTM", country: "🇪🇸" },
  { number: 42, name: "Alex RINS", team: "Yamaha", country: "🇪🇸" },
  { number: 43, name: "Jack MILLER", team: "Yamaha", country: "🇦🇺" },
  { number: 49, name: "Fabio DIGIANNANTONIO", team: "VR46", country: "🇮🇹" },
  { number: 54, name: "Fermin ALDEGUER", team: "Gresini", country: "🇪🇸" },
  { number: 63, name: "Francesco BAGNAIA", team: "Ducati", country: "🇮🇹" },
  { number: 72, name: "Marco BEZZECCHI", team: "Aprilia", country: "🇮🇹" },
  { number: 73, name: "Alex MARQUEZ", team: "Gresini", country: "🇪🇸" },
  { number: 79, name: "Ai OGURA", team: "Trackhouse", country: "🇯🇵" },
  { number: 89, name: "Jorge MARTIN", team: "Aprilia", country: "🇪🇸" },
  { number: 93, name: "Marc MARQUEZ", team: "Ducati", country: "🇪🇸" },
];

// MotoGP pilot scores per GP (empty for new season, overridden by CSV)
export const MOTOGP_PILOT_SCORES: Record<string, number[]> = Object.fromEntries(
  MOTOGP_PILOTS.map(p => [p.name, []])
);

// GP Winners (empty for new season, overridden by CSV)
export const GP_WINNERS: Record<number, { winner: string; score: number }> = {};

// Count GP wins per participant
export const GP_WIN_COUNT: Record<string, number> = {};

// Participant colors for charts
export const PARTICIPANT_COLORS: Record<string, string> = {
  "PETAS":      "#ef4444",
  "DANI IRUN":  "#f97316",
  "AKULU":      "#eab308",
  "ZIKINA":     "#22c55e",
  "BIRI":       "#06b6d4",
  "MANEX":      "#3b82f6",
  "OIER":       "#8b5cf6",
  "BERIS":      "#ec4899",
  "TUONO":      "#14b8a6",
  "SORZA":      "#f59e0b",
  "HARRAPATU":  "#84cc16",
  "DAVID KTM":  "#64748b",
  "IKER":       "#a78bfa",
  "MONTXO":     "#fb923c",
  "MAPATXE":    "#34d399",
  "PANPA":      "#f472b6",
  "HONTZA":     "#94a3b8",
  "ANDER":      "#e11d48",
  "BOOT":       "#0ea5e9",
};

// Moto2 Pilots 2026
export const MOTO2_PILOTS = [
  { number: 3, name: "Sergio GARCIA", team: "MT Helmets - MSI", country: "🇪🇸" },
  { number: 4, name: "Ivan ORTOLA", team: "MT Helmets - MSI", country: "🇪🇸" },
  { number: 7, name: "Barry BALTUS", team: "RW Racing GP", country: "🇧🇪" },
  { number: 9, name: "Jorge NAVARRO", team: "QJMOTOR Gresini", country: "🇪🇸" },
  { number: 11, name: "Alex ESCRIG", team: "SpeedUp", country: "🇪🇸" },
  { number: 12, name: "Filip SALAC", team: "Elf Marc VDS", country: "🇨🇿" },
  { number: 13, name: "Celestino VIETTI", team: "Red Bull KTM Ajo", country: "🇮🇹" },
  { number: 14, name: "Tony ARBOLINO", team: "Elf Marc VDS", country: "🇮🇹" },
  { number: 16, name: "Joe ROBERTS", team: "OnlyFans American Racing", country: "🇺🇸" },
  { number: 17, name: "Daniel MUÑOZ", team: "Fantic Racing", country: "🇪🇸" },
  { number: 18, name: "Manuel GONZALEZ", team: "QJMOTOR Gresini", country: "🇪🇸" },
  { number: 21, name: "Alonso LOPEZ", team: "SpeedUp", country: "🇪🇸" },
  { number: 28, name: "Izan GUEVARA", team: "CFMOTO Aspar", country: "🇪🇸" },
  { number: 32, name: "Luca LUNETTA", team: "SIC58 Squadra Corse", country: "🇮🇹" },
  { number: 36, name: "Angel PIQUERAS", team: "Leopard Racing", country: "🇪🇸" },
  { number: 44, name: "Aron CANET", team: "Fantic Racing", country: "🇪🇸" },
  { number: 53, name: "Deniz ONCU", team: "Red Bull KTM Ajo", country: "🇹🇷" },
  { number: 54, name: "Alberto FERRANDEZ", team: "Italtrans Racing", country: "🇪🇸" },
  { number: 64, name: "Mario SURYO AJI", team: "Honda Team Asia", country: "🇮🇩" },
  { number: 71, name: "Ayumu SASAKI", team: "Leopard Racing", country: "🇯🇵" },
  { number: 72, name: "Taiyo FURUSATO", team: "Honda Team Asia", country: "🇯🇵" },
  { number: 80, name: "David ALONSO", team: "CFMOTO Aspar", country: "🇨🇴" },
  { number: 81, name: "SENNA AGIUS", team: "Liqui Moly Husqvarna Intact", country: "🇦🇺" },
  { number: 84, name: "Zonta Van Den GOORBERGH", team: "RW Racing GP", country: "🇳🇱" },
  { number: 95, name: "Collin VEIJER", team: "Liqui Moly Husqvarna Intact", country: "🇳🇱" },
  { number: 96, name: "Daniel HOLGADO", team: "Red Bull KTM Ajo", country: "🇪🇸" },
  { number: 98, name: "Jose Antonio RUEDA", team: "Red Bull KTM Ajo", country: "🇪🇸" },
  { number: 99, name: "Adrian HUERTAS", team: "Red Bull KTM Ajo", country: "🇪🇸" },
];

// Moto3 Pilots 2026
export const MOTO3_PILOTS = [
  { number: 5, name: "Leo RAMMERSTORFER", team: "", country: "🇦🇹" },
  { number: 6, name: "Ryusei YAMANAKA", team: "MT Helmets - MSI", country: "🇯🇵" },
  { number: 8, name: "Eddie O'SHEA", team: "", country: "🇬🇧" },
  { number: 9, name: "Veda PRATAMA", team: "", country: "🇮🇩" },
  { number: 10, name: "Nicola CARRANO", team: "", country: "🇮🇹" },
  { number: 11, name: "Adrian CRUCES", team: "", country: "🇪🇸" },
  { number: 13, name: "Hakim DANISH", team: "", country: "🇲🇾" },
  { number: 14, name: "Cormac BUCHANAN", team: "Leopard Racing", country: "🇳🇿" },
  { number: 18, name: "Matteo BERTELLE", team: "", country: "🇮🇹" },
  { number: 19, name: "Scott OGDEN", team: "Vision Track Racing", country: "🇬🇧" },
  { number: 21, name: "Ruche MOODLEY", team: "", country: "🇿🇦" },
  { number: 22, name: "David ALMANSA", team: "CFMOTO Aspar", country: "🇪🇸" },
  { number: 27, name: "Rico SALMELA", team: "", country: "🇫🇮" },
  { number: 28, name: "Maximo QUILES", team: "Aspar", country: "🇪🇸" },
  { number: 31, name: "Adrian FERNANDEZ", team: "Red Bull KTM Tech3", country: "🇪🇸" },
  { number: 32, name: "Zen MITANI", team: "", country: "🇯🇵" },
  { number: 51, name: "Brian URIARTE", team: "", country: "🇪🇸" },
  { number: 54, name: "Jesus RIOS", team: "", country: "🇪🇸" },
  { number: 64, name: "David MUÑOZ", team: "BOE Motorsports", country: "🇪🇸" },
  { number: 66, name: "Joe KELSO", team: "", country: "🇬🇧" },
  { number: 67, name: "Casey O'GORMAN", team: "", country: "🇮🇪" },
  { number: 73, name: "Valentin PERRONE", team: "CFMOTO Aspar", country: "🇦🇷" },
  { number: 78, name: "Joel ESTEBAN", team: "", country: "🇪🇸" },
  { number: 83, name: "Alvaro CARPE", team: "Idemitsu Honda Team Asia", country: "🇪🇸" },
  { number: 94, name: "Guido PINI", team: "", country: "🇮🇹" },
  { number: 97, name: "Marco MORELLI", team: "", country: "🇮🇹" },
];

// Participant teams 2026: which pilots each participant selected per category
export const PARTICIPANT_TEAMS: Record<string, {
  motogp: { number: number; name: string; price: number }[];
  moto2: { number: number; name: string; price: number }[];
  moto3: { number: number; name: string; price: number }[];
}> = {
  "SORZA": {
    motogp: [{ number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 21, name: "Alonso LOPEZ", price: 30 }, { number: 96, name: "Daniel HOLGADO", price: 70 }],
    moto3: [{ number: 28, name: "Maximo QUILES", price: 100 }, { number: 31, name: "Adrian FERNANDEZ", price: 70 }, { number: 83, name: "Alvaro CARPE", price: 90 }],
  },
  "HONTZA": {
    motogp: [{ number: 12, name: "Maverick VIÑALES", price: 80 }, { number: 37, name: "Pedro ACOSTA", price: 120 }, { number: 63, name: "Francesco BAGNAIA", price: 110 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 9, name: "Jorge NAVARRO", price: 10 }, { number: 11, name: "Alex ESCRIG", price: 30 }, { number: 80, name: "David ALONSO", price: 50 }, { number: 98, name: "Jose Antonio RUEDA", price: 60 }],
    moto3: [{ number: 8, name: "Eddie O'SHEA", price: 10 }, { number: 21, name: "Ruche MOODLEY", price: 10 }, { number: 28, name: "Maximo QUILES", price: 100 }, { number: 97, name: "Marco MORELLI", price: 20 }],
  },
  "IKER": {
    motogp: [{ number: 7, name: "Toprak RAZGATLIOGLU", price: 50 }, { number: 12, name: "Maverick VIÑALES", price: 80 }, { number: 20, name: "Fabio QUARTARARO", price: 80 }, { number: 72, name: "Marco BEZZECCHI", price: 130 }],
    moto2: [{ number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 36, name: "Angel PIQUERAS", price: 50 }, { number: 80, name: "David ALONSO", price: 50 }, { number: 81, name: "SENNA AGIUS", price: 50 }],
    moto3: [{ number: 51, name: "Brian URIARTE", price: 10 }, { number: 64, name: "David MUÑOZ", price: 80 }, { number: 66, name: "Joe KELSO", price: 70 }],
  },
  "ZIKINA": {
    motogp: [{ number: 36, name: "Joan MIR", price: 30 }, { number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 11, name: "Alex ESCRIG", price: 30 }, { number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 28, name: "Izan GUEVARA", price: 50 }],
    moto3: [{ number: 28, name: "Maximo QUILES", price: 100 }, { number: 31, name: "Adrian FERNANDEZ", price: 70 }, { number: 64, name: "David MUÑOZ", price: 80 }],
  },
  "HARRAPATU": {
    motogp: [{ number: 21, name: "Franco MORBIDELLI", price: 80 }, { number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 89, name: "Jorge MARTIN", price: 70 }],
    moto2: [{ number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 21, name: "Alonso LOPEZ", price: 30 }, { number: 80, name: "David ALONSO", price: 50 }],
    moto3: [{ number: 11, name: "Adrian CRUCES", price: 10 }, { number: 28, name: "Maximo QUILES", price: 100 }, { number: 64, name: "David MUÑOZ", price: 80 }, { number: 83, name: "Alvaro CARPE", price: 90 }],
  },
  "OIER": {
    motogp: [{ number: 72, name: "Marco BEZZECCHI", price: 130 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 7, name: "Barry BALTUS", price: 90 }, { number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 80, name: "David ALONSO", price: 50 }],
    moto3: [{ number: 19, name: "Scott OGDEN", price: 40 }, { number: 28, name: "Maximo QUILES", price: 100 }, { number: 83, name: "Alvaro CARPE", price: 90 }],
  },
  "PETAS": {
    motogp: [{ number: 5, name: "Johann ZARCO", price: 30 }, { number: 10, name: "Luca MARINI", price: 30 }, { number: 33, name: "Brad BINDER", price: 10 }, { number: 36, name: "Joan MIR", price: 30 }, { number: 63, name: "Francesco BAGNAIA", price: 110 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 53, name: "Deniz ONCU", price: 40 }, { number: 80, name: "David ALONSO", price: 50 }],
    moto3: [{ number: 28, name: "Maximo QUILES", price: 100 }, { number: 64, name: "David MUÑOZ", price: 80 }, { number: 97, name: "Marco MORELLI", price: 20 }],
  },
  "PANPA": {
    motogp: [{ number: 72, name: "Marco BEZZECCHI", price: 130 }, { number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 9, name: "Jorge NAVARRO", price: 10 }, { number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 80, name: "David ALONSO", price: 50 }],
    moto3: [{ number: 22, name: "David ALMANSA", price: 60 }, { number: 28, name: "Maximo QUILES", price: 100 }, { number: 51, name: "Brian URIARTE", price: 10 }],
  },
  "BERIS": {
    motogp: [{ number: 54, name: "Fermin ALDEGUER", price: 70 }, { number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 7, name: "Barry BALTUS", price: 90 }, { number: 80, name: "David ALONSO", price: 50 }, { number: 96, name: "Daniel HOLGADO", price: 70 }],
    moto3: [{ number: 18, name: "Matteo BERTELLE", price: 40 }, { number: 19, name: "Scott OGDEN", price: 40 }, { number: 28, name: "Maximo QUILES", price: 100 }],
  },
  "DAVID KTM": {
    motogp: [{ number: 33, name: "Brad BINDER", price: 10 }, { number: 37, name: "Pedro ACOSTA", price: 120 }, { number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 95, name: "Collin VEIJER", price: 40 }, { number: 96, name: "Daniel HOLGADO", price: 70 }, { number: 98, name: "Jose Antonio RUEDA", price: 60 }],
    moto3: [{ number: 51, name: "Brian URIARTE", price: 10 }, { number: 73, name: "Valentin PERRONE", price: 60 }, { number: 83, name: "Alvaro CARPE", price: 90 }],
  },
  "MONTXO": {
    motogp: [{ number: 72, name: "Marco BEZZECCHI", price: 130 }, { number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 7, name: "Barry BALTUS", price: 90 }, { number: 11, name: "Alex ESCRIG", price: 30 }, { number: 21, name: "Alonso LOPEZ", price: 30 }],
    moto3: [{ number: 18, name: "Matteo BERTELLE", price: 40 }, { number: 19, name: "Scott OGDEN", price: 40 }, { number: 28, name: "Maximo QUILES", price: 100 }],
  },
  "TUONO": {
    motogp: [{ number: 37, name: "Pedro ACOSTA", price: 120 }, { number: 73, name: "Alex MARQUEZ", price: 140 }],
    moto2: [{ number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 44, name: "Aron CANET", price: 80 }, { number: 80, name: "David ALONSO", price: 50 }],
    moto3: [{ number: 28, name: "Maximo QUILES", price: 100 }, { number: 51, name: "Brian URIARTE", price: 10 }, { number: 73, name: "Valentin PERRONE", price: 60 }, { number: 83, name: "Alvaro CARPE", price: 90 }],
  },
  "DANI IRUN": {
    motogp: [{ number: 36, name: "Joan MIR", price: 30 }, { number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 7, name: "Barry BALTUS", price: 90 }, { number: 21, name: "Alonso LOPEZ", price: 30 }, { number: 80, name: "David ALONSO", price: 50 }, { number: 96, name: "Daniel HOLGADO", price: 70 }],
    moto3: [{ number: 28, name: "Maximo QUILES", price: 100 }, { number: 51, name: "Brian URIARTE", price: 10 }, { number: 64, name: "David MUÑOZ", price: 80 }],
  },
  "BIRI": {
    motogp: [{ number: 10, name: "Luca MARINI", price: 30 }, { number: 33, name: "Brad BINDER", price: 10 }, { number: 36, name: "Joan MIR", price: 30 }, { number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 3, name: "Sergio GARCIA", price: 50 }, { number: 4, name: "Ivan ORTOLA", price: 40 }, { number: 21, name: "Alonso LOPEZ", price: 30 }, { number: 98, name: "Jose Antonio RUEDA", price: 60 }],
    moto3: [{ number: 6, name: "Ryusei YAMANAKA", price: 60 }, { number: 31, name: "Adrian FERNANDEZ", price: 70 }, { number: 64, name: "David MUÑOZ", price: 80 }],
  },
  "MANEX": {
    motogp: [{ number: 72, name: "Marco BEZZECCHI", price: 130 }, { number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 95, name: "Collin VEIJER", price: 40 }, { number: 96, name: "Daniel HOLGADO", price: 70 }],
    moto3: [{ number: 28, name: "Maximo QUILES", price: 100 }, { number: 51, name: "Brian URIARTE", price: 10 }, { number: 54, name: "Jesus RIOS", price: 10 }],
  },
  "MAPATXE": {
    motogp: [{ number: 7, name: "Toprak RAZGATLIOGLU", price: 50 }, { number: 12, name: "Maverick VIÑALES", price: 80 }, { number: 33, name: "Brad BINDER", price: 10 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 36, name: "Angel PIQUERAS", price: 50 }, { number: 96, name: "Daniel HOLGADO", price: 70 }],
    moto3: [{ number: 22, name: "David ALMANSA", price: 60 }, { number: 28, name: "Maximo QUILES", price: 100 }, { number: 64, name: "David MUÑOZ", price: 80 }],
  },
  "AKULU": {
    motogp: [{ number: 7, name: "Toprak RAZGATLIOGLU", price: 50 }, { number: 25, name: "Raul FERNANDEZ", price: 50 }, { number: 54, name: "Fermin ALDEGUER", price: 70 }, { number: 73, name: "Alex MARQUEZ", price: 140 }, { number: 89, name: "Jorge MARTIN", price: 70 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 9, name: "Jorge NAVARRO", price: 10 }, { number: 13, name: "Celestino VIETTI", price: 60 }, { number: 53, name: "Deniz ONCU", price: 40 }],
    moto3: [{ number: 6, name: "Ryusei YAMANAKA", price: 60 }, { number: 9, name: "Veda PRATAMA", price: 10 }, { number: 11, name: "Adrian CRUCES", price: 10 }, { number: 78, name: "Joel ESTEBAN", price: 30 }],
  },
  "ANDER": {
    motogp: [{ number: 37, name: "Pedro ACOSTA", price: 120 }, { number: 72, name: "Marco BEZZECCHI", price: 130 }, { number: 73, name: "Alex MARQUEZ", price: 140 }],
    moto2: [{ number: 9, name: "Jorge NAVARRO", price: 10 }, { number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 21, name: "Alonso LOPEZ", price: 30 }],
    moto3: [{ number: 22, name: "David ALMANSA", price: 60 }, { number: 31, name: "Adrian FERNANDEZ", price: 70 }, { number: 83, name: "Alvaro CARPE", price: 90 }],
  },
  "BOOT": {
    motogp: [{ number: 12, name: "Maverick VIÑALES", price: 80 }, { number: 37, name: "Pedro ACOSTA", price: 120 }, { number: 93, name: "Marc MARQUEZ", price: 150 }],
    moto2: [{ number: 7, name: "Barry BALTUS", price: 90 }, { number: 18, name: "Manuel GONZALEZ", price: 100 }, { number: 21, name: "Alonso LOPEZ", price: 30 }],
    moto3: [{ number: 14, name: "Cormac BUCHANAN", price: 30 }, { number: 22, name: "David ALMANSA", price: 60 }, { number: 51, name: "Brian URIARTE", price: 10 }, { number: 64, name: "David MUÑOZ", price: 80 }],
  },
};

export const TEAMS = [
  { name: "Ducati Lenovo Team", pilots: ["Francesco BAGNAIA", "Marc MARQUEZ"], bike: "Ducati Desmosedici GP26", color: "#cc0000" },
  { name: "Gresini Racing", pilots: ["Alex MARQUEZ", "Fermin ALDEGUER"], bike: "Ducati Desmosedici GP25", color: "#0066cc" },
  { name: "Prima Pramac Racing", pilots: ["Franco MORBIDELLI"], bike: "Ducati Desmosedici GP26", color: "#0033cc" },
  { name: "Pertamina Enduro VR46", pilots: ["Fabio DIGIANNANTONIO", "Marco BEZZECCHI"], bike: "Ducati Desmosedici GP26", color: "#ffd700" },
  { name: "Monster Energy Yamaha", pilots: ["Fabio QUARTARARO", "Alex RINS", "Toprak RAZGATLIOGLU"], bike: "Yamaha YZR-M1", color: "#0066ff" },
  { name: "WithU Yamaha RNF", pilots: ["Jack MILLER"], bike: "Yamaha YZR-M1", color: "#00aaff" },
  { name: "Red Bull KTM Factory", pilots: ["Brad BINDER", "Enea BASTIANINI", "Pedro ACOSTA"], bike: "KTM RC16", color: "#ff6600" },
  { name: "Red Bull KTM Tech3", pilots: ["Maverick VIÑALES"], bike: "KTM RC16", color: "#ff8800" },
  { name: "Aprilia Racing", pilots: ["Jorge MARTIN", "Marco BEZZECCHI"], bike: "Aprilia RS-GP26", color: "#000066" },
  { name: "Trackhouse Racing", pilots: ["Raul FERNANDEZ", "Ai OGURA", "Diogo MOREIRA"], bike: "Aprilia RS-GP25", color: "#cc0066" },
  { name: "Repsol Honda", pilots: ["Joan MIR", "Luca MARINI"], bike: "Honda RC213V", color: "#cc0000" },
  { name: "LCR Honda", pilots: ["Johann ZARCO"], bike: "Honda RC213V", color: "#ffffff" },
];
