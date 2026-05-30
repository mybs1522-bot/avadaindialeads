"use client";

import { ChevronRight, Cuboid,Phone, Video } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/cn";

import { Service } from "../../types/services";
import { ServiceDialog } from "./service-dialog";

function getInitials(title: string) {
  return title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getServiceIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("3d design") || t.includes("3d")) return <Cuboid className="size-6 text-white" />;
  if (t.includes("video") || t.includes("google meet") || t.includes("zoom")) return <Video className="size-6 text-white" />;
  if (t.includes("call") || t.includes("consultation")) return <Phone className="size-6 text-white" />;
  return <span className="text-sm font-semibold text-white">{getInitials(title)}</span>;
}

function getLogoColor(title: string) {
  const colors = [
    "bg-blue-600",
    "bg-violet-600",
    "bg-emerald-600",
    "bg-amber-600",
    "bg-rose-600",
    "bg-cyan-600",
    "bg-indigo-600",
    "bg-teal-600",
  ];
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function formatAmount(amount: number, currency: string) {
  if (amount === 0) return "Free";
  return `${currency}${amount.toLocaleString("en-IN")}`;
}

export function ServiceItem({ service }: { service: Service }) {
  const [imgError, setImgError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const content = (
    <button
      onClick={() => setDialogOpen(true)}
      className={cn(
        "w-full text-left group flex items-center gap-4 rounded-xl border border-border/50 p-4",
        "transition-all duration-200 hover:border-border hover:bg-accent/50 cursor-pointer"
      )}
    >
      {/* Image / Logo */}
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl",
          !service.image_url || imgError
            ? getLogoColor(service.title)
            : "bg-muted"
        )}
      >
        {service.image_url && !imgError ? (
          <img
            src={service.image_url}
            alt={service.title}
            className="size-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          getServiceIcon(service.title)
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm font-medium text-foreground">
          {service.title}
        </p>
        {service.description && (
          <p className="mt-1 line-clamp-3 text-xs text-muted-foreground whitespace-normal">
            {service.description}
          </p>
        )}

      </div>

      {/* Chevron */}
      <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </button>
  );

  return (
    <>
      {content}
      <ServiceDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        service={service}
      />
    </>
  );
}
