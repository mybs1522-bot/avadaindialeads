import React from "react";

import { cn } from "@/lib/cn";

import {
  AVERAGE_RATING,
  RATING_DISTRIBUTION,
  TOTAL_REVIEWS,
} from "../../data/reviews";

/* ─── Star Icons ─── */

function StarFilled({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn("size-4", className)}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarEmpty({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      className={cn("size-4", className)}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRow({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) =>
        i < count ? (
          <StarFilled
            key={i}
            className="text-amber-400 dark:text-amber-300"
          />
        ) : (
          <StarEmpty
            key={i}
            className="text-muted-foreground/40"
          />
        )
      )}
    </div>
  );
}

/* ─── Laurel Wreath SVG ─── */

function _LaurelWreath({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-full", className)}
    >
      {/* Left branch */}
      <g className="text-muted-foreground/50" fill="currentColor">
        {/* Left leaves */}
        <ellipse cx="25" cy="85" rx="6" ry="12" transform="rotate(25 25 85)" />
        <ellipse cx="20" cy="70" rx="5" ry="11" transform="rotate(15 20 70)" />
        <ellipse cx="18" cy="55" rx="5" ry="10" transform="rotate(5 18 55)" />
        <ellipse cx="20" cy="40" rx="5" ry="10" transform="rotate(-10 20 40)" />
        <ellipse cx="25" cy="27" rx="5" ry="9" transform="rotate(-25 25 27)" />
        <ellipse cx="33" cy="17" rx="4" ry="8" transform="rotate(-40 33 17)" />
        {/* Left stem */}
        <path
          d="M42 105 C30 85, 18 60, 40 10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
      </g>
      {/* Right branch */}
      <g className="text-muted-foreground/50" fill="currentColor">
        {/* Right leaves */}
        <ellipse cx="95" cy="85" rx="6" ry="12" transform="rotate(-25 95 85)" />
        <ellipse cx="100" cy="70" rx="5" ry="11" transform="rotate(-15 100 70)" />
        <ellipse cx="102" cy="55" rx="5" ry="10" transform="rotate(-5 102 55)" />
        <ellipse cx="100" cy="40" rx="5" ry="10" transform="rotate(10 100 40)" />
        <ellipse cx="95" cy="27" rx="5" ry="9" transform="rotate(25 95 27)" />
        <ellipse cx="87" cy="17" rx="4" ry="8" transform="rotate(40 87 17)" />
        {/* Right stem */}
        <path
          d="M78 105 C90 85, 102 60, 80 10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}

/* ─── Rating Bar ─── */

function RatingBar({ star, count, max }: { star: number; count: number; max: number }) {
  const percentage = max > 0 ? (count / max) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <StarRow count={star} />

      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="w-6 text-right text-sm tabular-nums text-muted-foreground">
        {count}
      </span>
    </div>
  );
}

/* ─── Main Component ─── */

export function RatingSummary() {
  const maxCount = Math.max(...RATING_DISTRIBUTION.map((d) => d.count), 1);

  return (
    <div className="screen-line-after p-4">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        {/* Left: Star breakdown */}
        <div className="flex-1 space-y-2">
          {RATING_DISTRIBUTION.map(({ star, count }) => (
            <RatingBar key={star} star={star} count={count} max={maxCount} />
          ))}
        </div>

        {/* Right: Badge + CTA */}
        <div className="flex items-center justify-center sm:w-56">
          <div className="flex flex-col items-center gap-2">
            {/* Rating badge */}
            <div className="relative flex items-center justify-center py-4">
              <div className="flex flex-col items-center justify-center">
                <span className="text-4xl font-bold tabular-nums text-foreground">
                  {AVERAGE_RATING.toFixed(1)}
                </span>
                <StarRow count={Math.round(AVERAGE_RATING)} />
                <span className="mt-1 text-sm text-muted-foreground">
                  {TOTAL_REVIEWS} reviews
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
