import api from "@/lib/axios";
import { useProductStore } from "@/stores/buyer/products.store";
import { useReviewStore } from "@/stores/buyer/review.store";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
interface ReviewDataPayload {
  productId: string,
  rating: number,
  review: string
}
interface reviewResponse {
  reviews: ProductReview[],
  averageRating: string,
  totalReviews: number,
  ratingBreakdown: RatingBreakdown
}
export const useGetReviews = (productId: string) => {
  const setReviewData = useReviewStore(s => s.setReviewData)
  return useQuery<reviewResponse>({
    queryKey: ["review-store"],
    queryFn: async () => {
      const res = await api.get(`/review/${productId}`)
      setReviewData(res.data)
      return res.data;
    },
  });
};
export const useAddReview = () => {
  const setSingleReview = useReviewStore(s => s.setSingleReview)
  return useMutation({
    mutationFn: async (data: ReviewDataPayload) => {
      const res = await api.post("/review", data);
      console.log(res.data);

      setSingleReview(res.data.review)
      return res.data;
    },
  });
};
export const useDeleteReview = (id: string) => {
  const removeSingleReview = useReviewStore(s => s.removeSingleReview)
  return useMutation({
    mutationFn: async () => {
      const res = await api.delete(`/review/${id}`);
      return res.data.id;
    },
    onSuccess: (data) => { 
      removeSingleReview(data)
      toast.success("Review deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete review. Please try again.");
    }
  });
};
