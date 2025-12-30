import { useState } from 'react';
import { PracticeLog, SkillProgress } from '../types';
import { PRESET_SKILLS } from '../utils/skills';

const getCategoryClass = (skillId: string) => {
  const skill = PRESET_SKILLS.find(s => s.id === skillId);
  return skill ? `log-${skill.category}` : '';
};

interface PracticeLogProps {
  logs: PracticeLog[];
  progress: SkillProgress[];
  onDelete: (logId: string) => void;
  onUpdateNote: (logId: string, note: string) => void;
  onChangeStatus: (skillId: string, status: 'new' | 'learning' | 'mastered') => void;
}

export default function PracticeLogList({ 
  logs, 
  progress, 
  onDelete, 
  onUpdateNote,
  onChangeStatus 
}: PracticeLogProps) {
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');

  const handleSaveNote = (logId: string) => {
    onUpdateNote(logId, editNote);
    setEditingLogId(null);
  };

  const getSkillStatus = (skillId: string) => {
    const prog = progress.find(p => p.skillId === skillId);
    return prog?.status || 'new';
  };

  return (
    <div className="today-log">
      <h2>Today's Practice ({logs.length} skills)</h2>
      {logs.length === 0 ? (
        <p>No practice logged yet. Click skills below!</p>
      ) : (
        <div className="log-list">
          {logs.map((log) => {
            const currentStatus = getSkillStatus(log.skillId);
            
            return (
              <div key={log.id} className={`log-item ${getCategoryClass(log.skillId)}`}>
                <div className="log-header">
                  <span className="log-skill">{log.skillName}</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {/* Status buttons */}
                    <div className="status-buttons-mini">
                      <button
                        className={`status-btn-mini ${currentStatus === 'learning' ? 'active' : ''}`}
                        onClick={() => onChangeStatus(log.skillId, 'learning')}
                        title="Learning"
                      >
                        🟡
                      </button>
                      <button
                        className={`status-btn-mini ${currentStatus === 'mastered' ? 'active' : ''}`}
                        onClick={() => onChangeStatus(log.skillId, 'mastered')}
                        title="Mastered"
                      >
                        ✨
                      </button>
                    </div>
                    
                    <button 
                      className="delete-btn"
                      onClick={() => onDelete(log.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                {editingLogId === log.id ? (
                  <div className="note-edit">
                    <input
                      type="text"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      placeholder="Add a note..."
                      autoFocus
                    />
                    <button onClick={() => handleSaveNote(log.id)}>Save</button>
                    <button onClick={() => setEditingLogId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div className="note-display">
                    {log.note ? (
                      <p className="note-text">📝 {log.note}</p>
                    ) : null}
                    <button 
                      className="add-note-btn"
                      onClick={() => {
                        setEditingLogId(log.id);
                        setEditNote(log.note || '');
                      }}
                    >
                      {log.note ? 'Edit note' : '+ Add note'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}