import React, { useState } from 'react';
import { Star, Edit3, Trash2 } from 'lucide-react';

export default function UserReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 'rv-001',
      property: 'Eiffel View Executive Suite',
      host: 'Pierre Dupont',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=200&q=80',
      stayDate: 'Jul 2026',
      rating: 5,
      review: 'Genuinely one of the finest short-lets I have experienced. The views of the Eiffel Tower from the master bedroom at dusk are something I will not forget. Pierre was an exceptional host — attentive without being intrusive. Absolutely would return.',
      helpfulCount: 12,
      hostReply: 'Thank you so much for your wonderful words! It was a true pleasure hosting you. Hoping to welcome you back soon! — Pierre'
    }
  ]);

  const [newReview, setNewReview] = useState({ rating: 0, text: '' });
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">My Reviews</h2>
        <p className="text-xs text-slate-500 mt-1">Property reviews you have written. Your feedback helps other renters make informed decisions.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Reviews Written', value: reviews.length },
          { label: 'Average Rating Given', value: `${(reviews.reduce((a, r) => a + r.rating, 0) / reviews.length || 0).toFixed(1)} ★` },
          { label: 'Helpful Votes', value: reviews.reduce((a, r) => a + r.helpfulCount, 0) }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className="text-2xl font-black text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Write new review prompt */}
      <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl p-5 space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900">Review Your Paris Stay</h3>
        <p className="text-xs text-slate-500">You recently checked out from <strong>Eiffel View Executive Suite</strong>. Share your experience.</p>

        {/* Star rating input */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setNewReview({ ...newReview, rating: star })}>
              <Star className={`w-6 h-6 transition-all ${
                star <= (hoverRating || newReview.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'
              }`} />
            </button>
          ))}
          {newReview.rating > 0 && (
            <span className="text-xs font-bold text-slate-600 ml-2">
              {['', 'Poor', 'Fair', 'Good', 'Great', 'Exceptional'][newReview.rating]}
            </span>
          )}
        </div>

        <textarea
          value={newReview.text}
          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
          placeholder="Describe your stay in detail — what stood out, what could be improved, and whether you'd recommend this property to other renters..."
          className="w-full p-4 text-xs border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 bg-white"
          rows={4}
        />
        <div className="flex justify-end">
          <button className="px-5 py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
            Submit Review
          </button>
        </div>
      </div>

      {/* Existing reviews */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <img src={r.image} alt={r.property} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <h4 className="font-extrabold text-sm text-slate-900">{r.property}</h4>
                <p className="text-xs text-slate-500">Host: {r.host} • {r.stayDate}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                  ))}
                  <span className="ml-1 text-[10px] font-bold text-slate-500">{r.rating}.0 / 5</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 hover:bg-rose-100">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">{r.review}</p>

            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span>{r.helpfulCount} people found this helpful</span>
            </div>

            {r.hostReply && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase">Host Reply</span>
                <p className="text-xs text-slate-600 italic">"{r.hostReply}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
