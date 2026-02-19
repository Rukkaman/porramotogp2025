import { Users, Flag } from "lucide-react";
import { MOTOGP_PILOTS, MOTOGP_PILOT_SCORES, GRAND_PRIX, MOTO2_PILOTS, MOTO3_PILOTS } from "@/data/motogpData";
import { useState } from "react";
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
  const [selectedPilot, setSelectedPilot] = useState<string | null>(null);
  const [category, setCategory] = useState<"motogp" | "moto2" | "moto3">("motogp");

  const pilotTotals = MOTOGP_PILOTS.map((p) => {
    const scores = MOTOGP_PILOT_SCORES[p.name] || [];
    const total = scores.reduce((a, b) => a + b, 0);
    return { ...p, total, scores };
  }).sort((a, b) => b.total - a.total);

  const selected = pilotTotals.find((p) => p.name === selectedPilot);
  const selectedScores = selected
    ? GRAND_PRIX.slice(0, 20).map((gp, i) => ({
        gp: gp.name,
        puntos: selected.scores[i] || 0,
      }))
    : [];

  const activeCat = categoryConfig.find((c) => c.id === category)!;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <Users className="text-accent w-6 h-6" />
        <h2 className="text-xl font-bold text-foreground tracking-wider">PILOTOS 2025</h2>
      </div>

      {/* Category selector */}
      <div className="flex gap-2 flex-wrap">
        {categoryConfig.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setCategory(cat.id as "motogp" | "moto2" | "moto3"); setSelectedPilot(null); }}
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

      {/* MotoGP */}
      {category === "motogp" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pilotTotals.map((pilot, idx) => {
              const teamColor = teamColors[pilot.team] || "#666";
              const isSelected = selectedPilot === pilot.name;
              return (
                <button
                  key={pilot.name}
                  onClick={() => setSelectedPilot(isSelected ? null : pilot.name)}
                  className={`racing-card p-4 text-left transition-all hover:scale-[1.01] ${isSelected ? "ring-2 ring-primary" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                        style={{ background: teamColor }}
                      >
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
                      <div className="text-lg font-black" style={{ color: teamColor }}>{pilot.total}</div>
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
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black"
                  style={{ background: teamColors[selected.team] || "#666" }}
                >
                  #{selected.number}
                </div>
                <div>
                  <h3 className="font-black text-lg text-foreground">{selected.name}</h3>
                  <p className="text-sm text-muted-foreground">{selected.country} · {selected.team} · Total: <span className="text-accent font-bold">{selected.total} pts porra</span></p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={selectedScores} margin={{ top: 5, right: 10, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="gp"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                    labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 700 }}
                  />
                  <Bar dataKey="puntos" name="Puntos" radius={[4, 4, 0, 0]}>
                    {selectedScores.map((_, i) => (
                      <Cell key={i} fill={teamColors[selected.team] || "#666"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}

      {/* Moto2 */}
      {category === "moto2" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOTO2_PILOTS.map((pilot) => (
            <div key={pilot.name} className="racing-card p-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{ background: activeCat.color }}
                >
                  #{pilot.number}
                </div>
                <div>
                  <div className="font-black text-foreground text-sm leading-tight">{pilot.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <span>{pilot.country}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate max-w-[160px]">{pilot.team}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Moto3 */}
      {category === "moto3" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOTO3_PILOTS.map((pilot) => (
            <div key={pilot.name} className="racing-card p-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{ background: activeCat.color }}
                >
                  #{pilot.number}
                </div>
                <div>
                  <div className="font-black text-foreground text-sm leading-tight">{pilot.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                    <span>{pilot.country}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate max-w-[160px]">{pilot.team}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
