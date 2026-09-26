import { projects } from './projects.js';
import { skills } from './skills.js';
import { achievements } from './achievements.js';
import { SOURAV_PROFILE } from './omenKnowledge.js';

/**
 * Canonical Single Source of Truth for Portfolio Knowledge
 * Normalizes and derives information from existing data files
 * to prevent knowledge duplication and desynchronization.
 */
export const portfolioKnowledge = {
  profile: {
    ...SOURAV_PROFILE,
    summary: `${SOURAV_PROFILE.name} is an ${SOURAV_PROFILE.role} based in ${SOURAV_PROFILE.location}. Dedicated to ${SOURAV_PROFILE.tagline} Education: ${SOURAV_PROFILE.education}.`
  },
  projects: projects.map((p) => ({
    title: p.title,
    shortDescription: p.shortDescription,
    longDescription: p.longDescription,
    features: p.features || [],
    tech: p.tech || [],
    github: p.github || null,
    live: p.live || null
  })),
  skills: skills.map((s) => ({
    name: s.name,
    category: s.category
  })),
  achievements: achievements.map((a) => ({
    title: a.title,
    organization: a.organization,
    category: a.category,
    description: a.description
  })),
  links: {
    github: SOURAV_PROFILE.github,
    linkedin: SOURAV_PROFILE.linkedin,
    email: SOURAV_PROFILE.email,
    resume: SOURAV_PROFILE.resume
  }
};

export default portfolioKnowledge;
