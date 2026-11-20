import React, { useState, useMemo } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

const NEIGHBORHOODS = [
  {
    id: 'ikoyi',
    name: 'Ikoyi',
    city: 'Lagos',
    summary: 'Waterfront penthouses, quiet residential streets, and long-term diplomatic leases.',
    typicalRate: '₦120,000 – ₦250,000 / night',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'victoria-island',
    name: 'Victoria Island',
    city: 'Lagos',
    summary: 'Serviced apartments close to corporate headquarters, dining, and business hubs.',
    typicalRate: '₦85,000 – ₦180,000 / night',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'lekki',
    name: 'Lekki Phase 1',
    city: 'Lagos',
    summary: 'Modern duplexes and short-let apartments with 24/7 power and estate security.',
    typicalRate: '₦65,000 – ₦150,000 / night',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'maitama',
    name: 'Maitama',
    city: 'Abuja',
    summary: 'Spacious detached residences and executive suites in Abuja’s embassy district.',
    typicalRate: '₦100,000 – ₦220,000 / night',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80',
  },
];

export default function BestValueMapSection({ onExploreClick, onSelectProperty, properties = [] }) {
  const [selectedId, setSelectedId] = useState(NEIGHBORHOODS[0].id);

  const activeArea = NEIGHBORHOODS.find((n) => n.id === selectedId) || NEIGHBORHOODS[0];

  const matchingProperties = useMemo(() => {
    const key = activeArea.name.toLowerCase();
    return properties.filter(
      (p) =>
        (p.location || '').toLowerCase().includes(key) ||
        (p.address || '').toLowerCase().includes(key)
    );
  }, [properties, activeArea.name]);

  const countForArea = (name) => {
    const key = name.toLowerCase();
    return properties.filter(
      (p) =>
        (p.location || '').toLowerCase().includes(key) ||
        (p.address || '').toLowerCase().includes(key)
    ).length;
  };

  return (
    <section className="py-16 bg-white border-t border-neutral-200/80">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#122525] tracking-tight">
              Explore key neighborhoods
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Compare typical rates and see verified listings across Lagos and Abuja.
            </p>
          </div>
          <button
            type="button"
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#018F8B] hover:text-[#017774] transition-colors self-start md:self-auto"
          >
            <span>Browse all locations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Neighborhood Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {NEIGHBORHOODS.map((area) => {
              const isSelected = area.id === selectedId;
              const liveCount = countForArea(area.name);
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setSelectedId(area.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#122525] text-white border-[#122525]'
                      : 'bg-neutral-50/70 text-[#122525] border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-[#CC9955]' : 'text-[#018F8B]'
                        }`}
                      />
                      <span className="font-semibold text-sm">
                        {area.name}, {area.city}
                      </span>
                    </div>
                    {liveCount > 0 && (
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                          isSelected
                            ? 'bg-white/15 text-white'
                            : 'bg-white text-neutral-600 border border-neutral-200'
                        }`}
                      >
                        {liveCount} {liveCount === 1 ? 'listing' : 'listings'}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-1.5 leading-relaxed ${
                      isSelected ? 'text-white/75' : 'text-neutral-600'
                    }`}
                  >
                    {area.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Neighborhood Detail Panel */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 flex flex-col">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={activeArea.image}
                alt={`${activeArea.name}, ${activeArea.city}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122525]/85 via-[#122525]/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {activeArea.name}, {activeArea.city}
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    Typical short-let range: {activeArea.typicalRate}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4 bg-white">
              {matchingProperties.length > 0 ? (
                <div className="space-y-2.5">
                  <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    Available in {activeArea.name}
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {matchingProperties.slice(0, 2).map((prop) => {
                      const rawPrice =
                        prop.price ?? (prop.isShortLet ? prop.pricePerNight : prop.pricePerYear) ?? 0;
                      const period = prop.pricePeriod || (prop.isShortLet ? 'night' : 'year');
                      return (
                        <button
                          key={prop.id}
                          type="button"
                          onClick={() => onSelectProperty && onSelectProperty(prop)}
                          className="w-full py-2.5 flex items-center justify-between gap-3 text-left hover:bg-neutral-50 rounded-lg px-2 -mx-2 transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-[#122525] truncate">
                              {prop.title}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {prop.beds || 0} bed · {prop.baths || 0} bath
                            </div>
                          </div>
                          <div className="text-sm font-bold text-[#018F8B] shrink-0">
                            ₦{Number(rawPrice).toLocaleString()}
                            <span className="text-xs font-normal text-neutral-500">/{period}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {activeArea.summary} Browse all verified listings below or filter by stay type and budget.
                </p>
              )}

              <div>
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#122525] hover:bg-[#1c3737] text-white text-xs font-semibold transition-colors"
                >
                  <span>See listings in {activeArea.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
