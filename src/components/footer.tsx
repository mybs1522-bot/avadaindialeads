
export function Footer() {
  return (
    <footer className="screen-line-before border-x border-grid py-8 pb-[calc(2rem+env(safe-area-inset-bottom,0px))]">
      <div className="flex justify-center">
        <a
          href="mailto:hello@archbysha.com"
          className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          hello@archbysha.com
        </a>
      </div>
    </footer>
  );
}
