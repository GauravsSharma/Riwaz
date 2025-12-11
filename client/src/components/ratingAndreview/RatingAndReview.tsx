import React, { useState } from 'react';
import { Star, CheckCircle, Delete, DeleteIcon, Trash2 } from 'lucide-react';
import AddReviewDialog from '../models/AddReviewModel';
import { useUserStore } from '@/stores/user.store';
import { Trash } from 'lucide';
import DeleteReviewDialog from '../models/DeleteReviewModel';
import { formatReviewDate } from '@/utils/dateFomater';

interface ProductReviewProps {
    overallRating: number;
    ratingBreakdown:RatingBreakdown;
    reviews: ProductReview[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

}

const ProductReview: React.FC<ProductReviewProps> = ({
    overallRating,
    ratingBreakdown,
    reviews,
    setIsOpen
}) => {
   const user = useUserStore(s=>s.user)
   const [reviewId,setReviewId] = useState<string|undefined>()
   const [isReviewDialogBoxOpen,setIsReviewDialogBoxOpen]  = useState(false)
    const ratingBreakdownArray = Object.entries(ratingBreakdown).map(([stars, count]) => ({
        stars: Number(stars),
        count
    }));
    
    const maxCount = Math.max(...ratingBreakdownArray.map(r => r.count));
    const renderStars = (rating: number, size = 'w-4 h-4') => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${size} ${star <= rating
                            ? 'fill-green-500 text-green-500'
                            : 'fill-gray-200 text-gray-200'
                            }`}
                    />
                ))}
            </div>
        );
    };

    const getProgressBarWidth = (count: number) => {
        if (maxCount === 0) return '0%';
        return `${(count / maxCount) * 100}%`;
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-16">
            {/* Mobile: Button at top */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={()=>setIsOpen(true)}
                    className="w-full bg-purple-500 cursor-pointer hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-md text-sm transition-colors duration-200"
                >
                    WRITE A PRODUCT REVIEW
                </button>
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 flex-1">
                    {/* Power Customer Rating */}
                    <div className="flex-1 xl:max-w-sm">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                            Power Customer Rating
                        </h3>
                        <div className="border-l-3 flex my-10 gap-4 justify-start items-center border-purple-500 pl-2 sm:pl-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                                    {overallRating.toFixed(2)}
                                </span>
                                <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-green-500 text-green-500" />
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>{reviews.length} Verified Buyers</span>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            </div>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="border-l-3 border-purple-500 pl-2 sm:pl-4">
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((stars) => {
                                    const breakdown = ratingBreakdownArray.find(r => r.stars === stars);
                                    const count = breakdown?.count || 0;

                                    return (
                                        <div key={stars} className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 w-6 sm:w-8">
                                                <span className="text-sm text-gray-700">{stars}</span>
                                                <Star className="w-3 h-3 fill-gray-400 text-gray-400" />
                                            </div>
                                            <div className="flex-1 bg-gray-200 rounded-full h-2 relative min-w-0">
                                                <div
                                                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: getProgressBarWidth(count) }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-700 w-4 text-right flex-shrink-0">
                                                {count}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* What Power Customer Say */}
                    <div className="flex-1">
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                                What Power Customer Say
                            </h3>
                            {/* Desktop: Write Review Button */}
                            <div className="hidden lg:block lg:ml-6">

                                <button
                                    onClick={()=>setIsOpen(true)}
                                    className="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white font-medium px-6 py-4 rounded-sm text-sm transition-colors duration-200 whitespace-nowrap"
                                >
                                    WRITE A PRODUCT REVIEW
                                </button>
                            </div>
                        </div>

                        <div className="pl-2 sm:pl-4">
                            <p className="text-sm text-gray-700 mb-4">Images uploaded by customers:</p>

                            <div className="space-y-4 w-full overflow-y-auto max-h-96">
                                {reviews && reviews.map((review) => (
                                    <div key={review._id} className="border  w-full border-gray-200 rounded-lg p-3 sm:p-4 relative">
                                     {  review?.userId?._id === user?._id &&<div className='p-2 bg-red-200 rounded-full cursor-pointer flex justify-center items-center absolute top-1 right-1'
                                     onClick={()=>{setReviewId(review._id);setIsReviewDialogBoxOpen(true)}}
                                     >
                                          <Trash2 size={15} className=' text-red-600  '/>
                                       </div>}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {renderStars(review.rating, 'w-3 h-3 sm:w-4 sm:h-4')}
                                                <span className="text-sm font-medium text-gray-900">
                                                    {review.userId.fullName}
                                                </span>
                                    
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                            
                                            </div>
                                            <span className="text-xs pr-10 sm:text-sm text-gray-500 flex-shrink-0">
                                                {formatReviewDate(review.createdAt)}
                                            </span>
                                        </div>

                                        <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">
                                            {review.review}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {isReviewDialogBoxOpen && reviewId && <DeleteReviewDialog isOpen={isReviewDialogBoxOpen} setIsOpen={setIsReviewDialogBoxOpen} reviewId={reviewId}/>}
        </div>
    );
};
export default ProductReview
