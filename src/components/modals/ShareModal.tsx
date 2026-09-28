import { useState } from 'react';
import { X, Check, Copy, MessageCircle } from 'lucide-react';
import type { WisdomContent } from '../../types/cms';
import { useCms } from '../../context/CmsContext';

interface ShareModalProps {
  item: WisdomContent | null;
  customQuote?: { quote: string; author: string } | null;
  onClose: () => void;
}

export function ShareModal({ item, customQuote, onClose }: ShareModalProps) {
  const { appSettings } = useCms();
  const [copied, setCopied] = useState(false);

  if (!item && !customQuote) return null;

  const quoteText = customQuote
    ? customQuote.quote
    : item?.quoteHighlight || item?.subtitle || item?.title || '';
  const authorText = customQuote ? customQuote.author : item?.author || 'Acharya';

  const shareMessage = `✨ *${appSettings.appName} Daily Wisdom*\n\n"${quoteText}"\n\n— ${authorText}\n\nRead more on ${appSettings.appName}: ${appSettings.websiteUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(shareMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4.5 h-4.5 text-emerald-600" />
            <h3 className="font-semibold text-stone-900 text-sm">Share Daily Wisdom</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Spiritual Quote Preview Card */}
        <div className="p-5">
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 relative">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
              {item?.category || 'SUTRA'}
            </span>
            <p 
              style={{ fontFamily: "'Lora', Georgia, serif" }}
              className="mt-2 text-stone-900 text-sm leading-relaxed italic"
            >
              “{quoteText}”
            </p>
            <div className="mt-3 pt-2.5 border-t border-amber-200/50 flex items-center justify-between text-xs text-amber-900/80">
              <span className="font-medium">— {authorText}</span>
              <span className="text-[11px] opacity-75">{appSettings.appName}</span>
            </div>
          </div>

          <p className="mt-3 text-xs text-stone-500 text-center">
            Formatted beautifully for WhatsApp chats and spiritual circles.
          </p>

          {/* Action Buttons */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
              <span>{copied ? 'Copied!' : 'Copy Quote'}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share to WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
