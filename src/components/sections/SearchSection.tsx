'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch,
  faTags,
  faThLarge,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import Button  from '../ui/Button';

interface SearchSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: 'date' | 'popularity' | 'price';
  setSortBy: (sort: 'date' | 'popularity' | 'price') => void;
  categories: any[];
}

export default function SearchSection({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories
}: SearchSectionProps) {
  return (
    <div className="relative -mt-16 z-10 max-w-7xl mx-auto px-4">
      <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Search Input */}
          <div className="lg:col-span-5">
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              <FontAwesomeIcon icon={faSearch} className="mr-2" /> Etkinlik Ara
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="w-6 h-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Teknoloji, müzik, sanat... ne arıyorsunuz?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500 font-medium"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              <FontAwesomeIcon icon={faTags} className="mr-2" /> Kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 bg-white font-medium"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="lg:col-span-3">
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              <FontAwesomeIcon icon={faThLarge} className="mr-2" /> Sırala
            </label>
                          <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'popularity' | 'price')}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 bg-white font-medium"
              >
              <option value="date">Tarihe göre</option>
              <option value="popularity">Popülerliğe göre</option>
              <option value="price">Fiyata göre</option>
            </select>
          </div>
          
          {/* Clear Filters */}
          <div className="lg:col-span-1">
            {(searchTerm || selectedCategory) && (
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="w-full h-12 border-2 border-gray-300 hover:border-red-500 hover:text-red-600 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 