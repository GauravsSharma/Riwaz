import { create } from "zustand";


type ReviewStoreState = {
  reviews: ProductReview[] | null;
  totalReviews: number | null;
  averageRating: number | null;
  ratingBreakdown: RatingBreakdown | null;

  // setters
  setReviews: (reviews: ProductReview[] | null) => void;
  setSingleReview: (review: ProductReview | null) => void;
  removeSingleReview: (id: string | null) => void;
  setTotalReviews: (count: number | null) => void;
  setAverageRating: (rating: number | null) => void;
  setRatingBreakdown: (breakdown: RatingBreakdown | null) => void;

  // update all values at once
  setReviewData: (data: {
    reviews: ProductReview[] | null;
    totalReviews: number | null;
    averageRating: number | null;
    ratingBreakdown: RatingBreakdown | null;
  }) => void;
};

export const useReviewStore = create<ReviewStoreState>((set, get) => ({
  reviews: null,
  totalReviews: null,
  averageRating: null,
  ratingBreakdown: null,

  // --- Setters ---
  setReviews: (reviews) => set({ reviews }),
  removeSingleReview:(id)=>{
      const current = get().reviews ?? [];
      const all_review = current.filter(r=>r._id!==id);
      set({reviews:all_review})
  },
  setSingleReview: (review) => {
    if (!review) return;

    const current = get().reviews ?? [];
    set({ reviews: [review, ...current] });
  },

  setTotalReviews: (totalReviews) => set({ totalReviews }),
  setAverageRating: (averageRating) => set({ averageRating }),
  setRatingBreakdown: (ratingBreakdown) => set({ ratingBreakdown }),

  // update everything in one call
  setReviewData: (data) =>
    set({
      reviews: data.reviews,
      totalReviews: data.totalReviews,
      averageRating: data.averageRating,
      ratingBreakdown: data.ratingBreakdown,
    }),
}));
