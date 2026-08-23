import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  CreditCard, 
  Lock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function BookingModal({ 
  bookingData, 
  onClose, 
  onConfirmSuccess 
}) {
  if (!bookingData) return null;

  const { property, calculation } = bookingData;
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [guestName, setGuestName] = useState('Alexander Wright');
  const [guestEmail, setGuestEmail] = useState('alex.wright@example.com');
  const [paymentMethod, setPaymentMethod] = useState('escrow');

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[var(--bg-surface)] rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-medium)] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[var(--deep-teal)] text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[var(--mellow-gold)]" />
            <h3 className="font-bold text-base">Direct Escrow Reservation</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-teal-900/50 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isConfirmed ? (
          <form onSubmit={handleConfirm} className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
            
            {/* Property Summary */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-light)]">
              <img src={property.images[0]} alt={property.title} className="w-20 h-16 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-sm text-[var(--text-primary)]">{property.title}</h4>
                <p className="text-xs text-[var(--text-muted)]">{property.location}</p>
                <div className="text-xs font-semibold text-[var(--teal-blue)] mt-1">Host: {property.host.name}</div>
              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div className="space-y-2 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-light)] text-xs text-[var(--text-secondary)]">
              <div className="font-bold text-sm text-[var(--text-primary)] mb-2">Reservation Summary</div>
              <div className="flex justify-between">
                <span>Stay Base Rate</span>
                <span className="font-semibold text-[var(--text-primary)]">${calculation.totalBase.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>GoDirect Service & Escrow Protection</span>
                <span className="font-semibold text-[var(--text-primary)]">${calculation.serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-[var(--text-primary)] pt-2 border-t border-[var(--border-light)]">
                <span>Total Amount Due</span>
                <span className="text-[var(--teal-blue)]">${calculation.grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Guest Info Form */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-secondary)]">Guest Details</h4>
              <div>
                <input 
                  type="text" 
                  required
                  placeholder="Full Name" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] outline-none"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-secondary)]">Select Payment Security</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('escrow')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    paymentMethod === 'escrow' 
                      ? 'bg-[var(--teal-blue)] text-white border-[var(--teal-blue)]' 
                      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-light)]'
                  }`}
                >
                  <Lock className="w-4 h-4 mb-1" />
                  <div>GoDirect Direct Escrow</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    paymentMethod === 'card' 
                      ? 'bg-[var(--teal-blue)] text-white border-[var(--teal-blue)]' 
                      : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-light)]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1" />
                  <div>Credit / Debit Card</div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold w-full py-3.5 text-sm font-bold justify-center shadow-lg"
            >
              <span>Confirm & Pay ${calculation.grandTotal.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[var(--text-primary)]">Booking Confirmed!</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Reservation Code: <strong className="font-mono text-[var(--teal-blue)]">GD-{Math.floor(100000 + Math.random() * 900000)}</strong>
              </p>
            </div>
            
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
              Your reservation request has been submitted to <strong>{property.host.name}</strong>. A direct receipt and confirmation email have been sent to <strong>{guestEmail}</strong>.
            </p>

            <button
              onClick={() => {
                onConfirmSuccess();
                onClose();
              }}
              className="btn-primary w-full py-3 text-sm justify-center"
            >
              Done & Return to Properties
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
