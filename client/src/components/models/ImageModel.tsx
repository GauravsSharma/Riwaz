import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  images: string[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function ImageModal({ images, isOpen, setIsOpen }: ImageModalProps) {
  if (!isOpen) return null;

  console.log(images);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto">
      <div
        className="absolute top-10 right-10 z-50 flex p-5 cursor-pointer rounded-full bg-white"
        onClick={() => setIsOpen(false)}
      >
        <X size={30} className="text-black" />
      </div>

      <div className="flex flex-col items-center gap-2">
        {images.map((url, i) => (
          <img
            key={i}
            src={url}
            alt=""
            className="max-h-screen w-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
}
