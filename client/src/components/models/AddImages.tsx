import React, { useState } from 'react';
import { X, Plus, Upload, Trash2 } from 'lucide-react';
import { useUploadMedia } from '@/hooks/seller/useSellerProduct';
import { toast } from 'react-toastify';
import FormSubmissionLoader from '../loaders/FormSubmissionLoader';
import Image from 'next/image';

interface ImageMetadata {
  id: string;
  altText: string;
  type: string;
}

interface ImageUpload {
  id: string;
  file: File | null;
  preview: string | null;
}
interface ProductImageDialogProps {
  productId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
const ProductImageDialog: React.FC<ProductImageDialogProps> = ({
  productId,
  isOpen,
  setIsOpen
}) => {
  // const [isOpen, setIsOpen] = useState(true);
  // console.log(productId);/
  
  const [images, setImages] = useState<ImageUpload[]>([
    { id: '1', file: null, preview: null }
  ]);
  const [metadata, setMetadata] = useState<ImageMetadata[]>([
    { id: '1', altText: '', type: 'front' }
  ]);
  const { mutate: uploadMedia, isPending } = useUploadMedia(productId);

  const imageTypes = ['front', 'back', 'left side', 'right side', 'top', 'bottom', 'detail', 'other'];

  const handleAddMore = () => {
    const newId = Date.now().toString();
    setImages([...images, { id: newId, file: null, preview: null }]);
    setMetadata([...metadata, { id: newId, altText: '', type: 'front' }]);
  };

  const handleRemove = (id: string) => {
    if (images.length > 1) {
      setImages(images.filter(Image => Image.id !== id));
      setMetadata(metadata.filter(meta => meta.id !== id));
    }
  };

  const handleImageChange = (id: string, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(images.map(Image =>
          Image.id === id ? { ...Image, file, preview: reader.result as string } : Image
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMetadataChange = (id: string, field: 'altText' | 'type', value: string) => {
    setMetadata(metadata.map(meta =>
      meta.id === id ? { ...meta, [field]: value } : meta
    ));
  };

  const handleSubmit = () => {
    const formData = new FormData();

    images.forEach((Image) => {
      if (Image.file) { 
        formData.append("images", Image.file);
      }
    });
    formData.append("meta_data", JSON.stringify(metadata));
    
    uploadMedia(formData, {
      onSuccess: () => {
        toast.success("Images uploaded successfully!");
        handleClose();
      },
      onError: () => {
        toast.error("Failed to upload images. Please try again.");
      }
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setImages([{ id: '1', file: null, preview: null }]);
    setMetadata([{ id: '1', altText: '', type: 'front' }]);
  };

  return (
   <>
    {
      isOpen && (
         <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Upload Product Images</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {images.map((image, index) => {
                const meta = metadata.find(m => m.id === image.id);
                return (
                  <div key={image.id} className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-700">Image {index + 1}</h3>
                      {images.length > 1 && (
                        <button
                          onClick={() => handleRemove(image.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Image File
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(image.id, e.target.files?.[0] || null)}
                          className="hidden"
                          id={`file-${image.id}`}
                        />
                        <label
                          htmlFor={`file-${image.id}`}
                          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-white"
                        >
                          {image.preview ? (
                            <Image
                              src={image.preview}
                              alt="Preview"
                              className="h-full w-full object-contain rounded-lg"
                            />
                          ) : (
                            <div className="text-center">
                              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Click to upload image</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    {/* Image Type */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Image Type
                      </label>
                      <select
                        value={meta?.type || 'front'}
                        onChange={(e) => handleMetadataChange(image.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      >
                        {imageTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Alt Text */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Alt Text (Description)
                      </label>
                      <input
                        type="text"
                        value={meta?.altText || ''}
                        onChange={(e) => handleMetadataChange(image.id, 'altText', e.target.value)}
                        placeholder={`e.g., Product ${meta?.type} view`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                );
              })}

              {/* Add More Button */}
              <button
                onClick={handleAddMore}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add More Images
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700"
              >
                Cancel
              </button>
              <button
              disabled={isPending}
                onClick={handleSubmit}
                className={`px-6 py-2 flex justify-center items-center gap-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Upload Images
                {isPending && <FormSubmissionLoader/>}

              </button>
            </div>
          </div>
        </div>
    </div>
      )
    }
   </>
  ); 
};

export default ProductImageDialog;