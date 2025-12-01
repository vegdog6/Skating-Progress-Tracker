import { SkillDefinition, PracticeLog, SkillProgress } from '../types';

interface SkillGridProps {
  skills: SkillDefinition[];
  todayLogs: PracticeLog[];
  skillProgress: SkillProgress[];
  onLogPractice: (skill: SkillDefinition, variant?: string) => void;
}

export default function SkillGrid({ skills, todayLogs, skillProgress, onLogPractice }: SkillGridProps) {
  const getSkillStatus = (skillId: string): 'new' | 'learning' | 'mastered' => {
    const progress = skillProgress.find(p => p.skillId === skillId);
    return progress?.status || 'new';
  };

  return (
    <div className="skills-grid">
      {skills.map(skill => {
        const practicedToday = todayLogs.some(log => log.skillId === skill.id);
        const status = getSkillStatus(skill.id);
        
        return (
          <div key={skill.id} className="skill-button-wrapper">
            {skill.variants ? (
              <select 
                className={`skill-button skill-${skill.category} skill-status-${status} ${practicedToday ? 'practiced' : ''}`}
                onChange={(e) => {
                  if (e.target.value) {
                    onLogPractice(skill, e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
              >
                <option value="" disabled>{skill.name} ▼</option>
                {skill.variants.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            ) : (
              <button
                className={`skill-button skill-${skill.category} skill-status-${status} ${practicedToday ? 'practiced' : ''}`}
                onClick={() => onLogPractice(skill)}
              >
                {skill.name}
                {status === 'mastered' && ' ✨'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}