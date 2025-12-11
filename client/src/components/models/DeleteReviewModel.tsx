import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useDeleteProduct } from '@/hooks/seller/useSellerProduct';
import FormSubmissionLoader from '../loaders/FormSubmissionLoader';
import { useDeleteReview } from '@/hooks/buyer/useReview';

interface DeleteReviewDialogProps {
    reviewId: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
const DeleteReviewDialog: React.FC<DeleteReviewDialogProps> = ({ reviewId, isOpen, setIsOpen }) => {
    const { mutate: deleteReview,isPending } = useDeleteReview(reviewId);
    const handleDelete = () => {
        deleteReview()
        setIsOpen(false);
    };

    return (
       <>
         {
            isOpen && (
                 <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
        >
              <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangle className="text-red-600" size={24} />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Delete Review</h2>
                        </div>

                        <p className="text-sm text-gray-500 mb-6">
                            This action cannot be undone.
                        </p>

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isPending}
                                onClick={handleDelete}
                                className={`px-4 py-2 cursor-pointer flex justify-center items-center gap-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Delete
                                {isPending && <FormSubmissionLoader/>}
                            </button>
                        </div>
                    </div>
                </div>

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
        </div>
            )
         }
       </>
    );
};

export default DeleteReviewDialog;