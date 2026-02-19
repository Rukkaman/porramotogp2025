import { Calendar, MapPin, Trophy, CheckCircle, Clock } from "lucide-react";
import { GRAND_PRIX, GP_WINNERS, PARTICIPANT_COLORS } from "@/data/motogpData";

export default function CalendarTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Calendar className="text-accent w-6 h-6" />
        <h2 className="text-xl font-bold text-foreground tracking-wider">CALENDARIO 2025</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {GRAND_PRIX.map((gp) => {
          const winner = GP_WINNERS[gp.id];
          const completed = !!winner;
          return (
            <div
              key={gp.id}
              className={`racing-card p-4 transition-all hover:border-primary/40 ${completed ? "border-l-2" : "border-l-2 border-l-transparent"}`}
              style={completed ? { borderLeftColor: "hsl(var(--primary))" } : {}}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{gp.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-semibold">GP {gp.id}</span>
                      {completed ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="font-black text-base tracking-wide text-foreground">{gp.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{gp.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xs font-bold text-accent">{gp.date}</span>
                </div>
              </div>
              {winner && (
                <div
                  className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs text-muted-foreground">Ganador GP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: PARTICIPANT_COLORS[winner.winner] }}
                    />
                    <span
                      className="text-xs font-black tracking-wider"
                      style={{ color: PARTICIPANT_COLORS[winner.winner] }}
                    >
                      {winner.winner}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">({winner.score} pts)</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
