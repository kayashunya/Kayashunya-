import { useState } from 'react';
import { X, Users, MessageSquare, Heart, Send, Sparkles } from 'lucide-react';

interface CommunityModalProps {
  onClose: () => void;
}

interface DiscussionPost {
  id: string;
  author: string;
  circle: string;
  time: string;
  question: string;
  responsesCount: number;
  likes: number;
}

export function CommunityModal({ onClose }: CommunityModalProps) {
  const [activeCircle, setActiveCircle] = useState<string>('All');
  const [posts, setPosts] = useState<DiscussionPost[]>([
    {
      id: 'p1',
      author: 'Priya N.',
      circle: 'Advaita & Self-Inquiry',
      time: '2h ago',
      question: 'When thoughts arise during silent sitting, what is the most direct way to observe without slipping into judgment or suppression?',
      responsesCount: 14,
      likes: 29,
    },
    {
      id: 'p2',
      author: 'Karan M.',
      circle: 'Bhagavad Gita in Daily Life',
      time: '5h ago',
      question: 'How do you balance Nishkama Karma (action without attachment to fruits) when your performance at work is evaluated strictly by metric outcomes?',
      responsesCount: 22,
      likes: 47,
    },
    {
      id: 'p3',
      author: 'Sunil V.',
      circle: 'Morning Dhyana & Sadhana',
      time: 'Yesterday',
      question: 'The 6:00 AM silent contemplation timer has completely anchored my morning. Who else has maintained their streak this week?',
      responsesCount: 31,
      likes: 68,
    },
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  const circles = ['All', 'Advaita & Self-Inquiry', 'Bhagavad Gita in Daily Life', 'Morning Dhyana & Sadhana'];

  const filteredPosts = activeCircle === 'All' ? posts : posts.filter((p) => p.circle === activeCircle);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const newEntry: DiscussionPost = {
      id: `p_${Date.now()}`,
      author: 'You (Seeker)',
      circle: activeCircle === 'All' ? 'Advaita & Self-Inquiry' : activeCircle,
      time: 'Just now',
      question: newQuestion.trim(),
      responsesCount: 0,
      likes: 1,
    };
    setPosts([newEntry, ...posts]);
    setNewQuestion('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 
                style={{ fontFamily: "'Cinzel', serif" }}
                className="font-bold text-stone-900 text-sm"
              >
                Kayasun Satsang Community
              </h3>
              <p className="text-[11px] text-stone-500">
                Thoughtful inquiry & spiritual circles with fellow seekers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Circle Filter Tags */}
        <div className="px-5 py-2.5 bg-stone-50 border-b border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {circles.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCircle(c)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeCircle === c
                  ? 'bg-amber-800 text-white font-semibold'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-xl bg-white border border-stone-200 hover:border-amber-200 shadow-2xs transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-900">{post.author}</span>
                <span className="text-[11px] text-stone-400">{post.time}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                {post.circle}
              </span>
              <p className="mt-2 text-xs text-stone-700 leading-relaxed font-normal">
                {post.question}
              </p>
              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-4 text-xs text-stone-500">
                <span className="flex items-center gap-1 hover:text-amber-800 cursor-pointer">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                  <span>{post.likes}</span>
                </span>
                <span className="flex items-center gap-1 hover:text-amber-800 cursor-pointer">
                  <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                  <span>{post.responsesCount} responses</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handlePost} className="p-3 bg-stone-50 border-t border-stone-200 flex items-center gap-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Contemplate or ask the circle..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
