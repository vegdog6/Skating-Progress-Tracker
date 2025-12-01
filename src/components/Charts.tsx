import { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';
import { PracticeLog } from '../types';

interface ChartsProps {
  logs: PracticeLog[];
  onExport: () => void;
}

export default function Charts({ logs, onExport }: ChartsProps) {
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logs.length === 0) return;

    // Pie Chart: Category Distribution
    if (pieChartRef.current) {
      const categoryCounts: { [key: string]: number } = {
        jumps: 0,
        spins: 0,
        footwork: 0,
        'field-moves': 0
      };

      logs.forEach(log => {
        const skillId = log.skillId;
        if (skillId.includes('jump') || skillId.includes('salchow') || 
            skillId.includes('axel') || skillId.includes('lutz') || 
            skillId.includes('flip') || skillId.includes('loop') || 
            skillId.includes('toe')) {
          categoryCounts.jumps++;
        } else if (skillId.includes('spin') || skillId.includes('pivot')) {
          categoryCounts.spins++;
        } else if (skillId.includes('turn') || skillId.includes('mohawk') || 
                   skillId.includes('bracket') || skillId.includes('rocker') || 
                   skillId.includes('counter') || skillId.includes('twizzle') || 
                   skillId.includes('crossroll')) {
          categoryCounts.footwork++;
        } else {
          categoryCounts['field-moves']++;
        }
      });

      const data = [{
        values: Object.values(categoryCounts),
        labels: ['Jumps', 'Spins', 'Footwork', 'Field Moves'],
        type: 'pie',
        marker: {
          colors: ['#ffb347', '#5dade2', '#2ecc71', '#a06cd5']
        },
        textinfo: 'label+percent',
        textfont: { size: 14 }
      }];

      const layout = {
        title: { text: 'Practice Distribution by Category' },
        height: 400,
        showlegend: true
      };

      Plotly.newPlot(pieChartRef.current, data as any, layout);
    }

    // Bar Chart: Most Practiced Skills
    if (barChartRef.current) {
      const skillCounts: { [key: string]: number } = {};
      
      logs.forEach(log => {
        skillCounts[log.skillName] = (skillCounts[log.skillName] || 0) + 1;
      });

      const sortedSkills = Object.entries(skillCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      const data = [{
        x: sortedSkills.map(s => s[0]),
        y: sortedSkills.map(s => s[1]),
        type: 'bar',
        marker: {
          color: '#3498db',
          line: { color: '#2874a6', width: 1.5 }
        }
      }];

      const layout = {
        title: { text: 'Top 10 Most Practiced Skills' },
        xaxis: { title: { text: 'Skill' }, tickangle: -45 },
        yaxis: { title: { text: 'Practice Count' } },
        height: 400,
        margin: { b: 120 }
      };

      Plotly.newPlot(barChartRef.current, data as any, layout);
    }

    // Line Chart: Weekly Practice Trend
    if (lineChartRef.current) {
      const dateCounts: { [key: string]: number } = {};
      
      logs.forEach(log => {
        dateCounts[log.date] = (dateCounts[log.date] || 0) + 1;
      });

      const sortedDates = Object.keys(dateCounts).sort();
      const counts = sortedDates.map(date => dateCounts[date]);

      const data = [{
        x: sortedDates,
        y: counts,
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: '#e74c3c', width: 3 },
        marker: { size: 8, color: '#c0392b' }
      }];

      const layout = {
        title: { text: 'Practice Frequency Over Time' },
        xaxis: { title: { text: 'Date' } },
        yaxis: { title: { text: 'Skills Practiced' } },
        height: 400
      };

      Plotly.newPlot(lineChartRef.current, data as any, layout);
    }

  }, [logs]);

  if (logs.length === 0) {
    return (
      <div className="section-header">
        <h2>📊 Practice Analytics</h2>
        <button className="export-btn" onClick={onExport}>
          📥 Export to CSV
        </button>
      </div>
    );
  }

  return (
    <div className="charts-section">
      <div className="section-header">
        <h2>📊 Practice Analytics</h2>
        <button className="export-btn" 
        onClick={() => {
          onExport();
          setShowExportSuccess(true);
          setTimeout(() => setShowExportSuccess(false), 3000);
        }}>
          📥 Export to CSV
        </button>
        {showExportSuccess && (
          <span className="export-success">✅ Exported!</span>
        )}
      </div>
      
      <div className="charts-grid">
        <div ref={pieChartRef} className="chart"></div>
        <div ref={barChartRef} className="chart"></div>
      </div>
      
      <div ref={lineChartRef} className="chart chart-full"></div>
    </div>
  );
}