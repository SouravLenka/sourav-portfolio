import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, Send, X, Volume2, VolumeX, Trash2, 
  ChevronRight, Terminal, ExternalLink, Volume1 
} from 'lucide-react';
import { queryOmen, handleOmenAction } from '../../utils/omenEngine';
import { 
  playOpenSound, playCloseSound, playMessageSentSound, 
  playMessageReceivedSound, isAudioMuted, toggleAudioMute,
  speakOmenText, stopOmenSpeech, isSpeechActive, toggleSpeech
} from '../../utils/omenAudio';
import { QUICK_PROMPTS, SOURAV_PROFILE } from '../../data/omenKnowledge';
import './OmenAgent.css';

const OmenAgent = ({ isOpenExternal, onCloseExternal }) => {
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speechOn, setSpeechOn] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'omen',
      title: 'OMEN Intelligence Protocol Initialized',
      text: `Greetings! I am **OMEN**, Sourav Lenka's autonomous AI assistant.\n\nAsk me anything about Sourav's **AI/RAG projects**, **technical skills**, **experience**, or select a topic below to get started.`,
      actions: [
        { label: "⚡ About Sourav", actionType: "query", target: "Who is Sourav Lenka?" },
        { label: "🚀 RAG Projects", actionType: "scroll", target: "projects" },
        { label: "📄 Resume", actionType: "link", target: "/resume.pdf", download: true }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const isOpen = isOpenExternal !== undefined ? isOpenExternal : isOpenInternal;

  useEffect(() => {
    setMuted(isAudioMuted());
    setSpeechOn(isSpeechActive());
  }, []);

  useEffect(() => {
    if (isOpen) {
      playOpenSound();
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      stopOmenSpeech();
      setSpeakingMsgId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleToggleOpen = (state) => {
    const nextState = state !== undefined ? state : !isOpen;
    if (onCloseExternal && !nextState) {
      onCloseExternal();
    } else {
      setIsOpenInternal(nextState);
    }

    if (!nextState) {
      playCloseSound();
    }
  };

  const handleSendQuery = async (queryText) => {
    const textToProcess = (queryText || inputQuery).trim();
    if (!textToProcess || isTyping) return;

    setInputQuery('');
    playMessageSentSound();
    stopOmenSpeech();
    setSpeakingMsgId(null);

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToProcess,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate cyber neural processing time for fluid UX
    setTimeout(async () => {
      const response = await queryOmen(textToProcess);
      playMessageReceivedSound();

      const newId = `omen-${Date.now()}`;
      const omenMsg = {
        id: newId,
        sender: 'omen',
        title: response.title,
        text: response.text,
        actions: response.actions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, omenMsg]);
      setIsTyping(false);

      if (isSpeechActive()) {
        setSpeakingMsgId(newId);
        speakOmenText(response.text);
      }
    }, 600);
  };

  const handleSpeakMessage = (msgId, text) => {
    if (speakingMsgId === msgId) {
      stopOmenSpeech();
      setSpeakingMsgId(null);
    } else {
      setSpeakingMsgId(msgId);
      speakOmenText(text);
    }
  };

  const handleClearHistory = () => {
    stopOmenSpeech();
    setSpeakingMsgId(null);
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'omen',
        title: 'Memory Cleared',
        text: 'Chat history has been reset. How else can I assist you with Sourav\'s portfolio?',
        actions: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleAudioToggle = () => {
    const nextMuteState = toggleAudioMute();
    setMuted(nextMuteState);
  };

  // Helper to render markdown formatting (bold, bullet points, line breaks, links)
  const renderFormattedText = (content) => {
    if (!content) return null;

    const lines = content.split('\n');

    return lines.map((line, lIdx) => {
      // Process bold formatting **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const formattedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-semibold text-[#38bdf8]">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <div key={lIdx} className={line.startsWith('•') || line.startsWith('1.') ? 'pl-2 my-1' : 'my-0.5'}>
          {formattedLine}
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button (Bottom Right) */}
      {!isOpen && (
        <motion.button
          onClick={() => handleToggleOpen(true)}
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label="Ask OMEN about me"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 px-4 py-2.5 rounded-full omen-launcher-glass text-white cursor-pointer group"
        >
          {/* Avatar Icon Pill */}
          <div className="relative flex items-center justify-center p-2 rounded-full bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8] group-hover:scale-105 transition-transform duration-300">
            <Bot size={19} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 omen-pulse-dot" />
          </div>

          {/* Action Text */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide text-slate-200 pr-1">
            <span>Ask <span className="text-[#38bdf8] font-bold">OMEN</span> about me</span>
            <Sparkles size={13} className="text-[#38bdf8] animate-pulse" />
          </div>
        </motion.button>
      )}

      {/* Cyber AI Agent Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ y: '100%', opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: '100%', opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl h-[85vh] sm:h-[650px] rounded-t-3xl sm:rounded-2xl omen-modal-glass flex flex-col overflow-hidden text-white border border-white/15"
            >
              {/* Scanlines visual accent overlay */}
              <div className="absolute inset-0 omen-scanlines opacity-30 z-0" />

              {/* Cyber Modal Header */}
              <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111827]/80">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-[#38bdf8]">
                    <Bot size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-mono font-bold text-sm sm:text-base tracking-wider text-white">
                        OMEN <span className="text-[#38bdf8]">// PORTFOLIO AI</span>
                      </h3>
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Autonomous Intelligence Unit & Interactive Guide
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const nextState = toggleSpeech();
                      setSpeechOn(nextState);
                      if (!nextState) {
                        stopOmenSpeech();
                        setSpeakingMsgId(null);
                      }
                    }}
                    title={speechOn ? 'Auto Voice Readout ON (Click to disable)' : 'Auto Voice Readout OFF (Click to enable)'}
                    className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                      speechOn 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(34,197,94,0.2)]' 
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <Volume1 size={15} />
                    <span className="hidden sm:inline text-[10px] font-bold">{speechOn ? 'VOICE ON' : 'VOICE OFF'}</span>
                  </button>
                  <button
                    onClick={handleAudioToggle}
                    title={muted ? 'Unmute SFX' : 'Mute SFX'}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  >
                    {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <button
                    onClick={handleClearHistory}
                    title="Clear Chat History"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => handleToggleOpen(false)}
                    title="Minimize OMEN"
                    className="p-2 rounded-lg bg-white/5 hover:bg-[#38bdf8]/20 text-slate-300 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* System HUD Status Ribbon */}
              <div className="relative z-10 px-6 py-1.5 bg-[#0b0f14]/80 border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Terminal size={10} className="text-[#38bdf8]" /> STATUS: ACTIVE
                </span>
                <span className="hidden sm:inline">KNOWLEDGE: SOURAV LENKA (v2.5)</span>
                <span>VOICE ENGINE: ACTIVE</span>
              </div>

              {/* Chat Conversation Thread */}
              <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 omen-chat-scroll">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {/* User Message */}
                    {msg.sender === 'user' ? (
                      <div className="max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl rounded-tr-none bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-white text-sm shadow-lg">
                        <div className="text-xs text-[#38bdf8] font-mono mb-1 font-bold">YOU</div>
                        <div>{msg.text}</div>
                        <div className="text-[9px] text-white/40 text-right mt-1 font-mono">{msg.timestamp}</div>
                      </div>
                    ) : (
                      /* OMEN Message */
                      <div className="max-w-[90%] sm:max-w-[85%] p-4 rounded-2xl rounded-tl-none bg-[#111827]/90 border border-white/10 text-white text-sm shadow-xl backdrop-blur-md">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                          <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#38bdf8]">
                            <Bot size={14} /> {msg.title || 'OMEN // RESPONSE'}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSpeakMessage(msg.id, msg.text)}
                              title={speakingMsgId === msg.id ? "Stop voice readout" : "Read response out loud (Male voice)"}
                              className={`p-1 rounded flex items-center gap-1 text-[10px] font-mono transition-colors ${
                                speakingMsgId === msg.id 
                                  ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 animate-pulse' 
                                  : 'text-slate-400 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <Volume1 size={13} />
                              <span>{speakingMsgId === msg.id ? 'SPEAKING...' : 'SPEAK'}</span>
                            </button>
                            <span className="text-[9px] text-slate-500 font-mono">{msg.timestamp}</span>
                          </div>
                        </div>

                        <div className="text-slate-200 leading-relaxed space-y-1 font-sans text-sm">
                          {renderFormattedText(msg.text)}
                        </div>

                        {/* Interactive Action Pills */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10">
                            {msg.actions.map((act, aIdx) => (
                              <button
                                key={aIdx}
                                onClick={() => handleOmenAction(act, (q) => handleSendQuery(q))}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38bdf8]/15 hover:bg-[#38bdf8]/30 border border-[#38bdf8]/30 text-xs text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                              >
                                {act.label}
                                {act.actionType === 'link' && <ExternalLink size={12} />}
                                {act.actionType === 'scroll' && <ChevronRight size={12} />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing Stream Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 p-3 rounded-2xl bg-[#111827]/90 border border-white/10 w-fit"
                  >
                    <Bot size={16} className="text-[#38bdf8] animate-spin" />
                    <span className="text-xs font-mono text-slate-400">OMEN IS PROCESSING...</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] omen-typing-dot" />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 omen-typing-dot" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 omen-typing-dot" />
                    </div>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Quick Prompt Selector */}
              <div className="relative z-10 px-4 py-2 bg-[#0b0f14]/80 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handleSendQuery(prompt.query)}
                    className="flex-none px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#38bdf8]/20 border border-white/10 hover:border-[#38bdf8]/40 text-xs text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              {/* Input Control Bar */}
              <div className="relative z-10 p-4 border-t border-white/10 bg-[#0b0f14]/95">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendQuery();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Ask OMEN about Sourav's projects, RAG systems, skills..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#38bdf8] focus:outline-none text-sm text-white placeholder:text-slate-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isTyping}
                    className="p-3 rounded-xl bg-[#38bdf8] hover:bg-[#38bdf8]/80 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OmenAgent;
