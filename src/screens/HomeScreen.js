import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from '../components/ReactNativePrimitives';
import { CATEGORIES } from '../data/questions';
import { LEVEL_TITLES } from '../data/achievements';
import { sound } from '../utils/audio';

export const HomeScreen = ({
  user,
  onNavigate,
  onStartQuiz,
  onOpenDailyReward,
  dailyClaimedToday
}) => {
  const currentLvlXp = (user.level - 1) * 200;
  const nextLvlXp = user.level * 200;
  const progressInLevel = Math.max(0, user.xp - currentLvlXp);
  const xpNeeded = nextLvlXp - currentLvlXp;
  const xpPercent = Math.min(100, Math.round((progressInLevel / xpNeeded) * 100));

  const levelTitle = LEVEL_TITLES[Math.min(user.level - 1, LEVEL_TITLES.length - 1)] || 'Arena Legend';
  const accuracy = user.totalAnswersAttempted > 0
    ? Math.round((user.correctAnswers / user.totalAnswersAttempted) * 100)
    : 0;

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-7xl mx-auto w-full animate-fade-in">
      {/* Hero Gladiator Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-950/60 to-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl mb-8">
        {/* Glow ambient lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left: Avatar & Progression */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-1 shadow-xl shadow-purple-600/40">
                <div className="w-full h-full bg-[#0a0e1c] rounded-[14px] flex items-center justify-center text-4xl sm:text-5xl">
                  {user.avatar || '🥷'}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-xs font-black font-mono shadow-md">
                LVL {user.level}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  {user.username}
                </h2>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {levelTitle}
                </span>
              </div>
              <p className="text-xs text-slate-400 sm:hidden mt-0.5">
                {levelTitle}
              </p>

              {/* XP Progress Bar */}
              <div className="w-48 sm:w-64 mt-3">
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="text-slate-300">Level Progress</span>
                  <span className="text-cyan-400 font-mono">
                    {progressInLevel} / {xpNeeded} XP ({xpPercent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/50">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 transition-all duration-500 rounded-full shadow-[0_0_10px_#22d3ee]"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Center / Right: Quick Stats & Big Action */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
            <div className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[90px]">
              <span className="text-xs text-slate-400 block">Total Points</span>
              <span className="text-lg font-black text-amber-300 font-mono">
                {user.points.toLocaleString()}
              </span>
            </div>
            <div className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[90px]">
              <span className="text-xs text-slate-400 block">Battles</span>
              <span className="text-lg font-black text-white font-mono">
                {user.gamesPlayed}
              </span>
            </div>
            <div className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[90px]">
              <span className="text-xs text-slate-400 block">Accuracy</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {accuracy}%
              </span>
            </div>

            <TouchableOpacity
              onPress={() => {
                sound.playClick();
                onNavigate('game_modes');
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-black tracking-wider uppercase shadow-xl shadow-cyan-500/25 flex items-center justify-center space-x-2 active:scale-95 transition-all"
            >
              <span>QUICK PLAY</span>
              <span className="text-lg">⚔️</span>
            </TouchableOpacity>
          </div>
        </div>
      </div>

      {/* Daily Highlights Row: Daily Challenge & Daily Rewards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Daily Challenge Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 p-6 flex flex-col justify-between shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
                <span>🔥</span>
                <span>Special Event</span>
              </span>
              <h3 className="text-xl font-black text-white">
                Daily Master Challenge
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm">
                5 curated multi-disciplinary questions. Complete today for a 2X Double XP bonus!
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl">
              🎯
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400">
              <span>Reward: +300 PTS & +150 XP</span>
            </div>
            <TouchableOpacity
              onPress={() => {
                sound.playClick();
                onStartQuiz({
                  mode: 'daily',
                  category: 'general',
                  difficulty: 'medium',
                  title: 'Daily Master Challenge'
                });
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              Play Challenge ➔
            </TouchableOpacity>
          </div>
        </div>

        {/* Daily Login Reward Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 p-6 flex flex-col justify-between shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
                <span>🎁</span>
                <span>Login Bonus</span>
              </span>
              <h3 className="text-xl font-black text-white">
                7-Day Arena Rewards
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-sm">
                Log in daily to claim escalating gold points, bonus XP, and unlock the Day 7 Mythic Trophy!
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-3xl">
              💎
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-300">
              <span>Current Streak: Day {user.loginStreak || 1}</span>
            </div>
            <TouchableOpacity
              onPress={() => {
                sound.playClick();
                onOpenDailyReward();
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                dailyClaimedToday
                  ? 'bg-slate-800 text-slate-400 border border-slate-700'
                  : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95'
              }`}
            >
              {dailyClaimedToday ? 'View Calendar ✓' : 'Claim Reward 🎁'}
            </TouchableOpacity>
          </div>
        </div>
      </div>

      {/* Featured Quiz Categories Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-black text-white tracking-wide">
            Explore Categories
          </h3>
          <p className="text-xs text-slate-400">
            Choose from 8 distinct disciplines with multiple difficulty levels
          </p>
        </div>
        <TouchableOpacity
          onPress={() => {
            sound.playClick();
            onNavigate('categories');
          }}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
        >
          <span>View All</span>
          <span>➔</span>
        </TouchableOpacity>
      </div>

      {/* Categories Grid (Top 4 preview or full 8) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {CATEGORIES.slice(0, 4).map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => {
              sound.playClick();
              onStartQuiz({
                mode: 'single',
                category: cat.id,
                difficulty: 'medium',
                title: cat.name
              });
            }}
            className="group relative p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition-all duration-200 hover:-translate-y-1 shadow-lg"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl mb-3 shadow-md`}>
              {cat.icon}
            </div>
            <h4 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
              {cat.name}
            </h4>
            <span className="text-[11px] text-slate-400 block mt-1">
              15 Questions • 3 Tiers
            </span>
          </TouchableOpacity>
        ))}
      </div>

      {/* Game Modes Quick Access */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-black text-white tracking-wide">
            Game Modes
          </h3>
          <p className="text-xs text-slate-400">
            Pick your battle style: Solo, 1v1 Duels, Quick Match, or Practice
          </p>
        </div>
        <TouchableOpacity
          onPress={() => {
            sound.playClick();
            onNavigate('game_modes');
          }}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
        >
          <span>All Modes</span>
          <span>➔</span>
        </TouchableOpacity>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Single Player */}
        <TouchableOpacity
          onPress={() => {
            sound.playClick();
            onNavigate('categories');
          }}
          className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-850 transition-all flex flex-col justify-between group shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-xl text-purple-400">
              👤
            </div>
            <div>
              <h4 className="text-sm font-black text-white group-hover:text-purple-300 transition-colors">
                Single Player
              </h4>
              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                Solo Ladder
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Play at your own pace, choose any category, and level up your skills.
          </p>
        </TouchableOpacity>

        {/* Multiplayer 1v1 */}
        <TouchableOpacity
          onPress={() => {
            sound.playClick();
            onNavigate('room_creation');
          }}
          className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 transition-all flex flex-col justify-between group shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-xl text-cyan-400">
              ⚔️
            </div>
            <div>
              <h4 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
                Multiplayer Room
              </h4>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                Custom Rooms
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Create a custom room code or join a friend in a live synchronous trivia duel.
          </p>
        </TouchableOpacity>

        {/* Quick Match */}
        <TouchableOpacity
          onPress={() => {
            sound.playClick();
            onNavigate('game_modes');
          }}
          className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 transition-all flex flex-col justify-between group shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-xl text-emerald-400">
              ⚡
            </div>
            <div>
              <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                Quick Match
              </h4>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                Instant PvP
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Instantly pair against active arena contenders in a rapid 5-question showdown.
          </p>
        </TouchableOpacity>

        {/* Practice Mode */}
        <TouchableOpacity
          onPress={() => {
            sound.playClick();
            onStartQuiz({
              mode: 'practice',
              category: 'general',
              difficulty: 'easy',
              title: 'Practice & Study'
            });
          }}
          className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 transition-all flex flex-col justify-between group shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-xl text-amber-400">
              🧘
            </div>
            <div>
              <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                Practice Mode
              </h4>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                No Timer Stress
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Study answers and detailed explanations without any timer pressure.
          </p>
        </TouchableOpacity>
      </div>

      {/* Live Arena Ticker */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center space-x-3 text-xs text-slate-400 overflow-hidden">
        <span className="flex h-2 w-2 relative flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="font-bold text-cyan-400 uppercase tracking-wider flex-shrink-0">
          Arena Live:
        </span>
        <div className="truncate animate-marquee">
          <span>⚡ QuantumZenith won 5-0 in Mathematics!</span> •{' '}
          <span>🏆 NovaBrain reached Level 12!</span> •{' '}
          <span>🎯 CyberViper achieved a 10x Flawless Streak in Technology!</span> •{' '}
          <span>⚔️ AstraValkyrie created Room #ARENA-4921</span>
        </div>
      </div>
    </div>
  );
};

