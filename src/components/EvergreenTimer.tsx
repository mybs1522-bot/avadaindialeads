"use client";
import { ArrowRight } from "lucide-react";

export function EvergreenTimer({ onCtaClick }: { onCtaClick?: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-md px-4 pb-4">
        <button
          onClick={onCtaClick}
          className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gray-900 text-white shadow-lift hover:shadow-lg transition-all duration-300 group"
        >
          <span className="font-semibold text-sm">Start Free Today</span>
          <ArrowRight className="h-4 w-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
