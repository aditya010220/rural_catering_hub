import React from 'react';

const LoadingSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-surface rounded-lg cultural-shadow-subtle overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="aspect-square bg-surface-200" />
          
          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <div className="h-5 bg-surface-200 rounded w-3/4" />
            
            {/* Category */}
            <div className="h-4 bg-surface-200 rounded w-1/2" />
            
            {/* Description */}
            <div className="space-y-2">
              <div className="h-3 bg-surface-200 rounded w-full" />
              <div className="h-3 bg-surface-200 rounded w-2/3" />
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-surface-200 rounded" />
                ))}
              </div>
              <div className="h-4 bg-surface-200 rounded w-16" />
            </div>
            
            {/* Caterer Info */}
            <div className="flex items-center gap-2 p-2 bg-surface-50 rounded">
              <div className="w-6 h-6 bg-surface-200 rounded-full" />
              <div className="space-y-1 flex-1">
                <div className="h-3 bg-surface-200 rounded w-20" />
                <div className="h-3 bg-surface-200 rounded w-16" />
              </div>
            </div>
            
            {/* Price and Button */}
            <div className="flex items-center justify-between">
              <div className="h-6 bg-surface-200 rounded w-20" />
              <div className="h-10 bg-surface-200 rounded w-16" />
            </div>
            
            {/* Serving Info */}
            <div className="flex justify-between">
              <div className="h-3 bg-surface-200 rounded w-16" />
              <div className="h-3 bg-surface-200 rounded w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;