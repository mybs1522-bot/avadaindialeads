import { cn } from "@/lib/cn";

export function ChanhDaiCoverHello() {
  return (
      <div
        className={cn(
          "relative border-x border-grid select-none overflow-hidden",
          "screen-line-before screen-line-after before:-top-px after:-bottom-px"
        )}
      >
        <img
          src="/images/mosaic-cover.png"
          alt="Mosaic Architecture Cover"
          className="w-full h-auto block"
          loading="lazy"
        />
    </div>
  );
}
