# ⚡ QUIZ ARENA

> **The Ultimate Competitive Knowledge Battleground**

Quiz Arena is a modern, high-intensity quiz gaming application with a dark-navy cyberpunk aesthetic, glowing neon elements, rich sound effects, real-time multiplayer duels, leveling and progression, achievement medals, and live leaderboards.

---

## 🛠️ STRICT TECHNOLOGY STACK

This application adheres to the strict requirement of utilizing only:
- **HTML**: Application structure, viewports, root container, and semantic elements.
- **Tailwind CSS**: Gaming interface styling, custom dark navy palettes, glowing interactive cards, gradients, and animations.
- **React Native**: Component primitives (`View`, `Text`, `TouchableOpacity`, `Pressable`, `ScrollView`, `TextInput`, `Modal`, `SafeAreaView`, `ActivityIndicator`) and state/lifecycle management.

*No additional external frameworks or complex compilers are required.*

---

## 🚀 HOW TO RUN & PLAY

You can run **Quiz Arena** in any of the following ways:

### Option 1: Direct Double-Click (Zero Setup!)
Simply double-click the `index.html` file in this directory, or right-click and choose **Open with Google Chrome / Microsoft Edge / Firefox**.

### Option 2: Using Node Web Server
Run with npm:
```bash
npm start
```
Then open `http://localhost:3000` in your browser.

---

## 🎮 CORE FEATURES

### 1. Modern Dark-Themed Interface
- Deep space navy background (`#070913`, `#0a0e1c`)
- Cyberpunk purple (`#8b5cf6`), blue (`#3b82f6`), and cyan (`#06b6d4`) glowing accents
- Custom animated pulses, hover lift cards, and responsive glassmorphism

### 2. User Profile & Progression
- Customizable warrior usernames and 6 avatars
- Career statistics tracking: Total points, battles played, correct answers, and accuracy percentage
- Level progression bar with dynamic XP requirements (200 XP per level tier)
- Title promotions from *Apprentice Scholar* to *Quiz Arena Legend*
- Celebratory Level-Up fanfare modal

### 3. All 8 Quiz Categories
Each category comes packed with rich questions spanning 3 difficulty tiers (Easy, Medium, Hard):
1. 💡 **General Knowledge**
2. 🔬 **Science**
3. 📐 **Mathematics**
4. 🏛️ **History**
5. 🌍 **Geography**
6. 💻 **Technology**
7. ⚽ **Sports**
8. 📚 **English**

### 4. 5 Engaging Game Modes
1. **Single Player:** Climb the knowledge ladder at your own pace across any category and difficulty.
2. **Multiplayer 1v1:** Generate unique 6-character room codes (e.g. `ARENA-8842`), host or join rooms, and duel friends synchronously.
3. **Quick Match:** Rapid automated matchmaking pairing you with an active arena contender in seconds.
4. **Practice Mode:** Untimed relaxed gameplay with instant question explanations.
5. **Daily Challenge:** 5-question multi-disciplinary test awarding a 2X Double XP bonus and streak boost.

### 5. Multiplayer Synchronous System
- Private room creation with customizable category and difficulty
- One-click copyable room code
- Connected player cards with readiness indicators
- Live simultaneous questions with simulated opponent response latency and score tracking
- Final victory / defeat celebration banner

### 6. Leaderboard & Rankings
- **All-Time Global Leaderboard**
- **Weekly Leaderboard**
- **Monthly Leaderboard**
- Top 3 champions podium (🥇 Gold, 🥈 Silver, 🥉 Bronze) with pedestal heights and rank badges
- Highlighted user standing banner

### 7. Rewards & Achievements
- **7-Day Daily Login Calendar:** Escalating gold coins and bonus XP rewards
- **8 Achievement Badges:**
  - ⚔️ *First Blood* (First quiz played)
  - ✨ *Flawless Mind* (100% perfect quiz)
  - ⚡ *Speed Demon* (Rapid-fire answers)
  - 👑 *Trivia Titan* (1,500+ points)
  - 🌌 *The Polymath* (3+ categories explored)
  - 🏆 *Arena Gladiator* (Multiplayer match victory)
  - 🔥 *Daily Devotee* (Daily challenge completed)
  - 🎯 *Century Marksman* (25 correct answers)

### 8. Synthesized Web Audio FX
Zero external sound files required! The application generates retro gaming chimes, countdown ticks, buzzer alerts, and victory fanfares natively using the browser's **Web Audio API** (toggleable anytime in Header or Settings).

---

## 📱 THE 11 SCREENS

1. **Welcome / Login Screen** (`WelcomeView`)
2. **Home Dashboard** (`HomeView`)
3. **Quiz Categories** (`CategoriesView`)
4. **Game Mode Selection** (`GameModesView`)
5. **Quiz Gameplay Screen** (`QuizGameplayView`)
6. **Multiplayer Lobby** (`MultiplayerLobbyView`)
7. **Room Creation Screen** (`RoomCreationView`)
8. **Leaderboard** (`LeaderboardView`)
9. **User Profile** (`ProfileView`)
10. **Results Screen** (`ResultsView`)
11. **Settings Screen** (`SettingsView`)

---

## 📂 DIRECTORY STRUCTURE

```
quiz-arena/
├── index.html                   # Single-entry runnable game application
├── package.json                 # Project configuration & start scripts
├── README.md                    # Project documentation
└── src/
    ├── App.js                   # Root application state & navigation router
    ├── components/
    │   ├── ReactNativePrimitives.js  # View, Text, TouchableOpacity, ScrollView, etc.
    │   ├── Header.js            # Top HUD header
    │   ├── Navbar.js            # Bottom dock navigation
    │   ├── DailyRewardModal.js  # 7-day daily bonus reward modal
    │   └── LevelUpModal.js      # Level-up celebration modal
    ├── screens/
    │   ├── WelcomeScreen.js
    │   ├── HomeScreen.js
    │   ├── CategoriesScreen.js
    │   ├── GameModeScreen.js
    │   ├── QuizGameplayScreen.js
    │   ├── MultiplayerLobbyScreen.js
    │   ├── RoomCreationScreen.js
    │   ├── LeaderboardScreen.js
    │   ├── ProfileScreen.js
    │   ├── ResultsScreen.js
    │   └── SettingsScreen.js
    ├── data/
    │   ├── questions.js         # Comprehensive question bank for all 8 categories
    │   ├── achievements.js      # Medals & level progression titles
    │   └── leaderboardData.js   # Global, weekly, and monthly standings
    └── utils/
        └── audio.js             # Synthesized sound effects engine
```

