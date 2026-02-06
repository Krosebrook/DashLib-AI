
import React, { useState, useEffect } from 'react';
import { Template, BrandConfig, AuditReport } from '../types';
import { X, Code, Check, Database, LineChart, AlertTriangle, FileText, Loader2, Copy, Play, Layers, Sidebar, Cpu, Github, ClipboardCheck, Zap, ShieldAlert, Award } from 'lucide-react';
import { generateDashboardCode, generateDashboardAudit } from '../services/geminiService';
import { openInStackBlitz } from '../utils/exportUtils';
import SecuritySandbox from './SecuritySandbox';
import ModelSandbox from './ModelSandbox';

interface TemplateModalProps {
  template: Template;
  onClose: () => void;
  brandConfig?: BrandConfig;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ template, onClose, brandConfig }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'code' | 'sandbox' | 'audit'>('details');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Focus trapping and keyboard shortcuts
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleGenerateCode = async () => {
    setActiveTab('code');
    if (!generatedCode) {
      setIsLoading(true);
      try {
        const code = await generateDashboardCode(template, brandConfig);
        setGeneratedCode(code.replace(/```tsx|```typescript|```javascript|```/g, ""));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRunAudit = async () => {
    setActiveTab('audit');
    if (!auditReport) {
      setIsAuditing(true);
      try {
        const report = await generateDashboardAudit(template);
        setAuditReport(report);
      } finally {
        setIsAuditing(false);
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSandbox = () => {
    if (template.id === 'security-compliance') return <SecuritySandbox />;
    if (template.id === 'llm-performance-comparison') return <ModelSandbox />;
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <Cpu className="w-12 h-12 mb-4 opacity-10" />
        <p className="font-bold text-lg text-slate-600">Dynamic Sandbox Initializing</p>
        <p className="text-sm max-w-xs text-center mt-2 leading-relaxed italic">This template's logic is being mapped to a virtual DOM. Use the generator in the meantime.</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-7xl h-full max-h-[900px] flex flex-col overflow-hidden border border-white/20"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5 px-3 border-r border-slate-200 mr-2">
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Workbench / {template.category}</span>
          </div>
          <button 
            onClick={onClose} 
            className="group flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-100 rounded-xl transition-all shadow-sm"
            aria-label="Close template view"
          >
            <span className="text-xs font-bold uppercase tracking-tighter">Exit Workshop</span>
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Side Navigation */}
          <nav className="w-20 md:w-64 border-r border-slate-100 bg-slate-50/30 p-4 md:p-6 flex flex-col gap-2 shrink-0 overflow-y-auto">
            <button 
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-3 p-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'details' ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-500/10 border border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
            >
              <FileText className="w-5 h-5 shrink-0" />
              <span className="hidden md:inline">Specification</span>
            </button>
            
            {template.hasInteractiveSandbox && (
              <button 
                onClick={() => setActiveTab('sandbox')}
                className={`flex items-center gap-3 p-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'sandbox' ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-500/10 border border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
              >
                <Play className="w-5 h-5 shrink-0" />
                <span className="hidden md:inline">Live Sandbox</span>
              </button>
            )}

            <button 
              onClick={handleGenerateCode}
              className={`flex items-center gap-3 p-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'code' ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-500/10 border border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
            >
              <Code className="w-5 h-5 shrink-0" />
              <span className="hidden md:inline">Code Generator</span>
            </button>

            <button 
              onClick={handleRunAudit}
              className={`flex items-center gap-3 p-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === 'audit' ? 'bg-white text-indigo-600 shadow-xl shadow-indigo-500/10 border border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
            >
              <ClipboardCheck className="w-5 h-5 shrink-0" />
              <span className="hidden md:inline">Architect's Audit</span>
            </button>

            <div className="mt-auto pt-6 space-y-4">
              <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-lg hidden md:block">
                <Cpu className="w-6 h-6 mb-3 opacity-50" />
                <p className="text-xs font-bold leading-tight uppercase tracking-widest mb-1">AI Intelligence</p>
                <p className="text-[10px] text-indigo-100 leading-normal">Component code is dynamically structured for Gemini-3 logic.</p>
              </div>
            </div>
          </nav>

          {/* Dynamic Content Pane */}
          <div className="flex-1 overflow-y-auto bg-white flex flex-col p-6 md:p-10">
            <header className="mb-10 max-w-4xl">
              <h2 id="modal-title" className="text-4xl font-black text-slate-900 tracking-tight mb-4">{template.title}</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">{template.purpose}</p>
            </header>

            {activeTab === 'details' ? (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 group hover:border-indigo-200 transition-colors">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Database className="w-4 h-4 text-indigo-500" />
                      Infrastructure & Pipes
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {template.dataSources.map(ds => (
                        <span key={ds} className="px-4 py-1.5 bg-white text-slate-700 border border-slate-200 rounded-xl text-xs font-bold shadow-sm group-hover:shadow-indigo-50 transition-all">
                          {ds}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xs font-black text-slate-900 uppercase">Core KPIs</h4>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {template.metrics.map(metric => (
                            <div key={metric} className="flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-slate-200/50">
                              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                              <span className="text-sm font-bold text-slate-600 leading-tight">{metric}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  </section>

                  <section className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 group hover:border-emerald-200 transition-colors">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <LineChart className="w-4 h-4 text-emerald-500" />
                      Visualization Layer
                    </h3>
                    <div className="space-y-3">
                      {template.visualizations.map((vis, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-emerald-50 transition-all">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-[10px] font-black text-emerald-600 border border-emerald-100">0{idx+1}</div>
                          <span className="text-sm font-bold text-slate-700 tracking-tight">{vis}</span>
                        </div>
                      ))}
                    </div>
                    
                    {template.alertThreshold && (
                      <div className="mt-8 p-6 bg-amber-50 border border-amber-100 rounded-[1.5rem] flex gap-4">
                        <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-1" />
                        <div>
                          <p className="text-xs font-black text-amber-800 uppercase tracking-widest mb-1">Threshold Strategy</p>
                          <p className="text-sm font-bold text-amber-700 leading-normal">{template.alertThreshold}</p>
                        </div>
                      </div>
                    )}
                  </section>
                </div>
              </div>
            ) : activeTab === 'audit' ? (
              <div className="flex-1 animate-in fade-in duration-300">
                {isAuditing ? (
                   <div className="flex-1 flex flex-col items-center justify-center py-20">
                    <div className="relative mb-8">
                       <Loader2 className="w-16 h-16 animate-spin text-indigo-600 opacity-20" />
                       <ShieldAlert className="absolute inset-0 m-auto w-8 h-8 text-indigo-600 animate-pulse" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Running Compliance Scan</h4>
                    <p className="text-slate-500 mt-2 font-medium">Analyzing edge cases, security posture, and data patterns...</p>
                  </div>
                ) : auditReport ? (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between p-6 bg-slate-900 rounded-[2rem] text-white shadow-xl">
                      <div>
                        <h3 className="text-xl font-black tracking-tight mb-1">Architect's Scorecard</h3>
                        <p className="text-slate-400 text-sm">Enterprise Readiness Assessment</p>
                      </div>
                      <div className="text-center">
                        <div className={`text-4xl font-black ${auditReport.score > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{auditReport.score}/100</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">Quality Index</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                        <h4 className="flex items-center gap-2 text-sm font-black text-emerald-800 uppercase tracking-widest mb-6">
                          <Award className="w-5 h-5" /> Detected Strengths
                        </h4>
                        <ul className="space-y-3">
                          {auditReport.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-medium text-emerald-900">
                              <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-200">
                        <h4 className="flex items-center gap-2 text-sm font-black text-slate-500 uppercase tracking-widest mb-6">
                          <AlertTriangle className="w-5 h-5" /> Mitigation Required
                        </h4>
                        <ul className="space-y-3">
                          {auditReport.weaknesses.map((w, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-8 border border-slate-200 rounded-[2rem] bg-white">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Strategic Recommendation</h4>
                      <p className="text-slate-600 leading-relaxed font-medium">{auditReport.recommendation}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : activeTab === 'sandbox' ? (
              <div className="flex-1 animate-in fade-in duration-300">
                {renderSandbox()}
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-in fade-in duration-300">
                {isLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="relative mb-8">
                       <Loader2 className="w-20 h-20 animate-spin text-indigo-600 opacity-20" />
                       <Cpu className="absolute inset-0 m-auto w-8 h-8 text-indigo-600 animate-pulse" />
                    </div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Synthesizing Architecture</h4>
                    <p className="text-slate-500 mt-2 font-medium">Drafting Tailwind layouts and mapping Recharts logic...</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <div>
                         <p className="text-sm font-bold text-slate-700">Source Code Generated</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">DashLib-Template-{template.id}.tsx</p>
                       </div>
                       <div className="flex gap-2">
                        <button 
                          onClick={() => openInStackBlitz(template.title, generatedCode)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-100 transition-all"
                        >
                          <Zap className="w-4 h-4" />
                          Open in StackBlitz
                        </button>
                        <button 
                          onClick={copyToClipboard}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${copied ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200 hover:shadow-indigo-100'}`}
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copied ? 'Copied' : 'Get Code'}
                        </button>
                       </div>
                    </div>
                    <div className="flex-1 overflow-auto bg-slate-900 rounded-[2rem] p-8 shadow-inner relative group border border-white/5">
                      <div className="absolute top-4 right-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest font-bold group-hover:text-indigo-400 transition-colors">TypeScript / React 19</div>
                      <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {generatedCode}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
