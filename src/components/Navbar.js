import React from 'react';
import { View, Text, TouchableOpacity } from './ReactNativePrimitives';
import { sound } from '../utils/audio';

export const Navbar = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'categories', label: 'Categories', icon: '📚' },
    { id: 'game_modes', label: 'Game Modes', icon: '🎮' },
    { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0e1c]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 sm:py-3 shadow-2xl">
      <div className="max-w-xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                sound.playClick();
                onNavigate(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-cyan-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              <div className="relative">
                <span className="text-xl sm:text-2xl">{item.icon}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                )}
              </div>
              <span className={`text-[11px] mt-1 tracking-wide ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </TouchableOpacity>
          );
        })}
      </div>
    </nav>
  );
};

