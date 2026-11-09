import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  Vibration,
  Alert
} from 'react-native';

const { width } = Dimensions.get('window');

// ==========================================
// 1. TRILINGUAL LOCALIZATION (UZ / RU / EN)
// ==========================================
const TRANSLATIONS = {
  uz: {
    // Navigation
    navHome: "Asosiy",
    navCategories: "Toifalar",
    navModes: "Rejimlar",
    navLeaderboard: "Reyting",
    navProfile: "Profil",
    navSettings: "Sozlamalar",

    // Welcome Screen
    appTitle: "QUIZ ARENA",
    appTagline: "BILIMLAR JANG MAYDONI",
    welcomeTitle: "Arenaga xush kelibsiz!",
    welcomeSubtitle: "O'zbekiston va jahon aql jangchilari bilan bellashing",
    enterNamePlaceholder: "Jangchi ismingizni kiriting...",
    chooseAvatar: "Jangchi avataringizni tanlang",
    btnEnterArena: "ARENAGA KIRISH ⚡",

    // Home Screen
    welcomeBack: "Xush kelibsiz",
    levelGladiator: "Gladiator",
    xpProgress: "XP To'plash",
    playNowBtn: "HOZIR O'YNASH 🚀",
    dailyChallengeBanner: "KUNLIK SINOV",
    dailyChallengeDesc: "Har kungi maxsus 5 ta savol • 2x XP va oltin sovrinlar!",
    startDailyBtn: "BOSHLASH 🎯",
    statsTitle: "Arena Statistikasi",
    statGames: "O'yinlar",
    statWinRate: "G'alaba",
    statCorrect: "To'g'ri",
    statPoints: "Jami Ball",
    quickCategoriesTitle: "Ommabop Toifalar",
    seeAll: "Barchasi ➔",

    // Categories Screen
    categoriesHeader: "Savol Toifalari",
    selectCategory: "Toifani tanlang va bilimingizni sinang",
    diffEasy: "OSON",
    diffMedium: "O'RTA",
    diffHard: "QIYIN",

    // Game Modes
    gameModesHeader: "O'yin Rejimini Tanlang",
    modeSingle: "Yakkalik O'yin",
    modeSingleDesc: "8 ta toifa va 3 xil qiyinlik darajasida yakkama-yakka bilimingizni sinang.",
    modeMulti: "Do'st bilan 1v1",
    modeMultiDesc: "Xona kodi orqali do'stingiz bilan real vaqtda jonli aql jangida bellashing.",
    modeQuick: "Tezkor Jang",
    modeQuickDesc: "Jonli gladiator bilan avtomatik tezkor 1v1 bellashuv.",
    modePractice: "Mashg'ulot Rejimi",
    modePracticeDesc: "Vaqt bosimisiz, xotirjam savollarga javob bering va o'rganing.",
    modeDaily: "Kunlik Topshiriq",
    modeDailyDesc: "Har kuni 1 marta beriladigan saralangan 5 ta savol (2x bonus XP).",
    searchingOpponent: "Raqib qidirilmoqda...",
    matchFound: "Raqib topildi! Jang boshlanmoqda...",

    // Quiz Gameplay
    quitBtn: "✕ Chiqish",
    questionNum: "Savol",
    scoreText: "Ball",
    secLeft: "soniya",
    lifelinesTitle: "Yordamlar",
    lifeline5050: "50:50",
    lifelineFreeze: "+15s Vaqt",
    lifelineHint: "Maslahat 💡",
    hintLabel: "Maslahat:",
    nextQuestionBtn: "KEYINGI SAVOL ➔",
    finishQuizBtn: "NATIJANI KO'RISH 🏁",
    correctAnswer: "To'g'ri javob!",
    wrongAnswer: "Noto'g'ri javob!",
    timeUp: "Vaqt tugadi!",

    // Multiplayer & Room
    mpTitle: "Ko'p O'yinchili Arena",
    createRoomBtn: "YANGI XONA YARATISH ➔",
    joinRoomBtn: "XONAGA KIRISH ➔",
    orText: "— YOKI —",
    enterRoomCode: "XONA KODINI KIRITING",
    roomChamberTitle: "Arena Xonasi",
    roomCodeLabel: "Sizning Xona Kodingiz:",
    shareCodeNotice: "Ushbu kodni do'stingizga yuboring, u o'z telefonida kirishi mumkin!",
    startBattleBtn: "JANGNI BOSHLASH ⚔️",
    leaveLobbyBtn: "Xonani tark etish",
    hostWaiting: "Do'stingiz ulanishi kutilmoqda...",
    rivalConnected: "Do'stingiz jangga tayyor!",

    // Results Screen
    resultsHeader: "O'yin Yakunlandi!",
    victoryTitle: "G'ALABA! 🏆",
    defeatTitle: "MAG'LUBIYAT 💀",
    drawTitle: "DURANG! 🤝",
    yourScore: "Sizning ballingiz",
    opponentScore: "Raqib bali",
    accuracyText: "Aniqlik darajasi",
    correctOutOf: "to'g'ri javob berildi",
    playAgainBtn: "QAYTA O'YNASH 🔄",
    backHomeBtn: "Bosh Sahifaga Qaytish 🏠",

    // Leaderboard Screen
    leaderboardHeader: "Arena Reytingi",
    tabGlobal: "Umumiy",
    tabWeekly: "Haftalik",
    tabMonthly: "Oylik",
    rankPts: "BALL",

    // Profile Screen
    profileHeader: "Jangchi Profili",
    editProfile: "Profilni tahrirlash",
    saveProfile: "Saqlash",
    totalScoreEarned: "To'plangan Ballar",
    rankTier: "Gladiator Rutbasi",
    achievementsTitle: "Yutuq Nishonlari (Badges)",

    // Settings Screen
    settingsHeader: "Sozlamalar",
    languageSetting: "Til / Tilni tanlash",
    vibrationSetting: "Vibratsiya va Haptik",
    soundSetting: "Ovoz effektlari",
    onText: "YONIQ",
    offText: "O'CHIQ",
    resetBtn: "Statistikani qayta boshlash",
    backMenu: "Menyuga qaytish",

    // Modals
    dailyRewardClaimed: "KUNLIK MUKOFOT OLINDI!",
    claimedSubtitle: "Sizga 150 ball va 100 XP taqdim etildi. Ertaga yana kiring!",
    levelUpTitle: "YANGI DARAJA OCHILDI! 🎉",
    levelUpSubtitle: "Tabriklaymiz, siz yangi jangchilik rutbasiga ko'tarildingiz!",
    closeBtn: "DAVOM ETISH ➔"
  },

  ru: {
    // Navigation
    navHome: "Главная",
    navCategories: "Категории",
    navModes: "Режимы",
    navLeaderboard: "Рейтинг",
    navProfile: "Профиль",
    navSettings: "Настройки",

    // Welcome Screen
    appTitle: "QUIZ ARENA",
    appTagline: "АРЕНА ИНТЕЛЛЕКТУАЛЬНЫХ БИТВ",
    welcomeTitle: "Добро пожаловать на Арену!",
    welcomeSubtitle: "Сражайтесь за звание лучшего эрудита с сильнейшими игроками",
    enterNamePlaceholder: "Введите имя гладиатора...",
    chooseAvatar: "Выберите аватар для битвы",
    btnEnterArena: "ВОЙТИ НА АРЕНУ ⚡",

    // Home Screen
    welcomeBack: "С возвращением",
    levelGladiator: "Гладиатор",
    xpProgress: "Прогресс XP",
    playNowBtn: "ИГРАТЬ СЕЙЧАС 🚀",
    dailyChallengeBanner: "ВЫЗОВ ДНЯ",
    dailyChallengeDesc: "5 особых вопросов каждый день • 2x XP и золотые награды!",
    startDailyBtn: "НАЧАТЬ 🎯",
    statsTitle: "Статистика Арены",
    statGames: "Игр",
    statWinRate: "Побед",
    statCorrect: "Верно",
    statPoints: "Очков",
    quickCategoriesTitle: "Популярные Категории",
    seeAll: "Все ➔",

    // Categories Screen
    categoriesHeader: "Категории Викторины",
    selectCategory: "Выберите тему и проверьте свои знания",
    diffEasy: "ЛЕГКО",
    diffMedium: "СРЕДНЕ",
    diffHard: "СЛОЖНО",

    // Game Modes
    gameModesHeader: "Выберите Режим Игры",
    modeSingle: "Одиночная Игра",
    modeSingleDesc: "Испытайте себя в 8 категориях с 3 уровнями сложности без спешки.",
    modeMulti: "Дуэль 1 на 1",
    modeMultiDesc: "Создайте код комнаты и сразитесь с другом в реальном времени.",
    modeQuick: "Быстрый Матч",
    modeQuickDesc: "Мгновенный авто-подбор соперника для захватывающей битвы.",
    modePractice: "Тренировка",
    modePracticeDesc: "Играйте спокойно без таймера, изучая объяснения к ответам.",
    modeDaily: "Вызов Дня",
    modeDailyDesc: "Ежедневный комплексный тест с удвоенным опытом 2x XP.",
    searchingOpponent: "Поиск соперника...",
    matchFound: "Соперник найден! Битва начинается...",

    // Quiz Gameplay
    quitBtn: "✕ Выход",
    questionNum: "Вопрос",
    scoreText: "Очки",
    secLeft: "сек",
    lifelinesTitle: "Подсказки",
    lifeline5050: "50:50",
    lifelineFreeze: "+15с Время",
    lifelineHint: "Подсказка 💡",
    hintLabel: "Подсказка:",
    nextQuestionBtn: "СЛЕДУЮЩИЙ ВОПРОС ➔",
    finishQuizBtn: "РЕЗУЛЬТАТЫ 🏁",
    correctAnswer: "Верно!",
    wrongAnswer: "Неверно!",
    timeUp: "Время истекло!",

    // Multiplayer & Room
    mpTitle: "Мультиплеер Арена",
    createRoomBtn: "СОЗДАТЬ КОМНАТУ ➔",
    joinRoomBtn: "ВОЙТИ В КОМНАТУ ➔",
    orText: "— ИЛИ —",
    enterRoomCode: "ВВЕДИТЕ КОД КОМНАТЫ",
    roomChamberTitle: "Палата Арены",
    roomCodeLabel: "Ваш код комнаты:",
    shareCodeNotice: "Отправьте этот код другу, чтобы начать совместный бой!",
    startBattleBtn: "НАЧАТЬ БИТВУ ⚔️",
    leaveLobbyBtn: "Покинуть комнату",
    hostWaiting: "Ожидание подключения друга...",
    rivalConnected: "Соперник готов к битве!",

    // Results Screen
    resultsHeader: "Игра Завершена!",
    victoryTitle: "ПОБЕДА! 🏆",
    defeatTitle: "ПОРАЖЕНИЕ 💀",
    drawTitle: "НИЧЬЯ! 🤝",
    yourScore: "Ваш результат",
    opponentScore: "Результат соперника",
    accuracyText: "Точность ответов",
    correctOutOf: "правильных ответов",
    playAgainBtn: "ИГРАТЬ СНОВА 🔄",
    backHomeBtn: "На Главную 🏠",

    // Leaderboard Screen
    leaderboardHeader: "Таблица Лидеров",
    tabGlobal: "Глобальный",
    tabWeekly: "Недельный",
    tabMonthly: "Месячный",
    rankPts: "ОЧКОВ",

    // Profile Screen
    profileHeader: "Профиль Гладиатора",
    editProfile: "Редактировать",
    saveProfile: "Сохранить",
    totalScoreEarned: "Набрано очков",
    rankTier: "Ранг гладиатора",
    achievementsTitle: "Значки Достижений",

    // Settings Screen
    settingsHeader: "Настройки",
    languageSetting: "Язык интерфейса",
    vibrationSetting: "Вибрация и тактильный отклик",
    soundSetting: "Звуковые эффекты",
    onText: "ВКЛ",
    offText: "ВЫКЛ",
    resetBtn: "Сбросить прогресс",
    backMenu: "Назад в меню",

    // Modals
    dailyRewardClaimed: "НАГРАДА ПОЛУЧЕНА!",
    claimedSubtitle: "Вам начислено +150 очков и +100 XP. Заходите завтра снова!",
    levelUpTitle: "НОВЫЙ УРОВЕНЬ! 🎉",
    levelUpSubtitle: "Поздравляем, вы открыли новый почетный ранг гладиатора!",
    closeBtn: "ПРОДОЛЖИТЬ ➔"
  },

  en: {
    // Navigation
    navHome: "Home",
    navCategories: "Categories",
    navModes: "Modes",
    navLeaderboard: "Rankings",
    navProfile: "Profile",
    navSettings: "Settings",

    // Welcome Screen
    appTitle: "QUIZ ARENA",
    appTagline: "COMPETITIVE KNOWLEDGE BATTLE",
    welcomeTitle: "Welcome to the Arena!",
    welcomeSubtitle: "Battle with smart players across the globe and claim victory",
    enterNamePlaceholder: "Enter gladiator name...",
    chooseAvatar: "Choose your battle avatar",
    btnEnterArena: "ENTER ARENA ⚡",

    // Home Screen
    welcomeBack: "Welcome back",
    levelGladiator: "Gladiator",
    xpProgress: "XP Progress",
    playNowBtn: "PLAY NOW 🚀",
    dailyChallengeBanner: "DAILY CHALLENGE",
    dailyChallengeDesc: "5 curated questions every single day • 2x XP and trophy rewards!",
    startDailyBtn: "START 🎯",
    statsTitle: "Arena Career Stats",
    statGames: "Games",
    statWinRate: "Win Rate",
    statCorrect: "Correct",
    statPoints: "Points",
    quickCategoriesTitle: "Top Categories",
    seeAll: "All ➔",

    // Categories Screen
    categoriesHeader: "Quiz Categories",
    selectCategory: "Choose a discipline and challenge your mind",
    diffEasy: "EASY",
    diffMedium: "MEDIUM",
    diffHard: "HARD",

    // Game Modes
    gameModesHeader: "Select Game Mode",
    modeSingle: "Single Player",
    modeSingleDesc: "Climb through 8 distinct categories across 3 difficulty tiers.",
    modeMulti: "Multiplayer 1v1",
    modeMultiDesc: "Create or join a room code to duel friends live in real-time.",
    modeQuick: "Quick Match",
    modeQuickDesc: "Instant automated matchmaking against an active gladiator.",
    modePractice: "Practice Mode",
    modePracticeDesc: "Answer at your own leisurely pace without timer pressure.",
    modeDaily: "Daily Challenge",
    modeDailyDesc: "Curated 5-question multi-discipline exam once per day (2x XP).",
    searchingOpponent: "Searching for opponent...",
    matchFound: "Opponent found! Battle initiating...",

    // Quiz Gameplay
    quitBtn: "✕ Quit",
    questionNum: "Question",
    scoreText: "Score",
    secLeft: "sec",
    lifelinesTitle: "Lifelines",
    lifeline5050: "50:50",
    lifelineFreeze: "+15s Freeze",
    lifelineHint: "Hint 💡",
    hintLabel: "Hint:",
    nextQuestionBtn: "NEXT QUESTION ➔",
    finishQuizBtn: "VIEW RESULTS 🏁",
    correctAnswer: "Correct answer!",
    wrongAnswer: "Wrong answer!",
    timeUp: "Time is up!",

    // Multiplayer & Room
    mpTitle: "Multiplayer Arena",
    createRoomBtn: "CREATE PRIVATE ROOM ➔",
    joinRoomBtn: "JOIN WITH CODE ➔",
    orText: "— OR —",
    enterRoomCode: "ENTER ROOM CODE",
    roomChamberTitle: "Arena Chamber",
    roomCodeLabel: "Your Room Code:",
    shareCodeNotice: "Share this code with your friend so they can join your duel!",
    startBattleBtn: "START MATCH ⚔️",
    leaveLobbyBtn: "Leave Lobby",
    hostWaiting: "Waiting for opponent to connect...",
    rivalConnected: "Opponent ready for battle!",

    // Results Screen
    resultsHeader: "Game Finished!",
    victoryTitle: "VICTORY! 🏆",
    defeatTitle: "DEFEAT 💀",
    drawTitle: "DRAW! 🤝",
    yourScore: "Your Score",
    opponentScore: "Opponent Score",
    accuracyText: "Accuracy Rate",
    correctOutOf: "answered correctly",
    playAgainBtn: "PLAY AGAIN 🔄",
    backHomeBtn: "Return Home 🏠",

    // Leaderboard Screen
    leaderboardHeader: "Arena Rankings",
    tabGlobal: "Global",
    tabWeekly: "Weekly",
    tabMonthly: "Monthly",
    rankPts: "PTS",

    // Profile Screen
    profileHeader: "Gladiator Profile",
    editProfile: "Edit Profile",
    saveProfile: "Save Changes",
    totalScoreEarned: "Career Points",
    rankTier: "Gladiator Rank",
    achievementsTitle: "Achievement Badges",

    // Settings Screen
    settingsHeader: "Settings",
    languageSetting: "Language / Til / Язык",
    vibrationSetting: "Vibration & Haptics",
    soundSetting: "Sound Effects",
    onText: "ON",
    offText: "OFF",
    resetBtn: "Reset All Progress",
    backMenu: "Back to Menu",

    // Modals
    dailyRewardClaimed: "DAILY REWARD CLAIMED!",
    claimedSubtitle: "You received +150 Points and +100 XP. Come back tomorrow!",
    levelUpTitle: "NEW LEVEL UNLOCKED! 🎉",
    levelUpSubtitle: "Congratulations! You ascended to a higher gladiator rank!",
    closeBtn: "CONTINUE ➔"
  }
};

// ==========================================
// 2. CATEGORIES IN UZ / RU / EN
// ==========================================
const CATEGORIES = [
  {
    id: 'general',
    icon: '💡',
    color: '#f59e0b',
    name: { uz: 'Umumiy Bilimlar', ru: 'Общие Знания', en: 'General Knowledge' },
    description: {
      uz: "Dunyo sirlari, mashhur faktlar va qiziqarli savollar.",
      ru: "Интересные факты обо всем на свете и эрудиция.",
      en: "World trivia, fascinating facts and worldly awareness."
    }
  },
  {
    id: 'science',
    icon: '🔬',
    color: '#10b981',
    name: { uz: 'Fan va Tabiat', ru: 'Наука и Природа', en: 'Science' },
    description: {
      uz: "Fizika, kimyo, biologiya va koinot mo''jizalari.",
      ru: "Физика, химия, биология и тайны вселенной.",
      en: "Physics, chemistry, biology, and celestial marvels."
    }
  },
  {
    id: 'mathematics',
    icon: '📐',
    color: '#3b82f6',
    name: { uz: 'Matematika', ru: 'Математика', en: 'Mathematics' },
    description: {
      uz: "Mantiqiy hisob-kitob, tenglamalar va geometriya.",
      ru: "Логика, устный счет, уравнения и геометрия.",
      en: "Mental arithmetic, logic, geometry, and equations."
    }
  },
  {
    id: 'history',
    icon: '🏛️',
    color: '#d97706',
    name: { uz: 'Tarix', ru: 'История', en: 'History' },
    description: {
      uz: "Qadimgi sivilizatsiyalar, buyuk sarkardalar va voqealar.",
      ru: "Древние цивилизации, великие полководцы и даты.",
      en: "Ancient empires, world wars, and iconic figures."
    }
  },
  {
    id: 'geography',
    icon: '🌍',
    color: '#06b6d4',
    name: { uz: 'Geografiya', ru: 'География', en: 'Geography' },
    description: {
      uz: "Mamlakatlar, poytaxtlar, okeanlar va tabiat zonalari.",
      ru: "Страны, столицы мира, океаны и горы.",
      en: "Capitals, continents, oceans, and natural wonders."
    }
  },
  {
    id: 'technology',
    icon: '💻',
    color: '#8b5cf6',
    name: { uz: 'Texnologiya va IT', ru: 'Технологии и IT', en: 'Technology' },
    description: {
      uz: "Kompyuterlar, dasturlash, sun'iy intellekt va internet.",
      ru: "Компьютеры, программирование, ИИ и гаджеты.",
      en: "Computers, AI, algorithms, gadgets, and the internet."
    }
  },
  {
    id: 'sports',
    icon: '⚽',
    color: '#f43f5e',
    name: { uz: 'Sport', ru: 'Спорт', en: 'Sports' },
    description: {
      uz: "Futbol, Olimpiada, chempionlar va jahon rekordlari.",
      ru: "Футбол, Олимпийские игры, чемпионы и рекорды.",
      en: "Athletes, champions, football, basketball, and Olympics."
    }
  },
  {
    id: 'english',
    icon: '📚',
    color: '#d946ef',
    name: { uz: 'Ingliz Tili', ru: 'Английский Язык', en: 'English' },
    description: {
      uz: "Grammatika, so'z boyligi, iboralar va adabiyot.",
      ru: "Грамматика, словарный запас, идиомы и фразы.",
      en: "Grammar, vocabulary, idioms, and literature."
    }
  }
];

// ==========================================
// 3. MULTILINGUAL QUESTION BANK (UZ / RU / EN)
// ==========================================
const QUESTIONS_BANK = {
  general: {
    easy: [
      {
        question: {
          uz: 'Quyosh tizimidagi qaysi sayyora "Qizil sayyora" deb ataladi?',
          ru: 'Какая планета Солнечной системы известна как «Красная планета»?',
          en: 'Which planet in our solar system is known as the "Red Planet"?'
        },
        options: {
          uz: ['Venera', 'Mars', 'Yupiter', 'Saturn'],
          ru: ['Венера', 'Марс', 'Юпитер', 'Сатурн'],
          en: ['Venus', 'Mars', 'Jupiter', 'Saturn']
        },
        correctIndex: 1,
        hint: {
          uz: 'Rim mifologiyasidagi urush xudosi nomi bilan atalgan.',
          ru: 'Названа в честь римского бога войны.',
          en: 'Named after the Roman god of war.'
        }
      },
      {
        question: {
          uz: 'Kabisa yilida necha kun bor?',
          ru: 'Сколько дней насчитывает високосный год?',
          en: 'How many days are there in a standard leap year?'
        },
        options: {
          uz: ['364 kun', '365 kun', '366 kun', '367 kun'],
          ru: ['364 дня', '365 дней', '366 дней', '367 дней'],
          en: ['364 days', '365 days', '366 days', '367 days']
        },
        correctIndex: 2,
        hint: {
          uz: "Oddiy yildan 1 kun ko'proq (29-fevral qo'shiladi).",
          ru: 'На 1 день больше обычного года (29 февраля).',
          en: 'One day more than a typical year (adds Feb 29).'
        }
      },
      {
        question: {
          uz: 'Yer yuzidagi eng katta okean qaysi?',
          ru: 'Какой океан является самым крупным на Земле?',
          en: 'What is the largest ocean on planet Earth?'
        },
        options: {
          uz: ['Atlantika okeani', 'Hind okeani', 'Tinch okeani', 'Shimoliy Muz okeani'],
          ru: ['Атлантический', 'Индийский', 'Тихий океан', 'Северный Ледовитый'],
          en: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean']
        },
        correctIndex: 2,
        hint: {
          uz: "Nomi tinchlik ma'nosini beradi.",
          ru: 'Название связано со словом «тишина».',
          en: 'Its name signifies calm and peace.'
        }
      }
    ],
    medium: [
      {
        question: {
          uz: 'AQSHga "Ozodlik haykali"ni qaysi davlat sovg\'a qilgan?',
          ru: 'Какая страна подарила США «Статую Свободы»?',
          en: 'Which country gifted the Statue of Liberty to the United States?'
        },
        options: {
          uz: ['Buyuk Britaniya', 'Fransiya', 'Ispaniya', 'Germaniya'],
          ru: ['Великобритания', 'Франция', 'Испания', 'Германия'],
          en: ['United Kingdom', 'France', 'Spain', 'Germany']
        },
        correctIndex: 1,
        hint: {
          uz: 'Eyfel minorasi joylashgan mamlakat.',
          ru: 'Родина Эйфелевой башни.',
          en: 'Home of the Eiffel Tower.'
        }
      },
      {
        question: {
          uz: 'Yaponiyaning rasmiy pul birligi nima?',
          ru: 'Какая официальная валюта Японии?',
          en: 'What is the primary official currency of Japan?'
        },
        options: {
          uz: ['Iena (Yen)', 'Vona', 'Yuan', 'Dollar'],
          ru: ['Иена', 'Вона', 'Юань', 'Доллар'],
          en: ['Yen', 'Won', 'Yuan', 'Dollar']
        },
        correctIndex: 0,
        hint: {
          uz: 'Belgisi ¥ shaklida yoziladi.',
          ru: 'Обозначается символом ¥.',
          en: 'Represented by symbol ¥.'
        }
      }
    ],
    hard: [
      {
        question: {
          uz: 'Dunyoda qaysi davlatning bayrog\'i to\'rtburchak shaklda emas?',
          ru: 'Флаг какого государства в мире не является четырехугольным?',
          en: 'Which is the only country in the world with a non-rectangular national flag?'
        },
        options: {
          uz: ['Shveysariya', 'Vatikan', 'Nepal', 'Butan'],
          ru: ['Швейцария', 'Ватикан', 'Непал', 'Бутан'],
          en: ['Switzerland', 'Vatican City', 'Nepal', 'Bhutan']
        },
        correctIndex: 2,
        hint: {
          uz: "Himolay tog'larida joylashgan davlat.",
          ru: 'Страна в высоких Гималаях.',
          en: 'Located in high Himalayas.'
        }
      }
    ]
  },
  science: {
    easy: [
      {
        question: {
          uz: "O'simliklar fotosintez vaqtida qaysi gazni yutadi?",
          ru: 'Какой газ растения поглощают из воздуха при фотосинтезе?',
          en: 'What gas do plants absorb during photosynthesis?'
        },
        options: {
          uz: ['Kislorod', 'Karbonat angidrid (CO2)', 'Azot', 'Geliy'],
          ru: ['Кислород', 'Углекислый газ (CO2)', 'Азот', 'Гелий'],
          en: ['Oxygen', 'Carbon Dioxide (CO2)', 'Nitrogen', 'Helium']
        },
        correctIndex: 1,
        hint: {
          uz: "Insonlar nafas chiqarganda hosil bo'ladi.",
          ru: 'Выделяется живыми организмами при дыхании.',
          en: 'Gas exhaled by animals.'
        }
      },
      {
        question: {
          uz: 'Toza suvning kimyoviy formulasi qanday?',
          ru: 'Какова химическая формула чистой воды?',
          en: 'What is the chemical formula for pure water?'
        },
        options: {
          uz: ['CO2', 'NaCl', 'H2O', 'CH4'],
          ru: ['CO2', 'NaCl', 'H2O', 'CH4'],
          en: ['CO2', 'NaCl', 'H2O', 'CH4']
        },
        correctIndex: 2,
        hint: {
          uz: '2 ta vodorod va 1 ta kislorod atomi.',
          ru: '2 атома водорода и 1 атом кислорода.',
          en: 'Two Hydrogen and one Oxygen.'
        }
      }
    ],
    medium: [
      {
        question: {
          uz: 'Tirik hujayraning asosiy energiya stansiyasi qaysi organoid?',
          ru: 'Какой органоид называют энергетической станцией клетки?',
          en: 'What is the powerhouse organelle of a living cell?'
        },
        options: {
          uz: ['Yadro', 'Ribosoma', 'Mitoxondriya', 'Lizosoma'],
          ru: ['Ядро', 'Рибосома', 'Митохондрия', 'Лизосома'],
          en: ['Nucleus', 'Ribosome', 'Mitochondria', 'Lysosome']
        },
        correctIndex: 2,
        hint: {
          uz: 'ATF molekulalarini sintez qiladi.',
          ru: 'Синтезирует молекулы АТФ.',
          en: 'Synthesizes ATP molecules.'
        }
      }
    ],
    hard: [
      {
        question: {
          uz: 'Volfram kimyoviy elementining davriy jadvaldagi belgisi qanday?',
          ru: 'Каким символом обозначается химический элемент Вольфрам?',
          en: 'Which chemical element has the atomic symbol "W"?'
        },
        options: {
          uz: ['W', 'V', 'Wo', 'Tm'],
          ru: ['W', 'V', 'Wo', 'Tm'],
          en: ['W', 'V', 'Wo', 'Tm']
        },
        correctIndex: 0,
        hint: {
          uz: 'Nemischa "Wolfram" so\'zidan olingan.',
          ru: 'От немецкого названия «Wolfram».',
          en: 'Derived from German name Wolfram.'
        }
      }
    ]
  },
  mathematics: {
    easy: [
      {
        question: {
          uz: "12 × 12 ko'paytmaning javobi nechaga teng?",
          ru: 'Чему равно произведение 12 × 12?',
          en: 'What is the result of 12 × 12?'
        },
        options: {
          uz: ['124', '132', '144', '156'],
          ru: ['124', '132', '144', '156'],
          en: ['124', '132', '144', '156']
        },
        correctIndex: 2,
        hint: {
          uz: '12 ning kvadrati.',
          ru: 'Квадрат числа 12.',
          en: 'Square of 12.'
        }
      },
      {
        question: {
          uz: "Uchburchakning ichki burchaklari yig'indisi necha gradus?",
          ru: 'Чему равна сумма внутренних углов любого треугольника?',
          en: 'What is the sum of interior angles in a triangle?'
        },
        options: {
          uz: ['90°', '180°', '270°', '360°'],
          ru: ['90°', '180°', '270°', '360°'],
          en: ['90°', '180°', '270°', '360°']
        },
        correctIndex: 1,
        hint: {
          uz: 'Yoyiq burchakka teng.',
          ru: 'Равна развернутому углу.',
          en: 'Equal to a straight line.'
        }
      }
    ],
    medium: [
      {
        question: {
          uz: 'Yagona juft tub son qaysi?',
          ru: 'Какое число является единственным четным простым числом?',
          en: 'What is the only even prime number?'
        },
        options: {
          uz: ['0', '2', '4', '6'],
          ru: ['0', '2', '4', '6'],
          en: ['0', '2', '4', '6']
        },
        correctIndex: 1,
        hint: {
          uz: 'Eng kichik tub son ham aynan shu.',
          ru: 'Это также наименьшее простое число.',
          en: 'Also the smallest prime number.'
        }
      }
    ],
    hard: [
      {
        question: {
          uz: "Pifagor teoremasi to'g'ri burchakli uchburchak uchun qaysi formulada ifodalanadi?",
          ru: 'Какая формула выражает теорему Пифагора для прямоугольного треугольника?',
          en: 'What is the formula for the Pythagorean theorem?'
        },
        options: {
          uz: ['a + b = c', 'a² + b² = c²', 'a² - b² = c²', '2a + 2b = c'],
          ru: ['a + b = c', 'a² + b² = c²', 'a² - b² = c²', '2a + 2b = c'],
          en: ['a + b = c', 'a² + b² = c²', 'a² - b² = c²', '2a + 2b = c']
        },
        correctIndex: 1,
        hint: {
          uz: "Katetlar kvadratlari yig'indisi gipotenuza kvadratiga teng.",
          ru: 'Квадрат гипотенузы равен сумме квадратов катетов.',
          en: 'Sum of squares of legs equals hypotenuse squared.'
        }
      }
    ]
  },
  history: {
    easy: [
      {
        question: {
          uz: 'Sohibqiron Amir Temur qaysi yilda tavallud topgan?',
          ru: 'В каком году родился великий полководец Амир Темур?',
          en: 'In which year was Amir Timur born?'
        },
        options: {
          uz: ['1336-yil', '1340-yil', '1355-yil', '1370-yil'],
          ru: ['1336 год', '1340 год', '1355 год', '1370 год'],
          en: ['1336', '1340', '1355', '1370']
        },
        correctIndex: 0,
        hint: {
          uz: "Kesh (Shahrisabz) yaqinidagi Xo'ja Ilg'or qishlog'ida.",
          ru: 'В селении Ходжа-Ильгар близ Кеша.',
          en: 'Born near Kesh (Shahrisabz).'
        }
      }
    ],
    medium: [
      {
        question: {
          uz: 'Qadimgi Misrning eng katta piramidasi qaysi?',
          ru: 'Какая самая большая пирамида в Египте?',
          en: 'What is the largest pyramid in ancient Egypt?'
        },
        options: {
          uz: ['Xafra', 'Xufu (Xeops)', 'Mikerin', 'Djoser'],
          ru: ['Хафра', 'Хуфу (Хеопс)', 'Микерин', 'Джосер'],
          en: ['Khafre', 'Khufu (Cheops)', 'Menkaure', 'Djoser']
        },
        correctIndex: 1,
        hint: {
          uz: 'Giza vodiysidagi eng baland mo\'jiza.',
          ru: 'Самая высокая пирамида в Гизе.',
          en: 'Tallest wonder in Giza.'
        }
      }
    ],
    hard: [
      {
        question: {
          uz: "Birinchi jahon urushi qaysi yillarda bo'lib o'tgan?",
          ru: 'В каких годах проходила Первая мировая война?',
          en: 'Between which years did World War I take place?'
        },
        options: {
          uz: ['1914 - 1918', '1912 - 1916', '1939 - 1945', '1905 - 1910'],
          ru: ['1914 - 1918', '1912 - 1916', '1939 - 1945', '1905 - 1910'],
          en: ['1914 - 1918', '1912 - 1916', '1939 - 1945', '1905 - 1910']
        },
        correctIndex: 0,
        hint: {
          uz: '1914-yil Sarayevodagi suiqasddan so\'ng boshlangan.',
          ru: 'Началась после событий в Сараево в 1914 году.',
          en: 'Sparked after assassination in Sarajevo.'
        }
      }
    ]
  },
  geography: {
    easy: [
      {
        question: {
          uz: "O'zbekiston Respublikasining poytaxti qaysi shahar?",
          ru: 'Какой город является столицей Узбекистана?',
          en: 'What is the capital city of Uzbekistan?'
        },
        options: {
          uz: ['Samarqand', 'Buxoro', 'Toshkent', 'Namangan'],
          ru: ['Самарканд', 'Бухара', 'Ташкент', 'Наманган'],
          en: ['Samarkand', 'Bukhara', 'Tashkent', 'Namangan']
        },
        correctIndex: 2,
        hint: {
          uz: 'Markaziy Osiyoning eng yirik megapolisi.',
          ru: 'Крупнейший мегаполис Центральной Азии.',
          en: 'Largest metropolis in Central Asia.'
        }
      }
    ],
    medium: [
      {
        question: {
          uz: "Dunyoning eng baland cho'qqisi - Everest qaysi tog' tizmasida joylashgan?",
          ru: 'В какой горной системе находится высочайшая вершина мира — Эверест?',
          en: 'In which mountain range is Mount Everest located?'
        },
        options: {
          uz: ["Alp tog'lari", "And tog'lari", "Himolay tog'lari", 'Kavkaz'],
          ru: ['Альпы', 'Анды', 'Гималаи', 'Кавказ'],
          en: ['Alps', 'Andes', 'Himalayas', 'Caucasus']
        },
        correctIndex: 2,
        hint: {
          uz: "Osiyodagi eng buyuk qorli tog'lar.",
          ru: 'Величайшая горная система Азии.',
          en: 'The highest range in Asia.'
        }
      }
    ],
    hard: [
      {
        question: {
          uz: 'Dunyoning eng uzun daryosi qaysi?',
          ru: 'Какая река считается самой длинной в мире?',
          en: 'What is traditionally considered the longest river in the world?'
        },
        options: {
          uz: ['Amazonka', 'Nil', 'Yantszi', 'Missisipi'],
          ru: ['Амазонка', 'Нил', 'Янцзы', 'Миссисипи'],
          en: ['Amazon', 'Nile', 'Yangtze', 'Mississippi']
        },
        correctIndex: 1,
        hint: {
          uz: "Afrikadan oqib o'tuvchi buyuk daryo.",
          ru: 'Великая река африканского континента.',
          en: 'Flows through northeastern Africa.'
        }
      }
    ]
  },
  technology: {
    easy: [
      {
        question: {
          uz: 'Texnologiyada "AI" qisqartmasi nimani anglatadi?',
          ru: 'Что означает сокращение «AI» (ИИ)?',
          en: 'What does the acronym "AI" stand for?'
        },
        options: {
          uz: ['Automated Interface', "Artificial Intelligence (Sun'iy intellekt)", 'Active Internet', 'Advanced Info'],
          ru: ['Automated Interface', 'Artificial Intelligence (Искусственный Интеллект)', 'Active Internet', 'Advanced Info'],
          en: ['Automated Interface', 'Artificial Intelligence', 'Active Internet', 'Advanced Info']
        },
        correctIndex: 1,
        hint: {
          uz: 'Mashinalarning insondek fikrlash qobiliyati.',
          ru: 'Способность машин мыслить и учиться.',
          en: 'Machine simulation of human cognition.'
        }
      }
    ],
    medium: [
      {
        question: {
          uz: 'Web-sahifalar yaratishdagi HTML qisqartmasi qanday kengaytiriladi?',
          ru: 'Как расшифровывается веб-аббревиатура HTML?',
          en: 'What does HTML stand for in web development?'
        },
        options: {
          uz: ['HyperText Markup Language', 'High Tech Modern Language', 'Hyperlink Test Machine', 'Home Tool Markup Level'],
          ru: ['HyperText Markup Language', 'High Tech Modern Language', 'Hyperlink Test Machine', 'Home Tool Markup Level'],
          en: ['HyperText Markup Language', 'High Tech Modern Language', 'Hyperlink Test Machine', 'Home Tool Markup Level']
        },
        correctIndex: 0,
        hint: {
          uz: 'Gipermatnli belgilash tili.',
          ru: 'Язык гипертекстовой разметки.',
          en: 'Hypertext markup language for websites.'
        }
      }
    ],
    hard: [
      {
        question: {
          uz: "Git tizimida yangi o'zgarishlarni qayd etish (commit) buyrug'i qaysi?",
          ru: 'Какая команда фиксирует изменения в системе Git?',
          en: 'Which command records staged snapshots in Git?'
        },
        options: {
          uz: ['git push', 'git commit', 'git checkout', 'git pull'],
          ru: ['git push', 'git commit', 'git checkout', 'git pull'],
          en: ['git push', 'git commit', 'git checkout', 'git pull']
        },
        correctIndex: 1,
        hint: {
          uz: 'Xabar bilan saqlash (commit -m "...")',
          ru: 'Сохранение версии с сообщением (-m)',
          en: 'Includes commit message.'
        }
      }
    ]
  },
  sports: {
    easy: [
      {
        question: {
          uz: "Futbolda bir jamoa safida maydonda necha nafar o'yinchi bo'ladi?",
          ru: 'Сколько игроков одной команды находится на поле в футболе?',
          en: 'How many players per team are on the field in a soccer match?'
        },
        options: {
          uz: ['9 nafar', '10 nafar', '11 nafar', '12 nafar'],
          ru: ['9 игроков', '10 игроков', '11 игроков', '12 игроков'],
          en: ['9 players', '10 players', '11 players', '12 players']
        },
        correctIndex: 2,
        hint: {
          uz: "Darvozabon bilan birga o'n bir nafar.",
          ru: 'Включая вратаря ровно 11.',
          en: '10 outfielders plus 1 goalkeeper.'
        }
      }
    ],
    medium: [
      {
        question: {
          uz: "Yozgi Olimpiya o'yinlari odatda necha yilda bir marta o'tkaziladi?",
          ru: 'С какой периодичностью обычно проводятся летние Олимпийские игры?',
          en: 'How often are the Summer Olympic Games normally held?'
        },
        options: {
          uz: ['2 yilda', '3 yilda', '4 yilda', '5 yilda'],
          ru: ['Каждые 2 года', 'Каждые 3 года', 'Каждые 4 года', 'Каждые 5 лет'],
          en: ['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years']
        },
        correctIndex: 2,
        hint: {
          uz: "To'rt yillik sikl (Olimpiada davri).",
          ru: 'Четырехлетний цикл Олимпиады.',
          en: 'A four-year cycle.'
        }
      }
    ],
    hard: [
      {
        question: {
          uz: 'Klassik marafon yugurish masofasi qancha?',
          ru: 'Какова официальная дистанция классического марафонского бега?',
          en: 'What is the official distance of an Olympic marathon race?'
        },
        options: {
          uz: ['40 km', '42 km 195 m', '45 km', '50 km'],
          ru: ['40 км', '42 км 195 м', '45 км', '50 км'],
          en: ['40 km', '42.195 km (26.2 mi)', '45 km', '50 km']
        },
        correctIndex: 1,
        hint: {
          uz: '42 kilometr va 195 metr.',
          ru: '42 километра и 195 метров.',
          en: 'Just over 42 kilometers.'
        }
      }
    ]
  },
  english: {
    easy: [
      {
        question: {
          uz: '"Book" so\'zining o\'zbekcha ma\'nosi nima?',
          ru: 'Как переводится слово «Book»?',
          en: 'What is the plural form of the noun "Child"?'
        },
        options: {
          uz: ['Daftar', 'Kitob', 'Qalam', 'Xat'],
          ru: ['Тетрадь', 'Книга', 'Карандаш', 'Письмо'],
          en: ['Childs', 'Children', 'Childrens', 'Childes']
        },
        correctIndex: 1,
        hint: {
          uz: 'Sahifali mutolaa vositasi.',
          ru: 'Предмет для чтения со страницами.',
          en: 'Irregular plural form.'
        }
      }
    ],
    medium: [
      {
        question: {
          uz: '"She ___ a talented doctor" jumlasidagi bo\'sh joyga qaysi to\'g\'ri keladi?',
          ru: 'Какая форма глагола to be подходит: «She ___ a talented doctor»?',
          en: 'Which form of the verb "to be" fits: "She ___ a talented doctor"?'
        },
        options: {
          uz: ['am', 'are', 'is', 'be'],
          ru: ['am', 'are', 'is', 'be'],
          en: ['am', 'are', 'is', 'be']
        },
        correctIndex: 2,
        hint: {
          uz: 'Uchinchi shaxs birlik (he/she/it) uchun "is" ishlatiladi.',
          ru: 'Для третьего лица единственного числа используется «is».',
          en: 'Third-person singular form.'
        }
      }
    ],
    hard: [
      {
        question: {
          uz: '"Piece of cake" inglizcha idiomasining ma\'nosi nima?',
          ru: 'Что означает английская идиома «Piece of cake»?',
          en: 'What does the English idiom "Piece of cake" mean?'
        },
        options: {
          uz: ['Juda shirin taom', 'Juda oson va yengil ish', "Tug'ilgan kun torti", 'Qiyin vazifa'],
          ru: ['Очень сладкое блюдо', 'Очень простое и легкое дело', 'Праздничный торт', 'Трудное испытание'],
          en: ['A sweet dessert', 'Something very easy to do', 'A birthday party', 'A tough challenge']
        },
        correctIndex: 1,
        hint: {
          uz: 'Osonlik bilan bajariladigan ish haqida aytiladi.',
          ru: 'Означает «проще простого».',
          en: 'Refers to something effortless.'
        }
      }
    ]
  }
};

const DAILY_QUESTIONS = [
  {
    question: {
      uz: 'Quyoshga eng yaqin turgan sayyora qaysi?',
      ru: 'Какая планета находится ближе всего к Солнцу?',
      en: 'Which planet is closest to the Sun?'
    },
    options: {
      uz: ['Merkuriy', 'Venera', 'Mars', 'Yer'],
      ru: ['Меркурий', 'Венера', 'Марс', 'Земля'],
      en: ['Mercury', 'Venus', 'Mars', 'Earth']
    },
    correctIndex: 0,
    hint: {
      uz: 'Eng kichik va eng tez aylanuvchi sayyora.',
      ru: 'Самая быстрая и маленькая планета системы.',
      en: 'The smallest and fastest orbiting planet.'
    }
  },
  {
    question: {
      uz: 'Alifbodagi birinchi dasturlash tilining yaratuvchisi kim hisoblanadi?',
      ru: 'Кто считается первым в истории программистом?',
      en: 'Who is widely regarded as the first computer programmer in history?'
    },
    options: {
      uz: ['Alan Tyuring', 'Ada Lavleys', 'Blez Paskal', 'Charlz Bebbij'],
      ru: ['Алан Тьюринг', 'Ада Лавлейс', 'Блез Паскаль', 'Чарльз Бэббидж'],
      en: ['Alan Turing', 'Ada Lovelace', 'Blaise Pascal', 'Charles Babbage']
    },
    correctIndex: 1,
    hint: {
      uz: 'Lord Bayronning qizi.',
      ru: 'Дочь поэта лорда Байрона.',
      en: 'Daughter of Lord Byron.'
    }
  },
  {
    question: {
      uz: "Dunyoning eng chuqur ko'li qaysi?",
      ru: 'Какое озеро является самым глубоким на планете?',
      en: 'What is the deepest lake in the world?'
    },
    options: {
      uz: ['Kaspiy dengizi', "Baykal ko'li", "Viktoriya ko'li", "Yuqori ko'l"],
      ru: ['Каспийское море', 'Байкал', 'Озеро Виктория', 'Озеро Верхнее'],
      en: ['Caspian Sea', 'Lake Baikal', 'Lake Victoria', 'Lake Superior']
    },
    correctIndex: 1,
    hint: {
      uz: "Sibirda joylashgan chuchuk suvli ko'l.",
      ru: 'Пресноводное озеро в Сибири.',
      en: 'Freshwater lake in Siberia.'
    }
  }
];

const ACHIEVEMENTS = [
  {
    id: 'first_win',
    icon: '⚔️',
    title: { uz: "Ilk G'alaba", ru: 'Первая Победа', en: 'First Blood' },
    desc: { uz: 'Arenadagi birinchi muvaffaqiyatli jang', ru: 'Первая победа в арене', en: 'Won your very first arena battle' }
  },
  {
    id: 'knowledge_master',
    icon: '🧠',
    title: { uz: 'Bilim Donosi', ru: 'Мудрец Арены', en: 'Knowledge Sage' },
    desc: { uz: "1,000 dan ortiq umumiy ball to'plash", ru: 'Набрать более 1000 очков', en: 'Accumulated over 1,000 career points' }
  },
  {
    id: 'streak_king',
    icon: '🔥',
    title: { uz: 'Olovli Ketma-ketlik', ru: 'Пламенная Серия', en: 'Streak Master' },
    desc: { uz: 'Ketma-ket 5 ta savolga xatosiz javob berish', ru: 'Ответить верно на 5 вопросов подряд', en: 'Answer 5 questions in a row correctly' }
  },
  {
    id: 'speed_demon',
    icon: '⚡',
    title: { uz: 'Chaqmoq Tezligi', ru: 'Скоростной Демон', en: 'Speed Demon' },
    desc: { uz: "Savolga 5 soniyadan kam vaqtda to'g'ri javob berish", ru: 'Ответить верно быстрее 5 секунд', en: 'Answered correctly in under 5 seconds' }
  }
];

const LEADERBOARDS = [
  { rank: 1, username: 'Temur_Gladiator', avatar: '🦁', score: 9850, level: 12 },
  { rank: 2, username: 'Cyber_Sardor', avatar: '⚡', score: 8740, level: 11 },
  { rank: 3, username: 'Malika_Quiz', avatar: '👑', score: 8120, level: 10 },
  { rank: 4, username: 'Brainiac_Uz', avatar: '🧠', score: 7450, level: 9 },
  { rank: 5, username: 'Alex_Master', avatar: '🐺', score: 6890, level: 8 }
];

// Helper to extract localized text
function getTxt(item, lang = 'uz') {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item[lang] || item['uz'] || item['en'] || Object.values(item)[0] || '';
}

// ==========================================
// 4. MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  const [lang, setLang] = useState('uz'); // 'uz' | 'ru' | 'en'
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [user, setUser] = useState({
    username: 'Jasur_Gladiator',
    avatar: '🦁',
    points: 420,
    gamesPlayed: 3,
    correctAnswers: 12,
    level: 2,
    xp: 220
  });

  const [activeGameConfig, setActiveGameConfig] = useState(null);
  const [lastResultsData, setLastResultsData] = useState(null);
  const [activeRoomData, setActiveRoomData] = useState(null);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

  const [dailyClaimedModal, setDailyClaimedModal] = useState(false);
  const [levelUpModal, setLevelUpModal] = useState(false);

  // Translations shortcut
  const t = TRANSLATIONS[lang] || TRANSLATIONS.uz;

  const triggerHaptic = (type = 'click') => {
    if (!hapticsEnabled) return;
    try {
      if (type === 'success') Vibration.vibrate([0, 40, 60, 40]);
      else if (type === 'error') Vibration.vibrate([0, 100, 80, 100]);
      else Vibration.vibrate(25);
    } catch (e) {}
  };

  const handleStartQuiz = (config) => {
    triggerHaptic();
    setActiveGameConfig(config);
    setCurrentScreen('quiz');
  };

  const handleFinishGame = (results) => {
    const { userScore, answersLog, gameConfig, opponentScore } = results;
    const correctCount = answersLog.filter(a => a.isCorrect).length;
    const xpGained = Math.round(userScore * 0.8) + (correctCount * 15);

    let nextXp = user.xp + xpGained;
    let nextLevel = user.level;
    let leveledUp = false;

    if (nextXp >= nextLevel * 300) {
      nextLevel += 1;
      leveledUp = true;
    }

    setUser(prev => ({
      ...prev,
      points: prev.points + userScore,
      gamesPlayed: prev.gamesPlayed + 1,
      correctAnswers: prev.correctAnswers + correctCount,
      level: nextLevel,
      xp: nextXp
    }));

    setLastResultsData({
      ...results,
      xpGained,
      leveledUp
    });

    if (leveledUp) {
      setLevelUpModal(true);
    }

    setCurrentScreen('results');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#070913" />

      {/* TOP HEADER WITH QUICK LANGUAGE SWITCHER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentScreen('home')} style={styles.logoRow}>
          <View style={styles.logoBadge}><Text style={styles.logoIcon}>⚡</Text></View>
          <View>
            <Text style={styles.logoTitle}>QUIZ <Text style={styles.accentText}>ARENA</Text></Text>
            <Text style={styles.logoSubtitle}>{lang.toUpperCase()} EDITION</Text>
          </View>
        </TouchableOpacity>

        {/* 3-LANGUAGE BUTTONS (UZ | RU | EN) */}
        <View style={styles.langPillsContainer}>
          {[
            { code: 'uz', flag: '🇺🇿', label: 'UZ' },
            { code: 'ru', flag: '🇷🇺', label: 'RU' },
            { code: 'en', flag: '🇬🇧', label: 'EN' }
          ].map(l => {
            const active = lang === l.code;
            return (
              <TouchableOpacity
                key={l.code}
                onPress={() => {
                  triggerHaptic();
                  setLang(l.code);
                }}
                style={[styles.langBtn, active && styles.activeLangBtn]}
              >
                <Text style={styles.flagIcon}>{l.flag}</Text>
                <Text style={[styles.langBtnText, active && styles.activeLangBtnText]}>{l.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* USER POINTS PILL */}
        <View style={styles.pointsPill}>
          <Text style={styles.pointsText}>🪙 {user.points}</Text>
        </View>
      </View>

      {/* SCREEN CONTAINER */}
      <View style={styles.mainContainer}>
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            t={t}
            lang={lang}
            setLang={setLang}
            user={user}
            setUser={setUser}
            onEnter={() => setCurrentScreen('home')}
            triggerHaptic={triggerHaptic}
          />
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            t={t}
            lang={lang}
            user={user}
            onNavigate={setCurrentScreen}
            onStartQuiz={handleStartQuiz}
            onClaimDaily={() => {
              triggerHaptic('success');
              setUser(p => ({ ...p, points: p.points + 150, xp: p.xp + 100 }));
              setDailyClaimedModal(true);
            }}
            triggerHaptic={triggerHaptic}
          />
        )}

        {currentScreen === 'categories' && (
          <CategoriesScreen
            t={t}
            lang={lang}
            onStartQuiz={handleStartQuiz}
            triggerHaptic={triggerHaptic}
          />
        )}

        {currentScreen === 'game_modes' && (
          <GameModesScreen
            t={t}
            lang={lang}
            onNavigate={setCurrentScreen}
            onStartQuiz={handleStartQuiz}
            triggerHaptic={triggerHaptic}
          />
        )}

        {currentScreen === 'quiz' && activeGameConfig && (
          <QuizGameplayScreen
            t={t}
            lang={lang}
            gameConfig={activeGameConfig}
            user={user}
            onFinishGame={handleFinishGame}
            onQuit={() => setCurrentScreen('home')}
            triggerHaptic={triggerHaptic}
          />
        )}

        {currentScreen === 'room_creation' && (
          <RoomCreationScreen
            t={t}
            lang={lang}
            user={user}
            onEnterLobby={(data) => {
              setActiveRoomData(data);
              setCurrentScreen('multiplayer_lobby');
            }}
            onBack={() => setCurrentScreen('game_modes')}
            triggerHaptic={triggerHaptic}
          />
        )}

        {currentScreen === 'multiplayer_lobby' && activeRoomData && (
          <MultiplayerLobbyScreen
            t={t}
            lang={lang}
            roomData={activeRoomData}
            user={user}
            onStartBattle={(cfg) => handleStartQuiz(cfg)}
            onLeaveLobby={() => setCurrentScreen('room_creation')}
            triggerHaptic={triggerHaptic}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <LeaderboardScreen
            t={t}
            lang={lang}
            user={user}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            t={t}
            lang={lang}
            user={user}
            setUser={setUser}
            triggerHaptic={triggerHaptic}
          />
        )}

        {currentScreen === 'results' && lastResultsData && (
          <ResultsScreen
            t={t}
            lang={lang}
            resultsData={lastResultsData}
            user={user}
            onPlayAgain={() => handleStartQuiz(lastResultsData.gameConfig)}
            onGoHome={() => setCurrentScreen('home')}
            triggerHaptic={triggerHaptic}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            t={t}
            lang={lang}
            setLang={setLang}
            hapticsEnabled={hapticsEnabled}
            onToggleHaptics={() => {
              triggerHaptic();
              setHapticsEnabled(!hapticsEnabled);
            }}
            onResetData={() => {
              triggerHaptic('error');
              Alert.alert(
                t.resetBtn,
                t.settingsHeader,
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'OK', onPress: () => setUser({ username: 'Player', avatar: '🦁', points: 0, gamesPlayed: 0, correctAnswers: 0, level: 1, xp: 0 }) }
                ]
              );
            }}
            onBack={() => setCurrentScreen('home')}
            triggerHaptic={triggerHaptic}
          />
        )}
      </View>

      {/* BOTTOM NAVIGATION BAR */}
      {currentScreen !== 'welcome' && currentScreen !== 'quiz' && (
        <View style={styles.bottomNav}>
          {[
            { id: 'home', icon: '🏠', label: t.navHome },
            { id: 'categories', icon: '📚', label: t.navCategories },
            { id: 'game_modes', icon: '⚔️', label: t.navModes },
            { id: 'leaderboard', icon: '🏆', label: t.navLeaderboard },
            { id: 'profile', icon: '👤', label: t.navProfile },
            { id: 'settings', icon: '⚙️', label: t.navSettings }
          ].map(tab => {
            const active = currentScreen === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => {
                  triggerHaptic();
                  setCurrentScreen(tab.id);
                }}
                style={styles.navItem}
              >
                <Text style={[styles.navIcon, active && styles.activeNavIcon]}>{tab.icon}</Text>
                <Text style={[styles.navLabel, active && styles.activeNavLabel]}>{tab.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* DAILY REWARD MODAL */}
      <Modal visible={dailyClaimedModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalEmoji}>🎁</Text>
            <Text style={styles.modalTitle}>{t.dailyRewardClaimed}</Text>
            <Text style={styles.modalSubtitle}>{t.claimedSubtitle}</Text>
            <TouchableOpacity onPress={() => setDailyClaimedModal(false)} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>{t.closeBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* LEVEL UP MODAL */}
      <Modal visible={levelUpModal} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { borderColor: '#f59e0b' }]}>
            <Text style={styles.modalEmoji}>👑</Text>
            <Text style={[styles.modalTitle, { color: '#f59e0b' }]}>{t.levelUpTitle}</Text>
            <Text style={styles.modalSubtitle}>{t.levelUpSubtitle}</Text>
            <Text style={styles.levelNumberText}>LEVEL {user.level}</Text>
            <TouchableOpacity onPress={() => setLevelUpModal(false)} style={[styles.primaryBtn, { backgroundColor: '#f59e0b' }]}>
              <Text style={[styles.primaryBtnText, { color: '#070913' }]}>{t.closeBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ==========================================
// 5. SCREEN COMPONENTS
// ==========================================

function WelcomeScreen({ t, lang, setLang, user, setUser, onEnter, triggerHaptic }) {
  const avatars = ['🦁', '⚡', '🤖', '👑', '🐺', '🐉', '🎯', '🦅'];
  return (
    <ScrollView contentContainerStyle={styles.centerContainer}>
      <View style={styles.welcomeLogo}><Text style={{ fontSize: 44 }}>⚡</Text></View>
      <Text style={styles.mainTitle}>{t.appTitle}</Text>
      <Text style={styles.subTitle}>{t.appTagline}</Text>

      {/* LANGUAGE SELECTOR PANEL ON WELCOME SCREEN */}
      <View style={styles.welcomeLangRow}>
        {[
          { code: 'uz', flag: '🇺🇿', name: "O'zbekcha" },
          { code: 'ru', flag: '🇷🇺', name: 'Русский' },
          { code: 'en', flag: '🇬🇧', name: 'English' }
        ].map(l => (
          <TouchableOpacity
            key={l.code}
            onPress={() => { triggerHaptic(); setLang(l.code); }}
            style={[styles.welcomeLangBtn, lang === l.code && styles.activeWelcomeLangBtn]}
          >
            <Text style={{ fontSize: 18, marginRight: 6 }}>{l.flag}</Text>
            <Text style={[styles.welcomeLangTxt, lang === l.code && styles.activeWelcomeLangTxt]}>{l.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.welcomeSubtitle}</Text>
        <TextInput
          value={user.username}
          onChangeText={(txt) => setUser(p => ({ ...p, username: txt }))}
          placeholder={t.enterNamePlaceholder}
          placeholderTextColor="#64748b"
          style={styles.input}
        />
        <Text style={[styles.sectionSubtitle, { marginBottom: 10 }]}>{t.chooseAvatar}:</Text>
        <View style={styles.avatarRow}>
          {avatars.map(av => (
            <TouchableOpacity
              key={av}
              onPress={() => { triggerHaptic(); setUser(p => ({ ...p, avatar: av })); }}
              style={[styles.avatarBox, user.avatar === av && styles.activeAvatarBox]}
            >
              <Text style={{ fontSize: 24 }}>{av}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => { triggerHaptic(); onEnter(); }} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>{t.btnEnterArena}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function HomeScreen({ t, lang, user, onNavigate, onStartQuiz, onClaimDaily, triggerHaptic }) {
  const xpNeed = user.level * 300;
  const xpPct = Math.min(100, Math.round((user.xp / xpNeed) * 100));

  return (
    <ScrollView style={styles.scroll}>
      {/* HERO BANNER */}
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.heroGreeting}>{t.welcomeBack},</Text>
            <Text style={styles.heroName}>{user.username} {user.avatar}</Text>
            <Text style={styles.heroLevel}>{t.levelGladiator} • Level {user.level}</Text>
          </View>
          <TouchableOpacity onPress={() => onNavigate('profile')} style={styles.heroAvatarContainer}>
            <Text style={{ fontSize: 40 }}>{user.avatar}</Text>
          </TouchableOpacity>
        </View>

        {/* PROGRESS BAR */}
        <View style={styles.progressBarWrapper}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressText}>{t.xpProgress}: {user.xp} / {xpNeed} XP</Text>
            <Text style={styles.progressPct}>{xpPct}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${xpPct}%` }]} />
          </View>
        </View>

        <TouchableOpacity onPress={() => onNavigate('game_modes')} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>{t.playNowBtn}</Text>
        </TouchableOpacity>
      </View>

      {/* DAILY CHALLENGE CARD */}
      <View style={styles.dailyCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.dailyBadge}>{t.dailyChallengeBanner}</Text>
          <Text style={styles.dailyTitle}>{t.dailyChallengeDesc}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={onClaimDaily} style={styles.claimBtn}>
            <Text style={styles.claimBtnText}>🎁 150P</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onStartQuiz({ mode: 'daily', title: t.modeDaily })}
            style={[styles.primaryBtn, { paddingHorizontal: 14, paddingVertical: 10, width: 'auto', marginLeft: 8 }]}
          >
            <Text style={styles.primaryBtnText}>{t.startDailyBtn}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* STATS OVERVIEW */}
      <Text style={styles.sectionTitle}>{t.statsTitle}</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{user.gamesPlayed}</Text>
          <Text style={styles.statLbl}>{t.statGames}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: '#10b981' }]}>
            {user.gamesPlayed ? Math.round((user.correctAnswers / (user.gamesPlayed * 5)) * 100) : 0}%
          </Text>
          <Text style={styles.statLbl}>{t.statWinRate}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: '#06b6d4' }]}>{user.correctAnswers}</Text>
          <Text style={styles.statLbl}>{t.statCorrect}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: '#f59e0b' }]}>{user.points}</Text>
          <Text style={styles.statLbl}>{t.statPoints}</Text>
        </View>
      </View>

      {/* QUICK CATEGORIES LIST */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>{t.quickCategoriesTitle}</Text>
        <TouchableOpacity onPress={() => onNavigate('categories')}>
          <Text style={styles.sectionLink}>{t.seeAll}</Text>
        </TouchableOpacity>
      </View>

      {CATEGORIES.slice(0, 4).map(cat => (
        <TouchableOpacity
          key={cat.id}
          onPress={() => onStartQuiz({ mode: 'single', category: cat.id, difficulty: 'medium', title: getTxt(cat.name, lang) })}
          style={styles.catRowCard}
        >
          <Text style={{ fontSize: 32, marginRight: 12 }}>{cat.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.catName}>{getTxt(cat.name, lang)}</Text>
            <Text style={styles.catDesc} numberOfLines={1}>{getTxt(cat.description, lang)}</Text>
          </View>
          <Text style={styles.playArrow}>➔</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function CategoriesScreen({ t, lang, onStartQuiz, triggerHaptic }) {
  const [diff, setDiff] = useState('medium');

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.screenHeader}>{t.categoriesHeader}</Text>
      <Text style={styles.screenSubheader}>{t.selectCategory}</Text>

      {/* DIFFICULTY SELECTOR */}
      <View style={styles.diffRow}>
        {[
          { id: 'easy', label: t.diffEasy },
          { id: 'medium', label: t.diffMedium },
          { id: 'hard', label: t.diffHard }
        ].map(d => (
          <TouchableOpacity
            key={d.id}
            onPress={() => { triggerHaptic(); setDiff(d.id); }}
            style={[styles.diffBtn, diff === d.id && styles.activeDiffBtn]}
          >
            <Text style={[styles.diffText, diff === d.id && styles.activeDiffText]}>{d.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {CATEGORIES.map(cat => (
        <TouchableOpacity
          key={cat.id}
          onPress={() => {
            triggerHaptic();
            onStartQuiz({
              mode: 'single',
              category: cat.id,
              difficulty: diff,
              title: getTxt(cat.name, lang)
            });
          }}
          style={styles.catRowCard}
        >
          <Text style={{ fontSize: 36, marginRight: 14 }}>{cat.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.catName}>{getTxt(cat.name, lang)}</Text>
            <Text style={styles.catDesc}>{getTxt(cat.description, lang)}</Text>
          </View>
          <Text style={styles.playArrow}>➔</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function GameModesScreen({ t, lang, onNavigate, onStartQuiz, triggerHaptic }) {
  const [searching, setSearching] = useState(false);

  const startQuickMatch = () => {
    triggerHaptic();
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      const opponents = [
        { name: 'ApexGladiator', avatar: '🦁', score: 0, level: 8 },
        { name: 'QuantumRacer', avatar: '⚡', score: 0, level: 6 },
        { name: 'CyberTitan', avatar: '🤖', score: 0, level: 9 },
        { name: 'NovaViper', avatar: '🐍', score: 0, level: 7 }
      ];
      const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
      onStartQuiz({
        mode: 'quick_match',
        category: 'technology',
        difficulty: 'medium',
        title: t.modeQuick,
        opponent: randomOpponent,
        isHost: true,
        roomCode: 'QM-' + Math.floor(1000 + Math.random() * 9000)
      });
    }, 1500);
  };

  const modes = [
    {
      id: 'single',
      title: t.modeSingle,
      icon: '👤',
      desc: t.modeSingleDesc,
      action: () => onNavigate('categories')
    },
    {
      id: 'multi',
      title: t.modeMulti,
      icon: '⚔️',
      desc: t.modeMultiDesc,
      action: () => onNavigate('room_creation')
    },
    {
      id: 'quick',
      title: t.modeQuick,
      icon: '⚡',
      desc: t.modeQuickDesc,
      action: startQuickMatch
    },
    {
      id: 'practice',
      title: t.modePractice,
      icon: '🧘',
      desc: t.modePracticeDesc,
      action: () => onStartQuiz({ mode: 'practice', category: 'general', difficulty: 'easy', title: t.modePractice })
    },
    {
      id: 'daily',
      title: t.modeDaily,
      icon: '🎯',
      desc: t.modeDailyDesc,
      action: () => onStartQuiz({ mode: 'daily', category: 'general', difficulty: 'medium', title: t.modeDaily })
    }
  ];

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.screenHeader}>{t.gameModesHeader}</Text>

      {searching && (
        <View style={styles.searchingBanner}>
          <Text style={{ fontSize: 24, marginBottom: 6 }}>🔍⚡</Text>
          <Text style={styles.searchingTitle}>{t.searchingOpponent}</Text>
          <Text style={styles.searchingSub}>{t.matchFound}</Text>
        </View>
      )}

      {modes.map(m => (
        <TouchableOpacity
          key={m.id}
          onPress={() => { triggerHaptic(); m.action(); }}
          style={styles.modeCard}
        >
          <Text style={{ fontSize: 36, marginBottom: 8 }}>{m.icon}</Text>
          <Text style={styles.modeTitle}>{m.title}</Text>
          <Text style={styles.modeDesc}>{m.desc}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function QuizGameplayScreen({ t, lang, gameConfig, user, onFinishGame, onQuit, triggerHaptic }) {
  const { mode = 'single', category = 'general', difficulty = 'medium', opponent = null } = gameConfig;
  const isPvp = mode === 'multiplayer' || mode === 'quick_match';

  const questionsList = useMemo(() => {
    if (mode === 'daily') return [...DAILY_QUESTIONS];
    const catGroup = QUESTIONS_BANK[category] || QUESTIONS_BANK.general;
    const diffGroup = catGroup[difficulty] || catGroup.easy || QUESTIONS_BANK.general.easy;
    return [...diffGroup];
  }, [mode, category, difficulty]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timer, setTimer] = useState(30);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [log, setLog] = useState([]);
  const [hiddenOptions, setHiddenOptions] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [lifelines, setLifelines] = useState({ fiftyFifty: true, timeFreeze: true, hint: true });

  const currentQ = questionsList[index] || {
    question: { uz: '', ru: '', en: '' },
    options: { uz: [], ru: [], en: [] },
    correctIndex: 0,
    hint: { uz: '', ru: '', en: '' }
  };

  const isPractice = mode === 'practice';
  const total = questionsList.length;

  // Countdown timer
  useEffect(() => {
    if (isPractice || answered) return;
    setTimer(30);
    setHiddenOptions([]);
    setShowHint(false);

    const tInterval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(tInterval);
          handleAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tInterval);
  }, [index, answered, isPractice]);

  // Opponent simulation for multiplayer / quick match
  useEffect(() => {
    if (!isPvp || answered) return;
    const oppTimer = setTimeout(() => {
      const oppCorrect = Math.random() > 0.35;
      if (oppCorrect) {
        setOpponentScore(prev => prev + Math.floor(90 + Math.random() * 50));
      }
    }, Math.floor(3500 + Math.random() * 5000));

    return () => clearTimeout(oppTimer);
  }, [index, isPvp, answered]);

  const handleAnswer = (idx) => {
    if (answered || hiddenOptions.includes(idx)) return;
    setAnswered(true);
    setSelected(idx);

    const isCorrect = idx === currentQ.correctIndex;
    triggerHaptic(isCorrect ? 'success' : 'error');

    let pts = 0;
    if (isCorrect) {
      pts = Math.round(100 + (isPractice ? 0 : timer * 3));
      setUserScore(p => p + pts);
    }

    setLog(p => [...p, {
      question: getTxt(currentQ.question, lang),
      selected: idx,
      isCorrect,
      pointsAwarded: pts
    }]);
  };

  const advance = () => {
    if (index + 1 < total) {
      setIndex(p => p + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      onFinishGame({
        userScore,
        opponentScore: isPvp ? opponentScore : 0,
        totalQuestions: total,
        answersLog: log,
        gameConfig,
        opponent: isPvp ? (opponent || { name: 'Gladiator Rival', avatar: '⚔️' }) : null
      });
    }
  };

  const qText = getTxt(currentQ.question, lang);
  const qOptions = (currentQ.options && currentQ.options[lang]) || (currentQ.options && currentQ.options['uz']) || [];
  const qHint = getTxt(currentQ.hint, lang);

  return (
    <View style={styles.quizContainer}>
      {/* HEADER BAR */}
      <View style={styles.quizHeader}>
        <TouchableOpacity onPress={onQuit}><Text style={styles.quitText}>{t.quitBtn}</Text></TouchableOpacity>
        <Text style={styles.quizCounter}>{t.questionNum} {index + 1} / {total}</Text>
        <Text style={styles.quizScore}>🪙 {userScore}</Text>
      </View>

      {/* 1V1 LIVE SCORE BAR */}
      {isPvp && (
        <View style={styles.pvpHeaderBar}>
          <Text style={styles.pvpPlayerName}>{user.avatar} {user.username}: {userScore}</Text>
          <Text style={styles.pvpVsBadge}>VS</Text>
          <Text style={styles.pvpOpponentName}>{opponent?.name || 'Rival'}: {opponentScore}</Text>
        </View>
      )}

      {/* TIMER & LIFELINES BAR */}
      {!isPractice && (
        <View style={styles.timerRow}>
          <Text style={[styles.timerBadge, timer <= 5 && { borderColor: '#f43f5e', color: '#f43f5e' }]}>
            ⏱️ {timer} {t.secLeft}
          </Text>

          <View style={{ flexDirection: 'row' }}>
            {/* 50:50 */}
            {lifelines.fiftyFifty && !answered && (
              <TouchableOpacity
                onPress={() => {
                  triggerHaptic();
                  setLifelines(p => ({ ...p, fiftyFifty: false }));
                  const wrong = [0, 1, 2, 3].filter(i => i !== currentQ.correctIndex).sort(() => 0.5 - Math.random());
                  setHiddenOptions(wrong.slice(0, 2));
                }}
                style={styles.lifelineBtn}
              >
                <Text style={styles.lifelineText}>⚡ {t.lifeline5050}</Text>
              </TouchableOpacity>
            )}

            {/* TIME FREEZE */}
            {lifelines.timeFreeze && !answered && (
              <TouchableOpacity
                onPress={() => {
                  triggerHaptic();
                  setLifelines(p => ({ ...p, timeFreeze: false }));
                  setTimer(p => p + 15);
                }}
                style={[styles.lifelineBtn, { marginLeft: 6 }]}
              >
                <Text style={styles.lifelineText}>⏳ {t.lifelineFreeze}</Text>
              </TouchableOpacity>
            )}

            {/* HINT */}
            {lifelines.hint && !answered && qHint ? (
              <TouchableOpacity
                onPress={() => {
                  triggerHaptic();
                  setLifelines(p => ({ ...p, hint: false }));
                  setShowHint(true);
                }}
                style={[styles.lifelineBtn, { marginLeft: 6 }]}
              >
                <Text style={styles.lifelineText}>{t.lifelineHint}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      )}

      {/* OPTIONAL HINT BANNER */}
      {showHint && qHint ? (
        <View style={styles.hintBox}>
          <Text style={styles.hintText}>{t.hintLabel} {qHint}</Text>
        </View>
      ) : null}

      {/* QUESTION CARD */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{qText}</Text>
        {qOptions.map((opt, i) => {
          const isCorrect = i === currentQ.correctIndex;
          const isSel = selected === i;
          const isHidden = hiddenOptions.includes(i);

          let optStyle = styles.optBtn;
          if (isHidden) optStyle = [styles.optBtn, { opacity: 0.15 }];
          else if (answered) {
            if (isCorrect) optStyle = [styles.optBtn, styles.correctOpt];
            else if (isSel) optStyle = [styles.optBtn, styles.wrongOpt];
          }

          return (
            <TouchableOpacity
              key={i}
              disabled={answered || isHidden}
              onPress={() => handleAnswer(i)}
              style={optStyle}
            >
              <Text style={styles.optLetter}>{['A', 'B', 'C', 'D'][i]}</Text>
              <Text style={styles.optText}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* NEXT BUTTON */}
      {answered && (
        <TouchableOpacity onPress={advance} style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>
            {index + 1 < total ? t.nextQuestionBtn : t.finishQuizBtn}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function RoomCreationScreen({ t, lang, user, onEnterLobby, onBack, triggerHaptic }) {
  const [code, setCode] = useState('');

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.screenHeader}>{t.mpTitle}</Text>

      <TouchableOpacity
        onPress={() => {
          triggerHaptic();
          onEnterLobby({
            roomCode: 'ARENA-' + Math.floor(1000 + Math.random() * 9000),
            isHost: true,
            category: 'technology',
            difficulty: 'medium'
          });
        }}
        style={styles.primaryBtn}
      >
        <Text style={styles.primaryBtnText}>{t.createRoomBtn}</Text>
      </TouchableOpacity>

      <Text style={{ color: '#64748b', marginVertical: 18 }}>{t.orText}</Text>

      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder={t.enterRoomCode}
        placeholderTextColor="#64748b"
        style={styles.input}
      />

      <TouchableOpacity
        onPress={() => {
          triggerHaptic();
          onEnterLobby({
            roomCode: code.trim().toUpperCase() || 'ARENA-5555',
            isHost: false,
            category: 'science',
            difficulty: 'medium'
          });
        }}
        style={[styles.primaryBtn, { backgroundColor: '#3b82f6', marginTop: 10 }]}
      >
        <Text style={styles.primaryBtnText}>{t.joinRoomBtn}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={{ marginTop: 24 }}>
        <Text style={styles.sectionLink}>{t.backMenu}</Text>
      </TouchableOpacity>
    </View>
  );
}

function MultiplayerLobbyScreen({ t, lang, roomData, user, onStartBattle, onLeaveLobby, triggerHaptic }) {
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.screenHeader}>{t.roomChamberTitle}</Text>
      <Text style={styles.screenSubheader}>{t.roomCodeLabel}</Text>
      <Text style={styles.roomCodeLarge}>{roomData.roomCode}</Text>
      <Text style={styles.modalSubtitle}>{t.shareCodeNotice}</Text>

      <View style={styles.lobbyPlayerBadge}>
        <Text style={{ fontSize: 24 }}>{user.avatar}</Text>
        <Text style={{ color: '#ffffff', fontWeight: '800', marginLeft: 10 }}>{user.username} (You)</Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          triggerHaptic();
          onStartBattle({
            mode: 'multiplayer',
            category: roomData.category,
            difficulty: roomData.difficulty,
            title: t.modeMulti,
            opponent: { name: 'Challenger_Pro', avatar: '⚔️', score: 0 }
          });
        }}
        style={[styles.primaryBtn, { marginTop: 20 }]}
      >
        <Text style={styles.primaryBtnText}>{t.startBattleBtn}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onLeaveLobby} style={{ marginTop: 16 }}>
        <Text style={styles.sectionLink}>{t.leaveLobbyBtn}</Text>
      </TouchableOpacity>
    </View>
  );
}

function LeaderboardScreen({ t, lang, user }) {
  const [activeTab, setActiveTab] = useState('global');

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.screenHeader}>{t.leaderboardHeader}</Text>

      <View style={styles.tabRow}>
        {[
          { id: 'global', label: t.tabGlobal },
          { id: 'weekly', label: t.tabWeekly },
          { id: 'monthly', label: t.tabMonthly }
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={[styles.tabBtn, activeTab === tab.id && styles.activeTabBtn]}
          >
            <Text style={[styles.tabBtnText, activeTab === tab.id && styles.activeTabBtnText]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {LEADERBOARDS.map(p => (
        <View key={p.rank} style={styles.rankCard}>
          <Text style={[styles.rankNum, p.rank === 1 && { color: '#f59e0b' }, p.rank === 2 && { color: '#94a3b8' }, p.rank === 3 && { color: '#d97706' }]}>
            #{p.rank}
          </Text>
          <Text style={{ fontSize: 28, marginHorizontal: 10 }}>{p.avatar}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.rankName}>{p.username}</Text>
            <Text style={styles.catDesc}>Level {p.level}</Text>
          </View>
          <Text style={styles.rankPts}>{p.score} {t.rankPts}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function ProfileScreen({ t, lang, user, setUser, triggerHaptic }) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user.username);

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.screenHeader}>{t.profileHeader}</Text>

      <View style={styles.heroCard}>
        <Text style={{ fontSize: 56, textAlign: 'center', marginBottom: 8 }}>{user.avatar}</Text>
        {isEditing ? (
          <View style={{ marginBottom: 12 }}>
            <TextInput
              value={nameInput}
              onChangeText={setNameInput}
              style={[styles.input, { textAlign: 'center' }]}
            />
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                setUser(p => ({ ...p, username: nameInput }));
                setIsEditing(false);
              }}
              style={[styles.primaryBtn, { paddingVertical: 10 }]}
            >
              <Text style={styles.primaryBtnText}>{t.saveProfile}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.heroName}>{user.username}</Text>
            <Text style={styles.heroLevel}>{t.levelGladiator} • Level {user.level}</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)} style={{ marginTop: 8 }}>
              <Text style={styles.sectionLink}>✏️ {t.editProfile}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>{t.achievementsTitle}</Text>
      {ACHIEVEMENTS.map(ach => (
        <View key={ach.id} style={styles.badgeRow}>
          <Text style={{ fontSize: 32, marginRight: 12 }}>{ach.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.catName}>{getTxt(ach.title, lang)}</Text>
            <Text style={styles.catDesc}>{getTxt(ach.desc, lang)}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function ResultsScreen({ t, lang, resultsData, user, onPlayAgain, onGoHome, triggerHaptic }) {
  const { userScore, opponentScore, totalQuestions, answersLog, opponent } = resultsData;
  const correct = answersLog.filter(a => a.isCorrect).length;
  const pct = Math.round((correct / totalQuestions) * 100);

  let title = t.resultsHeader;
  let emoji = '🏆';
  if (opponent) {
    if (userScore > opponentScore) {
      title = t.victoryTitle;
      emoji = '👑';
    } else if (userScore < opponentScore) {
      title = t.defeatTitle;
      emoji = '💀';
    } else {
      title = t.drawTitle;
      emoji = '🤝';
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.centerContainer}>
      <Text style={{ fontSize: 56, marginBottom: 8 }}>{emoji}</Text>
      <Text style={styles.screenHeader}>{title}</Text>

      <Text style={styles.resultsScore}>{userScore} {t.rankPts}</Text>
      <Text style={styles.modalSubtitle}>{correct} / {totalQuestions} {t.correctOutOf} ({pct}%)</Text>

      {opponent && (
        <View style={styles.resultsVersusBox}>
          <Text style={{ color: '#06b6d4', fontWeight: '800' }}>
            {user.username}: {userScore} PTS
          </Text>
          <Text style={{ color: '#64748b', marginHorizontal: 8 }}>vs</Text>
          <Text style={{ color: '#f43f5e', fontWeight: '800' }}>
            {opponent.name}: {opponentScore} PTS
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => { triggerHaptic(); onPlayAgain(); }}
        style={[styles.primaryBtn, { marginTop: 20 }]}
      >
        <Text style={styles.primaryBtnText}>{t.playAgainBtn}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onGoHome} style={{ marginTop: 16 }}>
        <Text style={styles.sectionLink}>{t.backHomeBtn}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SettingsScreen({ t, lang, setLang, hapticsEnabled, onToggleHaptics, onResetData, onBack, triggerHaptic }) {
  const languages = [
    { code: 'uz', flag: '🇺🇿', title: "O'zbek tili", sub: "Lotin yozuvida to'liq tarjima" },
    { code: 'ru', flag: '🇷🇺', title: 'Русский язык', sub: 'Полный русский интерфейс и вопросы' },
    { code: 'en', flag: '🇬🇧', title: 'English', sub: 'Complete English interface and trivia' }
  ];

  return (
    <ScrollView style={styles.scroll}>
      <Text style={styles.screenHeader}>{t.settingsHeader}</Text>

      {/* LANGUAGE SELECTION SECTION */}
      <Text style={styles.sectionTitle}>🌐 {t.languageSetting}</Text>
      {languages.map(l => {
        const active = lang === l.code;
        return (
          <TouchableOpacity
            key={l.code}
            onPress={() => {
              triggerHaptic();
              setLang(l.code);
            }}
            style={[styles.langChoiceCard, active && styles.activeLangChoiceCard]}
          >
            <Text style={{ fontSize: 32, marginRight: 14 }}>{l.flag}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.langChoiceTitle, active && { color: '#06b6d4' }]}>{l.title}</Text>
              <Text style={styles.catDesc}>{l.sub}</Text>
            </View>
            <Text style={[styles.checkCircle, active && styles.activeCheckCircle]}>
              {active ? '✓' : ''}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* VIBRATION TOGGLE */}
      <Text style={[styles.sectionTitle, { marginTop: 20 }]}>🔔 {t.soundSetting}</Text>
      <TouchableOpacity onPress={onToggleHaptics} style={styles.settingCard}>
        <Text style={styles.catName}>{t.vibrationSetting}</Text>
        <Text style={[styles.settingVal, !hapticsEnabled && { color: '#64748b' }]}>
          {hapticsEnabled ? t.onText : t.offText}
        </Text>
      </TouchableOpacity>

      {/* RESET BUTTON */}
      <TouchableOpacity onPress={onResetData} style={[styles.settingCard, { marginTop: 12, borderColor: '#f43f5e33' }]}>
        <Text style={[styles.catName, { color: '#f43f5e' }]}>{t.resetBtn}</Text>
        <Text style={{ fontSize: 16 }}>⚠️</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={{ marginTop: 24, alignItems: 'center' }}>
        <Text style={styles.sectionLink}>{t.backMenu}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ==========================================
// 6. STYLESHEET (DARK NAVY & NEON TAILWIND)
// ==========================================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#070913' },
  mainContainer: { flex: 1, paddingHorizontal: 16 },
  scroll: { flex: 1, paddingVertical: 10 },
  centerContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },

  // HEADER & LANG SWITCHER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#1b253b'
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoBadge: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#8b5cf6', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  logoIcon: { fontSize: 18 },
  logoTitle: { color: '#ffffff', fontSize: 15, fontWeight: '900' },
  accentText: { color: '#06b6d4' },
  logoSubtitle: { color: '#06b6d4', fontSize: 8, fontWeight: '800' },

  langPillsContainer: { flexDirection: 'row', backgroundColor: '#0d1322', borderRadius: 12, padding: 3, borderWidth: 1, borderColor: '#1b253b' },
  langBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 7, paddingVertical: 4, borderRadius: 8 },
  activeLangBtn: { backgroundColor: '#8b5cf6' },
  flagIcon: { fontSize: 13, marginRight: 3 },
  langBtnText: { color: '#64748b', fontSize: 11, fontWeight: '800' },
  activeLangBtnText: { color: '#ffffff' },

  pointsPill: { backgroundColor: '#0d1322', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: '#f59e0b' },
  pointsText: { color: '#f59e0b', fontSize: 11, fontWeight: '900' },

  // WELCOME SCREEN
  welcomeLogo: { width: 80, height: 80, borderRadius: 24, backgroundColor: '#8b5cf6', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  mainTitle: { color: '#ffffff', fontSize: 32, fontWeight: '900', letterSpacing: 1 },
  subTitle: { color: '#06b6d4', fontSize: 12, fontWeight: '800', marginBottom: 16, textAlign: 'center' },
  welcomeLangRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  welcomeLangBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0d1322', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 12, borderWidth: 1, borderColor: '#1b253b', marginHorizontal: 4 },
  activeWelcomeLangBtn: { borderColor: '#06b6d4', backgroundColor: '#06b6d422' },
  welcomeLangTxt: { color: '#94a3b8', fontSize: 12, fontWeight: '700' },
  activeWelcomeLangTxt: { color: '#06b6d4' },

  card: { width: '100%', backgroundColor: '#0d1322', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#1b253b' },
  cardTitle: { color: '#94a3b8', fontSize: 13, textAlign: 'center', marginBottom: 16 },
  input: { width: '100%', backgroundColor: '#070913', color: '#ffffff', borderWidth: 1, borderColor: '#1b253b', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 14 },
  avatarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  avatarBox: { width: 38, height: 38, borderRadius: 10, backgroundColor: '#070913', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#1b253b' },
  activeAvatarBox: { borderColor: '#06b6d4', backgroundColor: '#06b6d422' },

  // BUTTONS
  primaryBtn: { width: '100%', backgroundColor: '#8b5cf6', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  primaryBtnText: { color: '#ffffff', fontWeight: '900', fontSize: 13, letterSpacing: 1 },

  // HERO DASHBOARD
  heroCard: { backgroundColor: '#0d1322', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#1b253b', marginBottom: 14 },
  heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  heroGreeting: { color: '#94a3b8', fontSize: 12 },
  heroName: { color: '#ffffff', fontSize: 20, fontWeight: '900' },
  heroLevel: { color: '#06b6d4', fontSize: 12, fontWeight: '700' },
  heroAvatarContainer: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#1b253b', justifyContent: 'center', alignItems: 'center' },

  progressBarWrapper: { marginBottom: 16 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  progressText: { color: '#64748b', fontSize: 11, fontWeight: '700' },
  progressPct: { color: '#8b5cf6', fontSize: 11, fontWeight: '800' },
  progressTrack: { height: 8, backgroundColor: '#070913', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#8b5cf6', borderRadius: 4 },

  dailyCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0d1322', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#f59e0b44', marginBottom: 16 },
  dailyBadge: { color: '#f59e0b', fontSize: 10, fontWeight: '900', letterSpacing: 1, marginBottom: 2 },
  dailyTitle: { color: '#ffffff', fontSize: 12, fontWeight: '700', paddingRight: 8 },
  claimBtn: { backgroundColor: '#f59e0b22', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#f59e0b' },
  claimBtnText: { color: '#f59e0b', fontWeight: '900', fontSize: 11 },

  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statBox: { flex: 1, backgroundColor: '#0d1322', borderRadius: 14, padding: 10, alignItems: 'center', marginHorizontal: 3, borderWidth: 1, borderColor: '#1b253b' },
  statNum: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
  statLbl: { color: '#64748b', fontSize: 10, fontWeight: '700', marginTop: 2 },

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { color: '#ffffff', fontSize: 16, fontWeight: '900', marginBottom: 10 },
  sectionSubtitle: { color: '#94a3b8', fontSize: 12 },
  sectionLink: { color: '#06b6d4', fontSize: 12, fontWeight: '700' },

  // CATEGORIES & CARDS
  catRowCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0d1322', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#1b253b' },
  catName: { color: '#ffffff', fontSize: 15, fontWeight: '800' },
  catDesc: { color: '#64748b', fontSize: 11, marginTop: 2 },
  playArrow: { color: '#06b6d4', fontSize: 16, fontWeight: '900' },

  screenHeader: { color: '#ffffff', fontSize: 22, fontWeight: '900', textAlign: 'center', marginVertical: 8 },
  screenSubheader: { color: '#94a3b8', fontSize: 12, textAlign: 'center', marginBottom: 14 },
  diffRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 14 },
  diffBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10, marginHorizontal: 4, borderWidth: 1, borderColor: '#1b253b' },
  activeDiffBtn: { backgroundColor: '#06b6d4', borderColor: '#06b6d4' },
  diffText: { color: '#64748b', fontSize: 11, fontWeight: '800' },
  activeDiffText: { color: '#070913' },

  // MODES SCREEN
  modeCard: { backgroundColor: '#0d1322', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#1b253b', marginBottom: 12 },
  modeTitle: { color: '#ffffff', fontSize: 16, fontWeight: '900' },
  modeDesc: { color: '#94a3b8', fontSize: 11, marginTop: 4 },
  searchingBanner: { backgroundColor: '#06b6d422', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#06b6d4', marginBottom: 14 },
  searchingTitle: { color: '#06b6d4', fontSize: 16, fontWeight: '900' },
  searchingSub: { color: '#ffffff', fontSize: 12, marginTop: 4 },

  // QUIZ GAMEPLAY
  quizContainer: { flex: 1, paddingVertical: 6 },
  quizHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  quitText: { color: '#64748b', fontSize: 12, fontWeight: '700' },
  quizCounter: { color: '#ffffff', fontSize: 13, fontWeight: '800' },
  quizScore: { color: '#f59e0b', fontSize: 13, fontWeight: '900' },

  pvpHeaderBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0d1322', borderRadius: 12, padding: 8, marginBottom: 8, borderWidth: 1, borderColor: '#1b253b' },
  pvpPlayerName: { color: '#06b6d4', fontSize: 12, fontWeight: '800' },
  pvpVsBadge: { color: '#f59e0b', fontSize: 11, fontWeight: '900' },
  pvpOpponentName: { color: '#f43f5e', fontSize: 12, fontWeight: '800' },

  timerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  timerBadge: { color: '#06b6d4', fontSize: 12, fontWeight: '900', borderWidth: 1, borderColor: '#06b6d4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  lifelineBtn: { backgroundColor: '#1e293b', paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8 },
  lifelineText: { color: '#8b5cf6', fontSize: 10, fontWeight: '800' },

  hintBox: { backgroundColor: '#f59e0b11', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#f59e0b44', marginBottom: 10 },
  hintText: { color: '#f59e0b', fontSize: 11, fontWeight: '700' },

  questionCard: { backgroundColor: '#0d1322', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#1b253b', marginBottom: 12 },
  questionText: { color: '#ffffff', fontSize: 17, fontWeight: '800', marginBottom: 16, lineHeight: 24 },
  optBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#070913', borderWidth: 1, borderColor: '#1b253b', borderRadius: 12, padding: 12, marginBottom: 8 },
  correctOpt: { borderColor: '#10b981', backgroundColor: '#064e3b44' },
  wrongOpt: { borderColor: '#f43f5e', backgroundColor: '#88133744' },
  optLetter: { color: '#64748b', fontWeight: '900', width: 24 },
  optText: { color: '#ffffff', fontSize: 13, fontWeight: '700', flex: 1 },

  // MULTIPLAYER & ROOM
  roomCodeLarge: { color: '#06b6d4', fontSize: 32, fontWeight: '900', letterSpacing: 2, marginVertical: 8 },
  lobbyPlayerBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0d1322', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#1b253b', marginVertical: 12 },

  // RESULTS
  resultsScore: { color: '#f59e0b', fontSize: 36, fontWeight: '900', marginVertical: 8 },
  resultsVersusBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0d1322', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: '#1b253b', marginVertical: 10 },

  // LEADERBOARD
  tabRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 14 },
  tabBtn: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 10, marginHorizontal: 4, borderWidth: 1, borderColor: '#1b253b' },
  activeTabBtn: { backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' },
  tabBtnText: { color: '#64748b', fontSize: 12, fontWeight: '800' },
  activeTabBtnText: { color: '#ffffff' },
  rankCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0d1322', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: '#1b253b', marginBottom: 8 },
  rankNum: { fontSize: 14, fontWeight: '900', width: 30, color: '#64748b' },
  rankName: { color: '#ffffff', fontSize: 14, fontWeight: '800' },
  rankPts: { color: '#f59e0b', fontSize: 13, fontWeight: '900' },

  // PROFILE & ACHIEVEMENTS
  badgeRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0d1322', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: '#1b253b', marginBottom: 8 },

  // SETTINGS & LANGUAGE CARDS
  langChoiceCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0d1322', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#1b253b', marginBottom: 8 },
  activeLangChoiceCard: { borderColor: '#06b6d4', backgroundColor: '#06b6d411' },
  langChoiceTitle: { color: '#ffffff', fontSize: 15, fontWeight: '800' },
  checkCircle: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#1b253b', textAlign: 'center', lineHeight: 22, color: '#06b6d4', fontWeight: '900' },
  activeCheckCircle: { borderColor: '#06b6d4', backgroundColor: '#06b6d422' },
  settingCard: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0d1322', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#1b253b' },
  settingVal: { color: '#06b6d4', fontWeight: '900', fontSize: 13 },

  // BOTTOM NAVIGATION
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#070913', borderTopWidth: 1, borderColor: '#1b253b', paddingVertical: 8 },
  navItem: { alignItems: 'center' },
  navIcon: { fontSize: 18, color: '#64748b' },
  activeNavIcon: { color: '#06b6d4' },
  navLabel: { fontSize: 10, color: '#64748b', fontWeight: '700', marginTop: 2 },
  activeNavLabel: { color: '#06b6d4' },

  // MODALS
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', backgroundColor: '#0d1322', borderRadius: 24, padding: 24, borderWidth: 1, borderColor: '#1b253b', alignItems: 'center' },
  modalEmoji: { fontSize: 48, marginBottom: 10 },
  modalTitle: { color: '#ffffff', fontSize: 20, fontWeight: '900', marginBottom: 6, textAlign: 'center' },
  modalSubtitle: { color: '#94a3b8', fontSize: 13, textAlign: 'center', marginBottom: 18 },
  levelNumberText: { color: '#f59e0b', fontSize: 28, fontWeight: '900', marginVertical: 10 }
});
