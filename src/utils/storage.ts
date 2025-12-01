import { invoke } from '@tauri-apps/api/core';
import { PracticeLog } from '../types';

export interface AppData {
  logs: PracticeLog[];
  statuses: Record<string, 'new' | 'learning' | 'mastered'>;
}

export async function saveData(
  logs: PracticeLog[],
  statuses: Map<string, 'new' | 'learning' | 'mastered'>
): Promise<void> {
  try {
    const statusesObj: Record<string, 'new' | 'learning' | 'mastered'> = {};
    statuses.forEach((value, key) => {
      statusesObj[key] = value;
    });
    
    const data: AppData = {
      logs,
      statuses: statusesObj
    };
    
    const jsonString = JSON.stringify(data);
    await invoke('save_data', { data: jsonString });
    console.log('Data saved successfully:', logs.length, 'logs');
  } catch (error) {
    console.error('Failed to save data:', error);
  }
}

export async function loadData(): Promise<AppData> {
  try {
    const jsonString = await invoke<string>('load_data');
    const data: AppData = JSON.parse(jsonString);
    console.log('Data loaded successfully:', data.logs?.length || 0, 'logs');
    return data;
  } catch (error) {
    console.error('Failed to load data:', error);
    return { logs: [], statuses: {} };
  }
}