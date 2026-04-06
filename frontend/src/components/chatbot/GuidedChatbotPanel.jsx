import React, { useEffect, useRef } from 'react';
import { X, Sparkles, RotateCcw, ArrowLeft, Scale } from 'lucide-react';

function formatAssistantText(text) {
  if (!text) return null;
  return text.split('\n\n').map((para, i) => (
    <p key={i} className={i > 0 ? 'mt-3' : ''}>
      {para}
    </p>
  ));
}

/**
 * @param {{
 *   messages: Array<{ role: string, id: string, text?: string, nodeId?: string, isBack?: boolean }>,
 *   currentOptions: Array<object>,
 *   currentNodeId: string,
 *   stack: string[],
 *   isTyping: boolean,
 *   selectOption: (opt: object) => void,
 *   goBack: () => void,
 *   startOver: () => void,
 *   onClose: () => void,
 *   phoneDisplay?: string,
 * }} props
 */
export default function GuidedChatbotPanel({
  messages,
  currentOptions,
  currentNodeId,
  stack,
  isTyping,
  selectOption,
  goBack,
  startOver,
  onClose,
  phoneDisplay,
}) {
  const scrollRef = useRef(null);
  const liveRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping, currentOptions]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-[5.5rem] right-6 z-[60] w-[min(100vw-1.5rem,26rem)] md:w-[28rem] max-h-[min(85vh,36rem)] flex flex-col rounded-2xl shadow-2xl border border-navy/10 overflow-hidden bg-grey-light animate-slide-down"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guided-chatbot-title"
    >
      <header className="flex-shrink-0 bg-gradient-to-r from-navy to-navy-dark text-white px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold text-navy">
              <Scale className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <h2 id="guided-chatbot-title" className="font-serif text-lg font-semibold leading-tight">
                GAG Assistant
              </h2>
              <p className="text-xs text-white/75 font-sans mt-0.5 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-gold" aria-hidden />
                Guided help — tap an option below
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-white/90 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close chat assistant"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-4 space-y-3 bg-gradient-to-b from-white to-grey-light"
      >
        {messages.map((m) =>
          m.role === 'assistant' ? (
            <div key={m.id} className="flex gap-2 justify-start">
              <div
                className="hidden sm:flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-gold"
                aria-hidden
              >
                G
              </div>
              <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-white border border-gray-100 px-3.5 py-2.5 shadow-sm">
                <div className="font-sans text-sm text-gray-800 leading-relaxed">
                  {formatAssistantText(m.text)}
                </div>
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-end">
              <div
                className={`max-w-[90%] rounded-2xl rounded-tr-md px-3.5 py-2 font-sans text-sm shadow-md ${
                  m.isBack
                    ? 'bg-navy/10 text-navy border border-navy/15'
                    : 'bg-navy text-white'
                }`}
              >
                {m.text}
              </div>
            </div>
          )
        )}

        {isTyping && (
          <div className="flex gap-2 justify-start" aria-live="polite">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-gold sm:flex">
              G
            </div>
            <div className="rounded-2xl rounded-tl-md bg-white border border-gray-100 px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold/80 [animation-delay:-0.2s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold/80 [animation-delay:-0.1s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold/80" />
              </div>
            </div>
          </div>
        )}

        <span ref={liveRef} className="sr-only" aria-live="polite">
          {messages.length ? `Latest: ${messages[messages.length - 1]?.text || ''}` : ''}
        </span>
      </div>

      <div className="flex-shrink-0 border-t border-gray-200 bg-white px-3 py-3 space-y-2">
        <div className="flex flex-wrap gap-2">
          {stack.length > 0 && (
            <button
              type="button"
              onClick={goBack}
              disabled={isTyping}
              className="inline-flex items-center gap-1 rounded-full border border-navy/20 bg-white px-3 py-1.5 text-xs font-sans font-medium text-navy hover:bg-navy/5 disabled:opacity-50"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>
          )}
          <button
            type="button"
            onClick={startOver}
            disabled={isTyping}
            className="inline-flex items-center gap-1 rounded-full border border-gold/50 bg-gold/10 px-3 py-1.5 text-xs font-sans font-medium text-navy hover:bg-gold/20 disabled:opacity-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Start over
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto pr-0.5">
          {!isTyping &&
            currentOptions.map((opt) => (
              <button
                key={`${currentNodeId}-${opt.id}`}
                type="button"
                onClick={() => selectOption(opt)}
                className="group w-full text-left rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 font-sans text-sm text-navy transition-all hover:border-gold/60 hover:bg-gold/5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1"
              >
                <span className="font-medium group-hover:text-navy">{opt.label}</span>
              </button>
            ))}
        </div>

        <p className="text-center text-[10px] text-gray-500 font-sans leading-snug pt-1">
          General information only — not legal advice.
          {phoneDisplay ? ` · ${phoneDisplay}` : ''}
        </p>
      </div>
    </div>
  );
}
