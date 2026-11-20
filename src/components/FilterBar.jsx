import React from 'react';
import {
  Building2,
  Palmtree,
  Building,
  Home,
  Briefcase,
  SlidersHorizontal
} from 'lucide-react';
import { CATEGORIES, SHORTLET_CATEGORIES, RENTAL_CATEGORIES } from '../data/mockData';

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  stayTypeFilter = 'all',
  onOpenFilterDrawer,
  totalResultsCount
}) {
  const currentCategories =
    stayTypeFilter === 'short-let'
      ? SHORTLET_CATEGORIES
      : stayTypeFilter === 'rentals'
      ? RENTAL_CATEGORIES
      : CATEGORIES;

  const getCategoryIcon = (iconName, isSelected) => {
    const cls = `w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-neutral-500'}`;
    switch (iconName) {
      case 'Palmtree':
        return <Palmtree className={cls} />;
      case 'Building':
        return <Building className={cls} />;
      case 'Home':
        return <Home className={cls} />;
      case 'Briefcase':
        return <Briefcase className={cls} />;
      default:
        return <Building2 className={cls} />;
    }
  };

  return (
    <div className="bg-white/95 border-y border-neutral-200/80 py-3 my-4 sticky top-16 z-30 backdrop-blur-md">
      <div className="container flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {currentCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#122525] text-white border-[#122525]'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {getCategoryIcon(cat.icon, isSelected)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 ml-auto shrink-0">
          <span className="text-xs text-neutral-500 hidden md:inline">
            <strong className="font-semibold text-[#122525]">{totalResultsCount}</strong>{' '}
            {stayTypeFilter === 'short-let'
              ? 'short-lets'
              : stayTypeFilter === 'rentals'
              ? 'annual rentals'
              : 'properties'}
          </span>

          {onOpenFilterDrawer && (
            <button
              type="button"
              onClick={onOpenFilterDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-50 text-[#122525] border border-neutral-200 text-xs font-medium transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-500" />
              <span>All filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
