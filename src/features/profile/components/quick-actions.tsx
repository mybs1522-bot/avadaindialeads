"use client";

import React, { useState, useCallback } from "react";
import { User, Phone, CheckCircle2, Loader2, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/cn";

export function QuickActions() {
  const [formOpen, setFormOpen] = useState(false);
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
        source: "sticky_apply_now",
        status: "new",
        created_at: new Date().toISOString(),
      });

      if (dbError) {
        console.error("Supabase error:", dbError);
      }

      setSubmitted(true);
      setTimeout(() => {
        setFormOpen(false);
        // Reset after close animation
        setTimeout(() => {
          setSubmitted(false);
          setName("");
          setPhone("");
        }, 300);
      }, 2500);
    } catch (err) {
      console.error("Submit error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [name, phone]);

  return (
    <>
      <div className="h-14" />

      <div className="fixed inset-x-0 bottom-0 z-50 bg-background pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
        <div className="screen-line-before before:z-1">
          <div className="mx-auto px-4 md:max-w-3xl">
            <div className="border-x border-grid pt-2">
              {/* Form Container */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  formOpen ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                )}
                style={{ display: "grid" }}
              >
                <div className="overflow-hidden">
                  <div className="border border-emerald-500/20 shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)] rounded-2xl bg-background/95 backdrop-blur-xl mb-2 mx-1 relative overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />
                    
                    {submitted ? (
                      <div className="flex flex-col items-center gap-3 py-8 px-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center animate-in zoom-in duration-300">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-base font-extrabold text-foreground tracking-tight">
                            Thanks for applying! 🎉
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Our design mentor will contact you today.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 sm:p-5 space-y-4 relative z-10">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="text-sm sm:text-base font-extrabold text-foreground tracking-tight leading-tight">
                              Learn Interior/Exterior Design
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              Get a free callback from our mentor
                            </p>
                          </div>
                          <button
                            onClick={() => setFormOpen(false)}
                            className="p-1.5 rounded-full hover:bg-muted/80 transition-colors shrink-0 -mt-1 -mr-1"
                          >
                            <X className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {/* Name */}
                          <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-border/80 bg-muted/30 focus-within:border-emerald-500 focus-within:bg-background focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all group">
                            <User className="w-4 h-4 text-muted-foreground group-focus-within:text-emerald-600 shrink-0 transition-colors" />
                            <input
                              type="text"
                              placeholder="Your full name"
                              value={name}
                              onChange={(e) => { setName(e.target.value); setError(""); }}
                              className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/60 outline-none"
                            />
                          </div>

                          {/* Phone */}
                          <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-border/80 bg-muted/30 focus-within:border-emerald-500 focus-within:bg-background focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all group">
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
                              className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/60 outline-none"
                            />
                          </div>
                        </div>

                        {error && (
                          <p className="text-xs text-red-500 font-medium px-1 animate-in slide-in-from-top-1">{error}</p>
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
                    )}
                  </div>
                </div>
              </div>

              {/* Main Button */}
              <div
                className={cn(
                  "screen-line-before screen-line-after -mx-px overflow-hidden transition-all duration-500 ease-in-out",
                  formOpen ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
                )}
                style={{ display: "grid" }}
              >
                <div className="overflow-hidden">
                  <Button
                    size="lg"
                    className="w-full text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20"
                    onClick={() => setFormOpen(true)}
                  >
                    <span>Apply Now</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
