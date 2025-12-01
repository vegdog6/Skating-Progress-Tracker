# ⛸️ Figure Skating Progress Tracker

A cross-platform desktop application for tracking and visualizing figure skating practice progress, built with Tauri, React, TypeScript, and Rust.

## Features

### Core Functionality
- **Skill Library**: Pre-loaded with 50+ figure skating elements across jumps, spins, footwork, and field moves
- **Practice Logging**: Quick-click interface to log daily practice sessions with optional notes
- **Progress Tracking**: Automatic calculation of practice days and skill mastery status
- **Data Persistence**: Rust backend for efficient local data storage

### Data Visualization
- **Calendar Heatmap**: GitHub-style contribution graph showing practice frequency
- **Category Distribution**: Interactive pie chart visualizing practice across skill categories
- **Practice Trends**: Line graph tracking practice frequency over time
- **Skill Rankings**: Bar chart displaying most-practiced skills

### User Experience
- **Color-coded Categories**: Visual distinction between jumps, spins, footwork, and field moves
- **Status System**: Three-tier progression (new → learning → mastered) with visual feedback
- **Skill Tree View**: Collapsible category groups with sortable skills by mastery level
- **Note History**: Click dates to jump to specific practice sessions
- **CSV Export**: Generate practice reports for external analysis

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Desktop Framework**: Tauri 2.0
- **Backend**: Rust (file operations, data persistence)
- **Data Visualization**: Plotly.js
- **Date Utilities**: date-fns
- **Styling**: CSS3 with custom color-coding system

## Installation & Development

### Prerequisites
- Node.js 18+
- Rust 1.70+
- npm or yarn

### Setup
```bash
# Clone repository
git clone https://github.com/vegdog6/Skating-Progress-Tracker
cd Skating-Progress-Tracker

# Install dependencies
npm install

# Run development build
npm run tauri dev

# Build production executable
npm run tauri build
```

## Technical Highlights

### Data Architecture
- **Modular component structure**: Separated concerns across SkillGrid, Calendar, Charts, and ProgressList components
- **Type-safe data models**: TypeScript interfaces for skills, practice logs, and progress tracking
- **Efficient state management**: React hooks with automatic persistence via Rust backend

### Data Processing
- **Aggregation pipeline**: Transforms raw practice logs into skill statistics and category distributions
- **Date-based filtering**: Efficient querying for calendar heatmap and timeline visualizations
- **Status inference**: Automatic learning stage detection with manual override capability

### Desktop Integration
- **Cross-platform compatibility**: Single codebase for macOS, Windows, and Linux
- **Native file operations**: Rust-powered JSON persistence in application data directory
- **Lightweight footprint**: Tauri's minimal runtime compared to Electron alternatives

## Future Enhancements

- Video progress recording integration
- Coach feedback tracking
- Competition preparation checklists
- Social features for comparing progress with training partners
- Custom skill creation for advanced techniques

## Author

Yiran Zhao - Computer Science Graduate Student @ Northeastern University