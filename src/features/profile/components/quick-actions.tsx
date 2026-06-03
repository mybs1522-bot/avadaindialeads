"use client";

import React, { useState, useCallback } from "react";
import { User, Phone, Mail, CheckCircle2, Loader2, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/cn";

export function QuickActions() {
  const [formOpen, setFormOpen] = useState(false);
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = useCallback(async () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit number");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { error: dbError } = await supabase.from("leads").insert({
        name: name.trim(),
        phone: `+91${phone}`,
        email: email.trim().toLowerCase(),
        source: "sticky_apply_now",
        status: "new",
        is_verified: false,
        created_at: new Date().toISOString(),
      });

      if (dbError) {
        console.error("Supabase error:", dbError);
      }

      const { sendEmailOtpAction } = await import("@/app/actions/otp");
      const result = await sendEmailOtpAction(email);
      
      if (!result.success) {
        setError(result.error || "Failed to send verification email");
        return;
      }

      setStep("otp");
    } catch (err) {
      console.error("Submit error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [name, phone, email]);

  const handleVerifyOtp = useCallback(async () => {
    if (!otpCode || otpCode.length !== 4) {
      setError("Please enter the 4-digit code");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { verifyEmailOtpAction } = await import("@/app/actions/otp");
      const result = await verifyEmailOtpAction(email, otpCode);

      if (!result.success) {
        setError(result.error || "Invalid OTP");
        return;
      }

      setStep("success");
      
      setTimeout(() => {
        setFormOpen(false);
        setTimeout(() => {
          setStep("form");
          setName("");
          setPhone("");
          setEmail("");
          setOtpCode("");
        }, 300);
      }, 2500);
    } catch (err) {
      console.error("Verify error:", err);
      setError("Something went wrong verifying OTP.");
    } finally {
      setLoading(false);
    }
  }, [otpCode, email]);

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
                    
                    {step === "success" ? (
                      <div className="flex flex-col items-center gap-3 py-8 px-4 relative z-10">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center animate-in zoom-in duration-300">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="text-center space-y-1">
                          <p className="text-base font-extrabold text-foreground tracking-tight">
                            Application Verified! 🎉
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
                              {step === "otp" ? "Verify Your Email" : "Learn Interior/Exterior Design"}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              {step === "otp" ? `Code sent to ${email}` : "Get a free callback from our mentor"}
                            </p>
                          </div>
                          <button
                            onClick={() => setFormOpen(false)}
                            className="p-1.5 rounded-full hover:bg-muted/80 transition-colors shrink-0 -mt-1 -mr-1"
                          >
                            <X className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                        
                        {step === "form" ? (
                          <div className="space-y-3">
                            <div className="flex flex-col sm:flex-row gap-3">
                              {/* Name */}
                              <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-border/80 bg-muted/30 focus-within:border-emerald-500 focus-within:bg-background focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all group flex-1">
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
                              <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-border/80 bg-muted/30 focus-within:border-emerald-500 focus-within:bg-background focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all group flex-1">
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
                            
                            {/* Email */}
                            <div className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-border/80 bg-muted/30 focus-within:border-emerald-500 focus-within:bg-background focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all group">
                              <Mail className="w-4 h-4 text-muted-foreground group-focus-within:text-emerald-600 shrink-0 transition-colors" />
                              <input
                                type="email"
                                placeholder="Email address (for OTP verification)"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground/60 outline-none"
                              />
                            </div>
                          </div>
                        ) : (
                          /* OTP Input */
                          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-2 py-2">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-500/40 bg-emerald-500/5 focus-within:bg-background focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 transition-all w-full max-w-[240px]">
                              <input
                                type="text"
                                inputMode="numeric"
                                maxLength={4}
                                placeholder="Enter 4-digit code"
                                value={otpCode}
                                onChange={(e) => { setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 4)); setError(""); }}
                                className="flex-1 bg-transparent text-center text-lg font-bold tracking-widest text-foreground placeholder:text-muted-foreground/50 placeholder:tracking-normal placeholder:text-sm placeholder:font-medium outline-none w-full"
                                autoFocus
                              />
                            </div>
                          </div>
                        )}

                        {error && (
                          <p className="text-xs text-red-500 font-medium px-1 animate-in slide-in-from-top-1 text-center">{error}</p>
                        )}

                        <div className="pt-1">
                          {step === "form" ? (
                            <Button
                              size="lg"
                              className="w-full text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                              onClick={handleSendOtp}
                              disabled={loading}
                            >
                              {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <>
                                  Send OTP
                                  <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                              )}
                            </Button>
                          ) : (
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="lg"
                                className="h-12 rounded-xl text-muted-foreground hover:text-foreground border-border/80 flex-1 transition-all"
                                onClick={() => { setStep("form"); setOtpCode(""); setError(""); }}
                                disabled={loading}
                              >
                                Back
                              </Button>
                              <Button
                                size="lg"
                                className="flex-[2] text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={handleVerifyOtp}
                                disabled={loading || otpCode.length !== 4}
                              >
                                {loading ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  "Verify & Apply"
                                )}
                              </Button>
                            </div>
                          )}
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
