import React from "react";

import { supabase } from "@/lib/supabase";

import {
  REVIEWS_ROW_1,
  REVIEWS_ROW_2,
  REVIEWS_ROW_3,
} from "../../data/reviews";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { MarqueeRow, StaticRow } from "./marquee-row";
import { RatingSummary } from "./rating-summary";
import { WriteReviewButton } from "./write-review-button";

export async function Reviews() {
  // Fetch approved dynamic reviews
  const { data: dynamicReviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  // Map dynamic reviews to match the existing Review interface
  const formattedDynamicReviews = (dynamicReviews || []).map((review) => ({
    id: review.id,
    author: {
      name: review.name,
      username: review.name.replace(/\s+/g, "").toLowerCase(),
      title: review.role || "Client",
      avatar: review.avatar_url || "https://api.dicebear.com/9.x/avataaars/svg?seed=" + review.name,
    },
    content: review.content,
    rating: review.rating,
  }));

  // Combine static and dynamic reviews for the first row (or distribute them)
  const combinedRow1 = [...formattedDynamicReviews, ...REVIEWS_ROW_1];

  return (
    <Panel id="reviews" className="scroll-mt-22">
      <PanelHeader className="flex flex-row items-center justify-between">
        <PanelTitle>Reviews</PanelTitle>
        <WriteReviewButton />
      </PanelHeader>

      {/* Star rating summary */}
      <RatingSummary />

      <div className="space-y-4 py-4">
        {/* Row 1: Dynamic + Static */}
        <StaticRow reviews={combinedRow1} />

        {/* Row 2: Scrolling left */}
        <MarqueeRow reviews={REVIEWS_ROW_2} direction="left" duration={35} />

        {/* Row 3: Scrolling right */}
        <MarqueeRow reviews={REVIEWS_ROW_3} direction="right" duration={35} />
      </div>
    </Panel>
  );
}
