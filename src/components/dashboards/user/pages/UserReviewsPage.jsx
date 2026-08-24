import React, { useState } from 'react';
import { Star, Edit3, Trash2, MessageSquare, ShieldCheck } from 'lucide-react';

export default function UserReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, text: '' });
  const [hoverRating, setHoverRating] = useState(0);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="space-y-8 animate-fade-in font-['Host_Grotesk']">
      <div>
        <h2 className="text-2xl font-black text-slate-900">My Reviews & Ratings</h2>
        <p className="text-xs text-slate-500 mt-1">Verified reviews you have submitted for past stays and inspection tours.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Reviews Submitted', value: reviews.length },
          { label: 'Average Rating Given', value: `${avgRating} ★` },
          { label: 'Helpful Votes', value: reviews.reduce((a, r) => a + (r.helpfulCount || 0), 0) }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className="text-2xl font-black text-slate-900">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Existing reviews */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400 space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-slate-700">No Reviews Written Yet</p>
            <p>After completing a verified stay or property tour, you can share public feedback here.</p>
          </div>
        ) : (
          reviews.map((r) => (
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
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                "{r.review}"
              </p>

              {r.hostReply && (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-xs space-y-1">
                  <span className="font-bold text-[#018F8B] block">Landlord Reply:</span>
                  <p className="text-slate-700">{r.hostReply}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
