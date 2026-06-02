import { CheckCircle2 } from "lucide-react";

export function CourseBio() {
  return (
    <div className="flex flex-col items-center text-center py-6 px-4 gap-3">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/20 text-xs sm:text-sm font-medium text-foreground">
        <CheckCircle2 className="size-3.5 text-muted-foreground" />
        <span>Learn Interior & Exterior Design + AI</span>
      </div>

      {/* Subtext 1 */}
      <p className="text-sm sm:text-base font-medium text-muted-foreground max-w-xl">
        Start charging <span className="text-foreground border-b border-border pb-px">₹50,000–₹1,00,000</span> for designing and rendering.
      </p>

      {/* Main Headline */}
      <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight mt-1">
        Learn to Design <br className="hidden sm:block" />
        <span className="border border-border bg-transparent px-2 py-0.5 rounded-lg shadow-sm">Homes</span>, Offices <span className="font-light text-muted-foreground">&</span> Villas
      </h2>

      {/* Italic text */}
      <p className="text-lg sm:text-xl italic text-muted-foreground font-serif mt-1">
        and show real 3D to clients.
      </p>

      {/* Video Embed */}
      <div className="w-full max-w-2xl mt-6 relative aspect-video rounded-xl overflow-hidden shadow-lg border border-border">
        <iframe 
          src="https://iframe.mediadelivery.net/embed/494628/1f7b76dd-7d47-4f39-87af-bff5a6b02d08?autoplay=true&loop=true&muted=true&preload=true&responsive=true" 
          loading="lazy" 
          className="absolute top-0 left-0 border-0 h-full w-full"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;fullscreen;" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
