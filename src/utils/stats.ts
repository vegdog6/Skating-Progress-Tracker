import { PracticeLog, SkillProgress } from '../types';

export function calculateSkillProgress(logs: PracticeLog[], savedStatuses: Map<string, 'new' | 'learning' | 'mastered'>): SkillProgress[] {
  const progressMap = new Map<string, SkillProgress>();
  
  logs.forEach(log => {
    const existing = progressMap.get(log.skillId);
    
    if (!existing) {
      // First time practicing this skill

      progressMap.set(log.skillId, {
        skillId: log.skillId,
        skillName: log.skillName,
        status: savedStatuses.get(log.skillId) || 'learning',
        totalDays: 1,
        firstPracticeDate: log.date,
        lastPracticeDate: log.date
      });
    } else {
      // Update existing progress
      const dates = new Set<string>();
      logs
        .filter(l => l.skillId === log.skillId)
        .forEach(l => dates.add(l.date));
      
      existing.totalDays = dates.size;
      existing.lastPracticeDate = log.date;

      const savedStatus = savedStatuses.get(log.skillId);
      if (savedStatus) {
        existing.status = savedStatus;
      }
    }
  });
  return Array.from(progressMap.values());
}

export function getTodayLogs(logs: PracticeLog[], date: string): PracticeLog[] {
  return logs.filter(log => log.date === date);
}

