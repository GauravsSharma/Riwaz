"use client";
import { useAddReview } from '@/hooks/buyer/useReview';
import { useProductStore } from '@/stores/buyer/products.store';
import { X, Image, Video, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import FormSubmissionLoader from '../loaders/FormSubmissionLoader';

interface AddReviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddReviewDialog = ({ isOpen, onClose }: AddReviewDialogProps) => {
    const [step, setStep] = useState(1);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [photos, setPhotos] = useState<File[]>([]);
    const { mutate, isPending } = useAddReview()
    const mainProduct = useProductStore(s => s.mainProduct)
    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhotos(Array.from(e.target.files));
            console.log('Photos uploaded:', Array.from(e.target.files));
        }
    };

    const handleNext = () => {
        if (step === 1 && rating > 0) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (!mainProduct) {
            return
        }
        const reviewData = {
            productId: mainProduct._id,
            rating,
            review: reviewText,
            //   photos: photos.map(p => ({ name: p.name, size: p.size, type: p.type })),
        };

        mutate(reviewData, {
            onSuccess: () => {
                toast.success("Review posted.")
                handleClose();
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })


    };

    const handleClose = () => {
        onClose();
        // Reset state after animation
        setTimeout(() => {
            setStep(1);
            setRating(0);
            setHoverRating(0);
            setReviewText('');
            setPhotos([]);
        }, 300);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/35 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-lg w-full max-w-lg relative shadow-2xl animate-slideUp">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition z-10"
                    aria-label="Close dialog"
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="p-8">
                    {/* Step 1: Rating */}
                    {step === 1 && (
                        <div className="text-center space-y-8">
                            <h2 className="text-2xl font-bold text-gray-900">
                                How would you rate this item?
                            </h2>
                            <div className="flex justify-center items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none transform hover:scale-110 transition"
                                        aria-label={`Rate ${star} stars`}
                                    >
                                        <svg
                                            className={`w-12 h-12 ${star <= (hoverRating || rating)
                                                    ? 'text-green-600 fill-green-600'
                                                    : 'text-gray-300 fill-none'
                                                } stroke-current stroke-2 transition-colors cursor-pointer`}
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 max-w-md mx-auto">
                                <span>Dislike it</span>
                                <span>Love it!</span>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Photos/Video */}
                    {step === 2 && (
                        <div className="text-center space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Show it off</h2>
                                <p className="text-gray-600">We'd love to see it in action!</p>
                            </div>
                            <div className="space-y-3 max-w-md mx-auto">
                                <label className="block">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                    />
                                    <div className="bg-black text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-gray-800 transition flex items-center justify-center gap-2 font-semibold">
                                        <Image size={20} />
                                        Add photos
                                    </div>
                                </label>
                            </div>
                            {(photos.length > 0) && (
                                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    {photos.length > 0 && <p>✓ {photos.length} photo(s) added</p>}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Review Text */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 text-center">Tell us more!</h2>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Share your experience with this product..."
                                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
                                autoFocus
                            />
                            <p className="text-xs text-gray-500 text-center">
                                {reviewText.length} characters
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-6 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`flex cursor-pointer items-center gap-2 font-semibold transition ${step === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:text-gray-900'
                            }`}
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>

                    {/* Progress Indicators */}
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map((dot) => (
                            <div
                                key={dot}
                                className={`h-2 rounded-full transition-all ${dot <= step ? 'bg-black w-8' : 'bg-gray-300 w-2'
                                    }`}
                            />
                        ))}
                    </div>

                    {step === 2 ? (
                        <button
                            onClick={handleNext}
                            className="text-gray-700 cursor-pointer hover:text-gray-900 font-semibold"
                        >
                            {photos.length > 0 ? "Next" : "Skip"}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={step === 1 && rating === 0 || isPending}
                            className={`px-6 py-2 cursor-pointer flex justify-center items-center gap-2 rounded-lg font-semibold transition ${step === 1 && rating === 0 || isPending
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-purple-600 text-white hover:bg-purple-800'
                                }`}
                        >
                            {step === 3 ? 'Submit' : 'Next'}
                            {isPending && <FormSubmissionLoader />}
                        </button>
                    )}
                </div>

            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};

export default AddReviewDialog;