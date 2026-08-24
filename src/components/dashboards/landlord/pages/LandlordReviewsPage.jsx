import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

export default function LandlordReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [replyDraft, setReplyDraft] = useState({});
  const [replyOpen, setReplyOpen] = useState(null);

  const submitReply = (id) => {
    if (!replyDraft[id]) return;
    setReviews(reviews.map(r => r.id === id ? { ...r, hostReply: replyDraft[id] } : r));
    setReplyOpen(null);
    setReplyDraft({ ...replyDraft, [id]: '' });
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Reviews & Ratings</h2>
        <p className="text-xs text-slate-500 mt-1">Read guest feedback and respond to reviews across all your properties.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Average Rating', value: `${avgRating} ★`, color: 'text-amber-500' },
          { label: 'Total Reviews', value: reviews.length, color: 'text-slate-900' },
          { label: '5-Star Reviews', value: reviews.filter(r => r.rating === 5).length, color: 'text-emerald-600' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Review Cards */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
            No guest reviews submitted yet. Reviews left after verified stays will appear here.
          </div>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={r.guestAvatar} alt={r.guestName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{r.guestName}</h4>
                    <p className="text-xs text-slate-400">{r.property} • {r.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array(r.rating).fill(null).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                "{r.review}"
              </p>

              {r.hostReply && (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-xs space-y-1">
                  <span className="font-bold text-[#018F8B] block">Your Response:</span>
                  <p className="text-slate-700">{r.hostReply}</p>
                </div>
              )}

              {!r.hostReply && (
                <div>
                  {replyOpen === r.id ? (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <textarea
                        rows={3}
                        placeholder="Write a public response to this review..."
                        value={replyDraft[r.id] || ''}
                        onChange={(e) => setReplyDraft({ ...replyDraft, [r.id]: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-[#018F8B] resize-none"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setReplyOpen(null)} className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">
                          Cancel
                        </button>
                        <button onClick={() => submitReply(r.id)} className="px-4 py-1.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold">
                          Post Reply
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setReplyOpen(r.id)} className="text-xs font-bold text-[#018F8B] hover:underline flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Reply publicly to guest
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
