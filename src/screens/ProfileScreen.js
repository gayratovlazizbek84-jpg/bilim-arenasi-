import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from '../components/ReactNativePrimitives';
import { ACHIEVEMENTS, AVATARS, LEVEL_TITLES } from '../data/achievements';
import { CATEGORIES } from '../data/questions';
import { sound } from '../utils/audio';

export const ProfileScreen = ({ user, onUpdateProfile }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editAvatar, setEditAvatar] = useState(user.avatar || '🥷');

  const currentLvlXp = (user.level - 1) * 200;
  const nextLvlXp = user.level * 200;
  const progressInLevel = Math.max(0, user.xp - currentLvlXp);
  const xpNeeded = nextLvlXp - currentLvlXp;
  const xpPercent = Math.min(100, Math.round((progressInLevel / xpNeeded) * 100));

  const levelTitle = LEVEL_TITLES[Math.min(user.level - 1, LEVEL_TITLES.length - 1)] || 'Arena Legend';

  const accuracy = user.totalAnswersAttempted > 0
    ? Math.round((user.correctAnswers / user.totalAnswersAttempted) * 100)
    : 0;

  const handleSaveProfile = () => {
    sound.playLevelUp();
    onUpdateProfile({
      username: editUsername.trim() || user.username,
      avatar: editAvatar
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-5xl mx-auto w-full animate-fade-in">
      {/* Profile Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl mb-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Avatar and Basic Details */}
          <div className="flex items-center space-x-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-1 shadow-2xl shadow-purple-600/40">
                <div className="w-full h-full bg-[#0a0e1c] rounded-[22px] flex items-center justify-center text-5xl">
                  {user.avatar || '🥷'}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-black font-mono shadow-md">
                LVL {user.level}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {user.username}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setEditUsername(user.username);
                    setEditAvatar(user.avatar);
                    setIsEditModalOpen(true);
                  }}
                  className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold border border-cyan-500/30 flex items-center space-x-1"
                >
                  <span>✏️</span>
                  <span>Edit</span>
                </button>
              </div>

              <p className="text-sm font-bold text-purple-300 mt-1">
                "{levelTitle}"
              </p>

              {/* XP Progress Bar */}
              <div className="w-60 sm:w-72 mt-3">
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="text-slate-400">Next Level</span>
                  <span className="text-cyan-400 font-mono">
                    {progressInLevel} / {xpNeeded} XP
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Points Pill */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 text-center md:text-right">
            <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">
              Career Score
            </span>
            <span className="text-3xl font-black text-amber-300 font-mono block">
              {user.points.toLocaleString()} PTS
            </span>
            <span className="text-[11px] text-cyan-400 font-mono mt-0.5 block">
              XP Earned: {user.xp.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Career Stats Grid */}
      <h3 className="text-xl font-black text-white mb-4">
        Combat Statistics
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-2xl mb-1 block">🎮</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Games Played</span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">{user.gamesPlayed}</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-2xl mb-1 block">🎯</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Correct Answers</span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">{user.correctAnswers}</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-2xl mb-1 block">📊</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Answer Accuracy</span>
          <span className="text-2xl font-black text-cyan-300 font-mono mt-1 block">{accuracy}%</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
          <span className="text-2xl mb-1 block">⚔️</span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">1v1 PvP Wins</span>
          <span className="text-2xl font-black text-purple-400 font-mono mt-1 block">{user.multiplayerWins || 0}</span>
        </div>
      </div>

      {/* Category Mastery Progress */}
      <h3 className="text-xl font-black text-white mb-4">
        Category Mastery
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
        {CATEGORIES.map(cat => {
          const played = (user.categoriesPlayed || []).includes(cat.id);
          const mastery = played ? Math.min(100, Math.round(50 + (user.correctAnswers * 3.5))) : 15;
          return (
            <div key={cat.id} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3.5 flex-1 mr-4">
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-bold text-white">{cat.name}</span>
                    <span className="font-mono text-cyan-400">{mastery}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${cat.gradient}`} style={{ width: `${mastery}%` }} />
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${played ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-500'}`}>
                {played ? 'Adept' : 'Initiate'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Achievement Badges Showcase */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-black text-white">
            Achievement Badges
          </h3>
          <p className="text-xs text-slate-400">
            Earn medals and unlock permanent XP bonuses by completing challenges
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-cyan-400 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
          {ACHIEVEMENTS.filter(a => a.check(user)).length} / {ACHIEVEMENTS.length} UNLOCKED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACHIEVEMENTS.map((badge) => {
          const isUnlocked = badge.check(user);
          return (
            <div
              key={badge.id}
              className={`p-5 rounded-2xl border transition-all ${
                isUnlocked
                  ? 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-950/20'
                  : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  isUnlocked
                    ? `bg-gradient-to-tr ${badge.gradient} shadow-md`
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {badge.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  isUnlocked
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {isUnlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>

              <h4 className="text-sm font-black text-white mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-slate-400 leading-snug mb-3">
                {badge.description}
              </p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">Reward</span>
                <span className="text-cyan-400 font-bold">+{badge.xpReward} XP</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Profile Modal */}
      <Modal visible={isEditModalOpen} onRequestClose={() => setIsEditModalOpen(false)}>
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl">
          <h3 className="text-xl font-black text-white mb-2 text-center">
            Customize Identity
          </h3>
          <p className="text-xs text-slate-400 text-center mb-6">
            Update your gladiator codename and battle avatar
          </p>

          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Username
            </label>
            <TextInput
              value={editUsername}
              onChangeText={setEditUsername}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Choose Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setEditAvatar(av.icon);
                  }}
                  className={`h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${
                    editAvatar === av.icon
                      ? 'bg-gradient-to-br from-purple-600 to-cyan-500 scale-105 ring-2 ring-cyan-300'
                      : 'bg-slate-800 border border-slate-700'
                  }`}
                >
                  {av.icon}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white font-bold text-xs uppercase"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveProfile}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-xs uppercase shadow-lg shadow-purple-900/40"
            >
              Save Profile
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
