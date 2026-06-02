import dayjs from "dayjs";
import { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { Confetti } from "@/components/confetti";
import { Footer } from "@/components/footer";
import { ScrollTop } from "@/components/scroll-top";
import { SITE_INFO } from "@/config/site";
import { VIETNAM_HOLIDAYS } from "@/config/site";
import { USER } from "@/data/user";
import { About } from "@/features/profile/components/about";
import { CareerGoals } from "@/features/profile/components/career-goals";
import { CourseBio } from "@/features/profile/components/course-bio";
import { CoursesGrid } from "@/features/profile/components/courses-grid";
import { Header } from "@/features/profile/components/header";
import { InvestmentROI } from "@/features/profile/components/investment-roi";
import { QuickActions } from "@/features/profile/components/quick-actions";
import { Reviews } from "@/features/profile/components/reviews";
import { StickyHeader } from "@/features/profile/components/sticky-header";
import { StudentsGallery } from "@/features/profile/components/students-gallery";
import { cn } from "@/lib/cn";

export const revalidate = 0;

export default async function Page() {
  const websiteJsonLd = getPageJsonLd();

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(websiteJsonLd)}
      </script>

      <StickyHeader />

      <div className="max-w-screen overflow-x-hidden">
        <div className="mx-auto px-4 md:max-w-3xl">
          <Header />
          <Pattern />

          <main>


            <CourseBio />
            <Pattern />

            <CareerGoals />
            <Pattern />

            <CoursesGrid />
            <Pattern />

            <StudentsGallery />
            <Pattern />

            <InvestmentROI />
            <Pattern />

            <Reviews />
            <Pattern />

            <About />
            <Pattern />
          </main>

          <Footer />
        </div>
      </div>

      <QuickActions />

      <Confetti datesWithoutYear={[USER.dateOfBirth, ...VIETNAM_HOLIDAYS]} />

      <ScrollTop className="bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] lg:bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))]" />
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: dayjs(USER.dateCreated).toISOString(),
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: SITE_INFO.url + USER.avatar,
    },
  };
}

function Pattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-4 sm:h-5 w-full border-x border-grid",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-4 sm:before:h-5 before:w-[200vw]",
        "before:bg-[image:repeating-linear-gradient(315deg,_var(--pattern-foreground)_0,_var(--pattern-foreground)_1px,_transparent_0,_transparent_50%)] before:bg-[size:10px_10px] before:[--pattern-foreground:var(--color-grid)]/56",
        className
      )}
    />
  );
}
