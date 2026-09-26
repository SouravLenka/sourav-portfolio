import { portfolioKnowledge } from '../data/portfolioKnowledge.js';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'were', 'will', 'with', 'what', 'who', 'how', 'tell',
  'me', 'about', 'can', 'you', 'give', 'some', 'any', 'show', 'does',
  'sourav', 'souravs', 'lenka'
]);

/**
 * Tokenize a text string into normalized, meaningful keywords
 * @param {string} text
 * @returns {string[]}
 */
function extractKeywords(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * Resolve pronoun or follow-up context from recent conversation history
 * @param {Array<{sender: string, text: string}>} history
 * @returns {string[]}
 */
function extractHistoryContext(history = []) {
  if (!Array.isArray(history) || history.length === 0) return [];

  const contextWords = [];
  // Look at last 3 messages
  const recent = history.slice(-3);
  for (const msg of recent) {
    if (!msg || !msg.text) continue;
    const lower = msg.text.toLowerCase();
    // Check if any project title is mentioned in recent conversation
    for (const proj of portfolioKnowledge.projects) {
      if (lower.includes(proj.title.toLowerCase())) {
        contextWords.push(proj.title.toLowerCase());
      }
    }
  }
  return contextWords;
}

/**
 * Retrieve targeted portfolio context relevant to the user's query and conversation history.
 * @param {string} query
 * @param {Array<{sender: string, text: string}>} [history=[]]
 * @returns {{ contextText: string, relevantProjects: Array, relevantSkills: Array, relevantActions: Array }}
 */
export function retrievePortfolioContext(query, history = []) {
  const normalizedQuery = (query || '').toLowerCase().trim();
  const queryTokens = extractKeywords(normalizedQuery);
  const historyTokens = extractHistoryContext(history);
  const combinedTokens = [...new Set([...queryTokens, ...historyTokens])];

  // 1. Score projects
  const scoredProjects = portfolioKnowledge.projects.map((proj) => {
    let score = 0;
    const titleLower = proj.title.toLowerCase();
    const descLower = (proj.longDescription || proj.shortDescription || '').toLowerCase();
    const techLower = proj.tech.map((t) => t.toLowerCase());

    // Direct title phrase match
    if (normalizedQuery.includes(titleLower)) score += 20;

    for (const token of combinedTokens) {
      if (titleLower.includes(token)) score += 10;
      if (techLower.some((t) => t.includes(token) || token.includes(t))) score += 6;
      if (descLower.includes(token)) score += 2;
      if (proj.features.some((f) => f.toLowerCase().includes(token))) score += 3;
    }

    return { proj, score };
  });

  scoredProjects.sort((a, b) => b.score - a.score);
  const isGenericProjectQuery = /projects?|work|portfolio|built|apps|showcase/i.test(normalizedQuery);
  const topProjects = scoredProjects
    .filter((sp) => sp.score > 3 || (isGenericProjectQuery && sp.score >= 0))
    .slice(0, isGenericProjectQuery ? 5 : 3)
    .map((sp) => sp.proj);

  // 2. Score skills
  const matchedSkills = portfolioKnowledge.skills.filter((skill) => {
    const nameLower = skill.name.toLowerCase();
    const catLower = skill.category.toLowerCase();
    return combinedTokens.some(
      (token) => nameLower.includes(token) || catLower.includes(token) || token.includes(nameLower)
    );
  });

  // 3. Score achievements
  const matchedAchievements = portfolioKnowledge.achievements.filter((ach) => {
    const textLower = `${ach.title} ${ach.organization} ${ach.category} ${ach.description}`.toLowerCase();
    return combinedTokens.some((token) => textLower.includes(token));
  });

  // 4. Intent checks
  const isContactQuery = /contact|hire|email|reach|message|touch|linkedin|github|phone/i.test(normalizedQuery);
  const isResumeQuery = /resume|cv|pdf|download|education|degree|qualification/i.test(normalizedQuery);
  const isAboutQuery = /who|about|bio|background|introduce|profile/i.test(normalizedQuery);

  // Build targeted context document
  const sections = [];

  // Always include brief profile header
  sections.push(
    `[OWNER PROFILE]\nName: ${portfolioKnowledge.profile.name}\nRole: ${portfolioKnowledge.profile.role}\nTagline: ${portfolioKnowledge.profile.tagline}\nLocation: ${portfolioKnowledge.profile.location}\nEducation: ${portfolioKnowledge.profile.education}\nGitHub: ${portfolioKnowledge.profile.github}\nLinkedIn: ${portfolioKnowledge.profile.linkedin}\nEmail: ${portfolioKnowledge.profile.email}\nResume: ${portfolioKnowledge.profile.resume}`
  );

  if (isAboutQuery || normalizedQuery.length < 15) {
    sections.push(`Bio Summary: ${portfolioKnowledge.profile.bio}`);
    sections.push(`Core Focus: ${portfolioKnowledge.profile.coreFocus.join(', ')}`);
  }

  // Include relevant projects
  if (topProjects.length > 0) {
    const projectSummaries = topProjects.map((p) => {
      const details = [
        `• Project: ${p.title}`,
        `  Summary: ${p.shortDescription}`,
        `  Tech: ${p.tech.join(', ')}`,
        p.features && p.features.length > 0 ? `  Key Features: ${p.features.slice(0, 3).join('; ')}` : '',
        p.github ? `  GitHub: ${p.github}` : '',
        p.live ? `  Live: ${p.live}` : ''
      ].filter(Boolean);
      return details.join('\n');
    });
    sections.push(`[RELEVANT PROJECTS]\n${projectSummaries.join('\n\n')}`);
  }

  // Include relevant skills
  if (matchedSkills.length > 0 || /skills?|tech|stack|tools|languages/i.test(normalizedQuery)) {
    const skillsToPresent = matchedSkills.length > 0 ? matchedSkills : portfolioKnowledge.skills.slice(0, 10);
    sections.push(
      `[MATCHED SKILLS]\n${skillsToPresent.map((s) => `${s.name} (${s.category})`).join(', ')}`
    );
  }

  // Include relevant achievements
  if (matchedAchievements.length > 0 || /certif|achievement|award|hackathon/i.test(normalizedQuery)) {
    sections.push(
      `[ACHIEVEMENTS & CERTIFICATIONS]\n${(matchedAchievements.length > 0 ? matchedAchievements : portfolioKnowledge.achievements.slice(0, 4))
        .map((a) => `• ${a.title} (${a.organization}) - ${a.description}`)
        .join('\n')}`
    );
  }

  // Recommended actions to suggest to the model
  const suggestedActions = [];
  if (topProjects.length > 0) {
    suggestedActions.push({ label: "View Projects", actionType: "scroll", target: "projects" });
  }
  if (isResumeQuery || isAboutQuery) {
    suggestedActions.push({ label: "📄 Resume (PDF)", actionType: "link", target: "/resume.pdf", download: true });
  }
  if (isContactQuery) {
    suggestedActions.push({ label: "Contact Sourav", actionType: "scroll", target: "contact" });
    suggestedActions.push({ label: "LinkedIn", actionType: "link", target: portfolioKnowledge.profile.linkedin });
  }

  return {
    contextText: sections.join('\n\n'),
    relevantProjects: topProjects,
    relevantSkills: matchedSkills,
    suggestedActions: suggestedActions.slice(0, 3)
  };
}

export default retrievePortfolioContext;
