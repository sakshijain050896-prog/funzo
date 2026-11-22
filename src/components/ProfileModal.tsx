import React, { useState } from 'react';
import { X, Check, UserCheck } from 'lucide-react';
import { PlayerStats, CARTOON_AVATARS } from '../types';
import { updateProfile } from '../lib/storage';
import { sound } from '../lib/soundEffects';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  onUpdateStats: (newStats: PlayerStats) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  stats,
  onUpdateStats,
}) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(stats.avatarId || 'fox');
  const [username, setUsername] = useState<string>(stats.username || 'LuckyGamer');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentAvatar = CARTOON_AVATARS.find((a) => a.id === selectedAvatarId) || CARTOON_AVATARS[0];
  const nextLevelXP = stats.level * 100;
  const currentXPInLevel = stats.xp % 100;

  const handleSave = () => {
    sound.playVictory();
    const updated = updateProfile(username, selectedAvatarId);
    onUpdateStats(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700/80 p-6 shadow-2xl text-center my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Current Caricature Display */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-1 flex items-center justify-center shadow-xl shadow-indigo-500/20 mb-3">
          <span className="text-4xl">{currentAvatar.emoji}</span>
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
            Lvl {stats.level}
          </span>
        </div>

        <h3 className="text-lg font-black text-white">{username || 'Player'}</h3>
        <span className="text-xs text-indigo-400 font-semibold">{currentAvatar.name}</span>

        {/* Level XP Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-2 my-4 overflow-hidden border border-slate-700">
          <div
            className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full transition-all duration-300"
            style={{ width: `${(currentXPInLevel / 100) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-5">
          <span>{stats.xp} Total XP</span>
          <span>Next Lvl: {nextLevelXP} XP</span>
        </div>

        {/* Nickname Input */}
        <div className="text-left mb-4">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Player Nickname
          </label>
          <input
            type="text"
            maxLength={18}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-sm focus:border-indigo-500 focus:outline-none transition"
            placeholder="Enter nickname..."
          />
        </div>

        {/* Avatar Caricature Grid */}
        <div className="text-left mb-6">
          <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Choose Cartoon Caricature
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CARTOON_AVATARS.map((av) => {
              const isSelected = av.id === selectedAvatarId;
              return (
                <button
                  key={av.id}
                  onClick={() => {
                    sound.playTap();
                    setSelectedAvatarId(av.id);
                  }}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition active:scale-95 border ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-500 shadow-md ring-2 ring-indigo-400'
                      : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <span className="text-2xl mb-1">{av.emoji}</span>
                  <span className="text-[10px] font-semibold text-slate-300 truncate w-full">
                    {av.name.split(' ')[1] || av.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Profile Button */}
        <button
          onClick={handleSave}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition flex items-center justify-center gap-1.5"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4" />
              <span>Profile Saved!</span>
            </>
          ) : (
            <>
              <UserCheck className="w-4 h-4" />
              <span>Save &amp; Play Free</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
