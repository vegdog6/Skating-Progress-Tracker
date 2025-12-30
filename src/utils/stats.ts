import { PracticeLog, SkillProgress } from '../types';

export function calculateSkillProgress(
  logs: PracticeLog[], 
  savedStatuses: Map<string, 'new' | 'learning' | 'mastered'>
): SkillProgress[] {
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
        masteredDate: log.wasMastered ? log.date : undefined
      });
    } else {
      // Update existing progress
      const skillLogs = logs.filter(l => l.skillId === log.skillId);
      const dates = new Set<string>();
      skillLogs.forEach(l => dates.add(l.date));
      
      existing.totalDays = dates.size;
      
      // Update status from saved statuses
      const savedStatus = savedStatuses.get(log.skillId);
      if (savedStatus) {
        existing.status = savedStatus;
      }
      
      // Find mastered date from logs
      const masteredLog = skillLogs.find(l => l.wasMastered);
      if (masteredLog) {
        existing.masteredDate = masteredLog.date;
      }
    }
  });
  
  return Array.from(progressMap.values());
}

export function getTodayLogs(logs: PracticeLog[], date: string): PracticeLog[] {
  return logs.filter(log => log.date === date);
}