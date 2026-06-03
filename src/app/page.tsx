"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { Navbar } from "@/components/Navbar";
import { TestimonialsSection } from "@/components/testimonials-with-marquee";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import {
  Monitor, Box, Video, Cpu, Layers, Users,
  BookOpen, CheckCircle, ArrowRight, Briefcase,
  Shield, BadgeCheck, Clock, Sparkles, Ruler, PencilRuler, Image, Clapperboard
} from "lucide-react";

const courseAutocad = "/assets/course-autocad.jpg";
const courseSketchup = "/assets/course-sketchup.jpg";
const courseD5 = "/assets/course-d5render.jpg";
const courseAi = "/assets/course-airender.jpg";
const courseWorkflow = "/assets/course-workflow.jpg";
const courseClient = "/assets/course-client.jpg";

const bookKitchen = "/assets/book-kitchen.jpg";
const bookWashroom = "/assets/book-washroom.jpg";
const bookStudy = "/assets/book-study.jpg";
const bookBedroom = "/assets/book-bedroom.jpg";
const bookLiving = "/assets/book-living.jpg";
const bookElevations = "/assets/book-elevations.jpg";

const hero1 = "/assets/hero-1.jpg";
const hero2 = "/assets/hero-2.jpg";
const hero3 = "/assets/hero-3.jpg";
const hero4 = "/assets/hero-4.jpg";
const hero5 = "/assets/hero-5.jpg";
const hero6 = "/assets/hero-6.jpg";
const hero7 = "/assets/hero-7.jpg";
const hero8 = "/assets/hero-8.jpg";
const logo = "/assets/logo.png";
import { EvergreenTimer } from "@/components/EvergreenTimer";
import { Sparkles as SparklesEffect } from "@/components/ui/sparkles";
import { MarketingDashboard } from "@/components/ui/dashboard-1";

const courses = [
  { id: "autocad", title: "AutoCAD Plan Designing", desc: "The one skill that gets you hired. You'll be drafting floor plans that clients approve on sight — most students finish this in under a week.", icon: Monitor, image: courseAutocad },
  { id: "sketchup", title: "SketchUp 3D Modeling", desc: "Turn a flat sketch into a 3D walkthrough that makes clients reach for their wallets. This is how the top 1% of designers close deals.", icon: Box, image: courseSketchup },
  { id: "d5", title: "D5 Render — Photo and Video", desc: "Photorealistic images in under 10 minutes. Your clients will think you hired a photographer. We've seen students double their rates after learning this.", icon: Video, image: courseD5 },
  { id: "ai", title: "AI Rendering Tools", desc: "Generate magazine-quality visuals in 30 seconds flat. While other designers spend 4 hours rendering, you'll be sending invoices.", icon: Cpu, image: courseAi },
  { id: "workflow", title: "Design-to-Delivery Workflow", desc: "The exact step-by-step process to take any project from first call to final handover — even if you've never managed a client before.", icon: Layers, image: courseWorkflow },
  { id: "client", title: "Client and Business Skills", desc: "Where to find clients, how to price without undercharging, and the proposal template that has a 73% close rate. This module alone pays for the membership.", icon: Users, image: courseClient },
];

const books = [
  { id: "kitchen", title: "Kitchen Design", image: bookKitchen },
  { id: "washroom", title: "Washroom Design", image: bookWashroom },
  { id: "study", title: "Study Room Design", image: bookStudy },
  { id: "bedroom", title: "Bedroom Design", image: bookBedroom },
  { id: "living", title: "Living Room Design", image: bookLiving },
  { id: "exteriors", title: "Exterior Design", image: bookElevations },
];

const stats = [
  { value: "12,347", label: "Students worldwide" },
  { value: "4.8/5", label: "Average rating" },
  { value: "6hrs", label: "To complete" },
  { value: "Free", label: "Limited time offer" },
];

const outcomes = [
  "Model any room, office, or space in SketchUp with confidence",
  "Create 3D walkthroughs that impress every client",
  "Draft professional floor plans faster than designers with years of experience",
  "Take on real interior design projects — from concept to delivery",
  "Build a portfolio that gets you hired at top design firms",
  "Start freelancing and earn ₹20,000–₹50,000/month from design work",
];

const testimonials = [
  { author: { name: "Priya Sharma", handle: "@priya_designs", avatar: "https://avatar.vercel.sh/priya" }, text: "My husband thought I was wasting time on another course. Now I earn ₹60,000/month from freelance interior projects. This course changed everything." },
  { author: { name: "Rahul Verma", handle: "@rahul_creates", avatar: "https://avatar.vercel.sh/rahul" }, text: "Revenue crossed ₹80,000/month by month 4. I now run my own studio in Pune with 5 active clients. Didn't think this was possible." },
  { author: { name: "Sneha Patel", handle: "@sneha_designs", avatar: "https://avatar.vercel.sh/sneha" }, text: "₹35,000 in my first 2 months. The SketchUp walkthrough module changed everything — clients gasp when they see my 3D presentations." },
  { author: { name: "Arjun Reddy", handle: "@arjun_interiors", avatar: "https://avatar.vercel.sh/arjun" }, text: "Got a ₹2 lakh project two weeks after starting. Used exactly what the course taught. Real skills, real results." },
  { author: { name: "Deepika Nair", handle: "@deepika_spaces", avatar: "https://avatar.vercel.sh/deepika" }, text: "I left my 9-to-6 job after month 3. Now I design full time from home in Kochi and earn more than my old salary." },
  { author: { name: "Vikram Singh", handle: "@vikram_builds", avatar: "https://avatar.vercel.sh/vikram" }, text: "Zero design experience. 45 days later I billed my first client ₹15,000 for a bedroom redesign. The step-by-step approach makes it simple." },
  { author: { name: "Aisha Khan", handle: "@aisha_designs", avatar: "https://avatar.vercel.sh/aisha" }, text: "I was terrified of SketchUp. Now I model full rooms in 2 hours and have 4 repeat clients in Mumbai who send me referrals every month." },
  { author: { name: "Karthik Iyer", handle: "@karthik_spaces", avatar: "https://avatar.vercel.sh/karthik" }, text: "Got hired by a Bangalore design firm within 30 days. They said my SketchUp skills were better than their senior designers. I'd been learning 3 weeks." },
  { author: { name: "Ananya Gupta", handle: "@ananya_interiors", avatar: "https://avatar.vercel.sh/ananya" }, text: "The course is a goldmine. I picked up 3 paying clients in Delhi in my first week of completing it. Nothing else comes close." },
  { author: { name: "Rohan Mehta", handle: "@rohan_arch", avatar: "https://avatar.vercel.sh/rohan" }, text: "Best ₹99 I've ever spent. Got my first paying client before I even finished the course. The return on this is honestly unbelievable." },
];

const faqs = [
  { q: "I have absolutely zero experience — will I actually be able to do this?", a: "That's exactly who this was built for. 78% of our students had zero design background when they started. The course is step-by-step — we don't skip anything. You'll go from 'I don't know where to start' to modeling your first room in under a week." },
  { q: "How quickly will I see results?", a: "Most students model their first complete room within 5 days. By the end of the course, you'll have portfolio-ready projects and the confidence to take on real client work." },
  { q: "I've already tried other courses and they didn't work", a: "Most courses teach you one tool, then leave you stranded. No structure, no real projects. This course gives you the complete system — SketchUp modeling, floor plans, 3D walkthroughs, and real project files to practice with. It's designed to make you job-ready." },
  { q: "Why is it free?", a: "We believe world-class SketchUp education shouldn't cost ₹10,000+. For a limited time, you get the full course, downloadable project files, and our team personally helps you get started. No hidden charges, no upsells - ever." },
  { q: "What if I get stuck?", a: "Our team will personally call you and help you get started. You're never alone — we're here to make sure you succeed." },
];

// Smooth animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const INLINE_TIMER_TOTAL_SECONDS = 2 * 3600 + 27 * 60 + 32;
const INLINE_TIMER_STORAGE_KEY = "landing_inline_offer_timer_start";

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

function InlineOfferTimer() {
  const [timeLeft, setTimeLeft] = useState(getInlineTimerTimeLeft);

  useEffect(() => {
    const id = window.setInterval(() => setTimeLeft(getInlineTimerTimeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-accent/10 px-3 py-1.5 text-[11px] font-semibold text-primary">
      <Clock className="h-3.5 w-3.5 flex-shrink-0" />
      <span>Offer closing in</span>
      <span className="font-black tabular-nums text-primary">{formatInlineTimer(timeLeft)}</span>
    </div>
  );
}

export default function LandingPage() {
  const scrollRef = useScrollFadeIn();
  const [enrollOpen, setEnrollOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', { content_name: 'SketchUp Course Landing Page', value: 0, currency: 'INR' });
    }

    const hideTawk = () => {
      if ((window as any).Tawk_API?.hideWidget) {
        (window as any).Tawk_API.hideWidget();
      }
    };
    hideTawk();
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    (window as any).Tawk_API.onLoad = hideTawk;
    return () => {
      if ((window as any).Tawk_API?.showWidget) (window as any).Tawk_API.showWidget();
      (window as any).Tawk_API.onLoad = undefined;
    };
  }, []);

  const handleEnrollClick = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', { value: 0, currency: 'INR', content_name: 'SketchUp Course' });
    }
    setEnrollOpen(true);
  };

  return (
    <div ref={scrollRef as any} className="min-h-screen bg-white overflow-x-hidden">
      <Navbar onJoinClick={() => router.push('/preview')} />

      {/* ─── HERO — PDR SECTION ─── */}
      <motion.section
        className="pt-20 sm:pt-28 pb-8 sm:pb-12 px-3 sm:px-6 bg-white text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, var(--d-primary) 0%, transparent 60%)' }} />

        <div className="container mx-auto max-w-5xl px-0 sm:px-0 relative z-10">
          {/* Top pill badge — PAIN POINT */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full px-4 sm:px-5 py-2 mb-4 border whitespace-nowrap" style={{ background: 'var(--d-primary)', borderColor: 'var(--d-primary)' }}
          >
            <CheckCircle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'var(--d-primary)' }} />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wide whitespace-nowrap" style={{ color: 'var(--d-primary)' }}>Limited Offer — Free Access</span>
          </motion.div>

          {/* Aspirational hook */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-gray-700 text-base sm:text-lg md:text-xl font-bold mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            Want to Design{' '}
            <span className="text-accent font-extrabold">Bedrooms</span>,{' '}
            <span className="text-accent font-extrabold">Kitchens</span>,{' '}
            <span className="text-accent font-extrabold">Washrooms</span>,{' '}
            <span className="text-accent font-extrabold">Villas</span>,{' '}
            <span className="text-accent font-extrabold">Offices</span>{' '}
            in Accurate 3D?
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1] mb-2"
          >
            Master SketchUp.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1] mb-5"
            style={{ color: 'var(--d-primary)' }}
          >
            Start for Free.
          </motion.h2>

          {/* Value proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="max-w-3xl mx-auto mb-6"
          >
            <p className="text-gray-700 text-sm sm:text-base font-semibold mb-2">
              Go from zero to designing stunning 3D interiors & exteriors — step by step
            </p>
            <p className="text-gray-600 text-xs sm:text-sm font-medium">
              Free access. No subscriptions. No upsells. Just results.
            </p>
          </motion.div>

          {/* Video embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-4xl mx-auto mb-6 rounded-2xl overflow-hidden shadow-2xl"
            style={{ position: 'relative', paddingTop: '56.25%' }}
          >
            <video
              src="https://www.balikahomes.com/cdn/shop/videos/c/vp/96f4b18bb1634b5eb1ab158c31964831/96f4b18bb1634b5eb1ab158c31964831.HD-1080p-7.2Mbps-62029396.mp4?v=0"
              autoPlay
              muted
              loop
              playsInline
              style={{ position: 'absolute', top: 0, height: '100%', width: '100%', objectFit: 'cover' }}
            />
          </motion.div>

          {/* Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-3xl mx-auto rounded-2xl bg-gradient-to-br from-accent/10 to-white border border-border p-5 sm:p-6 text-left shadow-sm mb-6"
          >
            <p className="text-sm sm:text-base text-gray-700 italic  leading-snug mb-3">
              "SketchUp is the #1 tool architects and interior designers use every single day. <span className="underline decoration-2 decoration-gray-800 font-bold not-italic">But most people learn it the slow, painful way</span> — random YouTube videos, confusing tutorials, zero structure."
            </p>
            <div className="w-10 h-1 rounded-full bg-accent mb-3" />
            <p className="text-xs sm:text-[13px] text-gray-500 leading-snug mb-2">
              We built something different. A course that actually respects your time and gets you to…
            </p>
            <h3 className="text-lg sm:text-xl font-black mb-3" style={{ color: 'var(--d-primary)' }}>
              "I can actually do this" — in days, not months.
            </h3>

            {/* Rocket callout */}
            <div className="rounded-xl bg-accent/10 border border-border p-3 sm:p-4 flex items-start gap-2.5">
              <span className="text-lg flex-shrink-0 mt-0.5">🚀</span>
              <p className="text-xs sm:text-[13px] text-gray-600 leading-snug">
                12,347 students have already enrolled for free. No subscriptions, no hidden fees — just{' '}
                <span className="font-bold" style={{ color: 'var(--d-primary)' }}>a complete SketchUp education that actually works.</span>
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <InlineOfferTimer />
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              onClick={() => handleEnrollClick()}
              className="px-12 py-5 rounded-full font-bold text-sm sm:text-base uppercase tracking-wider text-white shadow-lg flex items-center gap-3 cta-breathe touch-manipulation"
              style={{ background: 'linear-gradient(135deg, var(--d-primary), var(--d-primary))' }}
            >
              Get SketchUp Course — Free
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide">
              Free access · Instant access · No hidden fees
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-10 w-full overflow-hidden"
          >
            <div className="mb-5 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-gray-900">
                This is What Our Students <span className="text-accent">Create</span>
              </h3>
            </div>
            <style>{`
              @keyframes marquee-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-track {
                display: flex;
                gap: 1rem;
                animation: marquee-scroll 25s linear infinite;
                will-change: transform;
              }
            `}</style>
            <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4">
              <div className="marquee-track">
                {[hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8].map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-[3/4] h-32 sm:h-40 md:h-48 flex-shrink-0"
                    style={{ transform: `rotate(${index % 3 === 0 ? -2 : index % 3 === 1 ? 1.5 : -1}deg)` }}
                  >
                    <img
                      src={src}
                      alt={`Design showcase ${(index % 8) + 1}`}
                      loading="eager"
                      className="w-full h-full object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── SKETCHUP STUDENT BANNER ─── */}
      <div className="relative w-full overflow-hidden" style={{ height: '280px' }}>
        <img
          src="https://www.balikahomes.com/cdn/shop/files/SKETCHUP_COURSE_LAPTOP_1_copy_2.jpg?quality=90&v=1768558370&width=1500"
          alt="Student working on SketchUp project"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 sm:pb-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight"
          >
            From Planning to <span style={{ color: '#4ade80' }}>3D</span>
          </motion.h2>
        </div>
      </div>


      {/* ─── INVEST IN YOURSELF — ROI SECTION ─── */}
      <motion.section
        className="py-10 sm:py-16 px-5 sm:px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: "-50px" }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div className="text-center mb-6 sm:mb-8" variants={sectionVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              What You'll Be Able to
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight" style={{ color: 'var(--d-primary)' }}>
              Do After This Course
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: "-50px" }}
          >
            {[
              {
                title: "3D Modeling",
                icon: Box,
                beforeLabel: "BEFORE",
                beforeText: "Stuck staring at a blank screen",
                afterLabel: "AFTER",
                afterText: "Build any room in under 30 minutes",
              },
              {
                title: "Floor Plans",
                icon: Ruler,
                beforeLabel: "BEFORE",
                beforeText: "Can't draft a basic layout",
                afterLabel: "AFTER",
                afterText: "Professional plans clients approve fast",
              },
              {
                title: "Presentations",
                icon: Image,
                beforeLabel: "BEFORE",
                beforeText: "Flat sketches nobody takes seriously",
                afterLabel: "AFTER",
                afterText: "3D walkthroughs that wow every client",
              },
              {
                title: "Confidence",
                icon: PencilRuler,
                beforeLabel: "BEFORE",
                beforeText: "Overwhelmed by SketchUp's interface",
                afterLabel: "AFTER",
                afterText: "Navigate every tool like a pro",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all touch-manipulation"
              >
                {/* Card header */}
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-tight pr-2">{card.title}</h4>
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
                    <card.icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Before / After */}
                <div className="flex gap-3">
                  {/* Before */}
                  <div className="flex-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-300 line-through">BEFORE</span>
                    <p className="text-[12px] text-gray-400 font-medium mt-1 leading-snug line-through decoration-gray-300">{card.beforeText}</p>
                  </div>
                  {/* Divider */}
                  <div className="flex items-center">
                    <span className="text-gray-300 text-xs">→</span>
                  </div>
                  {/* After */}
                  <div className="flex-1">
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--d-primary)' }}>AFTER</span>
                    <p className="text-[12px] font-bold text-gray-900 mt-1 leading-snug">{card.afterText}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── STRUGGLE vs BLUEPRINT ─── */}
      <motion.section
        className="py-10 sm:py-20 px-5 sm:px-8"
        style={{ background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className="w-full max-w-7xl mx-auto">
          {/* Heading */}
          <motion.div className="text-center mb-6 sm:mb-10" variants={sectionVariants}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              Learning Alone
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight mt-1">
              vs. <span style={{ color: 'var(--d-primary)' }}>Learning With Us</span>
            </h2>
          </motion.div>

          {/* Two-column comparison — stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-10">

            {/* ═══ LEFT: The Old Struggle ═══ */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="rounded-2xl border border-red-100/60 bg-white p-5 sm:p-7 lg:p-9 touch-manipulation"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 font-black text-sm">✕</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-red-500 tracking-tight">On Your Own</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { emoji: "😰", text: "Hours watching random YouTube tutorials" },
                  { emoji: "😵", text: "SketchUp interface feels overwhelming" },
                  { emoji: "❌", text: "No structure, no clear learning path" },
                  { emoji: "💸", text: "Paid courses that skip the basics" },
                  { emoji: "📄", text: "Still can't model a simple room" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{item.emoji}</span>
                    <p className="text-[13px] sm:text-sm text-gray-500 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ═══ RIGHT: Our Blueprint ═══ */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="rounded-2xl border border-border bg-gradient-to-br from-accent/5 to-white p-5 sm:p-7 lg:p-9 touch-manipulation"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4.5 w-4.5 text-accent" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-accent tracking-tight">What You Get With Us</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { emoji: "🎯", text: "Step-by-step SketchUp lessons from absolute zero" },
                  { emoji: "⚡", text: "Model rooms, furniture, and spaces in hours" },
                  { emoji: "📚", text: "Real project files to practice with" },
                  { emoji: "🔗", text: "Works with the free version of SketchUp" },
                  { emoji: "💬", text: "Clear explanations — no jargon, no fluff" },
                  { emoji: "💼", text: "Portfolio-ready projects by the end" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{item.emoji}</span>
                    <p className="text-[13px] sm:text-sm text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className="text-center mt-10">
            <InlineOfferTimer />
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => handleEnrollClick()}
              className="px-10 py-4 rounded-full font-bold text-[12px] uppercase tracking-[0.15em] text-white shadow-lg flex items-center gap-2 mx-auto cta-breathe"
              style={{ background: 'linear-gradient(135deg, var(--d-primary), var(--d-primary))' }}
            >
              Get SketchUp Course — Free
              <ArrowRight className="h-4 w-4" />
            </motion.button>
            <p className="text-[10px] text-gray-400 font-medium mt-3">Free access · Instant access · No hidden fees</p>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── VIDEO ─── */}
      <div className="w-full">
        <video
          src="/video/intro.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full block"
          style={{ border: 'none', margin: 0, padding: 0 }}
        />
      </div>

      {/* ─── SPARKLES TRUST BANNER ─── */}
      <div className="relative w-full overflow-hidden bg-[#0a0f0d]" style={{ height: '220px' }}>
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--d-primary)_0%,transparent_70%)] opacity-70" />
        {/* Sparkles layer — z-10 so it sits above background but below text */}
        <SparklesEffect
          density={900}
          speed={0.8}
          opacity={0.75}
          size={1}
          color="#4ade80"
          className="z-10"
        />
        {/* Content — z-20 sits above sparkles */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 px-4 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-primary/80">
            Trusted by 12,347 students worldwide
          </p>
          <p className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Go from zero to <span className="text-primary">SketchUp confident</span> in days
          </p>
          <p className="text-[12px] text-white/40 font-medium max-w-sm">
            Free access · Instant access · No hidden fees
          </p>
        </div>
      </div>

      {/* ─── HOW TO EARN ─── */}
      <motion.section
        className="py-10 sm:py-16 px-5 sm:px-6 bg-secondary/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: "-50px" }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-2xl">
          <motion.div className="text-center mb-6" variants={sectionVariants}>
            <h2 className="text-2xl sm:text-3xl  font-extrabold tracking-tight text-foreground leading-tight">
              How to <span className="text-primary">Get Started</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15, margin: "-50px" }}
          >
            {[
              { step: "1", title: "Sign Up", desc: "Enter your name & email — takes 30 seconds" },
              { step: "2", title: "Free Access", desc: "Enroll instantly — no subscriptions, no hidden fees" },
              { step: "3", title: "Watch", desc: "Follow clear, step-by-step video lessons" },
              { step: "4", title: "Create", desc: "Model rooms, spaces & designs with confidence" },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="rounded-2xl border border-border/30 bg-white p-4 sm:p-5 text-center shadow-soft hover:shadow-md transition-all touch-manipulation"
              >
                <div className="h-9 w-9 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-3 text-[12px] font-black">
                  {item.step}
                </div>
                <p className=" font-extrabold text-sm text-foreground mb-1">{item.title}</p>
                <p className="text-[11px] text-muted-foreground leading-snug">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── WHAT'S INSIDE ─── */}
      <motion.section
        className="py-10 sm:py-14 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-xl">
          <motion.div className="text-center mb-6" variants={sectionVariants}>
            <h2 className="text-2xl sm:text-3xl  font-extrabold tracking-tight text-foreground leading-tight">
              Everything Included
            </h2>
            <p className="text-lg sm:text-xl font-bold text-primary mt-2">Free — Instant Access</p>
          </motion.div>

          <motion.div
            className="space-y-2.5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { icon: Monitor, text: "Full SketchUp course — beginner to confident" },
              { icon: BookOpen, text: "Downloadable project files for every lesson" },
              { icon: Layers, text: "3D modeling, floor plans & walkthroughs" },
              { icon: Users, text: "12,347 students already enrolled" },
              { icon: Briefcase, text: "Portfolio-ready projects you can show clients" },
              { icon: BadgeCheck, text: "Works with free SketchUp — no paid software needed" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-center gap-3.5 rounded-xl border border-border/30 bg-white px-4 py-3 shadow-soft"
              >
                <item.icon className="h-4 w-4 text-accent flex-shrink-0" />
                <p className="text-[13.5px] font-medium text-foreground">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center mt-7">
            <InlineOfferTimer />
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => handleEnrollClick()}
              className="px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.18em] btn-primary text-white shadow-lg cta-breathe"
            >
              Get SketchUp Course — Free
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialsSection
        title="Real members. Real results."
        description="They started exactly where you are now."
        testimonials={testimonials}
        className="bg-white py-14 sm:py-20"
      />

      {/* ─── FINAL CTA ─── */}
      <motion.section
        className="py-12 sm:py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-xl sm:text-2xl  font-extrabold tracking-tight text-foreground">
            Your SketchUp course is waiting. Register for free.
          </h2>
          <InlineOfferTimer />
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => handleEnrollClick()}
            className="mt-5 px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-[0.18em] btn-primary text-white shadow-lg cta-breathe"
          >
            Get SketchUp Course — ₹99
          </motion.button>
        </div>
      </motion.section>

      {/* ─── ENROLLMENT POPUP ─── */}
      <Dialog open={enrollOpen} onOpenChange={setEnrollOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl mx-4 border-border/40 shadow-lift bg-white p-0 overflow-hidden">
          <div className="p-6 sm:p-8">
            <DialogHeader className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-lg btn-primary flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <DialogTitle className="text-lg  font-bold text-foreground">Get Your SketchUp Course</DialogTitle>
              </div>
              <p className="text-sm text-muted-foreground">Join 12,347 students — just ₹99, one-time payment</p>
            </DialogHeader>
            <EnrollmentForm />
          </div>
        </DialogContent>
      </Dialog>

      {/* ─── TIMER ─── */}
      <EvergreenTimer onCtaClick={() => handleEnrollClick()} />

      {/* ─── FOOTER ─── */}
      <motion.footer
        className="border-t border-border/30 py-10 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex flex-col items-center gap-4">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <div className="text-[10px] text-muted-foreground/50 flex flex-col gap-1">
              <p>© 2025 Avada. All rights reserved.</p>
              <p className="flex items-center justify-center gap-1 uppercase tracking-widest">
                <Shield className="h-2.5 w-2.5" /> Secure & Certified Learning Platform
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
