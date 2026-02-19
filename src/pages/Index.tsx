import { useState } from "react";
import { Trophy, Calendar, BarChart2, Users, Wrench, Flag } from "lucide-react";
import StandingsTab from "@/components/StandingsTab";
import CalendarTab from "@/components/CalendarTab";
import GPAnalysisTab from "@/components/GPAnalysisTab";
import ParticipantsTab from "@/components/ParticipantsTab";
import DriversTab from "@/components/DriversTab";
import TeamsTab from "@/components/TeamsTab";
import { PARTICIPANT_TOTALS, GRAND_PRIX, GP_WINNERS } from "@/data/motogpData";

const sorted = Object.entries(PARTICIPANT_TOTALS).sort(([, a], [, b]) => b - a);
const leader = sorted[0];
const completedGPs = Object.keys(GP_WINNERS).length;

const tabs = [
  { id: "standings", label: "Clasificación", icon: Trophy },
  { id: "calendar", label: "Calendario", icon: Calendar },
  { id: "gpanalysis", label: "Análisis GP", icon: BarChart2 },
  { id: "participants", label: "Participantes", icon: Users },
  { id: "drivers", label: "Pilotos", icon: Flag },
  { id: "teams", label: "Equipos", icon: Wrench },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("standings");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse-red">
                <Flag className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-black tracking-wider text-foreground leading-none">
                  PORRA MOTOGP
                </h1>
                <p className="text-xs text-accent font-bold tracking-widest">2025 SEASON</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs">
              <div className="text-center">
                <div className="font-black text-accent text-lg">{completedGPs}</div>
                <div className="text-muted-foreground uppercase tracking-wider">GPs</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="font-black text-foreground text-sm">{leader[0]}</div>
                <div className="text-muted-foreground uppercase tracking-wider">Líder</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <div className="font-black text-primary text-lg">{leader[1].toLocaleString()}</div>
                <div className="text-muted-foreground uppercase tracking-wider">Pts</div>
              </div>
            </div>
          </div>

          {/* Red line */}
          <div className="red-line" />

          {/* Tabs */}
          <nav className="flex overflow-x-auto scrollbar-hide py-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-racing flex items-center gap-1.5 px-3 sm:px-4 py-3 text-xs whitespace-nowrap transition-all border-b-2 flex-shrink-0 ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Hero summary bar */}
      <div className="bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Top 3 →</span>
            {sorted.slice(0, 3).map(([name, pts], idx) => (
              <div key={name} className="flex items-center gap-1.5 flex-shrink-0">
                <span className={`w-5 h-5 rounded-full text-xs font-black flex items-center justify-center ${idx === 0 ? "racing-badge-1" : idx === 1 ? "racing-badge-2" : "racing-badge-3"}`}>
                  {idx + 1}
                </span>
                <span className="text-sm font-black text-foreground">{name}</span>
                <span className="text-xs text-accent font-bold">{pts.toLocaleString()}</span>
                {idx < 2 && <span className="text-muted-foreground mx-1">·</span>}
              </div>
            ))}
            <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
              {GRAND_PRIX.length - completedGPs} GPs restantes
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "standings" && <StandingsTab />}
        {activeTab === "calendar" && <CalendarTab />}
        {activeTab === "gpanalysis" && <GPAnalysisTab />}
        {activeTab === "participants" && <ParticipantsTab />}
        {activeTab === "drivers" && <DriversTab />}
        {activeTab === "teams" && <TeamsTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-6 text-center text-xs text-muted-foreground">
        <p className="font-bold tracking-widest uppercase">Porra MotoGP 2025 · Temporada en curso</p>
        <p className="mt-1 opacity-60">{completedGPs} de {GRAND_PRIX.length} Grandes Premios completados</p>
      </footer>
    </div>
  );
}
