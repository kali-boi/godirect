import React from 'react';
import { X, ShieldCheck, Film, Sparkles, Volume2, VolumeX } from 'lucide-react';

export default function VideoTourModal({ isOpen, onClose, videoSrc, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-teal-900/50 flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md border-b border-gray-800 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--teal-blue)] text-white">
              <Film className="w-5 h-5 text-[var(--mellow-gold)]" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">{title || 'GoDirect 4K Virtual Property Tour'}</h3>
              <p className="text-xs text-teal-300">Cinematic Walkthrough Experience</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-gray-800 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-[16/9] w-full bg-black">
          <video
            autoPlay
            controls
            playsInline
            className="w-full h-full object-contain"
            src={videoSrc || "/video/Initial_Scene_-_2026-08-22_202608230019.mp4"}
          >
            Your browser does not support video playback.
          </video>
        </div>

        {/* Footer Info Bar */}
        <div className="p-4 px-6 bg-gradient-to-r from-[var(--deep-teal)] to-black text-white flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[var(--mellow-gold)]" />
            <span>Verified 4K Walkthrough • Real Property Footage</span>
          </div>
          <button
            onClick={onClose}
            className="btn-gold px-4 py-1.5 text-xs font-bold"
          >
            Close Player
          </button>
        </div>

      </div>
    </div>
  );
}
