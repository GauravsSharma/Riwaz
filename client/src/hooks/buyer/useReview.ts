import api from "@/lib/axios";
import { useReviewStore } from "@/stores/buyer/review.store";
import { useQuery, useMutation } from "@tanstack/react-query";

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
export const useDeleteReview = () => {
  return useMutation({
    mutationFn: async (id:string) => {
      const res = await api.delete(`/review/${id}`);
      return res.data.id;
    },
   
  });
};
