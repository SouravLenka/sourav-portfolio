import React from 'react';

const SkillCard = ({ skill }) => {
  return (
    <div className="flex items-center justify-center bg-card/80 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2 hover:border-accent/50 hover:bg-card transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
      <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">
        {skill}
      </span>
    </div>
  );
};

export default SkillCard;
