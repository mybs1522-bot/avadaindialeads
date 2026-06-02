import React from "react";
import { ArrowRight, Image as ImageIcon, Home, Timer, Star } from "lucide-react";
import { Panel } from "./panel";

const cards = [
  {
    title: "Single Render Charge",
    icon: ImageIcon,
    before: "Struggling to ask ₹1000",
    after: "Confidently quoting ₹5,000+",
  },
  {
    title: "Interior Design Project",
    icon: Home,
    before: "Rejected for poor 3D",
    after: "Winning ₹80,000+ contracts",
  }
];

export function InvestmentROI() {
  return (
    <Panel id="investment-roi" className="scroll-mt-22 border-none bg-transparent py-10">
      <div className="flex flex-col items-center text-center space-y-2 mb-10 px-4">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Invest in Yourself Today.
        </h2>
        <p className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
          Start making money in the industry.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 px-4 max-w-3xl mx-auto">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="relative flex flex-col p-4 sm:p-5 rounded-2xl border border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-900/60 dark:bg-emerald-950/40 overflow-hidden group transition-all duration-300"
          >
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <h3 className="font-bold text-foreground text-sm sm:text-base leading-tight pr-4">
                {card.title}
              </h3>
              <div className="p-2 rounded-xl bg-background/60 text-muted-foreground shrink-0 border border-emerald-200/40 shadow-sm group-hover:text-emerald-600 transition-colors">
                <card.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            <div className="mt-auto space-y-4 relative z-10">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">Before</p>
                <p className="text-xs sm:text-sm text-muted-foreground line-through decoration-muted-foreground/40">{card.before}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-px bg-emerald-200/50 flex-grow relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>

              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-emerald-600/80 font-bold">After</p>
                <p className="text-xs sm:text-sm font-bold text-foreground">{card.after}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
