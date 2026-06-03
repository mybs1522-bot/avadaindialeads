"use client";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, cb: () => void) => void };
  }
}

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Download,
  Shield,
  Sparkles,
  X,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";



const FEATURES = [
  "9 Premium Courses",
  "10,000+ Textures",
  "Official Certificate",
  "24/7 Team Support",
  "Lifetime Access",
];

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaymentModal({ open, onClose }: PaymentModalProps) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(async () => {
    // Validate
    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Save lead to Supabase
      const { error: dbError } = await supabase.from("leads").insert({
        phone: `+91${phone}`,
        email: email,
        source: "payment_modal",
        status: "initiated",
        created_at: new Date().toISOString(),
      });

      if (dbError) {
        console.error("Supabase error:", dbError);
        // Continue even if DB save fails — don't block payment
      }

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Razorpay"));
          document.head.appendChild(script);
        });
      }

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_XXXXXXXXXXXXXXX",
        amount: 99900, // ₹999 in paise
        currency: "INR",
        name: "Avadaspace",
        description: "Complete Design Course Bundle",
        prefill: {
          email: email,
          contact: `+91${phone}`,
        },
        theme: {
          color: "#059669",
        },
        handler: async function (response: any) {
          // Payment successful — update lead status
          await supabase
            .from("leads")
            .update({
              status: "paid",
              payment_id: response.razorpay_payment_id,
            })
            .eq("email", email);

          onClose();
          alert("Payment successful! Welcome to Avadaspace 🎉");
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [phone, email, onClose]);

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent
        className="max-w-md w-[92vw] rounded-2xl border-border bg-background p-0 shadow-2xl overflow-hidden gap-0"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-6 pt-6 pb-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-neutral-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Complete Bundle
            </span>
          </div>

          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-extrabold text-white tracking-tight">
              All 9 Courses
            </DialogTitle>
            <DialogDescription className="sr-only">
              Enroll in all 9 premium courses
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Features */}
        <div className="px-6 pt-5 pb-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-neutral-800 dark:text-neutral-300 shrink-0" />
                <span className="text-sm text-foreground font-medium">{f}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
            <Download className="w-4 h-4 text-neutral-600 dark:text-neutral-400 shrink-0" />
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Software Download — All Links Included
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-6 space-y-4">
          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Phone Number
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-muted/20 focus-within:border-neutral-900 focus-within:ring-2 focus-within:ring-neutral-900/20 dark:focus-within:border-neutral-400 dark:focus-within:ring-neutral-400/20 transition-all">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground font-medium">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                  setError("");
                }}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Email Address
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border bg-muted/20 focus-within:border-neutral-900 focus-within:ring-2 focus-within:ring-neutral-900/20 dark:focus-within:border-neutral-400 dark:focus-within:ring-neutral-400/20 transition-all">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 font-medium px-1">{error}</p>
          )}

          {/* Submit Button */}
          <Button
            size="lg"
            className="w-full text-base font-bold bg-neutral-900 hover:bg-black text-white rounded-xl h-12 shadow-lg shadow-neutral-900/20 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Get All Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          {/* Trust Badge */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60">
            <Shield className="w-3.5 h-3.5" />
            <span>SSL Secured Payment • 7-Day Money-Back Guarantee</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
