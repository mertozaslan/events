'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CategoryPillsProps {
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function CategoryPills({
  categories,
  selectedCategory,
  setSelectedCategory
}: CategoryPillsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-16">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.name ? '' : category.name)}
            className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category.name
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="relative flex items-center space-x-2">
              <span className="text-lg"><FontAwesomeIcon icon={category.icon} /></span>
              <span>{category.name}</span>
            </span>
            {selectedCategory === category.name && (
              <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
} 