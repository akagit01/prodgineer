import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, onRate, readonly = false, size = 'md' }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const displayRating = hoverRating ?? rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`transition-all duration-200 ${
            readonly 
              ? 'cursor-default' 
              : 'cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-sm'
          }`}
          onClick={() => !readonly && onRate?.(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(null)}
          disabled={readonly}
        >
          <Star
            className={`${sizeClasses[size]} transition-colors duration-200 ${
              star <= displayRating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300 hover:text-yellow-300'
            }`}
          />
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}