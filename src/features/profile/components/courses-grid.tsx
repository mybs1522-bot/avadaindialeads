"use client";

import React from "react";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { ApplyNowForm } from "./apply-now-form";

const courses = [
  { 
    name: "Autocad", 
    image: "https://avada-new-app-ljyl.vercel.app/assets/course-autocad-DKe3TvH_.jpg",
    details: "Master 2D drafting and documentation with AutoCAD. Learn to create precise floor plans, elevations, and detailed architectural drawings. Perfect for foundational design workflows."
  },
  { 
    name: "Sketchup", 
    image: "https://avada-new-app-ljyl.vercel.app/assets/course-sketchup-BR6SRMbq.jpg",
    details: "Dive into 3D modeling with SketchUp's intuitive tools. Build architectural models quickly and efficiently, exploring spatial relationships and volumetric design concepts."
  },
  { 
    name: "D5 Render", 
    image: "https://avada-new-app-ljyl.vercel.app/assets/course-d5render-D18dH-n3.jpg",
    details: "Experience real-time ray tracing with D5 Render. Create stunning photorealistic animations and still images with its powerful physics-based lighting and materials system."
  },
  { 
    name: "Enscape", 
    image: "https://lh3.googleusercontent.com/d/1SmezP6LwT3yo9aE3oivpGkqS-xycSOyx",
    details: "Seamlessly integrate real-time rendering into your modeling software. Walk through your designs instantly and communicate spatial ideas effortlessly using Enscape."
  },
  { 
    name: "Lumion", 
    image: "https://lh3.googleusercontent.com/d/1XW2DDHVa1Qc15NcZ3wUKMFRT7LkyZMCt",
    details: "Breathe life into your designs with Lumion. Learn to add atmospheric effects, realistic vegetation, and dynamic lighting to create compelling visual narratives."
  },
  { 
    name: "Revit", 
    image: "https://lh3.googleusercontent.com/d/1N_BbG9kAEwIk541Id53_RV0CWjO1jzAt",
    details: "Unlock the power of Building Information Modeling (BIM). Coordinate complex projects, generate automated schedules, and manage the entire building lifecycle efficiently."
  },
  { 
    name: "3ds max", 
    image: "https://lh3.googleusercontent.com/d/1DgmIvkeC2dxGpRpzbIthHQsSdlCty2Xg",
    details: "Achieve industry-leading visualization with 3ds Max. Master advanced modeling techniques, intricate material creation, and high-fidelity rendering workflows."
  },
  { 
    name: "Vray", 
    image: "/vray-thumb.png",
    details: "Harness the industry standard rendering engine. Dive deep into global illumination, complex material setups, and render element compositing for ultimate realism."
  },
  {
    name: "AI Rendering",
    image: "/ai-rendering-thumb.png",
    details: "Future-proof your skills with AI-powered rendering workflows. Learn to use cutting-edge generative tools to rapidly ideate and enhance architectural visualizations."
  }
];

export function CoursesGrid() {
  return (
    <div className="flex w-full flex-col gap-4 scroll-mt-20 my-4">
      <div className="flex flex-col items-center text-center space-y-1 px-4">
        <p className="text-base sm:text-lg font-bold text-foreground">
          Learn PDR — Planning, Designing & Rendering
        </p>
        <p className="text-[11px] sm:text-sm text-muted-foreground">
          One bundle. Everything included.
        </p>
      </div>
      <Panel>
        <PanelHeader className="justify-center text-center">
          <PanelTitle>9 Courses, Free classes for students.</PanelTitle>
        </PanelHeader>
        <PanelContent>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {courses.map((course) => (
              <Dialog key={course.name}>
                <DialogTrigger asChild>
                  <div className="relative aspect-square rounded-xl overflow-hidden group border border-border bg-card cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={course.image} 
                      alt={course.name} 
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-2 sm:p-3 transition-colors group-hover:bg-black/60">
                      <div className="flex justify-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full text-white hover:bg-emerald-500 transition-colors">
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>
                      <span className="text-white text-xs sm:text-sm font-bold text-center leading-tight drop-shadow-lg">
                        {course.name}
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-md w-[90vw] rounded-xl border-border bg-card p-6 shadow-2xl">
                  <DialogHeader className="space-y-4">
                    <DialogTitle className="text-xl font-bold flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
                      </div>
                      {course.name}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-foreground/80 leading-relaxed text-left">
                      {course.details}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </PanelContent>
      </Panel>

      {/* Inline Apply Now Form */}
      <div className="mx-4 mt-2 mb-6">
        <ApplyNowForm />
      </div>
    </div>
  );
}
