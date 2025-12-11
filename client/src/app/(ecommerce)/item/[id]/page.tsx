"use client";
import { useGetMainProduct } from '@/hooks/buyer/useProducts';
import { Minus, Plus, Share2, ChevronDown, Truck, RotateCcw, Banknote } from 'lucide-react';
import { useParams } from "next/navigation";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import RatingAndReview from "../../../../components/ratingAndreview/RatingAndReview"
import { useProductStore } from '@/stores/buyer/products.store';
import { useGetReviews } from '@/hooks/buyer/useReview';
import AddReviewDialog from '@/components/models/AddReviewModel';
import { useReviewStore } from '@/stores/buyer/review.store';
import ProductDetailed from '@/components/sections/ProductDetailed';
import { log } from 'console';



const ProductPage = () => {
  const [isReviewDialogBoxOpen, setIsDialogBoxOpen] = useState(false);

  const router = useRouter()


  const params = useParams();
  const productId = params.id as string;
  console.log(productId);

  const { data: product, isPending } = useGetMainProduct(productId);
  console.log(product);

  const { isPending: isReviewsLoading } = useGetReviews(productId)
  const reviews = useReviewStore(s => s.reviews)
  const totalReviews = useReviewStore(s => s.totalReviews)
  const averageRating = useReviewStore(s => s.averageRating)
  const ratingBreakdown = useReviewStore(s => s.ratingBreakdown)

  // console.log(data);

  const variants = useProductStore(s => s.variants);
  const rating = averageRating;
  const reviewsLen = reviews?.length || 0;
  const recentPurchases = 15;




  console.log(product, rating, reviewsLen, variants);

  // Loading state
  if (isPending) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  const productImages = product.images || [];

  return (
    <div className='mt-34'>
      {/* Breadcrumb */}
      <div className="px-4 md:px-6 lg:px-8 py-3 text-sm text-gray-500">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <span className="mx-2">›</span>
        <span className="hover:text-gray-700 cursor-pointer">Sarees</span>
        <span className="mx-2">›</span>
        <span className="text-gray-400">{product.title}</span>
      </div>

      {/* Main Content */}

      {product &&
        rating !== undefined &&
        reviewsLen !== undefined &&
        variants && (
          <ProductDetailed
            product={product}
            productImages={productImages}
            reviewsLen={reviewsLen}
            rating={rating}
            variants={variants}
          />
        )}


      {
        !isReviewsLoading && ratingBreakdown && reviews && reviews?.length > 0 && <RatingAndReview
          overallRating={Number(averageRating)}
          reviews={reviews}
          ratingBreakdown={ratingBreakdown}
          setIsOpen={setIsDialogBoxOpen}
        />
      }
      {
        isReviewDialogBoxOpen && <AddReviewDialog isOpen={isReviewDialogBoxOpen} onClose={() => setIsDialogBoxOpen(false)} />
      }
      {totalReviews === 0 &&
        <div className="mb-6 flex justify-center items-center py-20">
          <button
            onClick={() => setIsDialogBoxOpen(true)}
            className="w-1/5 mx-auto bg-purple-500 cursor-pointer hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-md text-md  transition-colors duration-200"
          >
            WRITE A PRODUCT REVIEW
          </button>
        </div>
      }
    </div>
  );
};

export default ProductPage;