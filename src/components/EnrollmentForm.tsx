"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Mail, Phone, ChevronDown, ArrowRight, CheckCircle } from "lucide-react";
import { PremiumInput } from "@/components/PremiumFormComponents";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/components/PremiumFormWrapper";
import { COUNTRY_CODES, detectCountryCode } from "@/data/countryCodes";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, cb: () => void) => void };
    fbq: (...args: unknown[]) => void;
  }
}

const INLINE_TIMER_TOTAL_SECONDS = 2 * 3600 + 27 * 60 + 32;
const INLINE_TIMER_STORAGE_KEY = "landing_inline_trial_timer_start";

function getInlineTimerTimeLeft(): number {
  if (typeof window === 'undefined') return INLINE_TIMER_TOTAL_SECONDS;
  let start = localStorage.getItem(INLINE_TIMER_STORAGE_KEY);
  if (!start) {
    start = String(Date.now());
    localStorage.setItem(INLINE_TIMER_STORAGE_KEY, start);
  }
  const elapsed = Math.floor((Date.now() - Number(start)) / 1000);
  return INLINE_TIMER_TOTAL_SECONDS - (elapsed % INLINE_TIMER_TOTAL_SECONDS);
}

function formatInlineTimer(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

export function EnrollmentForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [timeLeft, setTimeLeft] = useState(getInlineTimerTimeLeft);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
  });
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const detected = detectCountryCode();
    const country = COUNTRY_CODES.find(c => c.code === detected);
    if (country) setCountryCode(country.dial);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setTimeLeft(getInlineTimerTimeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.dial === countryCode) || COUNTRY_CODES.find(c => c.code === "US")!;

  const filteredCountries = countrySearch.trim()
    ? COUNTRY_CODES.filter(c =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dial.includes(countrySearch) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
    )
    : COUNTRY_CODES;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = form.phone.replace(/[^0-9]/g, "");
    if (digits.length < 6 || digits.length > 15) {
      toast({ title: "Invalid phone number", description: "Please enter a valid phone number.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const fullPhone = `${countryCode} ${form.phone}`;

    try {
      const { error: dbError } = await supabase.from("leads").insert({
        name: form.full_name.trim(),
        phone: fullPhone,
        source: "sketchup_free_course",
        status: "new",
        created_at: new Date().toISOString(),
      });

      if (dbError) {
        throw dbError;
      }
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
        window.fbq('track', 'CompleteRegistration');
      }

      setSubmitted(true);
      toast({
        title: "Registration Successful!",
        description: "Welcome! Our team will connect with you shortly.",
      });

    } catch (err: unknown) {
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center py-10 px-4 gap-4"
      >
        <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-2xl font-black text-foreground">Registration Successful!</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
          Keep your phone close — our mentor will connect with you and help you start with the course.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-4 pt-4"
    >
      <PremiumInput
        id="full_name"
        name="full_name"
        label="Full Name"
        placeholder="Enter your full name"
        value={form.full_name}
        onChange={handleChange}
        required
        icon={<User />}
      />

      <motion.div variants={itemVariants} className={`space-y-1.5 pt-1 ${showCountryPicker ? "relative z-50" : ""}`}>
        <div className="flex gap-2.5">
          <div className="relative" style={{ zIndex: showCountryPicker ? 100 : 'auto' }}>
            <button
              type="button"
              onClick={() => { setShowCountryPicker(!showCountryPicker); setCountrySearch(""); }}
              className="h-[54px] px-3.5 rounded-xl border border-border bg-background flex items-center gap-1.5 text-foreground hover:border-accent/30 transition-all min-w-[95px] shadow-sm"
            >
              <span className="text-lg">{selectedCountry.flag}</span>
              <span className="text-[13px] font-bold text-muted-foreground">{countryCode}</span>
              <ChevronDown className={`h-3 w-3 text-muted-foreground/50 ml-auto transition-transform duration-200 ${showCountryPicker ? "rotate-180" : ""}`} />
            </button>

            {showCountryPicker && (
              <>
                <div className="fixed inset-0" style={{ zIndex: 90 }} onClick={() => setShowCountryPicker(false)} />
                <div className="absolute top-full left-0 mt-1.5 w-[280px] max-h-[240px] overflow-hidden rounded-xl bg-white border border-border/30 flex flex-col" style={{ zIndex: 100, boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)' }}>
                  <div className="p-2.5 border-b border-border/20 bg-secondary/30 sticky top-0">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full h-8 px-3 rounded-lg bg-white text-xs font-semibold text-foreground placeholder:text-muted-foreground/40 outline-none border border-border/30 focus:border-accent/40 transition-colors"
                    />
                  </div>
                  <div className="overflow-y-auto flex-1">
                    {filteredCountries.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => { setCountryCode(c.dial); setShowCountryPicker(false); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-accent/5 transition-colors ${c.dial === countryCode ? "bg-accent/8 font-bold" : ""}`}
                      >
                        <span className="text-base leading-none">{c.flag}</span>
                        <span className="text-[11px] font-medium text-foreground flex-1 truncate">{c.name}</span>
                        <span className="text-[10px] font-bold text-muted-foreground/60 tabular-nums">{c.dial}</span>
                      </button>
                    ))}
                    {filteredCountries.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-4">No countries found</p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex-1">
            <PremiumInput
              id="phone"
              name="phone"
              label="Phone Number"
              placeholder="Your number"
              value={form.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9\s\-]/g, "");
                setForm((f) => ({ ...f, phone: val }));
              }}
              required
              icon={<Phone />}
            />
          </div>
        </div>
        {form.phone.length > 0 && form.phone.replace(/[^0-9]/g, "").length < 6 && (
          <p className="text-[10px] font-bold text-destructive ml-1">Please enter a valid phone number</p>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="pt-4">
        <div className="mb-3 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/70 px-3 py-1.5 text-[11px] font-semibold text-emerald-700">
            <span>Offer closing in</span>
            <span className="font-black tabular-nums text-emerald-800">{formatInlineTimer(timeLeft)}</span>
          </div>
        </div>
        {/* Form Submission Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 rounded-xl text-[15px] font-bold text-white shadow-lift hover:shadow-green-lg transition-all duration-300 relative overflow-hidden group border-0"
          style={{
            background: 'linear-gradient(135deg, hsl(152, 56%, 40%) 0%, hsl(152, 60%, 30%) 100%)',
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Enroll for Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-white" />
        </Button>
      </motion.div>
    </motion.form>
  );
}
