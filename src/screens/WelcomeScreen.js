import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from '../components/ReactNativePrimitives';
import { AVATARS } from '../data/achievements';
import { sound } from '../utils/audio';

export const WelcomeScreen = ({ onLogin, initialUsername = 'ArenaWarrior' }) => {
  const [username, setUsername] = useState(initialUsername);
  const [selectedAvatar, setSelectedAvatar] = useState('🥷');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!username.trim()) {
      setError('Please choose a warrior username!');
      return;
    }
    sound.playVictory();
    onLogin({
      username: username.trim(),
      avatar: selectedAvatar
    });
  };

  return (
    <SafeAreaView className="justify-center items-center px-4 py-8 relative overflow-hidden bg-[#070913]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10 flex flex-col items-center">
        {/* Logo and Tagline */}
        <div className="relative mb-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-1 shadow-2xl shadow-purple-600/40 animate-pulse mb-3">
            <div className="w-full h-full bg-[#0a0e1c] rounded-[22px] flex items-center justify-center text-4xl">
              ⚡
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-center">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              QUIZ
            </span>{' '}
            <span className="text-white">ARENA</span>
          </h1>
          <p className="text-sm font-semibold tracking-widest uppercase text-cyan-400 mt-2 text-center">
            The Ultimate Competitive Trivia Battleground
          </p>
        </div>

        {/* Welcome Card */}
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-purple-950/30">
          <h2 className="text-xl font-bold text-white mb-2 text-center">
            Choose Your Identity
          </h2>
          <p className="text-xs text-slate-400 text-center mb-6">
            Enter your username and pick an avatar to enter the arena.
          </p>

          {/* Username Input */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Gladiator Codename
            </label>
            <TextInput
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError('');
              }}
              placeholder="Enter your username..."
              className="w-full font-medium"
            />
            {error && (
              <span className="text-rose-400 text-xs font-semibold mt-1.5 block">
                {error}
              </span>
            )}
          </div>

          {/* Avatar Selector */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Select Profile Avatar
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedAvatar(av.icon);
                  }}
                  className={`h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${
                    selectedAvatar === av.icon
                      ? 'bg-gradient-to-br from-purple-600 to-cyan-500 scale-110 shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-300'
                      : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60'
                  }`}
                  title={av.name}
                >
                  {av.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Enter Arena Button */}
          <TouchableOpacity
            onPress={handleStart}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-black tracking-wider uppercase shadow-xl shadow-purple-600/30 hover:opacity-95 active:scale-95 transition-all text-center flex items-center justify-center space-x-2"
          >
            <span>ENTER THE ARENA</span>
            <span className="text-xl">➔</span>
          </TouchableOpacity>

          {/* Quick guest tip */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Instant guest profile</span>
            <span className="text-cyan-400 font-medium">Automatic cloud-ready demo</span>
          </div>
        </div>

        {/* Feature Badges footer */}
        <div className="flex items-center justify-center space-x-6 mt-8 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <span className="text-amber-400">⚡</span>
            <span>Real-time Scoring</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-purple-400">⚔️</span>
            <span>Multiplayer Duels</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-cyan-400">🏆</span>
            <span>Live Leaderboards</span>
          </div>
        </div>
      </div>
    </SafeAreaView>
  );
};

