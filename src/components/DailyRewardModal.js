import React from 'react';
import { View, Text, TouchableOpacity, Modal } from './ReactNativePrimitives';
import { sound } from '../utils/audio';

export const DailyRewardModal = ({ visible, onClose, streak = 1, onClaim, claimedToday = false }) => {
  const days = [
    { day: 1, reward: '100 PTS', xp: '50 XP', icon: '🪙' },
    { day: 2, reward: '150 PTS', xp: '75 XP', icon: '🪙' },
    { day: 3, reward: '200 PTS', xp: '100 XP', icon: '💎' },
    { day: 4, reward: '300 PTS', xp: '150 XP', icon: '💎' },
    { day: 5, reward: '400 PTS', xp: '200 XP', icon: '⚡' },
    { day: 6, reward: '500 PTS', xp: '250 XP', icon: '🔥' },
    { day: 7, reward: '1,000 PTS', xp: '500 XP', icon: '👑' }
  ];

  const currentDayIndex = ((streak - 1) % 7);

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <div className="relative p-6 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-purple-900/40 text-center overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-600/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30 animate-bounce">
            🎁
          </div>

          <h3 className="text-2xl font-black text-white tracking-wide">
            DAILY LOGIN REWARD
          </h3>
          <p className="text-sm text-slate-400 mt-1 mb-5">
            Log in each day to boost your XP streak and claim legendary prizes!
          </p>

          {/* Grid of 7 days */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
            {days.map((item, idx) => {
              const isPast = idx < currentDayIndex;
              const isCurrent = idx === currentDayIndex;
              const isLocked = idx > currentDayIndex;

              return (
                <div
                  key={item.day}
                  className={`flex flex-col items-center justify-between p-2 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? 'bg-purple-950/60 border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                      : isPast
                      ? 'bg-slate-800/40 border-slate-700/50 opacity-60'
                      : 'bg-slate-900/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="text-[10px] font-bold text-slate-400 mb-1">
                    Day {item.day}
                  </span>
                  <span className="text-xl my-1">{item.icon}</span>
                  <span className="text-[11px] font-extrabold text-amber-300">
                    {item.reward}
                  </span>
                  <span className="text-[9px] font-semibold text-cyan-400">
                    +{item.xp}
                  </span>
                  {isPast && (
                    <span className="text-[9px] text-emerald-400 font-bold mt-1">✓ Claimed</span>
                  )}
                  {isCurrent && !claimedToday && (
                    <span className="text-[9px] text-cyan-300 font-bold mt-1 animate-pulse">Ready!</span>
                  )}
                  {isLocked && (
                    <span className="text-[9px] text-slate-500 mt-1">🔒 Locked</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              disabled={claimedToday}
              onClick={() => {
                sound.playLevelUp();
                onClaim();
              }}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold tracking-wide transition-all ${
                claimedToday
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg shadow-orange-500/30 hover:scale-105 active:scale-95'
              }`}
            >
              {claimedToday ? 'Claimed for Today ✓' : 'Claim Daily Reward'}
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

