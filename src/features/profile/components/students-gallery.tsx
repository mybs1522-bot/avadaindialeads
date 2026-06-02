import React from "react";
import { cn } from "@/lib/cn";
import { Panel, PanelHeader, PanelTitle } from "./panel";

// Curated high-quality interior & exterior design render images
const GALLERY_IMAGES = [
  { id: "img-1", src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80&fit=crop" },
  { id: "img-2", src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80&fit=crop" },
  { id: "img-3", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&fit=crop" },
  { id: "img-4", src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80&fit=crop" },
  { id: "img-5", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&fit=crop" },
  { id: "img-6", src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80&fit=crop" },
  { id: "img-7", src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80&fit=crop" },
  { id: "img-8", src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80&fit=crop" },
  { id: "img-9", src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&fit=crop" },
  { id: "img-10", src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80&fit=crop" },
  { id: "img-11", src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80&fit=crop" },
  { id: "img-12", src: "https://images.unsplash.com/photo-1616137466211-f736a1ee1239?w=600&q=80&fit=crop" },
  { id: "img-13", src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&fit=crop" },
  { id: "img-14", src: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80&fit=crop" },
  { id: "img-15", src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80&fit=crop" },
  { id: "img-16", src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80&fit=crop" },
  { id: "img-17", src: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&q=80&fit=crop" },
  { id: "img-18", src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80&fit=crop" },
  { id: "img-19", src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80&fit=crop" },
  { id: "img-20", src: "https://images.unsplash.com/photo-1602872030219-ad2b9a54315c?w=600&q=80&fit=crop" },
];

function ImageMarqueeRow({
  images,
  direction = "left",
  duration = 40,
  className,
}: {
  images: { id: string; src: string }[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={cn(
            "flex shrink-0 gap-4",
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right",
            "group-hover:[animation-play-state:paused] pr-4"
          )}
          aria-hidden={copy === 1}
        >
          {images.map((image) => (
            <div key={`${copy}-${image.id}`} className="relative h-28 w-40 sm:h-48 sm:w-64 overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt="Student Work"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function StudentsGallery() {
  const topRow = GALLERY_IMAGES.slice(0, 10);
  const bottomRow = GALLERY_IMAGES.slice(10, 20);

  return (
    <Panel id="students-gallery" className="scroll-mt-22">
      <PanelHeader>
        <PanelTitle>Students Gallery</PanelTitle>
      </PanelHeader>

      <div className="space-y-4 py-4">
        <ImageMarqueeRow images={topRow} direction="left" duration={45} />
        <ImageMarqueeRow images={bottomRow} direction="right" duration={45} />
      </div>
    </Panel>
  );
}
