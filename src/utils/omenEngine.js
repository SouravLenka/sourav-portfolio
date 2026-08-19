import { KNOWLEDGE_TOPICS, DEFAULT_FALLBACK, SOURAV_PROFILE } from '../data/omenKnowledge';

/**
 * Process a user query against OMEN's knowledge base.
 * @param {string} userQuery
 * @returns {Promise<{ title: string, text: string, actions?: Array, intent?: string }>}
 */
export async function queryOmen(userQuery) {
  if (!userQuery || typeof userQuery !== 'string') {
    return DEFAULT_FALLBACK;
  }

  const normalized = userQuery.toLowerCase().trim();
  const words = normalized.split(/\W+/).filter(Boolean);

  let bestMatch = null;
  let highestScore = 0;

  for (const topic of KNOWLEDGE_TOPICS) {
    let score = 0;
    for (const keyword of topic.keywords) {
      if (normalized.includes(keyword)) {
        // Full phrase/word match
        score += keyword.length > 3 ? 3 : 2;
      } else {
        // Partial word match check
        for (const w of words) {
          if (w.length >= 3 && (keyword.startsWith(w) || w.startsWith(keyword))) {
            score += 1;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = topic;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return {
      title: bestMatch.title,
      text: bestMatch.text,
      actions: bestMatch.actions || [],
      intent: bestMatch.intent
    };
  }

  // Greeting check
  if (/^(hi|hello|hey|greetings|hola|sup|yo)\b/i.test(normalized)) {
    return {
      title: "Greetings human!",
      text: `Welcome to Sourav Lenka's portfolio. I am **OMEN**, his custom AI guide.\n\nI can answer questions about Sourav's work in **AI/LLM Engineering**, **RAG Architecture**, **Python Automation**, and **Full-Stack Development**. How can I help you today?`,
      actions: [
        { label: "⚡ Tell me about Sourav", actionType: "query", target: "Who is Sourav Lenka?" },
        { label: "🚀 View RAG Projects", actionType: "scroll", target: "projects" }
      ],
      intent: "greeting"
    };
  }

  return DEFAULT_FALLBACK;
}

/**
 * Helper to handle action clicks inside OMEN response UI
 * @param {object} action
 * @param {function} onQueryCallback
 */
export function handleOmenAction(action, onQueryCallback) {
  if (!action) return;

  if (action.actionType === 'scroll') {
    const el = document.getElementById(action.target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (action.actionType === 'link') {
    if (action.download) {
      const a = document.createElement('a');
      a.href = action.target;
      a.download = 'Sourav_Lenka_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(action.target, '_blank', 'noopener,noreferrer');
    }
  } else if (action.actionType === 'query' && onQueryCallback) {
    onQueryCallback(action.target);
  }
}
