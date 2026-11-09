import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from '../components/ReactNativePrimitives';
import { sound } from '../utils/audio';

export const SettingsScreen = ({
  soundEnabled,
  onToggleSound,
  onResetData,
  onBack
}) => {
  const [haptics, setHaptics] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState('high');
  const [defaultDifficulty, setDefaultDifficulty] = useState('medium');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const testAudio = () => {
    sound.playCorrect();
  };

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-3xl mx-auto w-full animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-wide">
            Settings & System
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Configure arena soundscapes, visual intensity, and preferences
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
        >
          ✕ Back
        </button>
      </div>

      <div className="space-y-4">
        {/* Audio FX Settings */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔊</span>
              <div>
                <h3 className="text-base font-bold text-white">Audio & Sound FX</h3>
                <p className="text-xs text-slate-400">Synthesized audio cues for answers, ticks, and promotions</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleSound}
              className={`w-14 h-8 rounded-full p-1 transition-colors ${
                soundEnabled ? 'bg-cyan-500' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">Test current audio output</span>
            <button
              type="button"
              onClick={testAudio}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold border border-cyan-500/30"
            >
              Play Test Chime 🎵
            </button>
          </div>
        </div>

        {/* Visual FX / Neon Glow */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">✨</span>
            <div>
              <h3 className="text-base font-bold text-white">Cyberpunk Neon Intensity</h3>
              <p className="text-xs text-slate-400">Adjust background glowing orbs and pulse animations</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['low', 'medium', 'high'].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setGlowIntensity(val);
                }}
                className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${
                  glowIntensity === val
                    ? 'bg-purple-950/80 border-purple-500 text-purple-300 ring-1 ring-purple-400'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Default Difficulty Preference */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="text-base font-bold text-white">Default Question Tier</h3>
              <p className="text-xs text-slate-400">Pre-select your preferred difficulty in games</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['easy', 'medium', 'hard'].map(tier => (
              <button
                key={tier}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setDefaultDifficulty(tier);
                }}
                className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${
                  defaultDifficulty === tier
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>

        {/* Data Reset */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="text-base font-bold text-rose-400">Reset Local Profile Data</h3>
                <p className="text-xs text-slate-400">Clear high scores, badges, and reset XP to Level 1</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-500/40 text-xs font-bold"
            >
              Reset Data
            </button>
          </div>
        </div>

        {/* About Info */}
        <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm font-black text-white mb-1">
            <span>⚡ QUIZ ARENA</span>
            <span className="text-xs text-cyan-400 font-mono">v2.4 Pro</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Built with pure HTML, Tailwind CSS, and React Native components. Responsive competitive trivia battleground.
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal visible={isResetConfirmOpen} onRequestClose={() => setIsResetConfirmOpen(false)}>
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/50 shadow-2xl text-center">
          <span className="text-4xl mb-3 block">⚠️</span>
          <h3 className="text-xl font-black text-white mb-2">Reset All Arena Data?</h3>
          <p className="text-xs text-slate-400 mb-6">
            This will wipe your points, badges, and match history. This action cannot be undone.
          </p>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(false)}
              className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs uppercase"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onResetData();
                setIsResetConfirmOpen(false);
              }}
              className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase shadow-lg shadow-rose-950/40"
            >
              Confirm Reset
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

