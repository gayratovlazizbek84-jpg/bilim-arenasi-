import React from 'react';
import { View, Text, TouchableOpacity } from './ReactNativePrimitives';
import { sound } from '../utils/audio';

export const Header = ({ user, currentScreen, onNavigate, soundEnabled, onToggleSound }) => {
  const currentLvlXp = (user.level - 1) * 200;
  const nextLvlXp = user.level * 200;
  const progressInLevel = Math.max(0, user.xp - currentLvlXp);
  const xpNeeded = nextLvlXp - currentLvlXp;
  const xpPercent = Math.min(100, Math.round((progressInLevel / xpNeeded) * 100));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0a0e1c]/90 backdrop-blur-md px-4 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <TouchableOpacity
          onPress={() => {
            sound.playClick();
            onNavigate('home');
          }}
          className="flex items-center space-x-3 group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0a0e1c] rounded-[10px] flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                QUIZ
              </span>
              <span className="text-lg font-black tracking-wider text-white">
                ARENA
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">
              Battle of Wits
            </span>
          </div>
        </TouchableOpacity>

        {/* User Stats & Controls */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Points Pill */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 shadow-inner">
            <span className="text-amber-400 text-sm">🪙</span>
            <span className="text-xs font-bold text-amber-300 font-mono">
              {user.points.toLocaleString()} PTS
            </span>
          </div>

          {/* Level & XP Mini Bar */}
          <div
            onClick={() => {
              sound.playClick();
              onNavigate('profile');
            }}
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all"
            title="View Profile & Progression"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-base shadow-sm">
                {user.avatar || '🥷'}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-slate-950 font-black text-[9px] px-1 rounded font-mono">
                L{user.level}
              </div>
            </div>
            <div className="hidden md:flex flex-col w-20">
              <div className="flex justify-between items-center text-[10px] mb-0.5">
                <span className="font-semibold text-slate-300 truncate max-w-[50px]">{user.username}</span>
                <span className="text-cyan-400 font-mono">{xpPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-500"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Audio FX Toggle Button */}
          <button
            type="button"
            onClick={onToggleSound}
            aria-label="Toggle Sound"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {soundEnabled ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>

          {/* Settings Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onNavigate('settings');
            }}
            aria-label="Settings"
            title="Settings"
            className={`p-2 rounded-xl border transition-colors ${
              currentScreen === 'settings'
                ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                : 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 text-slate-300 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

