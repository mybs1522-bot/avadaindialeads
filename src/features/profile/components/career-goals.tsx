export function CareerGoals() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full px-4 py-4">
      <div className="flex flex-col justify-center p-3 sm:p-4 rounded-xl border border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20 shadow-sm transition-all hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40">
        <h3 className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-lg font-bold text-foreground tracking-tight leading-tight">
          <span className="text-base sm:text-xl">💼</span> Get a Better Job
        </h3>
        <p className="text-[11px] sm:text-sm text-muted-foreground mt-1 font-medium leading-tight">
          Higher-paying design roles
        </p>
      </div>
      
      <div className="flex flex-col justify-center p-3 sm:p-4 rounded-xl border border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20 shadow-sm transition-all hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40">
        <h3 className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-lg font-bold text-foreground tracking-tight leading-tight">
          <span className="text-base sm:text-xl">🏢</span> Own Design Firm
        </h3>
        <p className="text-[11px] sm:text-sm text-muted-foreground mt-1 font-medium leading-tight">
          Freelance & studio projects
        </p>
      </div>
    </div>
  );
}
