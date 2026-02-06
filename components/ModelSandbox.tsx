
import React, { useState } from 'react';
import { Zap, Play, CheckCircle2, AlertTriangle, Clock, DollarSign, BrainCircuit, BarChart2, MessageSquareText, Layers, Trash2 } from 'lucide-react';
import { usePersistentState } from '../hooks/usePersistentState';

interface TestResult {
  model: string;
  response: string;
  latency: number;
  cost: number;
  hallucination: number;
  tokens: number;
}

const ModelSandbox: React.FC = () => {
  const [prompt, setPrompt] = useState('Compare the industrial revolution with the rise of AI in 3 points.');
  const [isTesting, setIsTesting] = useState(false);
  
  // Persist test results
  const [results, setResults] = usePersistentState<TestResult[]>('dashlib-model-results', []);

  const runTest = () => {
    setIsTesting(true);
    // Note: In a real implementation, we might want to append to history rather than replace, 
    // but for this specific "Experiment Workbench" UI, replacing the current view is often desired 
    // to declutter. However, to show value of persistence, let's allow appending or just persist the last run.
    // For now, we follow the existing behavior (replace) but it persists across reloads.
    
    // Simulating advanced parallel model inference
    setTimeout(() => {
      setResults([
        {
          model: 'GPT-4o',
          response: '1. Scale: Physical steam power vs mental compute. 2. Workforce: Factory labor vs knowledge work. 3. Pacing: Decades of rollout vs months of deployment.',
          latency: 420,
          cost: 0.0042,
          hallucination: 0.2,
          tokens: 145
        },
        {
          model: 'Claude 3.5 Sonnet',
          response: '1. Resource shift: From coal/steel to GPUs/data. 2. Urbanization: Shift to cities vs shift to decentralized networks. 3. Safety: Mechanical safeguards vs alignment research.',
          latency: 890,
          cost: 0.0084,
          hallucination: 0.1,
          tokens: 182
        },
        {
          model: 'Llama 3 (70B)',
          response: '1. Standardization: Assembly lines vs standardized APIs. 2. Economics: Capital-intensive production vs marginal-cost distribution. 3. Impact: Physical mobility vs cognitive augmentation.',
          latency: 1250,
          cost: 0.0002,
          hallucination: 0.5,
          tokens: 210
        }
      ]);
      setIsTesting(false);
    }, 2000);
  };

  const clearHistory = () => {
    if (confirm('Clear all test results?')) {
      setResults([]);
    }
  };

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12" role="region" aria-label="A/B Testing Workbench">
      {/* Configuration Hub */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Experiment Workbench</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Simultaneous Model Benchmarking</p>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            {['GPT-4o', 'Claude 3.5', 'Llama 3'].map(m => (
              <div key={m} className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[9px] font-black text-indigo-600 uppercase tracking-widest">
                {m}
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative mb-6">
          <div className="absolute top-4 left-4 text-slate-300 pointer-events-none">
            <MessageSquareText className="w-5 h-5" />
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Construct your system prompt or complex query..."
            className="w-full h-32 pl-12 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none shadow-inner text-slate-700 leading-relaxed placeholder:text-slate-300"
            aria-label="Test prompt input"
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Temperature</span>
               <div className="flex items-center gap-3">
                 <input type="range" className="w-32 accent-indigo-600" />
                 <span className="text-xs font-black text-slate-900">0.7</span>
               </div>
             </div>
             <div className="h-10 w-px bg-slate-100 hidden md:block"></div>
             <div className="flex items-center gap-3">
               <Layers className="w-4 h-4 text-slate-400" />
               <span className="text-xs font-bold text-slate-500">Cross-Inference: <span className="text-indigo-600 font-black">ACTIVE</span></span>
             </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {results.length > 0 && (
              <button
                onClick={clearHistory}
                className="px-4 py-4 bg-white border border-slate-200 text-slate-500 rounded-[1.5rem] hover:bg-slate-50 hover:text-red-500 hover:border-red-200 transition-all shadow-sm group"
                title="Clear Results"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={runTest}
              disabled={isTesting || !prompt.trim()}
              className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] font-bold hover:bg-indigo-600 transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-slate-200 group"
            >
              {isTesting ? (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 animate-spin" />
                  <span>Processing Stream...</span>
                </div>
              ) : (
                <>
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" />
                  Parallel Run
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Observation Grid */}
      {results.length > 0 && (
        <div className="space-y-8 animate-in fade-in duration-1000">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {results.map((res) => (
              <div key={res.model} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl hover:shadow-2xl hover:border-indigo-200 transition-all flex flex-col group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-900 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {res.model[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 tracking-tight">{res.model}</h4>
                      <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                        <CheckCircle2 className="w-3 h-3" /> Integrity Pass
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 relative group/card">
                  <div className="absolute top-3 right-4 text-[9px] font-black text-slate-300 uppercase tracking-widest group-hover/card:text-indigo-400 transition-colors">Raw Output</div>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    "{res.response}"
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center shadow-sm">
                    <Clock className="w-3.5 h-3.5 mx-auto mb-2 text-indigo-400" />
                    <div className="text-sm font-black text-slate-900">{res.latency}ms</div>
                    <div className="text-[8px] text-slate-400 uppercase font-black tracking-tighter">p95 Latency</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center shadow-sm">
                    <DollarSign className="w-3.5 h-3.5 mx-auto mb-2 text-emerald-400" />
                    <div className="text-sm font-black text-slate-900">${res.cost.toFixed(4)}</div>
                    <div className="text-[8px] text-slate-400 uppercase font-black tracking-tighter">Est. Cost</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center shadow-sm">
                    <Zap className="w-3.5 h-3.5 mx-auto mb-2 text-amber-400" />
                    <div className="text-sm font-black text-slate-900">{res.tokens}</div>
                    <div className="text-[8px] text-slate-400 uppercase font-black tracking-tighter">Tokens</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Metric Comparison Matrix */}
          <div className="bg-slate-900 rounded-[3rem] p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 -rotate-12 pointer-events-none">
              <BarChart2 className="w-64 h-64 text-white" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Analytics Matrix</h3>
                  <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">Normalized Performance Scoring</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-indigo-500"></div>
                    <span className="text-xs font-bold text-slate-400">GPT-4o</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-purple-500"></div>
                    <span className="text-xs font-bold text-slate-400">Claude</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-emerald-500"></div>
                    <span className="text-xs font-bold text-slate-400">Llama</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { label: 'Latency (Lower is better)', field: 'latency', max: 2000, suffix: 'ms' },
                  { label: 'Hallucination Potential', field: 'hallucination', max: 1, suffix: '%', multiplier: 100 },
                  { label: 'Token Efficiency (Lower is better)', field: 'tokens', max: 500, suffix: ' tkn' },
                  { label: 'Cost-Performance Ratio', field: 'cost', max: 0.01, suffix: '$', multiplier: 1 }
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{metric.label}</span>
                    </div>
                    <div className="space-y-4">
                      {results.map((res, idx) => {
                        const val = (res as any)[metric.field] * (metric.multiplier || 1);
                        const pct = Math.min((val / metric.max) * 100, 100);
                        const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-emerald-500'];
                        return (
                          <div key={res.model} className="flex items-center gap-4 group">
                            <span className="text-[10px] font-black text-slate-400 w-24 truncate">{res.model}</span>
                            <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${colors[idx]}`}
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-white w-16 text-right">{val.toFixed(metric.field === 'cost' ? 4 : 0)}{metric.suffix}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSandbox;
