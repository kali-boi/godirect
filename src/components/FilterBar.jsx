import React, { useState } from 'react';
import { 
  Building2, 
  Palmtree, 
  Sparkles, 
  Building, 
  Home, 
  Briefcase, 
  SlidersHorizontal,
  Check,
  X,
  ShieldCheck
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function FilterBar({ 
  selectedCategory, 
  setSelectedCategory,
  onOpenFilterDrawer,
  totalResultsCount
}) {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Palmtree': return <Palmtree className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[var(--mellow-gold)]" />;
      case 'Building': return <Building className="w-4 h-4" />;
      case 'Home': return <Home className="w-4 h-4" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[var(--bg-surface)] border-y border-[var(--border-light)] py-4 my-6 sticky top-20 z-30 shadow-sm backdrop-blur-md">
      <div className="container flex flex-wrap items-center justify-between gap-4">
        
        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                selectedCategory === cat.id
                  ? 'bg-[var(--deep-teal)] text-white border-[var(--deep-teal)] shadow-sm'
                  : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-light)] hover:border-[var(--teal-blue)] hover:text-[var(--text-primary)]'
              }`}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Filter Trigger & Counter */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs font-semibold text-[var(--text-muted)] hidden sm:inline">
            Showing <strong className="text-[var(--text-primary)]">{totalResultsCount}</strong> luxury properties
          </span>

          <button
            onClick={onOpenFilterDrawer}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-medium)] hover:border-[var(--teal-blue)] text-xs font-bold transition-all shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[var(--teal-blue)]" />
            <span>Filters</span>
          </button>
        </div>

      </div>
    </div>
  );
}
