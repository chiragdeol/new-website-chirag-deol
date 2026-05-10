'use client';
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
}

const FLOW: Record<string, { text: string; options?: string[]; next?: string }> = {
  start: {
    text: "👋 Hi! I'm here to help you get started. What are you looking for?",
    options: [
      'Website Development',
      'Mobile App Development',
      'WordPress Website',
      'Real Estate Website',
      'Ecommerce Store',
      'Something Else',
    ],
    next: 'budget',
  },
  budget: {
    text: "Great choice! What's your approximate budget?",
    options: ['Under ₹50K', '₹50K – ₹1.5L', '₹1.5L – ₹5L', '₹5L+', 'Not Sure Yet'],
    next: 'timeline',
  },
  timeline: {
    text: 'When do you need this ready?',
    options: ['ASAP (1–2 weeks)', '1 Month', '2–3 Months', 'Flexible'],
    next: 'contact',
  },
  contact: {
    text: "Perfect! You're just one step away. Drop your WhatsApp number or email and we'll reach out within 2 hours! 🚀",
    next: 'done',
  },
  done: {
    text: "✅ Thanks! We've received your details. Our team will contact you shortly. Meanwhile, feel free to explore our portfolio!",
  },
};

let msgId = 0;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<string>('start');
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [leadData, setLeadData] = useState<{
    service?: string;
    budget?: string;
    timeline?: string;
  }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setShowBubble(false);
      addBotMessage(FLOW.start.text, FLOW.start.options);
    }
  }, [isOpen, hasGreeted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: ++msgId, type: 'bot', text, options }]);
    }, 800);
  };

  const handleOption = (option: string) => {
    setMessages((prev) => [...prev, { id: ++msgId, type: 'user', text: option }]);
    if (step === 'start') setLeadData((prev) => ({ ...prev, service: option }));
    if (step === 'budget') setLeadData((prev) => ({ ...prev, budget: option }));
    if (step === 'timeline') setLeadData((prev) => ({ ...prev, timeline: option }));
    const current = FLOW[step];
    const nextKey = current?.next;
    if (nextKey && FLOW[nextKey]) {
      setStep(nextKey);
      if (nextKey !== 'contact') {
        addBotMessage(FLOW[nextKey].text, FLOW[nextKey].options);
      } else {
        addBotMessage(FLOW[nextKey].text);
      }
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputVal.trim();
    if (!clean || isSubmittingLead) return;
    setIsSubmittingLead(true);
    setMessages((prev) => [...prev, { id: ++msgId, type: 'user', text: clean }]);
    setInputVal('');
    try {
      await fetch('/api/leads/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadData, contact: clean }),
      });
      setStep('done');
      addBotMessage(FLOW.done.text);
    } catch {
      addBotMessage('Sorry, we could not save that right now. Please try again in a moment.');
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setStep('start');
    setHasGreeted(false);
    setIsOpen(false);
    setLeadData({});
  };

  return (
    <>
      {/* Notification bubble */}
      {showBubble && !isOpen && (
        <div
          className="fixed bottom-[7rem] right-3 z-50 sm:bottom-[7.5rem] sm:right-8"
          style={{
            background: '#111822',
            color: '#fff',
            borderRadius: '1rem 1rem 0.25rem 1rem',
            padding: '0.75rem 1.1rem',
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '0.82rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            maxWidth: '200px',
            lineHeight: 1.4,
            animation: 'fadeInUp 0.4s ease-out',
          }}
        >
          💬 Need help? Let&apos;s find the right solution for you!
          <button
            onClick={() => setShowBubble(false)}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#FF8200',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              color: '#fff',
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-[6.75rem] right-3 z-50 max-h-[min(520px,calc(100dvh-8rem))] w-[min(calc(100vw-1.5rem),380px)] sm:bottom-[7rem] sm:right-8"
          style={{
            height: 'min(520px, calc(100dvh - 8rem))',
            borderRadius: '1.5rem',
            background: '#ffffff',
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid rgba(138,143,141,0.15)',
            animation: 'chatSlideUp 0.35s cubic-bezier(0.625, 0.05, 0, 1)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1.2rem 1.5rem',
              background: '#111822',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,130,0,0.2)',
                border: '1.5px solid rgba(255,130,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
              }}
            >
              🤖
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#ffffff',
                }}
              >
                Chirag&apos;s Assistant
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#10b981',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '0.72rem',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  Online — replies in 2 hrs
                </span>
              </div>
            </div>
            <button
              onClick={resetChat}
              style={{
                marginLeft: 'auto',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.4rem 0.6rem',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-body), sans-serif',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              background: '#fafaf9',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '0.7rem 1rem',
                    borderRadius:
                      msg.type === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                    background: msg.type === 'user' ? '#111822' : '#ffffff',
                    color: msg.type === 'user' ? '#ffffff' : '#334049',
                    fontFamily: 'var(--font-body), sans-serif',
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    border: msg.type === 'bot' ? '1px solid rgba(138,143,141,0.12)' : 'none',
                  }}
                >
                  {msg.text}
                </div>
                {msg.options && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.4rem',
                      maxWidth: '100%',
                    }}
                  >
                    {msg.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOption(opt)}
                        style={{
                          padding: '0.4rem 0.85rem',
                          borderRadius: '2rem',
                          border: '1.5px solid rgba(255,130,0,0.4)',
                          background: 'rgba(255,130,0,0.04)',
                          color: '#FF8200',
                          fontFamily: 'var(--font-body), sans-serif',
                          fontSize: '0.78rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease-out',
                          letterSpacing: '0.02em',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = '#FF8200';
                          (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            'rgba(255,130,0,0.04)';
                          (e.currentTarget as HTMLButtonElement).style.color = '#FF8200';
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div
                  style={{
                    padding: '0.7rem 1rem',
                    borderRadius: '1rem 1rem 1rem 0.25rem',
                    background: '#ffffff',
                    border: '1px solid rgba(138,143,141,0.12)',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#8a8f8d',
                        animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Contact Input (shown at contact step) */}
          {step === 'contact' && (
            <form
              onSubmit={handleContactSubmit}
              style={{
                padding: '1rem 1.2rem',
                borderTop: '1px solid rgba(138,143,141,0.12)',
                background: '#ffffff',
                display: 'flex',
                gap: '0.5rem',
                flexShrink: 0,
              }}
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Your WhatsApp / Email..."
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '2rem',
                  border: '1px solid rgba(138,143,141,0.25)',
                  background: '#fafaf9',
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.85rem',
                  color: '#334049',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={isSubmittingLead}
                style={{
                  padding: '0.65rem 1.1rem',
                  borderRadius: '2rem',
                  background: '#111822',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff',
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  flexShrink: 0,
                }}
              >
                {isSubmittingLead ? 'Saving...' : 'Send →'}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-4 right-3 z-50 sm:bottom-8 sm:right-8"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: isOpen ? '#111822' : '#FF8200',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 4px 20px ${isOpen ? 'rgba(17,24,34,0.35)' : 'rgba(255,130,0,0.45)'}`,
          transition: 'all 0.3s cubic-bezier(0.625, 0.05, 0, 1)',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
