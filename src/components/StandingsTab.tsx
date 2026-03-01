import { Trophy, TrendingUp, Award } from "lucide-react";
import { useMotogpData } from "@/contexts/DataContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";
import { useState, useMemo } from "react";

const positionBadge = (pos: number) => {
  if (pos === 1) return "racing-badge-1";
  if (pos === 2) return "racing-badge-2";
  if (pos === 3) return "racing-badge-3";
  return "";
};

export default function StandingsTab() {
  const {
    PARTICIPANTS,
    PARTICIPANT_TOTALS,
    PARTICIPANT_GP_SCORES,
    GP_WIN_COUNT,
    PARTICIPANT_COLORS,
    GRAND_PRIX,
  } = useMotogpData();

  const sorted = useMemo(
    () => [...PARTICIPANTS].sort((a, b) => (PARTICIPANT_TOTALS[b] || 0) - (PARTICIPANT_TOTALS[a] || 0)),
    [PARTICIPANTS, PARTICIPANT_TOTALS]
  );

  const [activeParticipants, setActiveParticipants] = useState<string[]>([]);

  // Initialize active participants once sorted is available
  const effectiveActive = activeParticipants.length > 0 ? activeParticipants : sorted.slice(0, 5);

  const toggleParticipant = (p: string) => {
    const current = effectiveActive;
    if (current.includes(p)) {
      setActiveParticipants(current.filter((x) => x !== p));
    } else {
      setActiveParticipants([...current, p]);
    }
  };

  const barData = sorted.map((p) => ({
    name: p,
    puntos: PARTICIPANT_TOTALS[p] || 0,
    victorias: GP_WIN_COUNT[p] || 0,
    fill: PARTICIPANT_COLORS[p] || "#666",
  }));

  const lineData = GRAND_PRIX.slice(0, 22).map((gp, idx) => {
    const entry: Record<string, number | string> = { gp: gp.name };
    effectiveActive.forEach((p) => {
      let sum = 0;
      for (let i = 0; i <= idx; i++) sum += PARTICIPANT_GP_SCORES[p]?.[i] || 0;
      entry[p] = sum;
    });
    return entry;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Trophy className="text-accent w-6 h-6" />
        <h2 className="text-xl font-bold text-foreground tracking-wider">CLASIFICACIÓN GENERAL</h2>
      </div>

      {/* Table */}
      <div className="racing-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-muted-foreground font-semibold text-xs uppercase tracking-wider">Pos</th>
                <th className="px-4 py-3 text-left text-muted-foreground font-semibold text-xs uppercase tracking-wider">Participante</th>
                <th className="px-4 py-3 text-right text-muted-foreground font-semibold text-xs uppercase tracking-wider">Puntos</th>
                <th className="px-4 py-3 text-right text-muted-foreground font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Victorias GP</th>
                <th className="px-4 py-3 text-right text-muted-foreground font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Dif. líder</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((participant, idx) => {
                const pos = idx + 1;
                const total = PARTICIPANT_TOTALS[participant] || 0;
                const leader = PARTICIPANT_TOTALS[sorted[0]] || 0;
                return (
                  <tr
                    key={participant}
                    className={`border-b border-border/50 transition-colors hover:bg-secondary/40 ${idx < 3 ? "bg-secondary/20" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${positionBadge(pos)}`}
                        style={pos > 3 ? { color: "hsl(var(--muted-foreground))" } : {}}
                      >
                        {pos}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: PARTICIPANT_COLORS[participant] || "#666" }}
                        />
                        <span className="font-bold text-foreground tracking-wide">{participant}</span>
                        {pos === 1 && <Trophy className="w-3.5 h-3.5 text-accent" />}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-black text-base" style={{ color: PARTICIPANT_COLORS[participant] || "#666" }}>
                        {total.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <span className="text-accent font-bold">{GP_WIN_COUNT[participant] || 0}</span>
                    </td>
                    <td className="px-4 py-3 text-right hidden lg:table-cell text-muted-foreground">
                      {pos === 1 ? "—" : `-${(leader - total).toLocaleString()}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bar chart */}
      <div className="racing-card p-5">
        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Puntos Totales</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} angle={-45} textAnchor="end" interval={0} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 700 }} itemStyle={{ color: "hsl(var(--accent))" }} />
            <Bar dataKey="puntos" name="Puntos" radius={[4, 4, 0, 0]}>
              {barData.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line chart evolution */}
      <div className="racing-card p-5">
        <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Evolución de Puntos</h3>
          <div className="flex flex-wrap gap-1">
            {sorted.map((p) => (
              <button
                key={p}
                onClick={() => toggleParticipant(p)}
                className="text-xs px-2 py-1 rounded-full font-semibold border transition-all"
                style={{
                  borderColor: PARTICIPANT_COLORS[p] || "#666",
                  background: effectiveActive.includes(p) ? PARTICIPANT_COLORS[p] || "#666" : "transparent",
                  color: effectiveActive.includes(p) ? "#000" : PARTICIPANT_COLORS[p] || "#666",
                  opacity: effectiveActive.includes(p) ? 1 : 0.5,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="gp" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }} angle={-45} textAnchor="end" height={60} interval={0} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 700 }} />
            {effectiveActive.map((p) => (
              <Line key={p} type="monotone" dataKey={p} stroke={PARTICIPANT_COLORS[p] || "#666"} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* GP Wins */}
      <div className="racing-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Award className="text-accent w-5 h-5" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Victorias en GP</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {Object.entries(GP_WIN_COUNT)
            .sort(([, a], [, b]) => b - a)
            .map(([participant, wins]) => (
              <div
                key={participant}
                className="rounded-lg p-3 text-center border border-border/50"
                style={{ borderLeftColor: PARTICIPANT_COLORS[participant] || "#666", borderLeftWidth: 3 }}
              >
                <div className="text-2xl font-black" style={{ color: PARTICIPANT_COLORS[participant] || "#666" }}>
                  {wins}
                </div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-1">{participant}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
