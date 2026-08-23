import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

export default function LandlordReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 'rev-101',
      guestName: 'Dr. Julian Thorne',
      guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
      property: 'The Skyview Horizon Penthouse',
      rating: 5,
      date: '17 Aug 2026',
      review: 'Absolutely exceptional. The penthouse exceeded every expectation — the views are unmatched and Eleanor was an impeccable host. Will be returning without question.',
      hostReply: null
    },
    {
      id: 'rev-102',
      guestName: 'Amara Al-Zahra',
      guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
      property: 'The Azure Waterfront Villa',
      rating: 4,
      date: '05 Aug 2026',
      review: 'Beautiful property in an unbeatable location. The villa was immaculate. Minor note — the hot tub took 30 minutes to heat up on the first night.',
      hostReply: null
    },
    {
      id: 'rev-103',
      guestName: 'Alexander Wright',
      guestAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
      property: 'The Skyview Horizon Penthouse',
      rating: 5,
      date: '28 Jul 2026',
      review: 'Perfect for our anniversary weekend. Champagne was already chilled on arrival as per the custom request. Five stars without hesitation.',
      hostReply: 'Thank you so much Alexander! It was a pleasure hosting you both. Looking forward to welcoming you again! — Eleanor'
    }
  ]);

  const [replyDraft, setReplyDraft] = useState({});
  const [replyOpen, setReplyOpen] = useState(null);

  const submitReply = (id) => {
    if (!replyDraft[id]) return;
    setReviews(reviews.map(r => r.id === id ? { ...r, hostReply: replyDraft[id] } : r));
    setReplyOpen(null);
    setReplyDraft({ ...replyDraft, [id]: '' });
  };

  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

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
          { label: 'Replied', value: reviews.filter(r => r.hostReply).length, color: 'text-emerald-600' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-500">{s.label}</span>
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <img src={r.guestAvatar} alt={r.guestName} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{r.guestName}</h4>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">{r.property} • {r.date}</p>
              </div>
            </div>

            {/* Review text */}
            <p className="text-xs text-slate-700 leading-relaxed">{r.review}</p>

            {/* Host reply */}
            {r.hostReply && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 ml-4 space-y-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase">Your Reply</span>
                <p className="text-xs text-slate-600 italic">"{r.hostReply}"</p>
              </div>
            )}

            {/* Reply form */}
            {!r.hostReply && (
              <>
                {replyOpen === r.id ? (
                  <div className="space-y-2">
                    <textarea
                      value={replyDraft[r.id] || ''}
                      onChange={(e) => setReplyDraft({ ...replyDraft, [r.id]: e.target.value })}
                      placeholder="Write a thoughtful reply to your guest..."
                      className="w-full p-3 text-xs border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button onClick={() => setReplyOpen(null)} className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold">
                        Cancel
                      </button>
                      <button onClick={() => submitReply(r.id)} className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                        Post Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setReplyOpen(r.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#0B2545] hover:underline">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Reply to this review
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
