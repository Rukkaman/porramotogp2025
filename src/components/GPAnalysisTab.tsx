import { useState } from "react";
import { BarChart2, ChevronDown } from "lucide-react";
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
import {
  GRAND_PRIX,
  PARTICIPANT_GP_SCORES,
  PARTICIPANT_COLORS,
  GP_WINNERS,
} from "@/data/motogpData";

const participants = Object.keys(PARTICIPANT_GP_SCORES);

export default function GPAnalysisTab() {
  const [selectedGP, setSelectedGP] = useState(1);

  const gpData = participants
    .map((p) => ({
      name: p,
      puntos: PARTICIPANT_GP_SCORES[p]?.[selectedGP - 1] || 0,
      fill: PARTICIPANT_COLORS[p],
    }))
    .sort((a, b) => b.puntos - a.puntos);

  const gp = GRAND_PRIX.find((g) => g.id === selectedGP);
  const winner = GP_WINNERS[selectedGP];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <BarChart2 className="text-accent w-6 h-6" />
        <h2 className="text-xl font-bold text-foreground tracking-wider">ANÁLISIS POR GP</h2>
      </div>

      {/* GP Selector */}
      <div className="racing-card p-4">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
          Selecciona Gran Premio
        </label>
        <div className="relative">
          <select
            value={selectedGP}
            onChange={(e) => setSelectedGP(Number(e.target.value))}
            className="w-full appearance-none bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground font-bold text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {GRAND_PRIX.map((gp) => (
              <option key={gp.id} value={gp.id}>
                {gp.flag} GP {gp.id} — {gp.name} ({gp.date})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* GP Info */}
      {gp && (
        <div className="racing-card p-4 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <div className="text-3xl mb-1">{gp.flag}</div>
            <h3 className="text-lg font-black tracking-wide text-foreground">GP DE {gp.name}</h3>
            <p className="text-sm text-muted-foreground">{gp.location}</p>
            <p className="text-sm font-bold text-accent mt-1">{gp.date}</p>
          </div>
          {winner && (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center min-w-[150px]">
              <div className="text-xs font-bold uppercase tracking-widest text-accent mb-1">🏆 Ganador GP</div>
              <div
                className="text-xl font-black tracking-wide"
                style={{ color: PARTICIPANT_COLORS[winner.winner] }}
              >
                {winner.winner}
              </div>
              <div className="text-2xl font-black text-accent mt-1">{winner.score} pts</div>
            </div>
          )}
        </div>
      )}

      {/* Bar chart for the selected GP */}
      <div className="racing-card p-5">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
          Puntos por participante
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={gpData} layout="vertical" margin={{ top: 5, right: 20, left: 70, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
            <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              width={65}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 700 }}
              itemStyle={{ color: "hsl(var(--accent))" }}
            />
            <Bar dataKey="puntos" name="Puntos" radius={[0, 4, 4, 0]}>
              {gpData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Podium */}
      <div className="racing-card p-5">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Podio del GP</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          {gpData.slice(0, 3).map((entry, idx) => (
            <div
              key={entry.name}
              className={`flex-1 rounded-xl p-4 text-center border ${idx === 0 ? "racing-badge-1 border-yellow-400/50" : idx === 1 ? "racing-badge-2 border-gray-400/50" : "racing-badge-3 border-orange-400/50"}`}
            >
              <div className="text-2xl font-black">{idx + 1}º</div>
              <div className="text-lg font-black mt-1">{entry.name}</div>
              <div className="text-xl font-black mt-1">{entry.puntos} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
