import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from '../components/ReactNativePrimitives';
import { CATEGORIES } from '../data/questions';
import { sound } from '../utils/audio';

export const RoomCreationScreen = ({ user, onEnterLobby, onBack }) => {
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'join'
  const [selectedCategory, setSelectedCategory] = useState('technology');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const generateRoomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `ARENA-${code}`;
  };

  const handleCreateRoom = () => {
    sound.playClick();
    const newCode = generateRoomCode();
    onEnterLobby({
      roomCode: newCode,
      isHost: true,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      hostPlayer: {
        name: user.username,
        avatar: user.avatar,
        level: user.level,
        isReady: true
      },
      guestPlayer: {
        name: 'Waiting for challenger...',
        avatar: '⏳',
        level: '?',
        isReady: false
      }
    });
  };

  const handleJoinRoom = (codeToJoin) => {
    sound.playClick();
    const cleanCode = (codeToJoin || joinCodeInput).trim().toUpperCase();
    if (!cleanCode) {
      setErrorMessage('Please enter a 6-character room code.');
      return;
    }

    // Connect to room (demo room or created code)
    onEnterLobby({
      roomCode: cleanCode,
      isHost: false,
      category: 'science',
      difficulty: 'medium',
      hostPlayer: {
        name: 'CyberGladiator_X',
        avatar: '🥷',
        level: 8,
        isReady: true
      },
      guestPlayer: {
        name: user.username,
        avatar: user.avatar,
        level: user.level,
        isReady: true
      }
    });
  };

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-3xl mx-auto w-full animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-wide">
            Multiplayer Arena
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Host a private duel or join an active room with a code
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

      {/* Tabs: Create Room vs Join Room */}
      <div className="flex rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800 mb-6">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('create');
            setErrorMessage('');
          }}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            activeTab === 'create'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Create Room (Host)
        </button>
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setActiveTab('join');
            setErrorMessage('');
          }}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
            activeTab === 'join'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Join Room (Guest)
        </button>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
        {activeTab === 'create' ? (
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              Configure Your Arena Room
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Select category rules. A private 6-digit room code will be created for your opponent.
            </p>

            {/* Category Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Quiz Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-purple-950/80 border-purple-500 text-white shadow-md ring-1 ring-purple-400'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-lg block mb-1">{cat.icon}</span>
                    <span className="text-xs font-bold block truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Difficulty Tier
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['easy', 'medium', 'hard'].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedDifficulty(d);
                    }}
                    className={`py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider transition-all ${
                      selectedDifficulty === d
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md ring-1 ring-cyan-400'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Action */}
            <TouchableOpacity
              onPress={handleCreateRoom}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-black tracking-wider uppercase shadow-xl shadow-purple-600/30 hover:opacity-95 active:scale-95 transition-all text-center flex items-center justify-center space-x-2"
            >
              <span>GENERATE ROOM & ENTER LOBBY</span>
              <span className="text-lg">➔</span>
            </TouchableOpacity>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-bold text-white mb-2">
              Join an Arena Room
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Enter the room code shared by your friend or tournament host.
            </p>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Room Code (e.g. ARENA-9842)
              </label>
              <TextInput
                value={joinCodeInput}
                onChangeText={(t) => {
                  setJoinCodeInput(t);
                  setErrorMessage('');
                }}
                placeholder="Enter 6-digit code..."
                className="w-full uppercase font-mono tracking-widest text-center text-lg py-3.5 font-bold"
              />
              {errorMessage && (
                <span className="text-rose-400 text-xs font-semibold mt-1.5 block text-center">
                  {errorMessage}
                </span>
              )}
            </div>

            <TouchableOpacity
              onPress={() => handleJoinRoom()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white font-black tracking-wider uppercase shadow-xl shadow-cyan-600/30 hover:opacity-95 active:scale-95 transition-all text-center flex items-center justify-center space-x-2 mb-4"
            >
              <span>CONNECT TO ROOM</span>
              <span className="text-lg">➔</span>
            </TouchableOpacity>

            {/* Quick Demo Code helper */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block mb-2">
                Want to test room joining immediately?
              </span>
              <button
                type="button"
                onClick={() => handleJoinRoom('ARENA-7777')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold"
              >
                Join Demo Room: ARENA-7777
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

