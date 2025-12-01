export interface SkillDefinition {
    id: string;
    name: string;
    category: 'jumps' | 'spins' | 'footwork' | 'field-moves';
    variants?: string[];
  }
  
  export interface PracticeLog {
    id: string; 
    skillId: string;
    skillName: string;
    date: string;
    variant?: string;
    note?: string;
  }
  
  export interface SkillProgress {
    skillId: string;
    skillName: string;
    status: 'new' | 'learning' | 'mastered';
    totalDays: number;
    firstPracticeDate?: string;
    lastPracticeDate?: string;
  }