"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { User, Phone, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/cn";

export function ApplyNowForm({ className }: { className?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(async () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit number");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { error: dbError } = await supabase.from("leads").insert({
        name: name.trim(),
        phone: `+91${phone}`,
        source: "apply_now_form",
        status: "new",
        created_at: new Date().toISOString(),
      });

      if (dbError) {
        console.error("Supabase error:", dbError);
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submit error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [name, phone]);

  if (submitted) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-card/50 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(16,185,129,0.15)]", className)}>
        {/* Decorative glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />
        
        <div className="flex flex-col items-center gap-3 py-10 px-6 relative z-10">
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center animate-in zoom-in duration-300 shadow-inner">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-center space-y-1.5">
            <p className="text-lg font-extrabold text-foreground tracking-tight">
              Thanks for applying! 🎉
            </p>
            <p className="text-sm text-muted-foreground">
              Our design mentor will contact you today to get you started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-card/50 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(16,185,129,0.15)]", className)}>
      {/* Decorative glow */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      
      <div className="flex flex-col gap-4 p-5 sm:p-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-1.5 mb-2">
          <p className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
            Interested? Apply Now
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center justify-center gap-1.5 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Design mentor will reach out today
          </p>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Name */}
          <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-border/80 bg-background/50 focus-within:bg-background focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all group flex-1">
            <User className="w-4 h-4 text-muted-foreground group-focus-within:text-emerald-600 shrink-0 transition-colors" />
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/60 outline-none w-full"
            />
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-border/80 bg-background/50 focus-within:bg-background focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all group flex-1">
            <Phone className="w-4 h-4 text-muted-foreground group-focus-within:text-emerald-600 shrink-0 transition-colors" />
            <span className="text-sm text-muted-foreground font-semibold">+91</span>
            <div className="w-px h-4 bg-border" />
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="WhatsApp number"
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }}
              className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/60 outline-none w-full"
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium text-center animate-in slide-in-from-top-1">{error}</p>
        )}

        <div className="pt-1">
          <Button
            size="lg"
            className="w-full text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
          <p className="text-[11px] text-muted-foreground/60 text-center mt-3 font-medium">
            🔒 No spam. We respect your privacy.
          </p>
        </div>
      </div>
    </div>
  );
}
