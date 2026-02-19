// MotoGP Porra 2025 - Data extracted from Excel

export const GRAND_PRIX = [
  { id: 1, name: "TAILANDIA", date: "1-2 Mar", location: "Chang International Circuit", flag: "🇹🇭" },
  { id: 2, name: "ARGENTINA", date: "14-16 Mar", location: "Termas de Río Hondo", flag: "🇦🇷" },
  { id: 3, name: "AMERICAS", date: "28-30 Mar", location: "Circuit of the Americas", flag: "🇺🇸" },
  { id: 4, name: "CATAR", date: "11-13 Abr", location: "Losail International Circuit", flag: "🇶🇦" },
  { id: 5, name: "JEREZ", date: "25-27 Abr", location: "Circuito de Jerez", flag: "🇪🇸" },
  { id: 6, name: "LE MANS", date: "9-11 May", location: "Circuit Bugatti", flag: "🇫🇷" },
  { id: 7, name: "SILVERSTONE", date: "23-25 May", location: "Silverstone Circuit", flag: "🇬🇧" },
  { id: 8, name: "MOTORLAND", date: "6-8 Jun", location: "MotorLand Aragón", flag: "🇪🇸" },
  { id: 9, name: "MUGELLO", date: "20-22 Jun", location: "Autodromo del Mugello", flag: "🇮🇹" },
  { id: 10, name: "SACHSENRING", date: "11-13 Jul", location: "Sachsenring", flag: "🇩🇪" },
  { id: 11, name: "RED BULL RING", date: "15-17 Ago", location: "Red Bull Ring", flag: "🇦🇹" },
  { id: 12, name: "HUNGRIA", date: "22-24 Ago", location: "Balaton Park Circuit", flag: "🇭🇺" },
  { id: 13, name: "CATALUNYA", date: "5-7 Sep", location: "Circuit de Barcelona-Catalunya", flag: "🇪🇸" },
  { id: 14, name: "MISANO", date: "12-14 Sep", location: "Misano World Circuit", flag: "🇮🇹" },
  { id: 15, name: "MOTEGI", date: "26-28 Sep", location: "Twin Ring Motegi", flag: "🇯🇵" },
  { id: 16, name: "MANDALIKA", date: "3-5 Oct", location: "Pertamina Mandalika Circuit", flag: "🇮🇩" },
  { id: 17, name: "AUSTRALIA", date: "17-19 Oct", location: "Phillip Island", flag: "🇦🇺" },
  { id: 18, name: "MALASIA", date: "24-26 Oct", location: "Sepang International Circuit", flag: "🇲🇾" },
  { id: 19, name: "PORTUGAL", date: "7-9 Nov", location: "Autodromo Internacional do Algarve", flag: "🇵🇹" },
  { id: 20, name: "VALENCIA", date: "14-16 Nov", location: "Circuit Ricardo Tormo", flag: "🇪🇸" },
];

// Completed GPs (first 22 rounds of the season - adjust as needed)
export const COMPLETED_GPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export const PARTICIPANTS = [
  "PETAS", "DANI IRUN", "AKULU", "ZIKINA", "BIRI", "MANEX", "OIER",
  "BERIS", "TUONO", "SORZA", "HARRAPATU", "DAVID KTM", "IKER",
  "MONTXO", "MAPATXE", "PANPA", "HONTZA"
];

// Participant total scores from Page 2
export const PARTICIPANT_TOTALS: Record<string, number> = {
  "PETAS": 3179,
  "DANI IRUN": 3067,
  "AKULU": 2899,
  "ZIKINA": 2896,
  "BIRI": 2811,
  "MANEX": 2762,
  "OIER": 2696,
  "BERIS": 2606,
  "TUONO": 2611,
  "SORZA": 2552,
  "HARRAPATU": 2565,
  "DAVID KTM": 2623,
  "IKER": 2570,
  "MONTXO": 2443,
  "MAPATXE": 2422,
  "PANPA": 2352,
  "HONTZA": 2134,
};

// Points per GP per participant
export const PARTICIPANT_GP_SCORES: Record<string, number[]> = {
  "AKULU":    [92,123,105,151,138,157,90,163,154,155,132,158,165,153,125,119,149,109,92,136,139,94],
  "BERIS":    [149,155,133,132,145,113,84,139,146,149,144,123,120,115,148,106,148,70,56,82,98,51],
  "BIRI":     [159,147,134,144,146,121,123,130,152,176,124,165,160,127,116,134,142,108,76,79,81,67],
  "DANI IRUN":[131,104,107,172,132,115,106,194,166,140,191,164,172,171,162,140,211,85,94,159,151,74],
  "DAVID KTM":[120,84,90,97,111,117,104,124,121,150,131,159,148,130,163,107,122,89,138,91,96,131],
  "HARRAPATU":[176,131,106,111,126,133,107,119,165,153,116,135,111,141,91,121,147,104,91,49,88,44],
  "HONTZA":  [96,115,85,129,101,81,98,106,131,81,79,66,92,99,114,102,111,68,68,148,99,65],
  "IKER":     [110,124,120,129,134,106,85,86,98,113,83,137,126,127,145,124,141,93,111,156,122,100],
  "MANEX":    [137,165,158,128,131,103,96,158,158,168,140,98,131,125,137,105,156,82,83,121,105,77],
  "MAPATXE":  [145,128,113,127,96,120,115,128,139,134,131,114,78,126,116,70,128,64,117,96,62,75],
  "MONTXO":   [139,186,145,135,129,69,90,126,135,125,120,102,113,105,134,110,123,57,49,128,60,63],
  "OIER":     [141,147,103,165,136,113,119,149,172,152,115,109,136,143,104,114,135,111,77,79,115,61],
  "PANPA":    [176,137,99,136,141,139,96,118,135,142,124,142,74,93,102,90,116,95,69,48,63,17],
  "PETAS":    [151,133,127,191,133,130,130,216,200,155,190,128,174,167,130,141,164,134,91,126,168,62],
  "SORZA":    [147,139,122,135,117,129,93,139,158,159,149,143,116,135,120,110,149,76,53,51,84,28],
  "TUONO":    [180,138,103,136,160,134,102,132,152,126,153,110,86,101,140,128,96,86,92,86,98,72],
  "ZIKINA":   [176,169,122,140,167,146,107,125,153,134,128,128,128,111,146,172,129,107,116,101,99,92],
};

// Cumulative points per GP (for line chart)
export const PARTICIPANT_CUMULATIVE: Record<string, number[]> = {
  "AKULU":    [92,215,320,471,609,766,856,1019,1173,1328,1460,1618,1783,1936,2061,2180,2329,2438,2530,2666,2805,2899],
  "BERIS":    [149,304,437,569,714,827,911,1050,1196,1345,1489,1612,1732,1847,1995,2101,2249,2319,2375,2457,2555,2606],
  "BIRI":     [159,306,440,584,730,851,974,1104,1256,1432,1556,1721,1881,2008,2124,2258,2400,2508,2584,2663,2744,2811],
  "DANI IRUN":[131,235,342,514,646,761,867,1061,1227,1367,1558,1722,1894,2065,2227,2367,2578,2663,2757,2916,3067,3141],
  "DAVID KTM":[120,204,294,391,502,619,723,847,968,1118,1249,1408,1556,1686,1849,1956,2078,2167,2305,2396,2492,2623],
  "HARRAPATU":[176,307,413,524,650,783,890,1009,1174,1327,1443,1578,1689,1830,1921,2042,2189,2293,2384,2433,2521,2565],
  "HONTZA":  [96,211,296,425,526,607,705,811,942,1023,1102,1168,1260,1359,1473,1575,1686,1754,1822,1970,2069,2134],
  "IKER":     [110,234,354,483,617,723,808,894,992,1105,1188,1325,1451,1578,1723,1847,1988,2081,2192,2348,2470,2570],
  "MANEX":    [137,302,460,588,719,822,918,1076,1234,1402,1542,1640,1771,1896,2033,2138,2294,2376,2459,2580,2685,2762],
  "MAPATXE":  [145,273,386,513,609,729,844,972,1111,1245,1376,1490,1568,1694,1810,1880,2008,2072,2189,2285,2347,2422],
  "MONTXO":   [139,325,470,605,734,803,893,1019,1154,1279,1399,1501,1614,1719,1853,1963,2086,2143,2192,2320,2380,2443],
  "OIER":     [141,288,391,556,692,805,924,1073,1245,1397,1512,1621,1757,1900,2004,2118,2253,2364,2441,2520,2635,2696],
  "PANPA":    [176,313,412,548,689,828,924,1042,1177,1319,1443,1585,1659,1752,1854,1944,2060,2155,2224,2272,2335,2352],
  "PETAS":    [151,284,411,602,735,865,995,1211,1411,1566,1756,1884,2058,2225,2355,2496,2660,2794,2885,3011,3179,3241],
  "SORZA":    [147,286,408,543,660,789,882,1021,1179,1338,1487,1630,1746,1881,2001,2111,2260,2336,2389,2440,2524,2552],
  "TUONO":    [180,318,421,557,717,851,953,1085,1237,1363,1516,1626,1712,1813,1953,2081,2177,2263,2355,2441,2539,2611],
  "ZIKINA":   [176,345,467,607,774,920,1027,1152,1305,1439,1567,1695,1823,1934,2080,2252,2381,2488,2604,2705,2804,2896],
};

// MotoGP Pilots
export const MOTOGP_PILOTS = [
  { number: 1, name: "Jorge MARTIN", team: "Aprilia", country: "🇪🇸" },
  { number: 5, name: "Johann ZARCO", team: "Honda", country: "🇫🇷" },
  { number: 10, name: "Luca MARINI", team: "Honda", country: "🇮🇹" },
  { number: 12, name: "Maverick VIÑALES", team: "KTM", country: "🇪🇸" },
  { number: 20, name: "Fabio QUARTARARO", team: "Yamaha", country: "🇫🇷" },
  { number: 21, name: "Franco MORBIDELLI", team: "Pramac", country: "🇮🇹" },
  { number: 23, name: "Enea BASTIANINI", team: "KTM", country: "🇮🇹" },
  { number: 25, name: "Raul FERNANDEZ", team: "Trackhouse", country: "🇪🇸" },
  { number: 33, name: "Brad BINDER", team: "KTM", country: "🇿🇦" },
  { number: 35, name: "Somkiat CHANTRA", team: "Honda", country: "🇹🇭" },
  { number: 36, name: "Joan MIR", team: "Honda", country: "🇪🇸" },
  { number: 37, name: "Pedro ACOSTA", team: "KTM", country: "🇪🇸" },
  { number: 42, name: "Alex RINS", team: "Yamaha", country: "🇪🇸" },
  { number: 43, name: "Jack MILLER", team: "Yamaha", country: "🇦🇺" },
  { number: 49, name: "Fabio DI GIANNANTONIO", team: "VR46", country: "🇮🇹" },
  { number: 54, name: "Fermin ALDEGUER", team: "Gresini", country: "🇪🇸" },
  { number: 63, name: "Francesco BAGNAIA", team: "Ducati", country: "🇮🇹" },
  { number: 72, name: "Marco BEZZECCHI", team: "Aprilia", country: "🇮🇹" },
  { number: 73, name: "Alex MARQUEZ", team: "Gresini", country: "🇪🇸" },
  { number: 79, name: "Ai OGURA", team: "Trackhouse", country: "🇯🇵" },
  { number: 88, name: "Miguel OLIVEIRA", team: "Pramac", country: "🇵🇹" },
  { number: 93, name: "Marc MARQUEZ", team: "Ducati", country: "🇪🇸" },
];

// MotoGP pilot scores per GP
export const MOTOGP_PILOT_SCORES: Record<string, number[]> = {
  "Jorge MARTIN":      [0,0,1,0,0,7,0,0,0,0,0,9,0,14,6,5,0,0,0,0,0,0],
  "Johann ZARCO":      [9,16,0,13,5,29,25,0,0,4,3,5,5,0,3,0,7,4,0,6,10,4],
  "Luca MARINI":       [4,5,10,6,6,5,8,0,0,0,10,4,3,17,10,12,3,11,12,8,5,9],
  "Maverick VIÑALES":  [0,3,2,2,16,16,4,3,6,15,0,8,0,8,3,0,0,0,7,0,6,0],
  "Fabio QUARTARARO":  [4,1,10,14,20,6,3,0,2,6,20,15,1,6,20,8,12,9,8,16,16,3],
  "Franco MORBIDELLI": [18,19,18,23,6,1,13,17,13,11,0,0,5,17,0,19,16,11,1,19,0,4],
  "Enea BASTIANINI":   [7,0,9,5,7,3,0,4,2,7,0,7,14,0,21,0,5,0,7,10,0,6],
  "Raul FERNANDEZ":    [0,0,4,0,1,9,3,6,9,8,7,15,7,0,5,6,11,17,34,0,0,26],
  "Brad BINDER":       [10,9,0,3,10,0,1,1,7,5,13,8,14,9,4,6,4,13,8,7,12,10],
  "Somkiat CHANTRA":   [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,3,0,1,0,0],
  "Joan MIR":          [1,8,0,0,1,1,5,9,5,0,0,0,10,4,4,0,22,5,0,16,0,3],
  "Pedro ACOSTA":      [4,8,3,8,9,13,12,18,8,14,1,25,20,20,19,5,7,20,18,27,25,22],
  "Alex RINS":         [0,4,5,4,3,6,2,5,1,3,6,1,0,3,0,0,0,6,9,3,3,2],
  "Jack MILLER":       [5,2,11,0,0,0,10,2,0,2,13,6,0,0,2,4,0,2,6,2,4,7],
  "Fabio DI GIANNANTONIO": [6,16,22,4,15,11,13,11,21,16,6,0,2,10,7,18,3,9,25,10,13,23],
  "Fermin ALDEGUER":   [3,0,0,17,5,23,7,17,5,3,11,5,24,5,1,14,6,34,2,3,17,11],
  "Francesco BAGNAIA": [23,20,32,22,23,0,4,16,20,21,16,16,8,7,9,0,37,0,0,12,2,0],
  "Marco BEZZECCHI":   [10,4,10,8,4,2,31,10,15,27,9,26,22,19,0,32,13,12,28,9,32,30],
  "Alex MARQUEZ":      [29,29,29,19,34,9,23,29,29,9,22,0,15,4,25,25,10,22,17,34,32,22],
  "Ai OGURA":          [17,8,8,4,8,6,0,0,6,0,0,2,2,5,11,0,1,0,3,6,9,1],
  "Miguel OLIVEIRA":   [2,0,3,0,0,0,0,1,3,0,0,0,0,4,7,7,2,6,4,0,2,5],
  "Marc MARQUEZ":      [37,37,12,37,16,32,25,37,37,37,37,37,37,37,32,25,29,4,0,0,1,1],
};

// GP Winners per category (participant who scored most points that round)
// Derived from Pages 3-22 of the excel (per-GP leaderboards)
// Using the GANADOR column from each page
export const GP_WINNERS: Record<number, { winner: string; score: number }> = {
  1:  { winner: "TUONO", score: 180 },
  2:  { winner: "MONTXO", score: 186 },
  3:  { winner: "MANEX", score: 158 },
  4:  { winner: "PETAS", score: 191 },
  5:  { winner: "TUONO", score: 160 },
  6:  { winner: "AKULU", score: 157 },
  7:  { winner: "MANEX", score: 158 },
  8:  { winner: "PETAS", score: 216 },
  9:  { winner: "PETAS", score: 200 },
  10: { winner: "ZIKINA", score: 167 },
  11: { winner: "PETAS", score: 190 },
  12: { winner: "DANI IRUN", score: 164 },
  13: { winner: "PETAS", score: 174 },
  14: { winner: "OIER", score: 143 },
  15: { winner: "DANI IRUN", score: 162 },
  16: { winner: "ZIKINA", score: 172 },
  17: { winner: "DANI IRUN", score: 211 },
  18: { winner: "PETAS", score: 134 },
  19: { winner: "OIER", score: 111 },
  20: { winner: "IKER", score: 156 },
};

// Count GP wins per participant
export const GP_WIN_COUNT = (() => {
  const counts: Record<string, number> = {};
  Object.values(GP_WINNERS).forEach(({ winner }) => {
    counts[winner] = (counts[winner] || 0) + 1;
  });
  return counts;
})();

// Participant colors for charts
export const PARTICIPANT_COLORS: Record<string, string> = {
  "PETAS":    "#ef4444",
  "DANI IRUN":"#f97316",
  "AKULU":    "#eab308",
  "ZIKINA":   "#22c55e",
  "BIRI":     "#06b6d4",
  "MANEX":    "#3b82f6",
  "OIER":     "#8b5cf6",
  "BERIS":    "#ec4899",
  "TUONO":    "#14b8a6",
  "SORZA":    "#f59e0b",
  "HARRAPATU":"#84cc16",
  "DAVID KTM":"#64748b",
  "IKER":     "#a78bfa",
  "MONTXO":   "#fb923c",
  "MAPATXE":  "#34d399",
  "PANPA":    "#f472b6",
  "HONTZA":   "#94a3b8",
};

export const TEAMS = [
  { name: "Ducati Lenovo Team", pilots: ["Francesco BAGNAIA"], bike: "Ducati Desmosedici GP25", color: "#cc0000" },
  { name: "Gresini Racing", pilots: ["Alex MARQUEZ", "Fermin ALDEGUER"], bike: "Ducati Desmosedici GP24", color: "#0066cc" },
  { name: "Prima Pramac Racing", pilots: ["Franco MORBIDELLI", "Miguel OLIVEIRA"], bike: "Ducati Desmosedici GP25", color: "#0033cc" },
  { name: "Pertamina Enduro VR46", pilots: ["Fabio DI GIANNANTONIO", "Marco BEZZECCHI"], bike: "Ducati Desmosedici GP25", color: "#ffd700" },
  { name: "Monster Energy Yamaha", pilots: ["Fabio QUARTARARO", "Alex RINS"], bike: "Yamaha YZR-M1", color: "#0066ff" },
  { name: "WithU Yamaha RNF", pilots: ["Jack MILLER"], bike: "Yamaha YZR-M1", color: "#00aaff" },
  { name: "Red Bull KTM Factory", pilots: ["Brad BINDER", "Enea BASTIANINI"], bike: "KTM RC16", color: "#ff6600" },
  { name: "Red Bull KTM Tech3", pilots: ["Pedro ACOSTA", "Maverick VIÑALES"], bike: "KTM RC16", color: "#ff8800" },
  { name: "Aprilia Racing", pilots: ["Jorge MARTIN", "Marco BEZZECCHI"], bike: "Aprilia RS-GP25", color: "#000066" },
  { name: "Trackhouse Racing", pilots: ["Raul FERNANDEZ", "Ai OGURA"], bike: "Aprilia RS-GP24", color: "#cc0066" },
  { name: "Repsol Honda", pilots: ["Joan MIR", "Luca MARINI"], bike: "Honda RC213V", color: "#cc0000" },
  { name: "LCR Honda", pilots: ["Johann ZARCO", "Somkiat CHANTRA"], bike: "Honda RC213V", color: "#ffffff" },
];
