
import React, { useState } from 'react';
import { Zap, Play, CheckCircle2, AlertTriangle, Clock, DollarSign, BrainCircuit, BarChart2 } from 'lucide-react';

interface TestResult {
  model: string;
  response: string;
  latency: number;
  cost: number;
  hallucination: number;
}

const ModelSandbox: React.FC = () => {
  const [prompt, setPrompt] = useState('Explain quantum entanglement like I am 5.');
  const [isTesting, setIsTesting] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const runTest = () => {
    setIsTesting(true);
    setResults([]);
    
    // Simulate API delay
    setTimeout(() => {
      setResults([
        {
          model: 'GPT-4o',
          response: 'Imagine two magic socks. If you put one on your left foot here, the other one automatically becomes a right sock, even if it is on the moon!',
          latency: 420,
          cost: 0.012,
          hallucination: 0.2
        },
        {
          model: 'Claude 3.5 Sonnet',
          response: 'It is like two friends sharing a secret walkie-talkie. Whatever one friend says, the other friend knows instantly, no matter how far apart they are.',
          latency: 850,
          cost: 0.008,
          hallucination: 0.1
        }
      ]);
      setIsTesting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Input Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <BrainCircuit className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">A/B Testing Workbench</h3>
        </div>
        
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter test prompt..."
          className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none mb-4"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            {['GPT-4o', 'Claude 3.5', 'Llama 3'].map(m => (
              <span key={m} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase border border-slate-200">
                {m}
              </span>
            ))}
          </div>
          <button 
            onClick={runTest}
            disabled={isTesting || !prompt.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50 active:scale-95 shadow-lg"
          >
            {isTesting ? (
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200"></span>
              </div>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Execute Parallel Experiment
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {results.map((res) => (
              <div key={res.model} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900">{res.model}</h4>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <CheckCircle2 className="w-3 h-3" /> SUCCESS
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 italic bg-slate-50 p-4 rounded-xl border border-slate-100">
                  "{res.response}"
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl text-center">
                    <Clock className="w-3 h-3 mx-auto mb-1 text-slate-400" />
                    <div className="text-xs font-bold text-slate-900">{res.latency}ms</div>
                    <div className="text-[8px] text-slate-400 uppercase font-bold">Latency</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl text-center">
                    <DollarSign className="w-3 h-3 mx-auto mb-1 text-slate-400" />
                    <div className="text-xs font-bold text-slate-900">${res.cost}</div>
                    <div className="text-[8px] text-slate-400 uppercase font-bold">Cost</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl text-center">
                    <AlertTriangle className={`w-3 h-3 mx-auto mb-1 ${res.hallucination > 0.15 ? 'text-amber-500' : 'text-slate-400'}`} />
                    <div className="text-xs font-bold text-slate-900">{res.hallucination}%</div>
                    <div className="text-[8px] text-slate-400 uppercase font-bold">Halluc.</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Simulated Comparison Chart */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl">
            <div className="flex items-center gap-2 mb-8">
              <BarChart2 className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Metric Comparison Matrix</h3>
            </div>
            
            <div className="space-y-6">
              {['Latency (Lower is better)', 'Hallucination (Lower is better)'].map((metric, i) => (
                <div key={metric}>
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-3">{metric}</div>
                  <div className="space-y-2">
                    {results.map((res, j) => {
                      const val = i === 0 ? res.latency : res.hallucination * 100;
                      const max = i === 0 ? 1000 : 1;
                      const width = i === 0 ? (val / 1000) * 100 : val * 5;
                      return (
                        <div key={res.model} className="flex items-center gap-4">
                          <span className="text-[10px] font-medium text-slate-400 w-20">{res.model}</span>
                          <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${j === 0 ? 'bg-indigo-500' : 'bg-purple-500'}`}
                              style={{ width: `${width}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-mono text-white w-12 text-right">{val}{i === 0 ? 'ms' : '%'}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSandbox;
