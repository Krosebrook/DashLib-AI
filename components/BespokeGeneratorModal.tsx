
import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Code, Loader2, Copy, Wand2, Terminal, Lightbulb, Check, ChevronRight } from 'lucide-react';
import { generateCustomDashboardStream } from '../services/geminiService';

interface BespokeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INSPIRATION_PROMPTS = [
  "Supply Chain Logistics & Global Delay Tracker",
  "SaaS Growth Engine: Churn vs Acquisition Strategy",
  "Financial Risk Portfolio with Real-time Stress Tests",
  "Cybersecurity Threat Map & SOC Vulnerability Feed",
];

const BespokeGeneratorModal: React.FC<BespokeGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const codeRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (codeRef.current && isGenerating) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
    }
  }, [generatedCode, isGenerating]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedCode('');
    setError('');
    
    try {
      await generateCustomDashboardStream(prompt, (text) => {
        setGeneratedCode(text);
      });
    } catch (err) {
      setError('Connection disrupted. Please check your API key and network.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 animate-pulse">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Magic Generator
                <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100 uppercase tracking-widest font-black">AI Powered</span>
              </h2>
              <p className="text-sm text-slate-500 font-medium">Describe your enterprise vision. Gemini 3 Pro will engineer the React code.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Input Side */}
          <div className="w-1/3 border-r border-slate-100 p-8 flex flex-col bg-slate-50/50">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-slate-400" />
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Architect Prompt</label>
            </div>
            
            <textarea
              className="flex-1 w-full p-5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all resize-none text-slate-700 font-medium leading-relaxed placeholder:text-slate-300"
              placeholder="e.g., 'A supply chain monitoring dashboard with real-time tracking of logistics, cost efficiency per route, and automated delay alerts...'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inspiration chips</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {INSPIRATION_PROMPTS.map(p => (
                  <button
                    key={p}
                    onClick={() => setPrompt(p)}
                    className="text-[10px] font-bold px-3 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:border-indigo-300 hover:text-indigo-600 transition-all text-left line-clamp-1 max-w-full"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-200 group active:scale-95"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Engineering UI...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Generate Component
                </>
              )}
            </button>

            {error && <p className="mt-4 text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}
          </div>

          {/* Output Side */}
          <div className="flex-1 flex flex-col bg-slate-900 relative">
            {!generatedCode && !isGenerating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-12 text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 border border-slate-700 relative group">
                  <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <Code className="w-10 h-10 text-slate-600 relative z-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-300 mb-2">Workspace Ready</h3>
                <p className="max-w-xs text-sm text-slate-500">Provide a description on the left to see the React implementation stream into this view.</p>
              </div>
            )}

            {isGenerating && !generatedCode && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-indigo-400 animate-pulse" />
                </div>
                <p className="mt-6 font-bold text-white tracking-tight">Synthesizing Architecture...</p>
                <div className="flex gap-1 mt-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-1 h-1 rounded-full bg-indigo-500 animate-bounce delay-${i}00`}></div>
                  ))}
                </div>
              </div>
            )}

            {generatedCode && (
              <div className="flex flex-col h-full animate-in fade-in duration-700">
                <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 px-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <div className="h-4 w-px bg-slate-700 mx-2"></div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">bespoke_dashboard.tsx</span>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all shadow-lg active:scale-95 ${
                      copied ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-500'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied to Clipboard' : 'Copy React Code'}
                  </button>
                </div>
                <div className="flex-1 overflow-hidden relative">
                   <pre 
                    ref={codeRef}
                    className="h-full overflow-auto p-8 text-xs font-mono text-slate-300 leading-relaxed scroll-smooth"
                   >
                    {generatedCode}
                  </pre>
                  {isGenerating && (
                    <div className="absolute bottom-4 right-8 bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse border border-indigo-500/20 backdrop-blur-md">
                      AI is streaming...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BespokeGeneratorModal;
