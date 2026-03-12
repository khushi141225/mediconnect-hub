import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickReplies = [
  'Find a cardiologist near me',
  'Which hospital has ICU beds?',
  'Book a teleconsultation',
  'Show my health records',
];

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m the MediSync AI Assistant. How can I help you today? 🏥' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Mock AI response based on keywords
    setTimeout(() => {
      let reply = 'I can help you with finding hospitals, booking appointments, checking health records, and more. Please provide more details about what you need.';
      const lower = text.toLowerCase();
      if (lower.includes('cardiologist')) reply = '🫀 I found 2 cardiologists available:\n\n1. **Dr. Aanya Sharma** - City General Hospital (Available: 10AM, 2PM, 4:30PM)\n2. **Dr. Mohammed Ali** - Sunrise Multispecialty (Available: 9AM, 11AM, 3PM)\n\nWould you like to book an appointment?';
      else if (lower.includes('icu')) reply = '🏥 ICU Bed Availability:\n\n• Sunrise Multispecialty: **18 beds** available\n• City General: **8 beds** available\n• National Trauma: **5 beds** available\n• Metro Private: **2 beds** (limited)\n• District Public: **0 beds** (full)';
      else if (lower.includes('teleconsult') || lower.includes('video')) reply = '📹 You can start a teleconsultation from the Teleconsultation page. Available doctors include:\n\n• Dr. Vikram Singh (Pulmonologist)\n• Dr. Mohammed Ali (Cardiologist)\n• Dr. Sneha Iyer (Emergency Medicine)\n\nGo to Dashboard → Teleconsultation to begin.';
      else if (lower.includes('health record') || lower.includes('record')) reply = '📋 Your health records are accessible from the Health Records section. You can view:\n\n• Hospital visit history\n• Prescriptions\n• Lab reports\n• Weight & hemoglobin trends\n\nGo to Dashboard → Health Records.';

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-24 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="glass rounded-2xl shadow-2xl w-80 mb-3 overflow-hidden flex flex-col"
            style={{ height: '460px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary-foreground" />
                <span className="text-sm font-semibold text-primary-foreground">MediSync AI Assistant</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground"><X className="w-4 h-4" /></button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-primary/10' : 'bg-accent'}`}>
                    {m.role === 'user' ? <User className="w-3.5 h-3.5 text-primary" /> : <Bot className="w-3.5 h-3.5 text-accent-foreground" />}
                  </div>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                    {m.content.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center"><Bot className="w-3.5 h-3.5 text-accent-foreground" /></div>
                  <div className="bg-muted rounded-xl px-3 py-2 text-xs text-muted-foreground">Thinking...</div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1">
                {quickReplies.map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)} className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors">{q}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask me anything..."
                className="flex-1 bg-muted rounded-xl px-3 py-2 text-xs text-foreground outline-none"
              />
              <button onClick={() => sendMessage(input)} className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
