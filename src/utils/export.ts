import { PracticeLog } from '../types';

export function exportToCSV(logs: PracticeLog[]): void {
  if (logs.length === 0) {
    alert('No data to export!');
    return;
  }

  const headers = ['Date', 'Skill Name', 'Variant', 'Note'];
  
  const rows = logs.map(log => [
    log.date,
    log.skillName,
    log.variant || '',
    (log.note || '').replace(/"/g, '""'),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `skating-practice-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  
  URL.revokeObjectURL(url);
}