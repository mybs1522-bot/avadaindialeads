import { Review } from "../types/reviews";

export const REVIEWS: Review[] = [
  // Row 1 - Static
  {
    id: "r1",
    content: "Bro the consultation literally saved me so much cash! Shagun broke down the actual material costs so we didn't get scammed by the vendors.",
    rating: 5,
    author: {
      name: "Aman",
      title: "",
      avatar: "/images/reviews/guillermo-rauch.webp",
      verified: true,
    },
  },
  {
    id: "r2",
    content: "Loved how chill the talk was. No pushing fancy brands or random gimmicks, just straight up honest advice. Highly recommend her.",
    rating: 5,
    author: {
      name: "Rishi",
      title: "",
      avatar: "/images/reviews/shadcn.webp",
      verified: true,
    },
  },
  {
    id: "r3",
    content: "She gave me crazy good tips on how to hire a proper contractor and what red flags to avoid. I feel way more confident dealing with them now.",
    rating: 5,
    author: {
      name: "Shruti",
      title: "",
      avatar: "/images/reviews/lee-robinson.webp",
      verified: true,
    },
  },

  // Row 2 - Scrolling left
  {
    id: "r4",
    content: "She literally pointed out a massive flaw in our layout that we would have totally missed. Saved us a huge headache man.",
    rating: 5,
    author: {
      name: "Kabir",
      title: "",
      avatar: "/images/reviews/shadcn.webp",
      verified: true,
    },
  },
  {
    id: "r5",
    content: "Shagun taught us how to actually measure stuff and check the work being done on-site. Helped us get exactly what we paid for.",
    rating: 5,
    author: {
      name: "Tanya",
      title: "",
      avatar: "/images/reviews/dimi.webp",
      verified: true,
    },
  },
  {
    id: "r6",
    content: "Super easy to talk to. It honestly felt like just getting advice from a really smart friend who knows literally everything about interiors.",
    rating: 5,
    author: {
      name: "Sahil",
      title: "",
      avatar: "/images/reviews/khushi.webp",
      verified: true,
    },
  },
  {
    id: "r7",
    content: "No sugarcoating at all, just real talk about what works and what's a waste of money. Book her if you want to actually save some bucks.",
    rating: 5,
    author: {
      name: "Meghna",
      title: "",
      avatar: "/images/reviews/delba.webp",
      verified: true,
    },
  },
  {
    id: "r8",
    content: "The best part was learning how to check if the contractor is actually doing a decent job on-site. Worth every single penny guys.",
    rating: 5,
    author: {
      name: "Ravi",
      title: "",
      avatar: "/images/reviews/rauno.webp",
      verified: true,
    },
  },

  // Row 3 - Scrolling right
  {
    id: "r9",
    content: "She completely broke down the raw material costs for us. We were deadass about to overspend by a mile before this call.",
    rating: 5,
    author: {
      name: "Dhruv",
      title: "",
      avatar: "/images/reviews/shadcn.webp",
      verified: true,
    },
  },
  {
    id: "r10",
    content: "Clear, direct, and super helpful. She spotted layout issues in literally two seconds that our previous guy completely missed.",
    rating: 5,
    author: {
      name: "Kritika",
      title: "",
      avatar: "/images/reviews/jordwalke.webp",
      verified: true,
    },
  },
  {
    id: "r11",
    content: "No brand pushing at all! Just pure focus on quality and what actually fits our tight budget. Was super refreshing to hear.",
    rating: 5,
    author: {
      name: "Varun",
      title: "",
      avatar: "/images/reviews/max.webp",
      verified: true,
    },
  },
  {
    id: "r12",
    content: "She literally gave me a cheat sheet of questions to ask when interviewing contractors. Absolute game changer for our new place.",
    rating: 4,
    author: {
      name: "Simran",
      title: "",
      avatar: "/images/reviews/tanner.webp",
      verified: true,
    },
  },
  {
    id: "r13",
    content: "Honestly, the advice on how to cross-check measurements and verify the work on-site was pure gold. Thank you so much!",
    rating: 5,
    author: {
      name: "Karan",
      title: "",
      avatar: "/images/reviews/theo.webp",
      verified: true,
    },
  },
];

// Split reviews into 3 rows
export const REVIEWS_ROW_1 = REVIEWS.slice(0, 3);
export const REVIEWS_ROW_2 = REVIEWS.slice(3, 8);
export const REVIEWS_ROW_3 = REVIEWS.slice(8, 13);

// Hardcoded totals to show exactly 127 reviews
export const TOTAL_REVIEWS = 127;
export const AVERAGE_RATING = 4.9;

export const RATING_DISTRIBUTION = [
  { star: 5, count: 115 },
  { star: 4, count: 10 },
  { star: 3, count: 2 },
  { star: 2, count: 0 },
  { star: 1, count: 0 },
];
