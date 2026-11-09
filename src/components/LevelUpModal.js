import React from 'react';
import { View, Text, TouchableOpacity, Modal } from './ReactNativePrimitives';
import { LEVEL_TITLES } from '../data/achievements';
import { sound } from '../utils/audio';

export const LevelUpModal = ({ visible, level, onClose }) => {
  const title = LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)] || 'Arena Legend';

  return (
    <Modal visible={visible} onRequestClose={onClose}>
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-cyan-400 shadow-2xl shadow-cyan-500/40 text-center overflow-hidden">
        {/* Neon Glow orbs */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-600/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-1 shadow-xl shadow-cyan-500/40 animate-pulse">
            <div className="w-full h-full bg-[#0a0e1c] rounded-[22px] flex items-center justify-center text-4xl">
              ⭐
            </div>
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 mb-2">
            Promotion Achieved!
          </span>

          <h2 className="text-3xl font-black text-white tracking-wide mb-1">
            LEVEL UP!
          </h2>

          <div className="my-4 py-3 px-6 rounded-2xl bg-slate-950/80 border border-purple-500/40 inline-block">
            <span className="text-4xl font-black bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent font-mono">
              LEVEL {level}
            </span>
          </div>

          <p className="text-lg font-bold text-purple-300 mb-2">
            "{title}"
          </p>

          <p className="text-xs text-slate-400 max-w-xs mx-auto mb-6">
            You unlocked higher arena tiers and improved your competitive standing!
          </p>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-3.5 rounded-xl font-black tracking-wider uppercase bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-purple-600/40 hover:opacity-95 active:scale-95 transition-all"
          >
            Claim & Continue
          </button>
        </div>
      </div>
    </Modal>
  );
};

