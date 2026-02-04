
import React, { useState } from 'react';
import { X, Book, Code, Terminal, Zap, Info, ChevronRight, FileCode, ShieldCheck } from 'lucide-react';

interface DocsPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocsPortal: React.FC<DocsPortalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('getting-started');

  if (!isOpen) return null;

  const sections = [
    { id: 'getting-started', label: 'Quick Start', icon: Zap },
    { id: 'custom-generation', label: 'Magic Generator', icon: Code },
    { id: 'sandboxes', label: 'Live Sandboxes', icon: Terminal },
    { id: 'integration', label: 'Component Integration', icon: FileCode },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-slate-900">Quick Start Guide</h3>
            <p className="text-slate-600">DashLib AI is designed to help you move from zero to a functional dashboard in minutes. Our templates aren't just screenshots; they are blueprints for production-grade React code.</p>
            <div className="grid grid-cols-1 gap-4">
              {[
                { title: 'Browse', desc: 'Find a template that matches your category (SaaS, AI, etc.)' },
                { title: 'Preview', desc: 'Review the metrics and visualization specifications.' },
                { title: 'Generate', desc: 'Use Gemini 3 Pro to create the actual React source code.' },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                  <div>
                    <h4 className="font-bold text-slate-900">{step.title}</h4>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'custom-generation':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-slate-900">Using the Magic Generator</h3>
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-indigo-600 shrink-0" />
              <p className="text-sm text-indigo-700">The Magic Generator uses <strong>Gemini 3 Pro</strong> to write raw TypeScript/React code based on your description.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase text-slate-400 tracking-wider">Best Practices for Prompts</h4>
              <ul className="space-y-3">
                {[
                  'Mention specific KPIs you want to track.',
                  'Specify if you need interactive tabs or filters.',
                  'Ask for a specific theme (e.g., "High-contrast accessibility").',
                  'Request complex charts (e.g., "Sankey for traffic flow").'
                ].map((tip, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <ChevronRight className="w-4 h-4 text-indigo-500" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      case 'sandboxes':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-slate-900">Interactive Sandboxes</h3>
            <p className="text-slate-600">Before generating code, some templates offer a "Live Sandbox" where you can test the interactive logic manually.</p>
            <div className="bg-slate-900 rounded-xl p-6 text-white overflow-hidden relative">
               <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold">Security Rule Builder Sandbox</span>
               </div>
               <div className="text-sm text-slate-400">This feature allows you to define complex thresholds for failed logins or policy violations. The state management you see in the sandbox is exactly what the AI will implement in your generated component.</div>
            </div>
          </div>
        );
      case 'integration':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-slate-900">Component Integration</h3>
            <p className="text-slate-600">Once you copy the code, follow these steps to use it in your project:</p>
            <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-slate-300">
              <p className="text-slate-500 mb-2">// 1. Install dependencies</p>
              <p>npm install lucide-react recharts</p>
              <p className="text-slate-500 my-2 mt-4">// 2. Paste the component code into a new file</p>
              <p>Dashboard.tsx</p>
              <p className="text-slate-500 my-2 mt-4">// 3. Import and use</p>
              <p>import Dashboard from './Dashboard';</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-xl">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Library Documentation</h2>
              <p className="text-sm text-slate-500">Master the DashLib AI ecosystem.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-64 border-r border-slate-100 p-6 flex flex-col gap-2 bg-slate-50/50">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all ${
                    activeSection === section.id 
                      ? 'bg-white text-indigo-600 shadow-sm border border-slate-200 translate-x-1' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-10 bg-white">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPortal;
