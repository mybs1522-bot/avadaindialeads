import { Review } from "../types/reviews";

export const REVIEWS: Review[] = [
  // Row 1 - Static
  {
    id: "r1",
    content: "Bro the Autocad course literally saved me so much time! The instructor broke down the actual shortcuts so I didn't get stuck on basics.",
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
    content: "Loved how chill the Sketchup classes were. No pushing unnecessary plugins, just straight up honest teaching. Highly recommend.",
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
    content: "She gave me crazy good tips on how to render properly in D5 Render. I feel way more confident dealing with complex scenes now.",
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
    content: "She literally pointed out a massive flaw in my 3ds Max workflow that I would have totally missed. Saved me a huge headache man.",
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
    content: "The Revit course taught us how to actually set up families correctly. Helped us get exactly what we needed for the project.",
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
    content: "Super easy to follow. It honestly felt like just getting advice from a really smart friend who knows literally everything about Lumion.",
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
    content: "No sugarcoating at all, just real talk about what works in Enscape and what's a waste of time. Book this if you want to learn fast.",
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
    content: "The best part was learning how to optimize my scenes in Vray. Worth every single penny guys.",
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
    content: "She completely broke down the lighting techniques for us. We were deadass about to give up on realism before this course.",
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
    content: "Clear, direct, and super helpful. She spotted modeling issues in literally two seconds that my previous teacher completely missed.",
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
    content: "No fluff at all! Just pure focus on quality and what actually fits our workflow. Was super refreshing to learn.",
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
    content: "She literally gave me a cheat sheet of shortcuts to use. Absolute game changer for my drafting speed.",
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
    content: "Honestly, the advice on how to cross-check measurements and verify the model was pure gold. Thank you so much!",
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
