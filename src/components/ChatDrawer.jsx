import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  ShieldCheck, 
  MessageSquare, 
  Building2, 
  CheckCheck, 
  AlertTriangle,
  Lock,
  ArrowUpRight,
  Zap,
  PhoneOff
} from 'lucide-react';
import { filterChatMessage } from '../utils/chatShield';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { saveChatMessage } from '../services/supabaseService';

export default function ChatDrawer({ 
  isOpen, 
  onClose, 
  activePropertyForChat,
  onOpenBookingModal
}) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeThreadId, setActiveThreadId] = useState('msg-01');
  const [inputMessage, setInputMessage] = useState('');
  const [securityAlert, setSecurityAlert] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // All hooks above — safe to early return now
  if (!isOpen) return null;

  const activeThread = conversations.find(c => c.id === activeThreadId) || conversations[0];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeThread?.history, isTyping]);

  // Set up Supabase Realtime — scoped to active conversation only
  useEffect(() => {
    if (!activeThread?.id) return;
    const channel = supabase
      .channel(`conversation-${activeThread.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${activeThread.id}` },
        (payload) => {
          const newMsg = payload.new;
          if (newMsg) {
            setConversations(prev => prev.map(thread => {
              if (thread.id === newMsg.conversation_id) {
                return {
                  ...thread,
                  lastMessage: newMsg.message_text,
                  timestamp: 'Just now',
                  history: [
                    ...thread.history,
                    {
                      sender: newMsg.sender_id === 'host' ? 'host' : 'guest',
                      text: newMsg.message_text,
                      time: 'Just now'
                    }
                  ]
                };
              }
              return thread;
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // 1. Run through GoDirect Chat Shield (Anti-Disintermediation & Contact Obfuscation)
    const shieldResult = filterChatMessage(inputMessage);

    if (shieldResult.isFlagged) {
      setSecurityAlert(shieldResult.securityWarning);
      setTimeout(() => setSecurityAlert(null), 6000);
    }

    const newMessageObj = {
      sender: 'guest',
      text: shieldResult.sanitizedText,
      time: 'Just now',
      flagged: shieldResult.isFlagged
    };

    // 2. Append message to active thread
    const updatedConversations = conversations.map(thread => {
      if (thread.id === activeThread.id) {
        return {
          ...thread,
          lastMessage: shieldResult.sanitizedText,
          timestamp: 'Just now',
          history: [...thread.history, newMessageObj]
        };
      }
      return thread;
    });

    setConversations(updatedConversations);
    const sentText = inputMessage;
    setInputMessage('');

    // Persist to Supabase if user is logged in
    if (user?.id) {
      saveChatMessage({
        conversationId: activeThread?.id || 'conv-01',
        senderId: user.id,
        text: shieldResult.sanitizedText
      }).catch(err => console.warn('Supabase message save note:', err));
    }

    setIsTyping(true);

    // 3. Simulate Intelligent Landlord Response
    setTimeout(() => {
      setIsTyping(false);
      let hostReplyText = "Thank you for inquiring! The property is fully verified with 24/7 power, security, and high-speed fiber internet. You can lock in your dates directly with GoDirect 24h Escrow Protection below.";
      
      if (sentText.toLowerCase().includes('price') || sentText.toLowerCase().includes('discount') || sentText.toLowerCase().includes('naira')) {
        hostReplyText = "I can accept ₦4,500,000 for the full period! Please reserve directly on GoDirect so our funds are secured in escrow.";
      } else if (shieldResult.isFlagged) {
        hostReplyText = "Notice: To protect both of us against payment fraud and fake bank alerts, all bookings and payments are strictly processed via GoDirect Escrow Vault.";
      }

      const hostReplyObj = {
        sender: 'host',
        text: hostReplyText,
        time: 'Just now'
      };

      setConversations(prev => prev.map(thread => {
        if (thread.id === activeThread.id) {
          return {
            ...thread,
            lastMessage: hostReplyText,
            timestamp: 'Just now',
            history: [...thread.history, hostReplyObj]
          };
        }
        return thread;
      }));
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in font-['Host_Grotesk']">
      <div className="w-full max-w-xl h-full bg-white flex flex-col shadow-2xl relative">
        
        {/* ─── DRAWER HEADER ─── */}
        <div className="flex items-center justify-between p-4 px-6 bg-gradient-to-r from-[#0B2545] to-[#122525] text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-[#018F8B] text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">Direct Landlord Messenger</h3>
                <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Realtime
                </span>
              </div>
              <p className="text-xs text-slate-300">Protected by GoDirect Escrow & Anti-Fraud Shield</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ─── ESCROW PROTECTION GUARANTEE BANNER ─── */}
        <div className="bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-emerald-500/10 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-[#018F8B] shrink-0" />
            <span>24h Stay Guarantee: Pay strictly via Escrow to protect your funds.</span>
          </div>
          <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">
            Escrow Secured
          </span>
        </div>

        {/* ─── SECURITY ALERT TOAST IF CONTACT DETECTED ─── */}
        {securityAlert && (
          <div className="bg-rose-50 border-b border-rose-200 p-3 px-6 text-xs text-rose-800 flex items-center gap-2.5 animate-fade-in">
            <PhoneOff className="w-4 h-4 text-rose-600 shrink-0" />
            <p className="font-bold flex-1">{securityAlert}</p>
          </div>
        )}

        {/* ─── MAIN CHAT AREA ─── */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Thread List (Mobile collapsible / Desktop 1/3) */}
          <div className="hidden sm:block w-48 border-r border-slate-200 bg-slate-50/60 overflow-y-auto p-2 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-400 px-2 py-1 block">Conversations</span>
            {conversations.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveThreadId(c.id)}
                className={`w-full text-left p-3 rounded-2xl transition-all ${
                  c.id === activeThreadId 
                    ? 'bg-white shadow-sm border border-slate-200 text-slate-900' 
                    : 'text-slate-600 hover:bg-white/60'
                }`}
              >
                <p className="font-extrabold text-xs truncate">{c.propertyTitle}</p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{c.hostName}</p>
              </button>
            ))}
          </div>

          {/* Active Conversation Feed */}
          <div className="flex-1 flex flex-col justify-between bg-white overflow-hidden">
            
            {/* Thread Property Header Card */}
            <div className="p-3 px-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={activeThread.hostAvatar} 
                  alt={activeThread.hostName} 
                  className="w-10 h-10 rounded-full object-cover border border-white shadow-xs" 
                />
                <div>
                  <h4 className="font-black text-xs text-slate-900">{activeThread.hostName}</h4>
                  <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-[#018F8B]" /> {activeThread.propertyTitle}
                  </p>
                </div>
              </div>

              {/* Direct Booking CTA */}
              <button
                onClick={() => {
                  onClose();
                  if (onOpenBookingModal) onOpenBookingModal(activeThread);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0B2545] hover:bg-[#018F8B] text-white text-[11px] font-black transition-all shadow-xs"
              >
                <Lock className="w-3 h-3 text-[#CC9955]" />
                <span>Reserve via Escrow</span>
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 px-6 space-y-4">
              {activeThread.history.map((msg, idx) => {
                const isMe = msg.sender === 'guest';
                return (
                  <div 
                    key={idx} 
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    <div 
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        isMe 
                          ? 'bg-[#0B2545] text-white rounded-br-none' 
                          : 'bg-slate-100 text-slate-900 border border-slate-200/80 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 px-1 font-medium">
                      <span>{msg.time}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-[#018F8B]" />}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                  <div className="w-2 h-2 rounded-full bg-[#018F8B] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#018F8B] animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-[#018F8B] animate-bounce delay-200" />
                  <span>{activeThread.hostName} is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 px-4 bg-slate-50 border-t border-slate-200">
              <div className="flex items-center gap-2 bg-white p-1.5 pl-3.5 rounded-2xl border border-slate-200 focus-within:border-[#018F8B] shadow-xs">
                <input
                  type="text"
                  placeholder="Ask the landlord about dates, amenities, discounts..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-slate-900 outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#018F8B] to-[#0B2545] hover:opacity-95 text-white disabled:opacity-40 transition-all shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-2 flex items-center justify-center gap-1 font-medium">
                <Lock className="w-3 h-3 text-emerald-600" /> All messages and transactions are encrypted and protected by GoDirect Escrow.
              </p>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
