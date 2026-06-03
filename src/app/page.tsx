"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { EnrollmentForm } from "@/components/EnrollmentForm";
import { Navbar } from "@/components/Navbar";
import { TestimonialsSection } from "@/components/testimonials-with-marquee";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

import {
  Monitor, Box, Video, Cpu, Layers, Users,
  BookOpen, CheckCircle, ArrowRight, Briefcase,
  Shield, BadgeCheck, Clock, Ruler, PencilRuler, Image, Clapperboard
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

import { MarketingDashboard } from "@/components/ui/dashboard-1";

const courses = [
  { id: "autocad", title: "AutoCAD Plan Designing", desc: "Draft floor plans that clients approve on sight.", icon: Monitor, image: courseAutocad },
  { id: "sketchup", title: "SketchUp 3D Modeling", desc: "Turn a flat sketch into a stunning 3D model.", icon: Box, image: courseSketchup },
  { id: "d5", title: "D5 Render — Photo and Video", desc: "Create photorealistic images in under 10 minutes.", icon: Video, image: courseD5 },
  { id: "vray", title: "V-Ray Photorealistic Rendering", desc: "Industry-standard rendering for breathtaking visuals.", icon: Image, image: courseAutocad },
  { id: "3dsmax", title: "3ds Max for Architecture", desc: "Advanced modeling for complex architectural designs.", icon: Layers, image: courseSketchup },
  { id: "ai", title: "AI Rendering Tools", desc: "Generate magazine-quality visuals in 30 seconds flat.", icon: Cpu, image: courseAi },
  { id: "interior", title: "Interior Design Fundamentals", desc: "Master color, lighting, and spatial arrangement.", icon: Ruler, image: courseWorkflow },
  { id: "workflow", title: "Design-to-Delivery Workflow", desc: "The step-by-step process to manage any project.", icon: Layers, image: courseWorkflow },
  { id: "client", title: "Client and Business Skills", desc: "Find clients, price correctly, and close deals.", icon: Users, image: courseClient },
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
    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-semibold text-gray-600">
      <Clock className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
      <span>Offer closing in</span>
      <span className="font-black tabular-nums text-gray-900">{formatInlineTimer(timeLeft)}</span>
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


      {/* ─── HERO — PDR SECTION ─── */}
      <motion.section
        className="pt-20 sm:pt-28 pb-8 sm:pb-12 px-3 sm:px-6 bg-white text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >


        <div className="container mx-auto max-w-5xl px-0 sm:px-0 relative z-10">


          {/* Aspirational hook */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="text-emerald-600 text-[10px] sm:text-base md:text-lg font-medium mb-4 max-w-3xl mx-auto leading-relaxed whitespace-nowrap sm:whitespace-normal tracking-tight"
          >
            Learn to Design{' '}
            <span className="text-emerald-800 font-bold">Bedrooms</span>,{' '}
            <span className="text-emerald-800 font-bold">Kitchens</span>,{' '}
            <span className="text-emerald-800 font-bold">Washrooms</span>,{' '}
            <span className="text-emerald-800 font-bold">Villas</span>,{' '}
            <span className="text-emerald-800 font-bold">Offices</span>{' '}
            in Accurate 3D.
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1] mb-2"
          >
            Start Learning Interior & Exterior Design
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1] mb-5 text-gray-400"
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
            <div className="w-10 h-1 rounded-full bg-gray-200 mb-3" />
            <p className="text-xs sm:text-[13px] text-gray-500 leading-snug mb-2">
              We built something different. A course that actually respects your time and gets you to…
            </p>
            <h3 className="text-lg sm:text-xl font-black mb-3 text-gray-900">
              "I can actually do this" — in days, not months.
            </h3>

            {/* Rocket callout */}
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-3 sm:p-4 flex items-start gap-2.5">
              <span className="text-lg flex-shrink-0 mt-0.5">🚀</span>
              <p className="text-xs sm:text-[13px] text-gray-600 leading-snug">
                12,347 students have already enrolled for free. No subscriptions, no hidden fees — just{' '}
                <span className="font-bold text-gray-900">a complete SketchUp education that actually works.</span>
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
              className="px-12 py-4 rounded-lg font-semibold text-sm sm:text-base text-white shadow-md flex items-center gap-3 touch-manipulation bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              Start Free Today
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
                This is What Our Students <span className="text-gray-500">Create</span>
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

      {/* ─── OUR 9 COURSES ─── */}
      <motion.section
        className="py-14 sm:py-20 px-5 sm:px-6 bg-gray-50 border-b border-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div className="text-center mb-10" variants={sectionVariants}>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight mb-2">
              Our 9 Premium Courses
            </h2>
            <p className="text-lg sm:text-xl font-bold text-green-600">
              Get Introduction class free
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-2 sm:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {courses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
              >
                <div className="aspect-square w-full overflow-hidden bg-gray-100 relative">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded-md text-gray-900">
                    Course {courses.indexOf(course) + 1}/9
                  </div>
                </div>
                <div className="p-2 sm:p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <course.icon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-[10px] sm:text-[15px] leading-tight line-clamp-2">{course.title}</h3>
                  </div>
                  <p className="hidden sm:block text-gray-500 text-[13px] leading-snug">{course.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          

        </div>
      </motion.section>


      {/* ─── SKETCHUP STUDENT BANNER ─── */}
      <div className="relative w-full overflow-hidden bg-gray-50 py-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight"
        >
          From Planning to <span className="text-gray-400">3D</span>
        </motion.h2>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-gray-400">
              After Learning Sketchup
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
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-600">
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
                    <span className="text-[9px] font-black uppercase tracking-widest text-green-600">AFTER</span>
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
        className="py-10 sm:py-20 px-5 sm:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-80px" }}
        variants={sectionVariants}
      >
        <div className="w-full max-w-7xl mx-auto">


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
              className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 lg:p-9 touch-manipulation"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4.5 w-4.5 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">What You Get With Us</h3>
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
              className="px-10 py-3.5 rounded-lg font-semibold text-sm text-white shadow-md flex items-center gap-2 mx-auto bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              Start Free Today
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

      {/* ─── TRUST BANNER ─── */}
      <div className="w-full bg-gray-50 border-y border-gray-100 py-10 px-4 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
          Trusted by 12,347 students worldwide
        </p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
          Go from zero to <span className="text-gray-500">SketchUp confident</span> in days
        </p>
        <p className="text-[12px] text-gray-400 font-medium max-w-sm mx-auto mt-2">
          Free access · Instant access · No hidden fees
        </p>
      </div>


      {/* ─── HOW TO EARN ─── */}
      <motion.section
        className="py-10 sm:py-16 px-5 sm:px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: "-50px" }}
        variants={sectionVariants}
      >
        <div className="container mx-auto max-w-2xl">
          <motion.div className="text-center mb-6" variants={sectionVariants}>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
              How to <span className="text-gray-900">Get Started</span>
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
                <div className="h-9 w-9 rounded-full bg-gray-900 text-white flex items-center justify-center mx-auto mb-3 text-[12px] font-bold">
                  {item.step}
                </div>
                <p className="font-extrabold text-sm text-gray-900 mb-1">{item.title}</p>
                <p className="text-[11px] text-gray-500 leading-snug">{item.desc}</p>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Everything Included
            </h2>
            <p className="text-lg sm:text-xl font-bold text-gray-900 mt-2">Free — Instant Access</p>
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
                <item.icon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <p className="text-[13.5px] font-medium text-gray-800">{item.text}</p>
              </motion.div>
            ))}
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
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900">
            Start Free Today
          </h2>
          <InlineOfferTimer />
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={() => handleEnrollClick()}
            className="mt-5 px-10 py-3.5 rounded-lg font-semibold text-sm text-white shadow-md bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            Start Free Today
          </motion.button>
        </div>
      </motion.section>

      {/* ─── ENROLLMENT SLIDE-UP PANEL ─── */}
      <AnimatePresence>
        {enrollOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setEnrollOpen(false)}
            />
            {/* Slide-up panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="px-5 pt-3 pb-1 flex justify-center">
                <div className="w-10 h-1 rounded-full bg-gray-300" />
              </div>
              <div className="px-5 sm:px-8 pb-8 pt-2">
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-gray-900">Start Free Today</h3>
                  <p className="text-sm text-gray-500 mt-1">Our team will contact and help you with installation, along with free 3D Models and textures.</p>
                </div>
                <EnrollmentForm />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── TIMER ─── */}
      {!enrollOpen && <EvergreenTimer onCtaClick={() => handleEnrollClick()} />}

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
            <div className="text-[10px] text-gray-400 flex flex-col gap-1">
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
