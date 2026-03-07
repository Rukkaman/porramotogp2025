import { Users } from "lucide-react";
import { useMotogpData } from "@/contexts/DataContext";
import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const teamColors: Record<string, string> = {
  Ducati: "#cc0000",
  Gresini: "#0066cc",
  Pramac: "#0033cc",
  VR46: "#ffd700",
  Yamaha: "#0066ff",
  KTM: "#ff6600",
  Aprilia: "#000099",
  Trackhouse: "#cc0066",
  Honda: "#cc0000",
};

const categoryConfig = [
  { id: "motogp", label: "MotoGP", color: "#ef4444" },
  { id: "moto2", label: "Moto2", color: "#f97316" },
  { id: "moto3", label: "Moto3", color: "#3b82f6" },
];

export default function DriversTab() {
  const {
    MOTOGP_PILOTS, MOTOGP_PILOT_SCORES,
    MOTO2_PILOTS, MOTO2_PILOT_SCORES,
    MOTO3_PILOTS, MOTO3_PILOT_SCORES,
    GRAND_PRIX,
  } = useMotogpData();

  const [selectedPilot, setSelectedPilot] = useState<string | null>(null);
  const [category, setCategory] = useState<"motogp" | "moto2" | "moto3">("motogp");

  const buildPilotTotals = (
    pilots: { number: number; name: string; team: string; country: string }[],
    scores: Record<string, number[]>
  ) =>
    pilots.map((p) => {
      const s = scores[p.name] || [];
      const total = s.reduce((a, b) => a + b, 0);
      return { ...p, total, scores: s };
    }).sort((a, b) => b.total - a.total);

  const motogpTotals = useMemo(() => buildPilotTotals(MOTOGP_PILOTS, MOTOGP_PILOT_SCORES), [MOTOGP_PILOTS, MOTOGP_PILOT_SCORES]);
  const moto2Totals = useMemo(() => buildPilotTotals(MOTO2_PILOTS, MOTO2_PILOT_SCORES), [MOTO2_PILOTS, MOTO2_PILOT_SCORES]);
  const moto3Totals = useMemo(() => buildPilotTotals(MOTO3_PILOTS, MOTO3_PILOT_SCORES), [MOTO3_PILOTS, MOTO3_PILOT_SCORES]);

  const currentPilots = category === "motogp" ? motogpTotals : category === "moto2" ? moto2Totals : moto3Totals;
  const activeCat = categoryConfig.find((c) => c.id === category)!;

  const selected = currentPilots.find((p) => p.name === selectedPilot);
  const selectedScores = selected
    ? GRAND_PRIX.slice(0, 20).map((gp, i) => ({
        gp: gp.name,
        puntos: selected.scores[i] || 0,
      }))
    : [];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <Users className="text-accent w-6 h-6" />
        <h2 className="text-xl font-bold text-foreground tracking-wider">PILOTOS 2026</h2>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categoryConfig.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setCategory(cat.id as any); setSelectedPilot(null); }}
            className={`px-4 py-2 rounded-full text-xs font-black tracking-wider transition-all border ${
              category === cat.id
                ? "text-background border-transparent"
                : "text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            }`}
            style={category === cat.id ? { background: cat.color, borderColor: cat.color } : {}}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {currentPilots.map((pilot, idx) => {
          const teamColor = category === "motogp" ? (teamColors[pilot.team] || "#666") : activeCat.color;
          const isSelected = selectedPilot === pilot.name;
          return (
            <button
              key={pilot.name}
              onClick={() => setSelectedPilot(isSelected ? null : pilot.name)}
              className={`racing-card p-4 text-left transition-all hover:scale-[1.01] ${isSelected ? "ring-2 ring-primary" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ background: teamColor }}>
                    #{pilot.number}
                  </div>
                  <div>
                    <div className="font-black text-foreground text-sm leading-tight">{pilot.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <span>{pilot.country}</span>
                      <span>{pilot.team}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-black" style={{ color: teamColor }}>{pilot.total.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">pts porra</div>
                </div>
              </div>
              {idx < 3 && (
                <div className="mt-2 h-1 rounded-full" style={{ background: teamColor, opacity: 0.5 }} />
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="racing-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black" style={{ background: category === "motogp" ? (teamColors[selected.team] || "#666") : activeCat.color }}>
              #{selected.number}
            </div>
            <div>
              <h3 className="font-black text-lg text-foreground">{selected.name}</h3>
              <p className="text-sm text-muted-foreground">{selected.country} · {selected.team} · Total: <span className="text-accent font-bold">{selected.total.toFixed(2)} pts porra</span></p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={selectedScores} margin={{ top: 5, right: 10, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="gp" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} angle={-45} textAnchor="end" interval={0} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 700 }} />
              <Bar dataKey="puntos" name="Puntos" radius={[4, 4, 0, 0]}>
                {selectedScores.map((_, i) => (
                  <Cell key={i} fill={category === "motogp" ? (teamColors[selected.team] || "#666") : activeCat.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
