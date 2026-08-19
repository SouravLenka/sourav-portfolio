/**
 * Web Audio API synthesizer for OMEN Cyber Sound Effects
 * & Browser Web Speech API Ultra-Smooth Male Voice TTS Engine.
 * Zero external sound file dependencies.
 */

let audioCtx = null;
let isMuted = localStorage.getItem('omen_muted') === 'true';
let isSpeechEnabled = localStorage.getItem('omen_speech') === 'true';

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioMuted() {
  return isMuted;
}

export function toggleAudioMute() {
  isMuted = !isMuted;
  localStorage.setItem('omen_muted', isMuted ? 'true' : 'false');
  if (isMuted) stopOmenSpeech();
  return isMuted;
}

export function isSpeechActive() {
  return isSpeechEnabled;
}

export function toggleSpeech() {
  isSpeechEnabled = !isSpeechEnabled;
  localStorage.setItem('omen_speech', isSpeechEnabled ? 'true' : 'false');
  if (!isSpeechEnabled) stopOmenSpeech();
  return isSpeechEnabled;
}

export function stopOmenSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Format raw text into clean, fluent natural speech phrasing with phonetic corrections.
 */
export function formatTextForSmoothSpeech(text) {
  if (!text) return '';

  return text
    // Remove markdown bold / italic formatting
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`/g, '')
    // Replace markdown links [title](url) -> title
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove raw URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove emojis for clean pronunciation
    .replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
    // Clean bullet points & numbered lists
    .replace(/^[•\-\*\d+\.]\s+/gm, '')
    .replace(/^#+\s+/gm, '')
    // Phonetic Name Corrections for natural TTS pronunciation
    .replace(/\bSourav's\b/gi, "Soh-rav's")
    .replace(/\bSourav\b/gi, 'Soh-rav')
    .replace(/\bLenka\b/gi, 'Len-kah')
    // Phonetic Tech Stack Corrections
    .replace(/\bAI\b/g, 'A.I.')
    .replace(/\bLLM\b/g, 'L L M')
    .replace(/\bLLMs\b/g, 'L L Ms')
    .replace(/\bRAG\b/g, 'Rag')
    .replace(/\bFAISS\b/gi, 'Fice')
    .replace(/\bChromaDB\b/gi, 'Chroma D B')
    .replace(/\bLangChain\b/gi, 'Lang Chain')
    .replace(/\bOpenCV\b/gi, 'Open C V')
    .replace(/\bGodot\b/gi, 'Goh-doh')
    .replace(/\bPDF\b/g, 'P D F')
    .replace(/\bOCR\b/g, 'O C R')
    .replace(/\bQ&A\b/g, 'Q and A')
    .replace(/\bB\.Tech\b/gi, 'B Tech')
    .replace(/\be\.g\.\b/g, 'for example')
    .replace(/\bi\.e\.\b/g, 'that is')
    // Replace newlines with natural phrase pauses
    .replace(/\n+/g, '. ')
    // Normalize extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

export function speakOmenText(text) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  stopOmenSpeech();

  const cleanText = formatTextForSmoothSpeech(text);
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Energetic natural speech speed & pitch
  utterance.rate = 1.06; // Faster, natural tempo
  utterance.pitch = 1.0;

  const getMaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Guy') || v.name.includes('Ryan') || v.name.includes('Natural') || v.name.includes('Online'))) ||
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google UK English Male') || v.name.includes('Google US English Male'))) ||
      voices.find(v => v.lang.startsWith('en') && (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Daniel') || v.name.includes('Alex') || v.name.includes('George') || v.name.includes('Rishi'))) ||
      voices.find(v => v.lang.startsWith('en') && !v.name.includes('Zira') && !v.name.includes('Hazel') && !v.name.includes('Susan') && !v.name.includes('Catherine') && !v.name.includes('Linda'))
    );
  };

  const selectedVoice = getMaleVoice();
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // Handle Chrome async voice loading fallback
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      const reloadedVoice = getMaleVoice();
      if (reloadedVoice) utterance.voice = reloadedVoice;
      window.speechSynthesis.speak(utterance);
    };
  } else {
    window.speechSynthesis.speak(utterance);
  }
}

export function playOpenSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // Ignore audio errors on un-interacted DOMs
  }
}

export function playCloseSound() {
  stopOmenSpeech();
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    // Ignore audio errors
  }
}

export function playMessageSentSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.07, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {
    // Ignore audio errors
  }
}

export function playMessageReceivedSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.12);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.25);
  } catch (e) {
    // Ignore audio errors
  }
}
