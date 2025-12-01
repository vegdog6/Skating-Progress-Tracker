import { SkillDefinition } from '../types';

export const PRESET_SKILLS: SkillDefinition[] = [
  // Jumps
  { id: 'bunny-hop', name: 'Bunny Hop', category: 'jumps' },
  { id: 'ballet-jump', name: 'Ballet Jump', category: 'jumps' },
  { id: 'mazurka', name: 'Mazurka', category: 'jumps' },
  { id: 'tap-toe', name: 'Tap Toe Jump', category: 'jumps' },
  { id: 'falling-leaf', name: 'Falling Leaf', category: 'jumps' },
  { id: 'waltz-jump', name: 'Waltz Jump', category: 'jumps' },
  { id: 'salchow', name: 'Salchow', category: 'jumps', variants: ['Single', 'Double'] },
  { id: 'toe-loop', name: 'Toe Loop', category: 'jumps', variants: ['Single', 'Double'] },
  { id: 'loop', name: 'Loop', category: 'jumps', variants: ['Single', 'Double'] },
  { id: 'flip', name: 'Flip', category: 'jumps', variants: ['Single', 'Double'] },
  { id: 'lutz', name: 'Lutz', category: 'jumps', variants: ['Single', 'Double'] },
  { id: 'axel', name: 'Axel', category: 'jumps', variants: ['Single', 'Double'] },
  
  // Spins
  { id: 'two-foot-spin', name: 'Two Foot Spin', category: 'spins' },
  { id: 'one-foot-spin', name: 'One Foot Spin', category: 'spins' },
  { id: 'pivot', name: 'Pivot', category: 'spins' },
  { id: 'back-spin', name: 'Back Spin', category: 'spins' },
  { id: 'forward-scratch', name: 'Forward Scratch Spin', category: 'spins' },
  { id: 'backward-scratch', name: 'Backward Scratch Spin', category: 'spins' },
  { id: 'upright-spin', name: 'Upright Spin', category: 'spins' },
  { id: 'sit-spin', name: 'Sit Spin', category: 'spins' },
  { id: 'camel-spin', name: 'Camel Spin', category: 'spins' },
  { id: 'layback-spin', name: 'Layback Spin', category: 'spins' },
  { id: 'flying-camel', name: 'Flying Camel', category: 'spins' },
  { id: 'flying-sit', name: 'Flying Sit Spin', category: 'spins' },
  { id: 'biellmann', name: 'Biellmann Spin', category: 'spins' },
  
  // Footwork
  { id: '3-turn', name: '3 Turn', category: 'footwork', variants: ['LFO', 'LFI', 'RFO', 'RFI', 'LBO', 'LBI', 'RBO', 'RBI'] },
  { id: 'mohawk', name: 'Mohawk', category: 'footwork', variants: ['LFO', 'LFI', 'RFO', 'RFI', 'LBO', 'LBI', 'RBO', 'RBI'] },
  { id: 'choctaw', name: 'Choctaw', category: 'footwork', variants: ['LFO', 'LFI', 'RFO', 'RFI', 'LBO', 'LBI', 'RBO', 'RBI'] },
  { id: 'twizzle', name: 'Twizzle', category: 'footwork', variants: ['LFO', 'LFI', 'RFO', 'RFI', 'LBO', 'LBI', 'RBO', 'RBI'] },
  { id: 'bracket', name: 'Bracket', category: 'footwork', variants: ['LFO', 'LFI', 'RFO', 'RFI', 'LBO', 'LBI', 'RBO', 'RBI'] },
  { id: 'rocker', name: 'Rocker', category: 'footwork', variants: ['LFO', 'LFI', 'RFO', 'RFI', 'LBO', 'LBI', 'RBO', 'RBI'] },
  { id: 'counter', name: 'Counter', category: 'footwork', variants: ['LFO', 'LFI', 'RFO', 'RFI', 'LBO', 'LBI', 'RBO', 'RBI'] },
  { id: 'crossrolls', name: 'Crossrolls', category: 'footwork', variants: ['Forward', 'Backward'] },
  
  // Field Moves
  { id: 'lunge', name: 'Lunge', category: 'field-moves' },
  { id: 'shoot-duck', name: 'Shoot the Duck', category: 'field-moves' },
  { id: 'arabesque', name: 'Arabesque', category: 'field-moves' },
  { id: 'spiral', name: 'Spiral', category: 'field-moves' },
  { id: 'catch-foot', name: 'Catch Foot Spiral', category: 'field-moves' },
  { id: 'attitude', name: 'Attitude', category: 'field-moves' },
  { id: 'penche', name: 'Penché', category: 'field-moves' },
  { id: 'fan-spiral', name: 'Fan Spiral', category: 'field-moves' },
  { id: 'y-position', name: 'Y-Position', category: 'field-moves' },
  { id: 'needle', name: 'Needle', category: 'field-moves' },
  { id: 'spread-eagle', name: 'Spread Eagle', category: 'field-moves' },
  { id: 'ina-bauer', name: 'Ina Bauer', category: 'field-moves' },
  { id: 'hydroblading', name: 'Hydroblading', category: 'field-moves' },
];