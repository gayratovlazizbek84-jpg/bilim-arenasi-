import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from '../components/ReactNativePrimitives';
import { sound } from '../utils/audio';

export const ResultsScreen = ({
  resultsData,
  user,
  onPlayAgain,
  onGoHome,
  onViewLeaderboard
}) => {
  const {
    userScore = 0,
    opponentScore = 0,
    totalQuestions = 5,
    answersLog = [],
    gameConfig = {},
    opponent = null
  } = resultsData;

  const isMultiplayer = !!opponent;
  const correctCount = answersLog.filter(a => a.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const isUserWinner = isMultiplayer ? userScore > opponentScore : accuracy >= 80;
  const isDraw = isMultiplayer && userScore === opponentScore;

  const xpEarned = Math.round((userScore / 10) + (correctCount * 15));

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-4xl mx-auto w-full animate-fade-in">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl text-center mb-8">
        {/* Glow ambient light */}
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isUserWinner ? 'bg-cyan-500/20' : 'bg-rose-500/10'
        }`} />

        <div className="relative z-10">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-1 shadow-2xl shadow-cyan-500/30 flex items-center justify-center text-4xl">
            {isMultiplayer ? (isUserWinner ? '🏆' : isDraw ? '🤝' : '⚔️') : (accuracy === 100 ? '👑' : accuracy >= 60 ? '⭐' : '🎯')}
          </div>

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border mb-2 ${
            isUserWinner
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : isDraw
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
          }`}>
            {isMultiplayer
              ? (isUserWinner ? 'Match Victory' : isDraw ? 'Stalemate' : 'Defeat')
              : (accuracy === 100 ? 'Flawless Victory' : accuracy >= 60 ? 'Mission Accomplished' : 'Practice Completed')}
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wide">
            {isMultiplayer
              ? (isUserWinner ? `You Defeated ${opponent.name}!` : isDraw ? 'Honorable Tie!' : `${opponent.name} Claimed Victory!`)
              : (accuracy === 100 ? '100% PERFECT SCORE!' : accuracy >= 60 ? 'EXCELLENT COMBAT!' : 'GOOD EFFORT!')}
          </h2>

          <p className="text-sm text-slate-400 max-w-md mx-auto mt-2">
            {isMultiplayer
              ? 'Scores have been tabulated and synced to the global rankings.'
              : 'Your knowledge ranking and XP progress have been recorded.'}
          </p>

          {/* Multiplayer Head-to-Head Scoreboard */}
          {isMultiplayer ? (
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto my-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-purple-500/30">
                <span className="text-2xl block mb-1">{user.avatar || '🥷'}</span>
                <span className="text-xs font-black text-white block">{user.username}</span>
                <span className="text-2xl font-black text-cyan-300 font-mono mt-1 block">{userScore}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Points</span>
              </div>
              <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-2xl block mb-1">{opponent.avatar || '🧙‍♂️'}</span>
                <span className="text-xs font-black text-white block">{opponent.name}</span>
                <span className="text-2xl font-black text-amber-300 font-mono mt-1 block">{opponentScore}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Points</span>
              </div>
            </div>
          ) : (
            <div className="my-6 inline-block py-3 px-8 rounded-2xl bg-slate-950/80 border border-amber-500/40">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Final Score</span>
              <span className="text-4xl font-black text-amber-300 font-mono">{userScore} PTS</span>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-4 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-center">
              <span className="text-xs text-slate-400 block font-semibold">Correct</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {correctCount} / {totalQuestions}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-center">
              <span className="text-xs text-slate-400 block font-semibold">Accuracy</span>
              <span className="text-lg font-black text-cyan-300 font-mono">
                {accuracy}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-center">
              <span className="text-xs text-slate-400 block font-semibold">XP Earned</span>
              <span className="text-lg font-black text-purple-400 font-mono">
                +{xpEarned} XP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <TouchableOpacity
          onPress={() => {
            sound.playClick();
            onPlayAgain(gameConfig);
          }}
          className="py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-900/30 text-center hover:opacity-95 active:scale-95 transition-all"
        >
          Rematch / Play Again 🔄
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            sound.playClick();
            onViewLeaderboard();
          }}
          className="py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-cyan-400 border border-cyan-500/40 font-bold text-xs uppercase tracking-wider text-center active:scale-95 transition-all"
        >
          View Leaderboard 🏆
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            sound.playClick();
            onGoHome();
          }}
          className="py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 font-bold text-xs uppercase tracking-wider text-center active:scale-95 transition-all"
        >
          Return to Home 🏠
        </TouchableOpacity>
      </div>

      {/* Detailed Question Review List */}
      <h3 className="text-xl font-black text-white mb-4">
        Round Breakdown & Explanations
      </h3>
      <div className="space-y-3">
        {answersLog.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-black ${
                  item.isCorrect ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                }`}>
                  {item.isCorrect ? '✓' : '✕'}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  Question {idx + 1}
                </span>
                <span className={`text-[11px] font-bold ${item.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.isCorrect ? `+${item.pointsAwarded} PTS` : '0 PTS'}
                </span>
              </div>
              <p className="text-sm font-bold text-white mb-1">
                {item.question}
              </p>
            </div>
            <div className="text-xs text-slate-400 sm:text-right flex-shrink-0">
              <span className="block font-mono">Time: {item.timeTaken}s</span>
              <span className="text-[11px] text-cyan-400">{item.isCorrect ? 'Speed Bonus Applied' : 'No Bonus'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

