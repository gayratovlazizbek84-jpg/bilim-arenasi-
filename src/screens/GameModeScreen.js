import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from '../components/ReactNativePrimitives';
import { sound } from '../utils/audio';

export const GameModeScreen = ({
  onSelectMode,
  onNavigate,
  onStartQuiz
}) => {
  const [isSearchingMatch, setIsSearchingMatch] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [opponent, setOpponent] = useState(null);

  const startQuickMatchSearch = () => {
    sound.playClick();
    setIsSearchingMatch(true);
    setMatchFound(false);

    const opponents = [
      { name: 'Vortex_Nova', avatar: '🧙‍♂️', level: 9, title: 'Mastermind' },
      { name: 'Blaze_Ace', avatar: '⚡', level: 7, title: 'Grandmaster' },
      { name: 'NeonValkyrie', avatar: '👸', level: 8, title: 'Trivia Titan' },
      { name: 'CyberShadow', avatar: '🥷', level: 10, title: 'Arena Legend' }
    ];

    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];

    // Simulate matchmaking search
    setTimeout(() => {
      sound.playLevelUp();
      setOpponent(randomOpponent);
      setMatchFound(true);

      setTimeout(() => {
        setIsSearchingMatch(false);
        setMatchFound(false);
        onStartQuiz({
          mode: 'multiplayer',
          category: 'technology',
          difficulty: 'medium',
          title: 'Quick Match 1v1',
          opponent: randomOpponent,
          isHost: true,
          roomCode: 'QM-' + Math.floor(1000 + Math.random() * 9000)
        });
      }, 1800);
    }, 2200);
  };

  const modes = [
    {
      id: 'single',
      title: 'Single Player',
      badge: 'SOLO LADDER',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      icon: '👤',
      gradient: 'from-purple-900/40 via-slate-900 to-slate-900',
      borderHover: 'hover:border-purple-500/60',
      description: 'Climb the knowledge ladder alone. Select any topic and difficulty to test your mind.',
      features: ['Choose from 8 categories', '3 difficulty tiers', 'Timed 30s questions', 'Full XP & rewards'],
      actionText: 'Select Category',
      onPress: () => {
        sound.playClick();
        onNavigate('categories');
      }
    },
    {
      id: 'multiplayer',
      title: 'Multiplayer 1v1',
      badge: 'CUSTOM ROOMS',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      icon: '⚔️',
      gradient: 'from-cyan-950/40 via-slate-900 to-slate-900',
      borderHover: 'hover:border-cyan-500/60',
      description: 'Create a private battle room, share the 6-digit room code with a friend, and duel synchronously.',
      features: ['Generate private room codes', 'Instant join by code', 'Simultaneous questions', 'Winner crowns and trophies'],
      actionText: 'Host or Join Room',
      onPress: () => {
        sound.playClick();
        onNavigate('room_creation');
      }
    },
    {
      id: 'quick_match',
      title: 'Quick Match',
      badge: 'INSTANT PVP',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      icon: '⚡',
      gradient: 'from-emerald-950/40 via-slate-900 to-slate-900',
      borderHover: 'hover:border-emerald-500/60',
      description: 'Jump straight into the arena! Automatic matchmaking finds a rival gladiator in seconds.',
      features: ['Zero setup waiting', 'Ranked matchmaking', 'Real-time opponent scoring', 'Dynamic streak battles'],
      actionText: 'Find Opponent',
      onPress: startQuickMatchSearch
    },
    {
      id: 'practice',
      title: 'Practice Mode',
      badge: 'ZERO PRESSURE',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      icon: '🧘',
      gradient: 'from-amber-950/40 via-slate-900 to-slate-900',
      borderHover: 'hover:border-amber-500/60',
      description: 'Learn without stress. No ticking countdown timer. Detailed explanations after every question.',
      features: ['No countdown timer', 'Instant explanations', 'Explore answers', 'Great for warm-ups'],
      actionText: 'Start Practice',
      onPress: () => {
        sound.playClick();
        onStartQuiz({
          mode: 'practice',
          category: 'general',
          difficulty: 'easy',
          title: 'Practice & Study'
        });
      }
    },
    {
      id: 'daily',
      title: 'Daily Challenge',
      badge: '2X BONUS XP',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      icon: '🎯',
      gradient: 'from-rose-950/40 via-slate-900 to-slate-900',
      borderHover: 'hover:border-rose-500/60',
      description: 'A daily curated 5-question multi-discipline exam. Complete once per day for huge rewards.',
      features: ['Handcrafted question mix', 'Double points & XP', 'Daily streak bonus', 'Special achievement badge'],
      actionText: 'Accept Challenge',
      onPress: () => {
        sound.playClick();
        onStartQuiz({
          mode: 'daily',
          category: 'general',
          difficulty: 'medium',
          title: 'Daily Master Challenge'
        });
      }
    }
  ];

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-7xl mx-auto w-full animate-fade-in">
      <div className="mb-6">
        <h2 className="text-3xl font-black text-white tracking-wide">
          Select Game Mode
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Pick how you want to battle in the Quiz Arena
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modes.map((m) => (
          <div
            key={m.id}
            className={`group relative flex flex-col justify-between p-6 rounded-3xl bg-gradient-to-br ${m.gradient} border border-slate-800 ${m.borderHover} transition-all duration-300 hover:-translate-y-1.5 shadow-xl`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform">
                  {m.icon}
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${m.badgeColor}`}>
                  {m.badge}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                {m.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {m.description}
              </p>

              <div className="my-5 pt-4 border-t border-slate-800/80 space-y-2">
                {m.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-slate-400">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <TouchableOpacity
              onPress={m.onPress}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-900/30 hover:opacity-95 active:scale-95 transition-all text-center flex items-center justify-center space-x-2"
            >
              <span>{m.actionText}</span>
              <span>➔</span>
            </TouchableOpacity>
          </div>
        ))}
      </div>

      {/* Matchmaking Simulation Modal */}
      <Modal visible={isSearchingMatch} onRequestClose={() => setIsSearchingMatch(false)}>
        <div className="p-8 rounded-3xl bg-slate-900 border border-cyan-500/40 shadow-2xl text-center">
          {!matchFound ? (
            <div className="flex flex-col items-center">
              <ActivityIndicator size="large" color="#06b6d4" className="mb-4" />
              <h3 className="text-xl font-black text-white">SEARCHING FOR OPPONENT...</h3>
              <p className="text-xs text-slate-400 mt-2 mb-6">Scanning the global arena matchmaking queue</p>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsSearchingMatch(false);
                }}
                className="px-5 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancel Search
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center animate-scale-up">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-3xl mb-3 shadow-lg shadow-cyan-500/40">
                {opponent?.avatar}
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mb-1">
                Opponent Found!
              </span>
              <h3 className="text-2xl font-black text-white">{opponent?.name}</h3>
              <p className="text-xs text-cyan-400 font-bold mb-4">Level {opponent?.level} • {opponent?.title}</p>
              <p className="text-xs text-slate-400 animate-pulse">Launching battle arena in 2 seconds...</p>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

