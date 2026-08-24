import React from 'react';
import { 
  Building2, 
  Palmtree, 
  Sparkles, 
  Building, 
  Home, 
  Briefcase, 
  SlidersHorizontal,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { CATEGORIES, SHORTLET_CATEGORIES, RENTAL_CATEGORIES } from '../data/mockData';

export default function FilterBar({ 
  selectedCategory, 
  setSelectedCategory,
  stayTypeFilter = 'all',
  onOpenFilterDrawer,
  totalResultsCount
}) {
  const currentCategories = stayTypeFilter === 'short-let'
    ? SHORTLET_CATEGORIES
    : stayTypeFilter === 'rentals'
    ? RENTAL_CATEGORIES
    : CATEGORIES;

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Palmtree': return <Palmtree className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Sparkles': return <Sparkles className="w-3.5 h-3.5 text-[#CC9955]" />;
      case 'Building': return <Building className="w-3.5 h-3.5 text-sky-600" />;
      case 'Home': return <Home className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Briefcase': return <Briefcase className="w-3.5 h-3.5 text-amber-600" />;
      default: return <Building2 className="w-3.5 h-3.5 text-[#018F8B]" />;
    }
  };

  return (
    <div className="bg-white border-y border-slate-200/80 py-3 my-4 sticky top-16 z-30 shadow-2xs backdrop-blur-md font-['Host_Grotesk']">
      <div className="container flex flex-wrap items-center justify-between gap-3">
        
        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {currentCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                    : 'bg-slate-100/80 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Filter Trigger & Dynamic Counter */}
        <div className="flex items-center gap-3 ml-auto shrink-0">
          <span className="text-xs font-semibold text-slate-500 hidden md:inline">
            Showing <strong className="text-slate-900">{totalResultsCount}</strong> {
              stayTypeFilter === 'short-let'
                ? 'verified short-lets (₦/night)'
                : stayTypeFilter === 'rentals'
                ? 'direct landlord leases (₦/year)'
                : 'luxury properties'
            }
          </span>

          <button
            onClick={onOpenFilterDrawer}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#018F8B]" />
            <span>Filters</span>
          </button>
        </div>

      </div>
    </div>
  );
}
