import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Phone, 
  ShieldCheck, 
  MessageSquare, 
  Building2, 
  CheckCheck,
  User,
  Sparkles
} from 'lucide-react';
import { INITIAL_MESSAGES } from '../data/mockData';

export default function ChatDrawer({ 
  isOpen, 
  onClose, 
  activePropertyForChat 
}) {
  if (!isOpen) return null;

  const [conversations, setConversations] = useState(INITIAL_MESSAGES);
  const [activeThreadId, setActiveThreadId] = useState(
    activePropertyForChat ? 'msg-01' : 'msg-01'
  );
  const [inputMessage, setInputMessage] = useState('');

  const activeThread = conversations.find(c => c.id === activeThreadId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessageObj = {
      sender: 'guest',
      text: inputMessage,
      time: 'Just now'
    };

    // Append message to active thread
    const updatedConversations = conversations.map(thread => {
      if (thread.id === activeThread.id) {
        return {
          ...thread,
          lastMessage: inputMessage,
          timestamp: 'Just now',
          history: [...thread.history, newMessageObj]
        };
      }
      return thread;
    });

    setConversations(updatedConversations);
    const sentText = inputMessage;
    setInputMessage('');

    // Simulate auto landlord reply after 1.5 seconds
    setTimeout(() => {
      let hostReplyText = "Thank you for reaching out! I've received your message and can confirm the property is fully prepared for your preferred dates. Would you like to schedule a virtual tour or proceed with direct booking?";
      
      if (sentText.toLowerCase().includes('price') || sentText.toLowerCase().includes('discount')) {
        hostReplyText = "I can offer a 5% direct booking discount for stays over 5 nights since we avoid third-party agency fees!";
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
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl h-full bg-[var(--bg-surface)] border-l border-[var(--border-medium)] flex flex-col shadow-2xl">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 px-6 bg-[var(--deep-teal)] text-white border-b border-teal-900">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--teal-blue)] text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Direct Landlord Messenger</h3>
              <p className="text-xs text-teal-200">Zero Middleman • Direct Owner Chat</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-teal-900/50 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Conversations Thread Bar */}
        <div className="flex items-center gap-2 p-3 bg-[var(--bg-elevated)] border-b border-[var(--border-light)] overflow-x-auto">
          {conversations.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setActiveThreadId(thread.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeThread.id === thread.id
                  ? 'bg-[var(--teal-blue)] text-white shadow-sm'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-light)]'
              }`}
            >
              <img src={thread.avatar} alt={thread.sender} className="w-6 h-6 rounded-full object-cover" />
              <span>{thread.sender}</span>
            </button>
          ))}
        </div>

        {/* Active Host Profile Header Banner */}
        <div className="flex items-center justify-between p-4 bg-[var(--bg-surface)] border-b border-[var(--border-light)]">
          <div className="flex items-center gap-3">
            <img 
              src={activeThread.avatar} 
              alt={activeThread.sender} 
              className="w-10 h-10 rounded-full object-cover border border-[var(--teal-blue)]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-[var(--text-primary)]">{activeThread.sender}</span>
                <span className="badge-gold text-[9px] px-1.5 py-0">Verified</span>
              </div>
              <p className="text-xs text-[var(--teal-blue)] font-medium">Online • Typically replies instantly</p>
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-light)] text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--teal-blue)]">
            <Phone className="w-3.5 h-3.5 text-[var(--teal-blue)]" />
            <span>Call Host</span>
          </button>
        </div>

        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--bg-elevated)]">
          
          <div className="text-center my-2">
            <span className="text-[11px] font-bold text-[var(--text-muted)] bg-[var(--bg-surface)] px-3 py-1 rounded-full border border-[var(--border-light)] uppercase tracking-wider">
              Encrypted Direct Message Channel
            </span>
          </div>

          {activeThread.history.map((msg, idx) => (
            <div 
              key={idx}
              className={`flex flex-col ${msg.sender === 'guest' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[82%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'guest'
                    ? 'bg-[var(--deep-teal)] text-white rounded-br-none shadow-sm'
                    : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-light)] rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-[var(--text-muted)] mt-1 px-1 flex items-center gap-1">
                {msg.time}
                {msg.sender === 'guest' && <CheckCheck className="w-3 h-3 text-[var(--teal-blue)] inline" />}
              </span>
            </div>
          ))}

        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 bg-[var(--bg-surface)] border-t border-[var(--border-light)] flex items-center gap-2">
          <input
            type="text"
            placeholder={`Message ${activeThread.sender}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-[var(--bg-elevated)] border border-[var(--border-light)] rounded-2xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--teal-blue)]"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="btn-primary p-3 rounded-2xl disabled:opacity-40 shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
}
