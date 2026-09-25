
import React from 'react';
import { Volume2, Check, Music } from 'lucide-react';
import { SoundId } from '../types';
import { SOUND_PRESETS, playTone } from '../utils/soundEngine';

interface SettingsViewProps {
  currentSound: SoundId;
  onSoundChange: (id: SoundId) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ currentSound, onSoundChange }) => {
  
  const handleSelect = (id: SoundId) => {
    onSoundChange(id);
    playTone(id); // Preview sound
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto space-y-6 pt-4">
      
      {/* Title */}
      <div className="flex items-center gap-3 px-4">
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
            <Volume2 size={20} className="text-white/80" />
        </div>
        <div>
            <h2 className="text-xl font-bold text-white tracking-wide">Soundscape</h2>
            <p className="text-xs text-white/40 uppercase tracking-wider font-medium">Notification Tone</p>
        </div>
      </div>

      {/* Sound List */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-4 pb-4 space-y-3">
        {SOUND_PRESETS.map((sound) => {
          const isSelected = currentSound === sound.id;
          return (
            <button
              key={sound.id}
              onClick={() => handleSelect(sound.id)}
              className={`w-full group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                isSelected
                  ? 'bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-purple-500/20 text-purple-300' : 'bg-black/20 text-white/30'
                }`}>
                    <Music size={18} />
                </div>
                <div className="text-left">
                  <h3 className={`font-semibold transition-colors ${isSelected ? 'text-white' : 'text-white/70'}`}>
                    {sound.name}
                  </h3>
                  <p className="text-xs text-white/30">{sound.description}</p>
                </div>
              </div>

              <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'bg-green-500 border-green-500 scale-100 opacity-100' 
                    : 'border-white/10 scale-90 opacity-0 group-hover:border-white/30'
              }`}>
                  {isSelected && <Check size={14} className="text-black stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsView;
