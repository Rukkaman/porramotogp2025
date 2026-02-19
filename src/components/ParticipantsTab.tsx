import { User } from "lucide-react";
import { useState } from "react";
import {
  PARTICIPANT_GP_SCORES,
  PARTICIPANT_COLORS,
  PARTICIPANT_TOTALS,
  GRAND_PRIX,
  GP_WINNERS,
} from "@/data/motogpData";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

const participants = Object.keys(PARTICIPANT_GP_SCORES).sort(
  (a, b) => PARTICIPANT_TOTALS[b] - PARTICIPANT_TOTALS[a]
);

export default function ParticipantsTab() {
  const [selected, setSelected] = useState(participants[0]);

  const scores = PARTICIPANT_GP_SCORES[selected] || [];
  const total = PARTICIPANT_TOTALS[selected] || 0;
  const color = PARTICIPANT_COLORS[selected];
  const wins = Object.values(GP_WINNERS).filter((v) => v.winner === selected).length;
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const best = Math.max(...scores);
  const bestGPIdx = scores.indexOf(best);
  const bestGP = GRAND_PRIX[bestGPIdx]?.name || "-";

  const barData = GRAND_PRIX.slice(0, 20).map((gp, i) => ({
    gp: gp.name,
    puntos: scores[i] || 0,
  }));

  // Mini radar: compare vs avg of all
  const radarData = GRAND_PRIX.slice(0, 8).map((gp, i) => ({
    subject: gp.name.substring(0, 6),
    participante: scores[i] || 0,
    promedio: Math.round(
      participants.reduce((sum, p) => sum + (PARTICIPANT_GP_SCORES[p]?.[i] || 0), 0) / participants.length
    ),
  }));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <User className="text-accent w-6 h-6" />
        <h2 className="text-xl font-bold text-foreground tracking-wider">PARTICIPANTES</h2>
      </div>

      {/* Selector */}
      <div className="flex flex-wrap gap-2">
        {participants.map((p) => (
          <button
            key={p}
            onClick={() => setSelected(p)}
            className="px-3 py-1.5 rounded-full text-xs font-black border-2 transition-all"
            style={{
              borderColor: PARTICIPANT_COLORS[p],
              background: selected === p ? PARTICIPANT_COLORS[p] : "transparent",
              color: selected === p ? "#000" : PARTICIPANT_COLORS[p],
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Puntos Totales", value: total.toLocaleString(), accent: true },
          { label: "Media / GP", value: avg },
          { label: "Mejor GP", value: `${best} pts`, sub: bestGP },
          { label: "Victorias GP", value: wins },
        ].map((stat) => (
          <div key={stat.label} className="racing-card p-4 text-center">
            <div
              className="text-2xl font-black"
              style={{ color: stat.accent ? color : "hsl(var(--foreground))" }}
            >
              {stat.value}
            </div>
            {stat.sub && <div className="text-xs text-muted-foreground">{stat.sub}</div>}
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart by GP */}
      <div className="racing-card p-5">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Puntos por GP — {selected}
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 60 }}>
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
              {barData.map((_, i) => (
                <Cell key={i} fill={color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar chart */}
      <div className="racing-card p-5">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Comparativa vs Media (primeros 8 GPs)
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
            <Radar name={selected} dataKey="participante" stroke={color} fill={color} fillOpacity={0.3} strokeWidth={2} />
            <Radar name="Media" dataKey="promedio" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted))" fillOpacity={0.1} strokeWidth={1} strokeDasharray="4 4" />
            <Tooltip
              contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 700 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
