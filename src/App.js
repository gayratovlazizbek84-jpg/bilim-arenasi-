import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from './components/ReactNativePrimitives';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { DailyRewardModal } from './components/DailyRewardModal';
import { LevelUpModal } from './components/LevelUpModal';

import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { GameModeScreen } from './screens/GameModeScreen';
import { QuizGameplayScreen } from './screens/QuizGameplayScreen';
import { MultiplayerLobbyScreen } from './screens/MultiplayerLobbyScreen';
import { RoomCreationScreen } from './screens/RoomCreationScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { SettingsScreen } from './screens/SettingsScreen';

import { sound } from './utils/audio';

const STORAGE_KEY = 'quiz_arena_user_v2';

const DEFAULT_USER = {
  username: 'ArenaWarrior',
  avatar: '🥷',
  level: 1,
  xp: 120,
  points: 450,
  gamesPlayed: 2,
  correctAnswers: 8,
  totalAnswersAttempted: 10,
  multiplayerWins: 1,
  perfectScores: 0,
  fastAnswers: 3,
  categoriesPlayed: ['general', 'science'],
  dailyCompleted: 0,
  loginStreak: 1,
  lastDailyClaim: null,
  isLoggedIn: true
};

export function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_USER;
  });

  const [currentScreen, setCurrentScreen] = useState(() => {
    return user.isLoggedIn ? 'home' : 'welcome';
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeGameConfig, setActiveGameConfig] = useState(null);
  const [lastResultsData, setLastResultsData] = useState(null);
  const [activeRoomData, setActiveRoomData] = useState(null);

  const [isDailyRewardOpen, setIsDailyRewardOpen] = useState(false);
  const [levelUpModalData, setLevelUpModalData] = useState({ visible: false, level: 1 });

  // Persist user updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch (e) {}
  }, [user]);

  // Audio mute/unmute sync
  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.setEnabled(nextState);
    if (nextState) sound.playClick();
  };

  // Login / Welcome submission
  const handleLogin = ({ username, avatar }) => {
    setUser(prev => ({
      ...prev,
      username,
      avatar,
      isLoggedIn: true
    }));
    setCurrentScreen('home');
  };

  // Start any quiz game
  const handleStartQuiz = (config) => {
    setActiveGameConfig(config);
    setCurrentScreen('quiz');
  };

  // Finish quiz game and calculate progression
  const handleFinishGame = ({
    userScore,
    opponentScore,
    totalQuestions,
    answersLog,
    gameConfig,
    opponent
  }) => {
    const correctCount = answersLog.filter(a => a.isCorrect).length;
    const fastCount = answersLog.filter(a => a.isCorrect && a.timeTaken < 10).length;
    const isPerfect = correctCount === totalQuestions;
    const isWinner = opponent ? userScore > opponentScore : correctCount >= 4;

    const gainedXp = Math.round((userScore / 10) + (correctCount * 15));
    const nextXp = user.xp + gainedXp;
    const nextLevel = Math.max(1, Math.floor(nextXp / 200) + 1);

    // Check for level up celebration
    if (nextLevel > user.level) {
      sound.playLevelUp();
      setLevelUpModalData({ visible: true, level: nextLevel });
    } else {
      if (isWinner) sound.playVictory();
    }

    const updatedCategories = new Set(user.categoriesPlayed || []);
    if (gameConfig.category) updatedCategories.add(gameConfig.category);

    setUser(prev => ({
      ...prev,
      xp: nextXp,
      level: nextLevel,
      points: prev.points + userScore,
      gamesPlayed: prev.gamesPlayed + 1,
      correctAnswers: prev.correctAnswers + correctCount,
      totalAnswersAttempted: prev.totalAnswersAttempted + totalQuestions,
      fastAnswers: (prev.fastAnswers || 0) + fastCount,
      perfectScores: (prev.perfectScores || 0) + (isPerfect ? 1 : 0),
      multiplayerWins: (prev.multiplayerWins || 0) + (opponent && isWinner ? 1 : 0),
      dailyCompleted: (prev.dailyCompleted || 0) + (gameConfig.mode === 'daily' ? 1 : 0),
      categoriesPlayed: Array.from(updatedCategories)
    }));

    setLastResultsData({
      userScore,
      opponentScore,
      totalQuestions,
      answersLog,
      gameConfig,
      opponent
    });

    setCurrentScreen('results');
  };

  // Room creation -> Lobby
  const handleEnterLobby = (roomData) => {
    setActiveRoomData(roomData);
    setCurrentScreen('multiplayer_lobby');
  };

  // Lobby -> Start 1v1 Battle
  const handleStartBattleFromLobby = (config) => {
    setActiveGameConfig(config);
    setCurrentScreen('quiz');
  };

  // Claim Daily Login Reward
  const handleClaimDailyReward = () => {
    const todayStr = new Date().toDateString();
    const streak = user.loginStreak || 1;
    const dayIndex = (streak - 1) % 7;
    const rewards = [
      { pts: 100, xp: 50 },
      { pts: 150, xp: 75 },
      { pts: 200, xp: 100 },
      { pts: 300, xp: 150 },
      { pts: 400, xp: 200 },
      { pts: 500, xp: 250 },
      { pts: 1000, xp: 500 }
    ];
    const reward = rewards[dayIndex] || rewards[0];

    const nextXp = user.xp + reward.xp;
    const nextLevel = Math.max(1, Math.floor(nextXp / 200) + 1);

    if (nextLevel > user.level) {
      setLevelUpModalData({ visible: true, level: nextLevel });
    }

    setUser(prev => ({
      ...prev,
      points: prev.points + reward.pts,
      xp: nextXp,
      level: nextLevel,
      loginStreak: prev.loginStreak + 1,
      lastDailyClaim: todayStr
    }));

    setTimeout(() => {
      setIsDailyRewardOpen(false);
    }, 1200);
  };

  // Reset local data
  const handleResetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser({
      ...DEFAULT_USER,
      username: 'Warrior_' + Math.floor(100 + Math.random() * 900),
      points: 0,
      xp: 0,
      level: 1,
      gamesPlayed: 0,
      correctAnswers: 0,
      totalAnswersAttempted: 0,
      multiplayerWins: 0,
      fastAnswers: 0,
      perfectScores: 0,
      categoriesPlayed: [],
      dailyCompleted: 0
    });
    setCurrentScreen('home');
  };

  const todayStr = new Date().toDateString();
  const dailyClaimedToday = user.lastDailyClaim === todayStr;

  const showNavbar = !['welcome', 'quiz', 'multiplayer_lobby'].includes(currentScreen);
  const showHeader = !['welcome', 'quiz'].includes(currentScreen);

  return (
    <SafeAreaView className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top App Header */}
      {showHeader && (
        <Header
          user={user}
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* Main Dynamic Viewport */}
      <main className="flex-1 w-full flex flex-col">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            initialUsername={user.username}
            onLogin={handleLogin}
          />
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            user={user}
            onNavigate={setCurrentScreen}
            onStartQuiz={handleStartQuiz}
            onOpenDailyReward={() => setIsDailyRewardOpen(true)}
            dailyClaimedToday={dailyClaimedToday}
          />
        )}

        {currentScreen === 'categories' && (
          <CategoriesScreen
            onStartQuiz={handleStartQuiz}
            onBack={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'game_modes' && (
          <GameModeScreen
            onSelectMode={(mode) => console.log('Mode selected:', mode)}
            onNavigate={setCurrentScreen}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {currentScreen === 'quiz' && activeGameConfig && (
          <QuizGameplayScreen
            gameConfig={activeGameConfig}
            user={user}
            onFinishGame={handleFinishGame}
            onQuit={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'room_creation' && (
          <RoomCreationScreen
            user={user}
            onEnterLobby={handleEnterLobby}
            onBack={() => setCurrentScreen('game_modes')}
          />
        )}

        {currentScreen === 'multiplayer_lobby' && activeRoomData && (
          <MultiplayerLobbyScreen
            roomData={activeRoomData}
            user={user}
            onStartBattle={handleStartBattleFromLobby}
            onLeaveLobby={() => setCurrentScreen('room_creation')}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <LeaderboardScreen
            user={user}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            user={user}
            onUpdateProfile={(updated) => setUser(prev => ({ ...prev, ...updated }))}
          />
        )}

        {currentScreen === 'results' && lastResultsData && (
          <ResultsScreen
            resultsData={lastResultsData}
            user={user}
            onPlayAgain={(cfg) => handleStartQuiz(cfg)}
            onGoHome={() => setCurrentScreen('home')}
            onViewLeaderboard={() => setCurrentScreen('leaderboard')}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            onResetData={handleResetData}
            onBack={() => setCurrentScreen('home')}
          />
        )}
      </main>

      {/* Bottom Navigation Dock */}
      {showNavbar && (
        <Navbar
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      )}

      {/* Daily Login Reward Modal */}
      <DailyRewardModal
        visible={isDailyRewardOpen}
        streak={user.loginStreak || 1}
        claimedToday={dailyClaimedToday}
        onClose={() => setIsDailyRewardOpen(false)}
        onClaim={handleClaimDailyReward}
      />

      {/* Promotion / Level Up Celebratory Modal */}
      <LevelUpModal
        visible={levelUpModalData.visible}
        level={levelUpModalData.level}
        onClose={() => setLevelUpModalData({ visible: false, level: 1 })}
      />
    </SafeAreaView>
  );
}
export default App;

