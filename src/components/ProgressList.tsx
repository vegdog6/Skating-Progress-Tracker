import { useState } from 'react';
import { SkillProgress, PracticeLog } from '../types';
import { PRESET_SKILLS } from '../utils/skills';

interface ProgressListProps {
  progress: SkillProgress[];
  logs: PracticeLog[];
  onChangeStatus: (skillId: string, status: 'new' | 'learning' | 'mastered') => void;
  onSelectDate: (date: string) => void;
}

export default function ProgressList({ progress, logs, onChangeStatus, onSelectDate }: ProgressListProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['jumps', 'spins', 'footwork', 'field-moves']));
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
  const [showNewSkills, setShowNewSkills] = useState<Set<string>>(new Set());

  const toggleShowNew = (category: string) => {
    const newSet = new Set(showNewSkills);
    if (newSet.has(category)) {
      newSet.delete(category);
    } else {
      newSet.add(category);
    }
    setShowNewSkills(newSet);
  };

  const toggleCategory = (category: string) => {
    const newSet = new Set(expandedCategories);
    if (newSet.has(category)) {
      newSet.delete(category);
    } else {
      newSet.add(category);
    }
    setExpandedCategories(newSet);
  };

  const toggleSkill = (skillId: string) => {
    const newSet = new Set(expandedSkills);
    if (newSet.has(skillId)) {
      newSet.delete(skillId);
    } else {
      newSet.add(skillId);
    }
    setExpandedSkills(newSet);
  };

  const getSkillNotes = (skillId: string) => {
    return logs
      .filter(log => log.skillId === skillId && log.note)
      .sort((a, b) => b.date.localeCompare(a.date));
  };

  const categories = [
    { id: 'jumps', name: 'Jumps', emoji: '🦘' },
    { id: 'spins', name: 'Spins', emoji: '🌀' },
    { id: 'footwork', name: 'Footwork', emoji: '👣' },
    { id: 'field-moves', name: 'Field Moves', emoji: '⛸️' }
  ];

  const getSkillsByCategory = (categoryId: string) => {
    const categorySkills = PRESET_SKILLS.filter(s => s.category === categoryId);
    const skillsWithProgress = categorySkills.map(skill => {
      const prog = progress.find(p => p.skillId === skill.id);
      return {
        ...skill,
        progress: prog || {
          skillId: skill.id,
          skillName: skill.name,
          status: 'new' as const,
          totalDays: 0
        }
      };
    });
    
    return skillsWithProgress.sort((a, b) => {
      if (a.progress.status !== b.progress.status) {
        const order = { 'mastered': 0, 'learning': 1, 'new': 2 };
        return order[a.progress.status] - order[b.progress.status];
      }
      return b.progress.totalDays - a.progress.totalDays;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'mastered': return '✨';
      case 'learning': return '🟡';
      case 'new': return '⚪';
      default: return '⚪';
    }
  };

  return (
    <div className="progress-section">
      <h2>📊 Skill Progress Tree</h2>
      
      <div className="skill-tree">
        {categories.map(category => {
          const skills = getSkillsByCategory(category.id);
          const isExpanded = expandedCategories.has(category.id);
          const masteredCount = skills.filter(s => s.progress.status === 'mastered').length;
          const learningCount = skills.filter(s => s.progress.status === 'learning').length;
          
          return (
            <div key={category.id} className={`category-group category-${category.id}`}>
              <div 
                className="category-header"
                onClick={() => toggleCategory(category.id)}
              >
                <span className="category-toggle">{isExpanded ? '▼' : '▶'}</span>
                <span className="category-title">
                  {category.emoji} {category.name} ({skills.length} skills)
                </span>
                <span className="category-stats">
                  ✨ {masteredCount} | 🟡 {learningCount}
                </span>
              </div>
              
              {isExpanded && (
                <div className="skills-tree-list">
                  {skills.filter(s => s.progress.status !== 'new' || showNewSkills.has(category.id)).map(skill => {
                    const notes = getSkillNotes(skill.id);
                    const isSkillExpanded = expandedSkills.has(skill.id);
                    const isNew = skill.progress.status === 'new';
                    
                    return (
                      <div 
                        key={skill.id} 
                        className={`skill-tree-item skill-tree-${category.id} skill-tree-status-${skill.progress.status} ${isNew ? 'skill-compact' : ''}`}
                      >
                        <div className="skill-tree-header">
                          <div className="skill-tree-info">
                            <span className="status-icon">{getStatusIcon(skill.progress.status)}</span>
                            <span className="skill-tree-name">{skill.name}</span>
                            {!isNew && skill.progress.totalDays > 0 && (
                              <span className="skill-tree-days">📊 {skill.progress.totalDays} days</span>
                            )}
                          </div>
                          
                          {!isNew && (
                            <div className="skill-tree-actions">
                              {notes.length > 0 && (
                                <button 
                                  className="notes-toggle"
                                  onClick={() => toggleSkill(skill.id)}
                                >
                                  📝 {notes.length} {isSkillExpanded ? '▼' : '▶'}
                                </button>
                              )}
                              
                              <div className="status-buttons-mini">
                                <button
                                  className={`status-btn-mini ${skill.progress.status === 'learning' ? 'active' : ''}`}
                                  onClick={() => onChangeStatus(skill.id, 'learning')}
                                  title="Learning"
                                >
                                  🟡
                                </button>
                                <button
                                  className={`status-btn-mini ${skill.progress.status === 'mastered' ? 'active' : ''}`}
                                  onClick={() => onChangeStatus(skill.id, 'mastered')}
                                  title="Mastered"
                                >
                                  ✨
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {!isNew && isSkillExpanded && notes.length > 0 && (
                          <div className="skill-notes-list">
                            {notes.map((log, index) => (
                              <div 
                                key={index} 
                                className="note-item note-clickable"
                                onClick={() => {
                                  onSelectDate(log.date);
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                title="Click to view this day's practice"
                              >
                                <span className="note-date">{log.date}</span>
                                <span className="note-text">{log.note}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {skills.some(s => s.progress.status === 'new') && (
                    <button 
                      className="show-new-btn"
                      onClick={() => toggleShowNew(category.id)}
                    >
                      {showNewSkills.has(category.id) 
                        ? `▲ Hide ${skills.filter(s => s.progress.status === 'new').length} new skills` 
                        : `▼ Show ${skills.filter(s => s.progress.status === 'new').length} new skills`
                      }
                    </button>
                  )}
                </div>
            )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
