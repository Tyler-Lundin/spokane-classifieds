"use client"

import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images?: string[];
}

export function ImageSlider({ images = [] }: ImageSliderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="relative w-full h-full bg-gray-100 dark:bg-gray-800">
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-400 dark:text-gray-600 text-sm">No image available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full">
        <Image 
          src={images[currentStep]} 
          alt={`Image ${currentStep + 1}`} 
          className="w-full h-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {images.length > 1 && (
        <>
          <ImageSliderControls 
            steps={images.length} 
            currentStep={currentStep} 
            onNext={handleNext} 
            onPrevious={handlePrevious} 
          />
          <ImageSliderIndicator 
            steps={images.length} 
            currentStep={currentStep} 
          />
        </>
      )}
    </div>
  );
}

interface ImageSliderControlsProps {
  steps: number;
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
}

function ImageSliderControls({ steps, currentStep, onNext, onPrevious }: ImageSliderControlsProps) {
  console.log('unused variables in image-slider.tsx', steps, currentStep, onNext, onPrevious);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full items-center flex justify-between gap-2">
      <button 
        onClick={onPrevious} 
        className="w-7 h-7 -translate-x-1/2 border-2 border-black aspect-square rounded-full bg-white grid place-items-center hover:bg-black hover:text-white transition-all duration-300"
      >
        <ChevronLeftIcon className="w-3 h-3" />
      </button>
      <button 
        onClick={onNext} 
        className="w-7 h-7 aspect-square translate-x-1/2 border-2 border-black rounded-full bg-white grid place-items-center hover:bg-black hover:text-white transition-all duration-300"
      >
        <ChevronRightIcon className="w-3 h-3" />
      </button>
    </div>
  );
}

interface ImageSliderIndicatorProps {
  steps: number;
  currentStep: number;
}

function ImageSliderIndicator({ steps, currentStep }: ImageSliderIndicatorProps) {
  return (
    <div className="absolute bottom-0 left-1/2 bg-gradient-to-b from-transparent to-black -translate-x-1/2 w-full items-center flex p-2 justify-center gap-2">
      {Array.from({ length: steps }).map((_, index) => (
        <div 
          key={index} 
          className={cn(
            "w-3 h-3 aspect-square rounded-full bg-white transition-colors duration-300",
            currentStep === index && "bg-black"
          )}
        />
      ))}
    </div>
  );
} 