"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COUNTRY_CODES, detectCountryCode } from "@/data/countryCodes";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export function EnrollmentForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [form, setForm] = useState({ full_name: "", phone: "" });
  const { toast } = useToast();

  useEffect(() => {
    const detected = detectCountryCode();
    const country = COUNTRY_CODES.find(c => c.code === detected);
    if (country) setCountryCode(country.dial);
  }, []);

  const selectedCountry = COUNTRY_CODES.find(c => c.dial === countryCode) || COUNTRY_CODES.find(c => c.code === "IN")!;

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
    if (!form.full_name.trim()) {
      toast({ title: "Name required", description: "Please enter your name.", variant: "destructive" });
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

      if (dbError) throw dbError;

      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
        window.fbq('track', 'CompleteRegistration');
      }

      setSubmitted(true);
      toast({ title: "Registration Successful!", description: "Our team will connect with you shortly." });
    } catch (err: unknown) {
      toast({ title: "Something went wrong", description: err instanceof Error ? err.message : "Please try again", variant: "destructive" });
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-8 px-4 gap-3"
      >
        <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle className="h-7 w-7 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">You're In!</h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
          Keep your phone close — our mentor will call you and help you get started.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Blinking green dot header */}
      <div className="flex items-center gap-2 mb-1">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <span className="text-xs font-semibold text-gray-500">Accepting registrations now</span>
      </div>

      {/* Name input */}
      <div>
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={(e) => setForm(f => ({ ...f, full_name: e.target.value }))}
          placeholder="Your full name"
          required
          className="w-full h-12 px-4 rounded-lg border border-gray-200 bg-white text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
        />
      </div>

      {/* Phone input with country code */}
      <div className="flex gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => { setShowCountryPicker(!showCountryPicker); setCountrySearch(""); }}
            className="h-12 px-3 rounded-lg border border-gray-200 bg-white flex items-center gap-1.5 text-sm hover:border-gray-300 transition-all min-w-[90px]"
          >
            <span className="text-base">{selectedCountry.flag}</span>
            <span className="text-xs font-medium text-gray-600">{countryCode}</span>
            <ChevronDown className={`h-3 w-3 text-gray-400 ml-auto transition-transform ${showCountryPicker ? "rotate-180" : ""}`} />
          </button>

          {showCountryPicker && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowCountryPicker(false)} />
              <div className="absolute top-full left-0 mt-1 w-[260px] max-h-[220px] overflow-hidden rounded-lg bg-white border border-gray-200 flex flex-col z-50 shadow-lg">
                <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search..."
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    className="w-full h-8 px-3 rounded-md bg-gray-50 text-xs text-gray-900 placeholder:text-gray-400 outline-none border border-gray-200 focus:border-green-400 transition-colors"
                  />
                </div>
                <div className="overflow-y-auto flex-1">
                  {filteredCountries.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => { setCountryCode(c.dial); setShowCountryPicker(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors text-xs ${c.dial === countryCode ? "bg-green-50 font-semibold" : ""}`}
                    >
                      <span className="text-sm">{c.flag}</span>
                      <span className="text-gray-700 flex-1 truncate">{c.name}</span>
                      <span className="text-gray-400 tabular-nums">{c.dial}</span>
                    </button>
                  ))}
                  {filteredCountries.length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-3">No countries found</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9\s\-]/g, "");
            setForm(f => ({ ...f, phone: val }));
          }}
          placeholder="Phone number"
          required
          className="flex-1 h-12 px-4 rounded-lg border border-gray-200 bg-white text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
        />
      </div>
      {form.phone.length > 0 && form.phone.replace(/[^0-9]/g, "").length < 6 && (
        <p className="text-[11px] text-red-500 -mt-2 ml-1">Please enter a valid phone number</p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Register for Free
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-gray-400 text-center">
        Free access · No spam · Our team will call you
      </p>
    </form>
  );
}
