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
import SkillGrid from "./components/SkillGrid";
import PracticeLogList from "./components/PracticeLog";
import ProgressList from "./components/ProgressList";
import Calendar from "./components/Calendar";
import Charts from "./components/Charts";


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
  };

  const clearAllData = () => {
    alert('Button clicked!');
    if (window.confirm('Are you sure you want to clear all data?')) {
      setPracticeLogs([]);
      setSkillStatuses(new Map());
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
    <div className="container">
      <h1>⛸️ Figure Skating Progress Tracker</h1>
  
      {/* Top Section: Calendar + Today's Log */}
      <div className="top-section">
        <Calendar 
          logs={practiceLogs}
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        
        <PracticeLogList 
          logs={todayLogs}
          onDelete={deleteLog}
          onUpdateNote={updateNote}
        />
      </div>
  
      {/* Category Filter */}
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
          🦘 Jumps
        </button>
        <button 
          className={`${selectedCategory === 'spins' ? 'active' : ''} cat-spins`}
          onClick={() => setSelectedCategory('spins')}
        >
          🌀 Spins
        </button>
        <button 
          className={`${selectedCategory === 'footwork' ? 'active' : ''} cat-footwork`}
          onClick={() => setSelectedCategory('footwork')}
        >
          👣 Footwork
        </button>
        <button 
          className={`${selectedCategory === 'field-moves' ? 'active' : ''} cat-field`}
          onClick={() => setSelectedCategory('field-moves')}
        >
          ⛸️ Field Moves
        </button>
      </div>
  
      {/* Skills Grid */}
      <SkillGrid 
        skills={filteredSkills}
        todayLogs={todayLogs}
        skillProgress={skillProgress}
        onLogPractice={logPractice}
      />

      {/* Charts */}
      <Charts logs={practiceLogs}
              onExport={() => exportToCSV(practiceLogs)} 
      />
  
      {/* Progress */}
      <ProgressList 
        progress={skillProgress}
        logs={practiceLogs}
        onChangeStatus={changeSkillStatus}
        onSelectDate={setSelectedDate}
      />
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          className="clear-data-btn"
          onClick={clearAllData}
        >
          🗑️ Clear All Data
        </button>
      </div>
    </div>
  );
}

export default App;