import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from '../components/ReactNativePrimitives';
import { CATEGORIES } from '../data/questions';
import { sound } from '../utils/audio';

export const MultiplayerLobbyScreen = ({
  roomData,
  user,
  onStartBattle,
  onLeaveLobby
}) => {
  const [copied, setCopied] = useState(false);
  const [challengerJoined, setChallengerJoined] = useState(
    !roomData.isHost || (roomData.guestPlayer && roomData.guestPlayer.name !== 'Waiting for challenger...')
  );
  const [guestPlayer, setGuestPlayer] = useState(
    roomData.guestPlayer || { name: 'Waiting for challenger...', avatar: '⏳', level: '?', isReady: false }
  );

  const categoryObj = CATEGORIES.find(c => c.id === roomData.category) || CATEGORIES[0];

  // Auto-simulate challenger joining after 3 seconds if host is waiting
  useEffect(() => {
    let joinTimer = null;
    if (roomData.isHost && !challengerJoined) {
      joinTimer = setTimeout(() => {
        handleSimulateJoin();
      }, 3500);
    }
    return () => {
      if (joinTimer) clearTimeout(joinTimer);
    };
  }, [roomData.isHost, challengerJoined]);

  const handleCopyCode = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(roomData.roomCode);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateJoin = () => {
    sound.playLevelUp();
    setChallengerJoined(true);
    setGuestPlayer({
      name: 'Valkyrie_Queen',
      avatar: '👸',
      level: 9,
      isReady: true
    });
  };

  const handleLaunchBattle = () => {
    sound.playVictory();
    onStartBattle({
      mode: 'multiplayer',
      category: roomData.category,
      difficulty: roomData.difficulty,
      title: `${categoryObj.name} 1v1 Battle`,
      opponent: roomData.isHost ? guestPlayer : roomData.hostPlayer,
      roomCode: roomData.roomCode,
      isHost: roomData.isHost
    });
  };

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-4xl mx-auto w-full animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
            Multiplayer Room Lobby
          </span>
          <h2 className="text-3xl font-black text-white tracking-wide mt-1">
            Arena Waiting Chamber
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onLeaveLobby();
          }}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white"
        >
          Leave Lobby
        </button>
      </div>

      {/* Room Code Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Share this Room Code with your rival
          </span>
          <div className="text-3xl sm:text-4xl font-black tracking-widest text-cyan-400 font-mono mt-1">
            {roomData.roomCode}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Category: <strong className="text-white">{categoryObj.name}</strong> • Tier: <strong className="text-cyan-300 uppercase">{roomData.difficulty}</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopyCode}
          className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/40 text-cyan-300 font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <span>{copied ? '✓ Copied to Clipboard!' : '📋 Copy Room Code'}</span>
        </button>
      </div>

      {/* Versus Gladiators Grid (Player 1 vs Player 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Player 1 Card (Host) */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-purple-500/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Host
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-3xl shadow-lg shadow-purple-900/40">
              {roomData.hostPlayer?.avatar || user.avatar}
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                {roomData.hostPlayer?.name || user.username}
              </h3>
              <span className="text-xs text-purple-400 font-mono font-bold">
                Level {roomData.hostPlayer?.level || user.level}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-medium">Status</span>
            <span className="text-xs font-black text-emerald-400 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>READY FOR COMBAT</span>
            </span>
          </div>
        </div>

        {/* Player 2 Card (Challenger) */}
        <div className={`p-6 rounded-3xl bg-slate-900/80 border transition-all shadow-xl relative overflow-hidden ${
          challengerJoined ? 'border-cyan-500/40' : 'border-slate-800 border-dashed'
        }`}>
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Challenger
          </div>

          {challengerJoined ? (
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-3xl shadow-lg shadow-cyan-900/40">
                  {guestPlayer.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    {guestPlayer.name}
                  </h3>
                  <span className="text-xs text-cyan-400 font-mono font-bold">
                    Level {guestPlayer.level}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Status</span>
                <span className="text-xs font-black text-emerald-400 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CONNECTED & READY</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <ActivityIndicator size="small" color="#06b6d4" className="mb-2" />
              <span className="text-sm font-bold text-slate-300">
                Waiting for challenger to join...
              </span>
              <p className="text-xs text-slate-500 mt-1 mb-4">
                Share room code <strong className="text-cyan-400 font-mono">{roomData.roomCode}</strong>
              </p>
              <button
                type="button"
                onClick={handleSimulateJoin}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-cyan-500/30"
              >
                Instant Join (Simulate Player 2)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Start Button */}
      <div className="flex flex-col items-center">
        <TouchableOpacity
          disabled={!challengerJoined}
          onPress={handleLaunchBattle}
          className={`w-full max-w-md py-4 rounded-2xl text-white font-black tracking-wider uppercase shadow-xl transition-all text-center flex items-center justify-center space-x-2 ${
            challengerJoined
              ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 active:scale-95 shadow-purple-600/40'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <span>START MULTIPLAYER MATCH</span>
          <span className="text-xl">⚔️</span>
        </TouchableOpacity>

        {/* Clear Notice about simulated vs real online */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 max-w-md text-center text-[11px] text-slate-400">
          <span className="font-semibold text-cyan-400">Platform Demonstration:</span> Real-time synchronous duel engine with identical question sets and live latency simulation.
        </div>
      </div>
    </div>
  );
};

