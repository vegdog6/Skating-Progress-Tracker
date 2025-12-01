// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use std::fs;
use std::path::PathBuf;

// Read or create the data file path
fn get_data_path(app: tauri::AppHandle) -> PathBuf {
    let app_dir = app.path()
        .app_data_dir()
        .expect("Failed to get app data directory");
    
    // make sure the directory exists
    fs::create_dir_all(&app_dir).expect("Failed to create app data directory");
    
    app_dir.join("skating_data.json")
}

// Save data
#[tauri::command]
fn save_data(app: tauri::AppHandle, data: String) -> Result<String, String> {
    let file_path = get_data_path(app);
    
    fs::write(&file_path, data)
        .map_err(|e| format!("Failed to save data: {}", e))?;
    
    Ok(format!("Data saved to {:?}", file_path))
}

// Load data
#[tauri::command]
fn load_data(app: tauri::AppHandle) -> Result<String, String> {
    let file_path = get_data_path(app);
    
    // If the file doesn't exist, return an empty JSON array
    if !file_path.exists() {
        return Ok("[]".to_string());
    }
    
    fs::read_to_string(&file_path)
        .map_err(|e| format!("Failed to load data: {}", e))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_data, load_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}