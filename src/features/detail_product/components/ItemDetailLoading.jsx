import React from 'react';

const ItemDetailLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sección de Imagen Skeleton */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md aspect-square rounded-lg bg-gray-200 mb-4"></div>
        </div>

        {/* Sección de Detalles Skeleton */}
        <div className="flex flex-col">
          {/* Título */}
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          
          {/* Brand & SKU */}
          <div className="flex gap-4 mb-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>

          {/* Rating */}
          <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>

          {/* Price & Stock */}
          <div className="mb-6">
            <div className="h-10 bg-gray-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-8">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>

          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6 mt-auto">
            <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sección de Reseñas Skeleton */}
      <div className="mt-16 border-t border-gray-200 pt-10">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-gray-50 p-5 rounded-xl border border-gray-100 h-32">
              <div className="flex justify-between mb-3">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailLoading;
