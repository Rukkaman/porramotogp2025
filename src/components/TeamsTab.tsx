import { Wrench } from "lucide-react";
import { useMotogpData } from "@/contexts/DataContext";
import { useState, useMemo } from "react";

const categoryLabels = [
  { key: "motogp" as const, label: "MotoGP", color: "#ef4444" },
  { key: "moto2" as const, label: "Moto2", color: "#f97316" },
  { key: "moto3" as const, label: "Moto3", color: "#3b82f6" },
];

export default function TeamsTab() {
  const { PARTICIPANT_TEAMS, PARTICIPANT_TOTALS, PARTICIPANT_COLORS } = useMotogpData();

  const participants = useMemo(
    () => Object.keys(PARTICIPANT_TEAMS).sort((a, b) => (PARTICIPANT_TOTALS[b] || 0) - (PARTICIPANT_TOTALS[a] || 0)),
    [PARTICIPANT_TEAMS, PARTICIPANT_TOTALS]
  );

  const [selected, setSelected] = useState<string>("");
  const active = selected || participants[0] || "";

  const team = PARTICIPANT_TEAMS[active];
  const color = PARTICIPANT_COLORS[active] || "#666";
  const total = PARTICIPANT_TOTALS[active] || 0;
  const rank = participants.indexOf(active) + 1;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <Wrench className="text-accent w-6 h-6" />
        <h2 className="text-xl font-bold text-foreground tracking-wider"><h2 className="text-xl font-bold text-foreground tracking-wider">EQUIPOS PARTICIPANTES 2026</h2></h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {participants.map((p, idx) => {
          const pColor = PARTICIPANT_COLORS[p] || "#666";
          const isActive = p === active;
          return (
            <button
              key={p}
              onClick={() => setSelected(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-black tracking-wider transition-all border ${
                isActive ? "text-background" : "text-muted-foreground border-border hover:text-foreground hover:border-foreground"
              }`}
              style={isActive ? { background: pColor, borderColor: pColor } : {}}
            >
              #{idx + 1} {p}
            </button>
          );
        })}
      </div>

      {team && (
        <div className="space-y-4">
          <div className="racing-card p-5 border-l-4" style={{ borderLeftColor: color }}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black" style={{ color }}>#{rank}</span>
                  <h3 className="text-2xl font-black text-foreground">{active}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1"><p className="text-sm text-muted-foreground mt-1">Equipo seleccionado para la temporada 2026</p></p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black" style={{ color }}>{total.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">pts porra</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryLabels.map(({ key, label, color: catColor }) => {
              const pilots = team[key] || [];
              const categoryTotal = pilots.reduce((sum, p) => sum + p.price, 0);
              return (
                <div key={key} className="racing-card p-4 border-t-4" style={{ borderTopColor: catColor }}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-black text-sm tracking-wider" style={{ color: catColor }}>{label}</h4>
                    <span className="text-xs text-muted-foreground font-bold">{categoryTotal} pts presupuesto</span>
                  </div>
                  <div className="space-y-2">
                    {pilots.map((pilot) => (
                      <div key={pilot.number} className="flex items-center justify-between gap-2 py-1.5 border-b border-border last:border-0">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0" style={{ background: catColor }}>
                            {pilot.number}
                          </div>
                          <span className="text-xs font-bold text-foreground leading-tight">{pilot.name}</span>
                        </div>
                        <span className="text-xs font-black flex-shrink-0 px-2 py-0.5 rounded-full" style={{ color: catColor, background: catColor + "22" }}>
                          {pilot.price}
                        </span>
                      </div>
                    ))}
                    {pilots.length === 0 && (
                      <p className="text-xs text-muted-foreground italic">Sin pilotos</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
