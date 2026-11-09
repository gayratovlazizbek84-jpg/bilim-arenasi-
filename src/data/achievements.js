// Quiz Arena - Achievement Badges & Progression

export const ACHIEVEMENTS = [
  {
    id: 'first_quiz',
    title: 'First Blood',
    description: 'Complete your very first quiz game in the arena.',
    icon: '⚔️',
    gradient: 'from-amber-400 to-orange-500',
    xpReward: 50,
    check: (user) => user.gamesPlayed >= 1
  },
  {
    id: 'perfectionist',
    title: 'Flawless Mind',
    description: 'Complete a quiz with a 100% perfect score.',
    icon: '✨',
    gradient: 'from-emerald-400 to-teal-500',
    xpReward: 150,
    check: (user) => user.perfectScores >= 1
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Answer 5 questions correctly with over 20 seconds left on the clock.',
    icon: '⚡',
    gradient: 'from-yellow-400 to-amber-500',
    xpReward: 100,
    check: (user) => user.fastAnswers >= 5
  },
  {
    id: 'titan',
    title: 'Trivia Titan',
    description: 'Accumulate over 1,500 total points in Quiz Arena.',
    icon: '👑',
    gradient: 'from-purple-500 to-indigo-600',
    xpReward: 200,
    check: (user) => user.points >= 1500
  },
  {
    id: 'polymath',
    title: 'The Polymath',
    description: 'Play quizzes in at least 5 different categories.',
    icon: '🌌',
    gradient: 'from-cyan-400 to-blue-600',
    xpReward: 120,
    check: (user) => (user.categoriesPlayed && user.categoriesPlayed.length >= 5)
  },
  {
    id: 'pvp_champion',
    title: 'Arena Gladiator',
    description: 'Win a competitive multiplayer battle.',
    icon: '🏆',
    gradient: 'from-rose-500 to-red-600',
    xpReward: 150,
    check: (user) => user.multiplayerWins >= 1
  },
  {
    id: 'daily_streak',
    title: 'Daily Devotee',
    description: 'Complete a Daily Challenge quiz.',
    icon: '🔥',
    gradient: 'from-orange-500 to-rose-500',
    xpReward: 80,
    check: (user) => user.dailyCompleted >= 1
  },
  {
    id: 'century',
    title: 'Century Marksman',
    description: 'Answer 50 questions correctly across all games.',
    icon: '🎯',
    gradient: 'from-fuchsia-500 to-pink-600',
    xpReward: 250,
    check: (user) => user.correctAnswers >= 50
  }
];

export const AVATARS = [
  { id: 'av1', name: 'Cyber Ninja', icon: '🥷', color: 'from-purple-600 to-indigo-600' },
  { id: 'av2', name: 'Cosmic Wizard', icon: '🧙‍♂️', color: 'from-blue-600 to-cyan-500' },
  { id: 'av3', name: 'Quantum Hacker', icon: '🤖', color: 'from-emerald-500 to-teal-600' },
  { id: 'av4', name: 'Valkyrie Ace', icon: '👸', color: 'from-pink-500 to-rose-600' },
  { id: 'av5', name: 'Shadow Knight', icon: '🛡️', color: 'from-amber-500 to-orange-600' },
  { id: 'av6', name: 'Astronaut Scout', icon: '👨‍🚀', color: 'from-violet-600 to-fuchsia-600' }
];

export const LEVEL_TITLES = [
  'Apprentice Scholar',   // Lvl 1
  'Curious Seeker',       // Lvl 2
  'Arena Contender',      // Lvl 3
  'Knowledge Adept',      // Lvl 4
  'Trivia Strategist',    // Lvl 5
  'Mastermind',           // Lvl 6
  'Grandmaster Scholar',  // Lvl 7
  'Mythic Champion',      // Lvl 8
  'Apex Polymath',        // Lvl 9
  'Quiz Arena Legend'     // Lvl 10+
];

