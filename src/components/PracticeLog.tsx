import { useState } from 'react';
import { PracticeLog } from '../types';
import { PRESET_SKILLS } from '../utils/skills';

const getCategoryClass = (skillId: string) => {
  const skill = PRESET_SKILLS.find(s => s.id === skillId);
  return skill ? `log-${skill.category}` : '';
};

interface PracticeLogProps {
  logs: PracticeLog[];
  onDelete: (logId: string) => void;
  onUpdateNote: (logId: string, note: string) => void;
}

export default function PracticeLogList({ logs, onDelete, onUpdateNote }: PracticeLogProps) {
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [editNote, setEditNote] = useState('');

  const handleSaveNote = (logId: string) => {
    onUpdateNote(logId, editNote);
    setEditingLogId(null);
  };

  return (
    <div className="today-log">
      <h2>Today's Practice ({logs.length} skills)</h2>
      {logs.length === 0 ? (
        <p>No practice logged yet. Click skills above!</p>
      ) : (
        <div className="log-list">
          {logs.map((log) => (
            <div key={log.id} className={`log-item ${getCategoryClass(log.skillId)}`}>
              <div className="log-header">
                <span className="log-skill"> {log.skillName}</span>
                <button 
                  className="delete-btn"
                  onClick={() => onDelete(log.id)}
                  title="Delete"
                >
                  🗑️
                </button>
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
          ))}
        </div>
      )}
    </div>
  );
}