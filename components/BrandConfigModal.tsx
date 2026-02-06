
import React, { useState } from 'react';
import { X, Palette, LayoutTemplate, Maximize, Check, Wand2, Loader2 } from 'lucide-react';
import { BrandConfig } from '../types';
import { generateBrandConfig } from '../services/geminiService';

interface BrandConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BrandConfig;
  setConfig: (config: BrandConfig) => void;
}

const COLORS: { id: BrandConfig['primaryColor']; label: string; class: string }[] = [
  { id: 'indigo', label: 'Indigo Future', class: 'bg-indigo-600' },
  { id: 'emerald', label: 'Emerald Eco', class: 'bg-emerald-600' },
  { id: 'blue', label: 'Blue Corporate', class: 'bg-blue-600' },
  { id: 'violet', label: 'Violet Creative', class: 'bg-violet-600' },
  { id: 'slate', label: 'Slate Minimal', class: 'bg-slate-600' },
];

const RADIUS_OPTS: { id: BrandConfig['borderRadius']; label: string }[] = [
  { id: 'rounded-none', label: 'Sharp (0px)' },
  { id: 'rounded-lg', label: 'Soft (8px)' },
  { id: 'rounded-2xl', label: 'Modern (16px)' },
  { id: 'rounded-3xl', label: 'Playful (24px)' },
];

const BrandConfigModal: React.FC<BrandConfigModalProps> = ({ isOpen, onClose, config, setConfig }) => {
  const [brandDesc, setBrandDesc] = useState('');
  const [isAutoTuning, setIsAutoTuning] = useState(false);

  if (!isOpen) return null;

  const handleAutoTune = async () => {
    if (!brandDesc.trim()) return;
    setIsAutoTuning(true);
    try {
      const newConfig = await generateBrandConfig(brandDesc);
      setConfig(newConfig);
    } finally {
      setIsAutoTuning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-xl">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Brand Engine</h2>
              <p className="text-xs text-slate-500 font-medium">Configure global DNA for generated code.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* AI Auto-Tune Section */}
          <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 space-y-3">
             <div className="flex items-center gap-2">
                 <Wand2 className="w-4 h-4 text-indigo-600" />
                 <label className="text-xs font-black text-indigo-900 uppercase tracking-widest">AI Auto-Tune</label>
             </div>
             <div className="flex gap-2">
                 <input 
                    type="text" 
                    placeholder="e.g., 'Modern fintech startup, minimal, green accents'"
                    className="flex-1 px-4 py-2 bg-white border border-indigo-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={brandDesc}
                    onChange={(e) => setBrandDesc(e.target.value)}
                 />
                 <button 
                    onClick={handleAutoTune}
                    disabled={isAutoTuning || !brandDesc.trim()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                 >
                    {isAutoTuning ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Detect'}
                 </button>
             </div>
          </div>

          {/* Primary Color */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Primary Color Token</label>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setConfig({ ...config, primaryColor: c.id })}
                  className={`w-10 h-10 rounded-full ${c.class} flex items-center justify-center transition-all hover:scale-110 ${config.primaryColor === c.id ? 'ring-4 ring-offset-2 ring-slate-200 scale-110' : 'opacity-80 hover:opacity-100'}`}
                  title={c.label}
                >
                  {config.primaryColor === c.id && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Border Radius */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Maximize className="w-4 h-4" /> Component Geometry
            </label>
            <div className="grid grid-cols-2 gap-3">
              {RADIUS_OPTS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setConfig({ ...config, borderRadius: opt.id })}
                  className={`px-4 py-3 text-sm font-bold border rounded-xl transition-all ${
                    config.borderRadius === opt.id 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Density */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4" /> Layout Density
            </label>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {(['compact', 'comfortable'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setConfig({ ...config, density: d })}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition-all ${
                    config.density === d 
                      ? 'bg-white text-slate-900 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandConfigModal;
