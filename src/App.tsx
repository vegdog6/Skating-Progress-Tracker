/*
@Author: Yiran Zhao
@Date: 2025-11-30

@Description: Main Application Component for Figure Skating Progress Tracker
*/

import "./App.css";
import { useState, useEffect } from "react";
import { PracticeLog, SkillDefinition } from "./types";
import { PRESET_SKILLS } from "./utils/skills";
import { calculateSkillProgress, getTodayLogs } from "./utils/stats";
import { loadData, saveData } from "./utils/storage";
import { exportToCSV } from "./utils/export";
//import { ask } from '@tauri-apps/plugin-dialog';
import SkillGrid from "./components/SkillGrid";
import PracticeLogList from "./components/PracticeLog";
import ProgressList from "./components/ProgressList";
import Calendar from "./components/Calendar";
import Charts from "./components/Charts";
import iceBackground from "./assets/ice-background.jpg";


function App() {
  // State
  const [practiceLogs, setPracticeLogs] = useState<PracticeLog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [skillStatuses, setSkillStatuses] = useState<Map<string, 'new' | 'learning' | 'mastered'>>(() => new Map());

  // Filtered skills based on category
  const filteredSkills = selectedCategory === 'all' 
    ? PRESET_SKILLS 
    : PRESET_SKILLS.filter(s => s.category === selectedCategory);

  // Handlers
  const logPractice = (skill: SkillDefinition, variant?: string) => {
    const newLog: PracticeLog = {
      id: Date.now().toString() + Math.random(),
      skillId: skill.id,
      skillName: skill.name + (variant ? ` (${variant})` : ''),
      date: selectedDate,
      variant,
      note: '',
    };
    setPracticeLogs([...practiceLogs, newLog]);
  };

  const deleteLog = (logId: string) => {
    setPracticeLogs(practiceLogs.filter(log => log.id !== logId));
  };

  const updateNote = (logId: string, note: string) => {
    setPracticeLogs(practiceLogs.map(log => 
      log.id === logId ? { ...log, note } : log
    ));
  };

  const changeSkillStatus = (
    skillId: string, 
    newStatus: 'new' | 'learning' | 'mastered'
  ) => {
    const newMap = new Map(skillStatuses);
    newMap.set(skillId, newStatus);
    setSkillStatuses(newMap);

    if (newStatus === 'mastered') {
      setPracticeLogs(practiceLogs.map(log => 
        log.skillId === skillId && log.date === selectedDate
          ? { ...log, wasMastered: true }
          : log
      ));
    }
  };

  // Derived data
  const todayLogs = getTodayLogs(practiceLogs, selectedDate);
  const skillProgress = calculateSkillProgress(practiceLogs, skillStatuses);

  useEffect(() => {
    loadData().then((data) => {
      if (data.logs && data.logs.length > 0) {
        setPracticeLogs(data.logs);
        console.log('✅ Loaded practice logs:', data.logs.length);
      }
      
      if (data.statuses) {
        const statusMap = new Map<string, 'new' | 'learning' | 'mastered'>();
        Object.entries(data.statuses).forEach(([key, value]) => {
          statusMap.set(key, value as 'new' | 'learning' | 'mastered');
        });
        setSkillStatuses(statusMap);
        console.log('✅ Loaded statuses:', statusMap.size);
      }
    });
  }, []);

  useEffect(() => {
    if (practiceLogs.length > 0) {
      saveData(practiceLogs, skillStatuses);
    }
  }, [practiceLogs]);

  return (
    <div className="container" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.6)), url(${iceBackground})`, 
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'}}>
      <h1>Figure Skating Progress Tracker</h1>
  
      <ProgressList 
        progress={skillProgress}
        logs={practiceLogs}
        onSelectDate={setSelectedDate}
      />
  
      <div className="top-section">
        <Calendar 
          logs={practiceLogs}
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        
        <PracticeLogList 
          logs={todayLogs}
          progress={skillProgress}
          onDelete={deleteLog}
          onUpdateNote={updateNote}
          onChangeStatus={changeSkillStatus}
        />
      </div>
  
      <div className="middle-section">
        <div className="left-panel">    
          <div className="category-filter">
            <button 
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            <button 
              className={`${selectedCategory === 'jumps' ? 'active' : ''} cat-jumps`}
              onClick={() => setSelectedCategory('jumps')}
            >
              Jumps
            </button>
            <button 
              className={`${selectedCategory === 'spins' ? 'active' : ''} cat-spins`}
              onClick={() => setSelectedCategory('spins')}
            >
              Spins
            </button>
            <button 
              className={`${selectedCategory === 'footwork' ? 'active' : ''} cat-footwork`}
              onClick={() => setSelectedCategory('footwork')}
            >
              Footwork
            </button>
            <button 
              className={`${selectedCategory === 'field-moves' ? 'active' : ''} cat-field`}
              onClick={() => setSelectedCategory('field-moves')}
            >
              Field Moves
            </button>
          </div>
  
          <SkillGrid 
            skills={filteredSkills}
            todayLogs={todayLogs}
            skillProgress={skillProgress}
            onLogPractice={logPractice}
          />
        </div>
      </div>
  
      <Charts 
        logs={practiceLogs}
        onExport={() => exportToCSV(practiceLogs)} 
      />
    </div>
  );
}
  
export default App;