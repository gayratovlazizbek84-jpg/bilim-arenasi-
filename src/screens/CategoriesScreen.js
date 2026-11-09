import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from '../components/ReactNativePrimitives';
import { CATEGORIES } from '../data/questions';
import { sound } from '../utils/audio';

export const CategoriesScreen = ({ onStartQuiz, onBack }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [searchQuery, setSearchQuery] = useState('');

  const difficulties = [
    { id: 'easy', label: 'Easy', multiplier: '1.0x PTS', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' },
    { id: 'medium', label: 'Medium', multiplier: '1.5x PTS', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30' },
    { id: 'hard', label: 'Hard', multiplier: '2.0x PTS', color: 'text-rose-400 border-rose-500/40 bg-rose-950/30' }
  ];

  const filteredCategories = CATEGORIES.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24 pt-4 px-4 sm:px-6 max-w-7xl mx-auto w-full animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-black text-white tracking-wide">
            Quiz Categories
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Select your domain and difficulty to start testing your knowledge
          </p>
        </div>

        {/* Difficulty Selector Bar */}
        <div className="flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase px-2">
            Tier:
          </span>
          {difficulties.map(d => {
            const isSelected = selectedDifficulty === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedDifficulty(d.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  isSelected
                    ? `${d.color} shadow-md`
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="🔍 Search category by topic or keyword..."
          className="w-full text-sm font-medium"
        />
      </div>

      {/* Categories Grid (All 8 Categories) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="group relative flex flex-col justify-between p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-cyan-950/30 overflow-hidden"
          >
            {/* Ambient background glow on hover */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

            <div>
              {/* Category Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-3xl shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform`}>
                  {category.icon}
                </div>
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800/80 text-cyan-300 border border-slate-700">
                  {selectedDifficulty.toUpperCase()}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                {category.name}
              </h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                {category.description}
              </p>
            </div>

            {/* Footer and Launch CTA */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                5 Questions Round
              </span>

              <TouchableOpacity
                onPress={() => {
                  sound.playClick();
                  onStartQuiz({
                    mode: 'single',
                    category: category.id,
                    difficulty: selectedDifficulty,
                    title: category.name
                  });
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white text-xs font-black uppercase tracking-wider hover:opacity-95 shadow-md shadow-purple-600/30 active:scale-95 transition-all flex items-center space-x-1.5"
              >
                <span>Play</span>
                <span>➔</span>
              </TouchableOpacity>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <div className="text-4xl mb-2">🔍</div>
          <h3 className="text-lg font-bold text-white">No categories found</h3>
          <p className="text-sm text-slate-400 mt-1">Try another keyword.</p>
        </div>
      )}
    </div>
  );
};

