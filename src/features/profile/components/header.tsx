import { ToggleTheme } from "@/components/toggle-theme";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { USER } from "@/data/user";
import { FlipSentences } from "@/registry/flip-sentences";

import { ChanhDaiCoverHello } from "./chanhdai-cover-hello";
import { Nav } from "./nav/nav";
import { NavDropdown } from "./nav/nav-dropdown";
import { VerifiedIcon } from "./verified-icon";

export function Header() {
  return (
    <header className="relative mt-2">
      <div className="screen-line-before flex h-12 items-center justify-end gap-4 border-x border-grid px-2">
        <Nav className="max-sm:hidden" />

        <div className="flex items-center gap-2">
          <ToggleTheme />
          <NavDropdown className="sm:hidden" />
        </div>
      </div>

      <ChanhDaiCoverHello />


    </header>
  );
}
