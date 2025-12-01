import { PracticeLog } from '../types';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns';

interface CalendarProps {
  logs: PracticeLog[];
  onSelectDate: (date: string) => void;
  selectedDate: string;
}

export default function Calendar({ logs, onSelectDate, selectedDate }: CalendarProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const getLogsForDay = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return logs.filter(log => log.date === dateStr).length;
  };
  
  const getHeatColor = (count: number) => {
    if (count === 0) return '#ebedf0';
    if (count <= 2) return '#c6dbef';
    if (count <= 4) return '#6baed6';
    if (count <= 6) return '#3182bd';
    return '#08519c';
  };
  
  const firstDayOfWeek = monthStart.getDay();
  const emptyDays = Array(firstDayOfWeek).fill(null);
  
  return (
    <div className="calendar-section">
      <h2>📅 Practice Calendar - {format(today, 'MMMM yyyy')}</h2>
      
      <div className="calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      
      <div className="calendar-grid">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty"></div>
        ))}
        
        {days.map(day => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const count = getLogsForDay(day);
          const isSelected = dateStr === selectedDate;
          const isToday = isSameDay(day, today);
          
          return (
            <div
              key={dateStr}
              className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
              style={{ backgroundColor: getHeatColor(count) }}
              onClick={() => onSelectDate(dateStr)}
              title={`${format(day, 'MMM d')}: ${count} skills`}
            >
              <span className="day-number">{format(day, 'd')}</span>
              {count > 0 && <span className="day-count">{count}</span>}
            </div>
          );
        })}
      </div>
      
      <div className="calendar-legend">
        <span>Less</span>
        <div className="legend-box" style={{ backgroundColor: '#ebedf0' }}></div>
        <div className="legend-box" style={{ backgroundColor: '#c6dbef' }}></div>
        <div className="legend-box" style={{ backgroundColor: '#6baed6' }}></div>
        <div className="legend-box" style={{ backgroundColor: '#3182bd' }}></div>
        <div className="legend-box" style={{ backgroundColor: '#08519c' }}></div>
        <span>More</span>
      </div>
    </div>
  );
}