import { Wrench } from "lucide-react";
import { TEAMS } from "@/data/motogpData";

export default function TeamsTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <Wrench className="text-accent w-6 h-6" />
        <h2 className="text-xl font-bold text-foreground tracking-wider">EQUIPOS 2025</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TEAMS.map((team) => (
          <div
            key={team.name}
            className="racing-card p-5 border-l-4 transition-all hover:scale-[1.01]"
            style={{ borderLeftColor: team.color }}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-black text-base text-foreground leading-tight">{team.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 italic">{team.bike}</p>
              </div>
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                style={{ background: team.color }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {team.pilots.map((pilot) => (
                <span
                  key={pilot}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border"
                  style={{ borderColor: team.color + "66", color: team.color, background: team.color + "11" }}
                >
                  {pilot}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
