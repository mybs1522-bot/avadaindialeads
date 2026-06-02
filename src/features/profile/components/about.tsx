import { Markdown } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";
import { USER } from "@/data/user";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function About() {
  return (
    <Panel id="about" className="scroll-mt-22">
      <PanelHeader className="flex items-center justify-center text-center">
        <PanelTitle>About Us</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose className="text-center">
          <Markdown>{USER.about}</Markdown>
        </Prose>
      </PanelContent>
    </Panel>
  );
}
