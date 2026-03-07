import React, { useState } from 'react';
import { Play, CheckCircle2, Clock, DollarSign, BrainCircuit, BarChart2, MessageSquareText, Check, Loader2, Zap, Trophy } from 'lucide-react';
import { usePersistentState } from '../hooks/usePersistentState';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

interface TestResult {
  model: string;
  response: string;
  latency: number;
  cost: number;
  tokens: number;
  quality: number; // 1-10 scale
}

interface ModelSandboxProps {
  onTriggerAlert?: (templateId: string, message: string, severity: 'critical' | 'warning' | 'info') => void;
  templateId?: string;
}

const MODELS = [
  { id: 'GPT-4o', color: '#4f46e5' },
  { id: 'Claude 3.5 Sonnet', color: '#f59e0b' },
  { id: 'Llama 3 (70B)', color: '#10b981' },
  { id: 'Gemini 3 Pro', color: '#06b6d4' }
];

const MOCK_DATA: Record<string, TestResult> = {
  'GPT-4o': { model: 'GPT-4o', response: 'The industrial revolution replaced physical labor with machines, while the AI rise replaces cognitive labor with neural networks.', latency: 420, cost: 0.003, tokens: 142, quality: 9.5 },
  'Claude 3.5 Sonnet': { model: 'Claude 3.5 Sonnet', response: 'AI is similar to the steam engine but for the mind; it scales intelligence where steam scaled power.', latency: 890, cost: 0.008, tokens: 185, quality: 9.8 },
  'Llama 3 (70B)': { model: 'Llama 3 (70B)', response: 'Both represent massive shifts in economic production functions by automating human effort.', latency: 120, cost: 0.0001, tokens: 98, quality: 8.2 },
  'Gemini 3 Pro': { model: 'Gemini 3 Pro', response: 'Industrial: Mechanization. AI: Digitization and Autonomy of Reasoning.', latency: 310, cost: 0.002, tokens: 121, quality: 9.2 }
};

type MetricType = 'latency' | 'cost' | 'tokens' | 'quality';

const ModelSandbox: React.FC<ModelSandboxProps> = ({ onTriggerAlert, templateId }) => {
  const [prompt, setPrompt] = useState('Compare the industrial revolution with the rise of AI.');
  const [selectedModels, setSelectedModels] = useState<string[]>(['GPT-4o', 'Claude 3.5 Sonnet']);
  const [isTesting, setIsTesting] = useState(false);
  const [results, setResults] = usePersistentState<TestResult[]>('dashlib-ab-results', []);
  const [activeMetric, setActiveMetric] = useState<MetricType>('latency');

  const runTest = () => {
    setIsTesting(true);
    // Simulate simultaneous model run
    setTimeout(() => {
      const newResults = selectedModels.map(id => ({
        ...MOCK_DATA[id],
        // Add random jitter to metrics for realism
        latency: Math.floor(MOCK_DATA[id].latency * (0.8 + Math.random() * 0.4)),
        tokens: Math.floor(MOCK_DATA[id].tokens * (0.9 + Math.random() * 0.2)),
        quality: Number((MOCK_DATA[id].quality * (0.95 + Math.random() * 0.1)).toFixed(1))
      }));
      setResults(newResults);
      setIsTesting(false);
      
      // Check for performance drift (simulated rule: quality < 8.5)
      const degraded = newResults.find(r => r.quality < 8.5);
      if (degraded && onTriggerAlert) {
         onTriggerAlert(
             templateId || 'llm-performance', 
             `Model Drift Detected: ${degraded.model} quality score fell below baseline (8.5).`, 
             'warning'
         );
      }
    }, 1500);
  };

  const toggleModel = (id: string) => {
    if (selectedModels.includes(id)) {
      setSelectedModels(selectedModels.filter(m => m !== id));
    } else {
      setSelectedModels([...selectedModels, id]);
    }
  };

  const metricConfig = {
    latency: { label: 'Latency (ms)', icon: Clock, color: '#f59e0b' },
    cost: { label: 'Cost ($)', icon: DollarSign, color: '#10b981' },
    tokens: { label: 'Token Usage', icon: Zap, color: '#6366f1' },
    quality: { label: 'Quality Score (1-10)', icon: Trophy, color: '#ec4899' }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-12">
      {/* Control Hub */}
      <div className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-indigo-600 rounded-2xl">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">A/B Testing Workbench</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Simultaneous Cross-Model Benchmarking</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-4 block">Select Comparison Cohort</label>
            <div className="flex flex-wrap gap-3">
              {MODELS.map(m => (
                <button
                  key={m.id}
                  onClick={() => toggleModel(m.id)}
                  className={`px-6 py-3 rounded-2xl border-2 font-black text-xs uppercase tracking-widest transition-all ${selectedModels.includes(m.id) ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
                >
                  {selectedModels.includes(m.id) && <Check className="w-3 h-3 inline mr-2" />}
                  {m.id}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="absolute top-4 left-4 text-slate-300 pointer-events-none">
                <MessageSquareText className="w-5 h-5" />
             </div>
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               className="w-full h-32 pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-[2rem] text-sm font-bold focus:ring-4 focus:ring-indigo-100 outline-none transition-all resize-none shadow-inner leading-relaxed"
               placeholder="Enter your system prompt to test across models..."
             />
          </div>

          <button 
            onClick={runTest}
            disabled={isTesting || selectedModels.length === 0}
            className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-indigo-600 disabled:opacity-50 transition-all active:scale-95 shadow-2xl shadow-indigo-100"
          >
            {isTesting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                Run Parallel Model Test
              </>
            )}
          </button>
        </div>
      </div>

      {/* Side-by-Side Results */}
      {results.length > 0 && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {results.map((res) => (
              <div key={res.model} className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-xl flex flex-col group hover:border-indigo-300 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-900">
                      {res.model[0]}
                    </div>
                    <h4 className="font-black text-slate-900 tracking-tight">{res.model}</h4>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black border border-emerald-100 uppercase tracking-widest">
                    <CheckCircle2 className="w-3 h-3" /> Integrity Pass
                  </div>
                </div>

                <div className="flex-1 bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8 max-h-40 overflow-y-auto">
                  <p className="text-sm text-slate-600 font-medium leading-relaxed italic">"{res.response}"</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                   <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                      <Clock className="w-4 h-4 mx-auto mb-2 text-indigo-400" />
                      <div className="text-xs font-black text-slate-900">{res.latency}ms</div>
                      <div className="text-[9px] text-slate-400 uppercase font-black">Latency</div>
                   </div>
                   <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                      <DollarSign className="w-4 h-4 mx-auto mb-2 text-emerald-400" />
                      <div className="text-xs font-black text-slate-900">${res.cost.toFixed(4)}</div>
                      <div className="text-[9px] text-slate-400 uppercase font-black">Cost</div>
                   </div>
                   <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center">
                      <Zap className="w-4 h-4 mx-auto mb-2 text-amber-400" />
                      <div className="text-xs font-black text-slate-900">{res.tokens}</div>
                      <div className="text-[9px] text-slate-400 uppercase font-black">Tokens</div>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Metric Comparison Visualization */}
          <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
              <div className="flex items-center gap-3">
                <BarChart2 className="w-6 h-6 text-indigo-400" />
                <div>
                  <h4 className="text-xl font-black text-white tracking-tight uppercase">Performance Matrix</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Comparative Analysis</p>
                </div>
              </div>
              
              <div className="flex bg-slate-800 p-1 rounded-xl overflow-x-auto">
                {(Object.keys(metricConfig) as MetricType[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveMetric(key)}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeMetric === key 
                        ? 'bg-slate-700 text-white shadow-md' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {metricConfig[key].label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis 
                    dataKey="model" 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    fontWeight={700}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => activeMetric === 'cost' ? `$${val}` : val}
                  />
                  <Tooltip 
                    cursor={{ fill: '#1e293b', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }} 
                    itemStyle={{ color: '#fff', fontWeight: 600 }}
                    formatter={(val: number) => [activeMetric === 'cost' ? `$${val}` : val, metricConfig[activeMetric].label]}
                  />
                  <Bar 
                    dataKey={activeMetric} 
                    name={metricConfig[activeMetric].label} 
                    radius={[8, 8, 0, 0]}
                    animationDuration={1000}
                  >
                    {results.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={MODELS.find(m => m.id === entry.model)?.color || '#4f46e5'} />
                    ))}
                    <LabelList dataKey={activeMetric} position="top" fill="#94a3b8" fontSize={10} fontWeight={700} formatter={(val: number) => activeMetric === 'cost' ? `$${val}` : val} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelSandbox;