import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from '../components/ReactNativePrimitives';
import { INITIAL_LEADERBOARD } from '../data/leaderboardData';
import { sound } from '../utils/audio';

export const LeaderboardScreen = ({ user }) => {
  const [activeTab, setActiveTab] = useState('global'); // 'global' | 'weekly' | 'monthly'

  const rawList = INITIAL_LEADERBOARD[activeTab] || INITIAL_LEADERBOARD.global;

  // Insert user dynamically into ranking based on their points
  const userRankEntry = {
    rank: 4,
    username: `${user.username} (You)`,
    avatar: user.avatar || '🥷',
    points: user.points,
    level: user.level,
    winRate: user.gamesPlayed > 0 ? `${Math.round((user.correctAnswers / (user.gamesPlayed * 5)) * 100)}%` : '0%',
    badge: 'Contender',
    isCurrentUser: true
  };

  const combinedList = [...rawList];
  // If user has points, ensure they are visible
  const top3 = combinedList.slice(0, 3);
  const rest = combinedList.slice(3);

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-5xl mx-auto w-full animate-fade-in">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-wide">
            Arena Leaderboards
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            The grand hall of high-ranking scholars and trivia champions
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800">
          {[
            { id: 'global', label: 'All-Time' },
            { id: 'weekly', label: 'Weekly' },
            { id: 'monthly', label: 'Monthly' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-900/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top 3 Champions Podium */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 items-end max-w-2xl mx-auto pt-6">
        {/* #2 Silver (Left) */}
        {top3[1] && (
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-slate-400 to-slate-200 p-0.5 shadow-lg shadow-slate-500/20">
                <div className="w-full h-full bg-[#0a0e1c] rounded-[14px] flex items-center justify-center text-3xl sm:text-4xl">
                  {top3[1].avatar}
                </div>
              </div>
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-slate-300 text-slate-950 font-black text-xs">
                #2
              </span>
            </div>
            <span className="text-xs sm:text-sm font-black text-white truncate max-w-[100px] text-center">
              {top3[1].username}
            </span>
            <span className="text-xs font-mono font-bold text-slate-300">
              {top3[1].points.toLocaleString()} PTS
            </span>
            <div className="w-full h-20 sm:h-24 bg-gradient-to-t from-slate-800/80 to-slate-900/40 rounded-t-2xl border-t-2 border-slate-400 mt-2 flex items-center justify-center">
              <span className="text-2xl font-black text-slate-300">🥈</span>
            </div>
          </div>
        )}

        {/* #1 Gold Champion (Center) */}
        {top3[0] && (
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1 shadow-2xl shadow-amber-500/40 animate-pulse">
                <div className="w-full h-full bg-[#0a0e1c] rounded-[14px] flex items-center justify-center text-4xl sm:text-5xl">
                  {top3[0].avatar}
                </div>
              </div>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">
                👑
              </span>
              <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                #1
              </span>
            </div>
            <span className="text-sm sm:text-base font-black text-amber-300 truncate max-w-[120px] text-center">
              {top3[0].username}
            </span>
            <span className="text-xs font-mono font-bold text-amber-400">
              {top3[0].points.toLocaleString()} PTS
            </span>
            <div className="w-full h-28 sm:h-32 bg-gradient-to-t from-amber-950/60 to-slate-900/40 rounded-t-2xl border-t-2 border-amber-400 mt-2 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-3xl font-black text-amber-400">🥇</span>
            </div>
          </div>
        )}

        {/* #3 Bronze (Right) */}
        {top3[2] && (
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-700 to-yellow-700 p-0.5 shadow-lg shadow-amber-900/20">
                <div className="w-full h-full bg-[#0a0e1c] rounded-[14px] flex items-center justify-center text-3xl sm:text-4xl">
                  {top3[2].avatar}
                </div>
              </div>
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-amber-700 text-white font-black text-xs">
                #3
              </span>
            </div>
            <span className="text-xs sm:text-sm font-black text-white truncate max-w-[100px] text-center">
              {top3[2].username}
            </span>
            <span className="text-xs font-mono font-bold text-amber-600">
              {top3[2].points.toLocaleString()} PTS
            </span>
            <div className="w-full h-16 sm:h-20 bg-gradient-to-t from-amber-950/40 to-slate-900/40 rounded-t-2xl border-t-2 border-amber-700 mt-2 flex items-center justify-center">
              <span className="text-2xl font-black text-amber-700">🥉</span>
            </div>
          </div>
        )}
      </div>

      {/* User's Current Position Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-cyan-950/70 border border-cyan-500/40 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 font-mono font-black text-xs border border-cyan-500/40">
            YOUR STANDING
          </span>
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-base">
            {user.avatar || '🥷'}
          </div>
          <div>
            <span className="text-xs font-bold text-white block">{user.username} (You)</span>
            <span className="text-[11px] text-slate-400">Level {user.level} Gladiator</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-sm font-mono font-black text-amber-300 block">
            {user.points.toLocaleString()} PTS
          </span>
          <span className="text-[10px] text-emerald-400 font-bold">Top 5% Contender</span>
        </div>
      </div>

      {/* Rankings Table #4 and beyond */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 grid grid-cols-12 text-[11px] font-black uppercase tracking-wider text-slate-400">
          <span className="col-span-2 sm:col-span-1 text-center">Rank</span>
          <span className="col-span-6 sm:col-span-5">Gladiator</span>
          <span className="hidden sm:block sm:col-span-2 text-center">Tier Badge</span>
          <span className="hidden sm:block sm:col-span-2 text-center">Win Rate</span>
          <span className="col-span-4 sm:col-span-2 text-right">Points</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {rest.map((player) => (
            <div
              key={player.rank}
              className="p-4 grid grid-cols-12 items-center text-sm hover:bg-slate-800/40 transition-colors"
            >
              <span className="col-span-2 sm:col-span-1 text-center font-mono font-bold text-slate-400">
                #{player.rank}
              </span>
              <div className="col-span-6 sm:col-span-5 flex items-center space-x-3">
                <span className="text-2xl">{player.avatar}</span>
                <div>
                  <span className="font-bold text-white block">{player.username}</span>
                  <span className="text-[11px] text-slate-400 font-mono">Lvl {player.level}</span>
                </div>
              </div>
              <span className="hidden sm:block sm:col-span-2 text-center text-xs font-semibold text-purple-300">
                {player.badge}
              </span>
              <span className="hidden sm:block sm:col-span-2 text-center font-mono text-xs text-emerald-400 font-bold">
                {player.winRate}
              </span>
              <span className="col-span-4 sm:col-span-2 text-right font-mono font-black text-amber-300">
                {player.points.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

