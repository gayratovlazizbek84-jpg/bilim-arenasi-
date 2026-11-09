import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from '../components/ReactNativePrimitives';
import { QUESTIONS, DAILY_CHALLENGE_QUESTIONS } from '../data/questions';
import { sound } from '../utils/audio';

export const QuizGameplayScreen = ({
  gameConfig,
  user,
  onFinishGame,
  onQuit
}) => {
  const {
    mode = 'single',
    category = 'general',
    difficulty = 'medium',
    opponent = null,
    title = 'Arena Quiz'
  } = gameConfig;

  // Select questions based on mode and category
  const questionPool = useRef([]);
  useEffect(() => {
    if (mode === 'daily') {
      questionPool.current = [...DAILY_CHALLENGE_QUESTIONS];
    } else {
      const catQuestions = (QUESTIONS[category] && QUESTIONS[category][difficulty]) || QUESTIONS.general.medium;
      questionPool.current = [...catQuestions].slice(0, 5);
    }
  }, [mode, category, difficulty]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [opponentAnswerState, setOpponentAnswerState] = useState(null); // 'thinking', 'answered'
  const [streak, setStreak] = useState(0);
  const [answersLog, setAnswersLog] = useState([]);

  // Lifelines & Power-ups
  const [lifelines, setLifelines] = useState({ fiftyFifty: true, timeFreeze: true, hint: true });
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [activeHint, setActiveHint] = useState(null);

  const timerRef = useRef(null);
  const autoNextTimeoutRef = useRef(null);

  const currentQ = questionPool.current[currentIndex] || {
    question: 'Loading question...',
    options: ['...', '...', '...', '...'],
    correctIndex: 0,
    explanation: '',
    hint: ''
  };

  const isPractice = mode === 'practice';
  const totalQuestions = questionPool.current.length || 5;

  // Timer countdown effect
  useEffect(() => {
    if (isPractice || isAnswered) return;

    setTimeLeft(30);
    setOpponentAnswerState('thinking');
    setHiddenOptions([]);
    setActiveHint(null);

    // Opponent behavior simulation in multiplayer mode
    let opponentTimeout = null;
    if (opponent) {
      const simulatedOpponentDelay = Math.floor(Math.random() * 8000) + 4000;
      opponentTimeout = setTimeout(() => {
        setOpponentAnswerState('answered');
        const willOpponentGetItRight = Math.random() < 0.75;
        if (willOpponentGetItRight) {
          const opponentPoints = Math.round(100 + (20 * 5));
          setOpponentScore(prev => prev + opponentPoints);
        }
      }, simulatedOpponentDelay);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        if (prev <= 6) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (opponentTimeout) clearTimeout(opponentTimeout);
      if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    };
  }, [currentIndex, isAnswered, isPractice, opponent]);

  // Keyboard controls listener (1-4, A-D, Enter, Space)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnswered) {
        if (e.key === 'Enter' || e.key === ' ') {
          advanceNextQuestion();
        }
        return;
      }

      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') handleSelectOption(0);
      else if (key === 'B' || key === '2') handleSelectOption(1);
      else if (key === 'C' || key === '3') handleSelectOption(2);
      else if (key === 'D' || key === '4') handleSelectOption(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentIndex, hiddenOptions]);

  const handleTimeOut = () => {
    if (isAnswered) return;
    sound.playWrong();
    setIsAnswered(true);
    setSelectedOption(-1);
    setStreak(0);

    setAnswersLog(prev => [
      ...prev,
      {
        question: currentQ.question,
        selected: -1,
        correct: currentQ.correctIndex,
        isCorrect: false,
        timeTaken: 30,
        pointsAwarded: 0
      }
    ]);

    autoNextTimeoutRef.current = setTimeout(() => {
      advanceNextQuestion();
    }, 2500);
  };

  const handleSelectOption = (idx) => {
    if (isAnswered || hiddenOptions.includes(idx)) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setIsAnswered(true);
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correctIndex;
    const timeUsed = 30 - timeLeft;

    let pointsAwarded = 0;
    if (isCorrect) {
      sound.playCorrect();
      const currentStreak = streak + 1;
      setStreak(currentStreak);

      const speedBonus = isPractice ? 0 : Math.max(0, timeLeft * 2);
      const streakBonus = currentStreak > 1 ? (currentStreak - 1) * 20 : 0;
      const difficultyMultiplier = difficulty === 'hard' ? 2 : difficulty === 'medium' ? 1.5 : 1;

      pointsAwarded = Math.round((100 + speedBonus + streakBonus) * difficultyMultiplier);
      setUserScore(prev => prev + pointsAwarded);
    } else {
      sound.playWrong();
      setStreak(0);
    }

    setAnswersLog(prev => [
      ...prev,
      {
        question: currentQ.question,
        selected: idx,
        correct: currentQ.correctIndex,
        isCorrect,
        timeTaken: timeUsed,
        pointsAwarded
      }
    ]);

    autoNextTimeoutRef.current = setTimeout(() => {
      advanceNextQuestion();
    }, 2200);
  };

  const advanceNextQuestion = () => {
    if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(30);
      setHiddenOptions([]);
      setActiveHint(null);
    } else {
      onFinishGame({
        userScore,
        opponentScore: opponent ? opponentScore : 0,
        totalQuestions,
        answersLog,
        gameConfig,
        opponent
      });
    }
  };

  // Lifelines
  const useFiftyFifty = () => {
    if (!lifelines.fiftyFifty || isAnswered) return;
    sound.playPowerUp();
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
    const wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correctIndex);
    const shuffledWrong = wrongIndices.sort(() => 0.5 - Math.random());
    setHiddenOptions(shuffledWrong.slice(0, 2));
  };

  const useTimeFreeze = () => {
    if (!lifelines.timeFreeze || isAnswered || isPractice) return;
    sound.playPowerUp();
    setLifelines(prev => ({ ...prev, timeFreeze: false }));
    setTimeLeft(prev => prev + 15);
  };

  const useHint = () => {
    if (!lifelines.hint || isAnswered) return;
    sound.playPowerUp();
    setLifelines(prev => ({ ...prev, hint: false }));
    setActiveHint(currentQ.hint || currentQ.explanation.slice(0, 45) + '...');
  };

  const timerPercent = (timeLeft / 30) * 100;
  const timerColor = timeLeft <= 5 ? '#f43f5e' : timeLeft <= 10 ? '#f59e0b' : '#06b6d4';

  return (
    <SafeAreaView className="min-h-screen px-4 py-4 sm:px-6 max-w-4xl mx-auto w-full justify-between pb-8">
      {/* Top Header Bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              if (window.confirm('Quit this quiz and return to menu?')) {
                onQuit();
              }
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            ✕ Quit
          </button>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {title}
            </span>
            <span className="text-xs font-mono font-bold text-slate-400">
              Q {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          <div className="flex items-center space-x-2 font-mono font-black text-amber-300 text-sm bg-slate-900 px-3 py-1.5 rounded-xl border border-amber-500/30">
            <span>🪙</span>
            <span>{userScore} PTS</span>
          </div>
        </div>

        {/* Multiplayer Live Opponent HUD */}
        {opponent && (
          <div className="mb-4 p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-lg">
                {user.avatar || '🥷'}
              </div>
              <div>
                <span className="text-xs font-black text-white block">{user.username} (You)</span>
                <span className="text-[11px] font-mono text-cyan-300 font-bold">{userScore} PTS</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-xs font-black text-slate-300 border border-slate-700">
              <span>VS</span>
            </div>

            <div className="flex items-center space-x-2.5 text-right">
              <div>
                <div className="flex items-center justify-end space-x-1">
                  <span className="text-xs font-black text-white">{opponent.name}</span>
                  {opponentAnswerState === 'thinking' ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" title="Opponent is thinking..." />
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-bold">✓ Ready</span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-amber-400 font-bold">{opponentScore} PTS</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center text-lg">
                {opponent.avatar || '🧙‍♂️'}
              </div>
            </div>
          </div>
        )}

        {/* Round Progress Bar */}
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-4">
          <div
            className="bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Timer & Arena Lifelines Controls */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center space-x-1.5">
            {streak > 1 ? (
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-orange-500/20 text-orange-400 border border-orange-500/40 animate-pulse flex items-center space-x-1">
                <span>🔥</span>
                <span>{streak}x Combo Streak!</span>
              </span>
            ) : (
              <span className="text-xs text-slate-500 font-medium">Standard multiplier</span>
            )}
          </div>

          {/* In-Game Lifelines */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              disabled={!lifelines.fiftyFifty || isAnswered}
              onClick={useFiftyFifty}
              title="50:50 (Eliminate 2 wrong answers)"
              className={`px-2.5 py-1 rounded-lg text-xs font-black border transition-all ${
                lifelines.fiftyFifty && !isAnswered
                  ? 'bg-purple-950/80 border-purple-500 text-purple-300 hover:scale-105 active:scale-95'
                  : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              ⚡ 50:50
            </button>

            {!isPractice && (
              <button
                type="button"
                disabled={!lifelines.timeFreeze || isAnswered}
                onClick={useTimeFreeze}
                title="Time Freeze (+15s timer boost)"
                className={`px-2.5 py-1 rounded-lg text-xs font-black border transition-all ${
                  lifelines.timeFreeze && !isAnswered
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 hover:scale-105 active:scale-95'
                    : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                ⏱️ +15s
              </button>
            )}

            <button
              type="button"
              disabled={!lifelines.hint || isAnswered}
              onClick={useHint}
              title="Hint / Clue"
              className={`px-2.5 py-1 rounded-lg text-xs font-black border transition-all ${
                lifelines.hint && !isAnswered
                  ? 'bg-amber-950/80 border-amber-500 text-amber-300 hover:scale-105 active:scale-95'
                  : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              💡 Hint
            </button>
          </div>

          {!isPractice && (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-black text-xs" style={{ borderColor: timerColor, color: timerColor }}>
                {timeLeft}
              </div>
              <span className="text-xs font-bold text-slate-400">sec</span>
            </div>
          )}
        </div>

        {/* Active Hint Banner */}
        {activeHint && (
          <div className="mb-3 p-3 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-200 flex items-center space-x-2 animate-fade-in">
            <span>💡</span>
            <span><strong>Tactical Clue:</strong> {activeHint}</span>
          </div>
        )}
      </div>

      {/* Main Question Card */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl my-2 backdrop-blur-md">
        <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 block mb-2">
          {currentQ.category || category.toUpperCase()}
        </span>

        <h2 className="text-xl sm:text-2xl font-black text-white leading-relaxed tracking-wide min-h-[64px] flex items-center">
          {currentQ.question}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            const isHidden = hiddenOptions.includes(idx);

            let buttonStyle = 'bg-slate-800/80 border-slate-700/80 text-white hover:border-cyan-500/60 hover:bg-slate-800';
            let badgeStyle = 'bg-slate-700 text-slate-300';

            if (isHidden) {
              buttonStyle = 'opacity-20 border-slate-800 pointer-events-none';
            }

            if (isAnswered) {
              if (isCorrect) {
                buttonStyle = 'bg-emerald-950/90 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-900/40';
                badgeStyle = 'bg-emerald-500 text-slate-950 font-black';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-950/90 border-rose-500 text-rose-100 ring-2 ring-rose-500/50 shadow-lg shadow-rose-900/40';
                badgeStyle = 'bg-rose-500 text-white font-black';
              } else {
                buttonStyle = 'bg-slate-900/50 border-slate-800/60 text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered || isHidden}
                onClick={() => handleSelectOption(idx)}
                className={`relative flex items-center p-4 rounded-2xl border text-left font-bold transition-all duration-200 active:scale-98 ${buttonStyle}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black mr-3 flex-shrink-0 transition-colors ${badgeStyle}`}>
                  {isAnswered && isCorrect ? '✓' : isAnswered && isSelected && !isCorrect ? '✕' : letter}
                </div>
                <span className="text-sm sm:text-base leading-snug flex-1">
                  {option}
                </span>
                <span className="hidden sm:inline-block text-[10px] text-slate-500 font-mono font-bold ml-2">[{letter}]</span>
              </button>
            );
          })}
        </div>

        {/* Answer Feedback / Explanation Banner */}
        {isAnswered && (
          <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 animate-fade-in flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-black uppercase tracking-wider ${
                  selectedOption === currentQ.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {selectedOption === currentQ.correctIndex ? '★ Correct Answer!' : '✕ Incorrect'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>

            <button
              type="button"
              onClick={() => advanceNextQuestion()}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:opacity-95 active:scale-95 flex-shrink-0 self-end sm:self-center"
            >
              Next ➔ [Enter]
            </button>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-500 font-medium">
        Keyboard shortcuts: Press [1, 2, 3, 4] or [A, B, C, D] to answer immediately
      </div>
    </SafeAreaView>
  );
};
