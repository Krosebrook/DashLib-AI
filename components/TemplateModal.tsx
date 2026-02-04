
import React, { useState } from 'react';
import { Template } from '../types';
import { X, Code, Check, Database, LineChart, AlertTriangle, FileText, Loader2, Copy, Play } from 'lucide-react';
import { generateDashboardCode } from '../services/geminiService';
import SecuritySandbox from './SecuritySandbox';
import ModelSandbox from './ModelSandbox';

interface TemplateModalProps {
  template: Template;
  onClose: () => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ template, onClose }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'code' | 'sandbox'>('details');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCode = async () => {
    setActiveTab('code');
    if (!generatedCode) {
      setIsLoading(true);
      const code = await generateDashboardCode(template);
      const cleanCode = code.replace(/```tsx|```typescript|```javascript|```/g, "");
      setGeneratedCode(cleanCode);
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const renderSandbox = () => {
    if (template.id === 'security-compliance') {
      return <SecuritySandbox />;
    }
    if (template.id === 'llm-performance-comparison') {
      return <ModelSandbox />;
    }
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Play className="w-12 h-12 mb-4 opacity-20" />
        <p className="font-bold">Sandbox coming soon for this template.</p>
        <p className="text-sm">Use the "Generate React Code" tab to see the implementation.</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <div className="text-sm font-medium text-indigo-600 mb-1">{template.category}</div>
            <h2 className="text-2xl font-bold text-slate-900">{template.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 shrink-0">
          <button 
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors ${activeTab === 'details' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            Specification
          </button>
          {template.hasInteractiveSandbox && (
            <button 
              onClick={() => setActiveTab('sandbox')}
              className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'sandbox' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
            >
              <Play className="w-4 h-4" />
              Live Sandbox
            </button>
          )}
          <button 
            onClick={handleGenerateCode}
            className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${activeTab === 'code' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Code className="w-4 h-4" />
            Generate React Code
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {activeTab === 'details' ? (
            <div className="space-y-8 pb-10">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-400" />
                  Purpose & Strategy
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">{template.purpose}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block text-slate-400 text-xs uppercase mb-1">Refresh Rate</span>
                    <span className="font-semibold text-slate-800">{template.refreshRate}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block text-slate-400 text-xs uppercase mb-1">Complexity</span>
                    <span className="font-semibold text-slate-800">Enterprise</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-indigo-500" />
                    Data Sources
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {template.dataSources.map(ds => (
                      <span key={ds} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                        {ds}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-6 mb-3">Core Metrics</h4>
                  <ul className="space-y-2">
                    {template.metrics.map(metric => (
                      <li key={metric} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-emerald-500" />
                    Visualizations
                  </h3>
                  <ul className="space-y-3">
                    {template.visualizations.map((vis, idx) => (
                      <li key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        <span className="text-sm font-medium text-slate-700">{vis}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {template.alertThreshold && (
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                      <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm mb-1">
                        <AlertTriangle className="w-4 h-4" />
                        Recommended Alert
                      </div>
                      <p className="text-amber-700 text-sm">{template.alertThreshold}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Implementation Notes</h3>
                <p className="text-slate-600 text-sm">{template.notes}</p>
              </div>
            </div>
          ) : activeTab === 'sandbox' ? (
            <div className="h-full">
              {renderSandbox()}
            </div>
          ) : (
            <div className="h-full flex flex-col">
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                  <Loader2 className="w-10 h-10 animate-spin mb-4 text-indigo-600" />
                  <p className="font-medium">Generating Component Code...</p>
                  <p className="text-sm mt-2 opacity-75">Designing layout with Tailwind & Recharts</p>
                </div>
              ) : (
                <div className="relative h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                     <p className="text-sm text-slate-600">
                       Generated React component ready for your project.
                     </p>
                     <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                     >
                       <Copy className="w-3 h-3" /> Copy Code
                     </button>
                  </div>
                  <div className="flex-1 overflow-auto bg-slate-900 rounded-xl p-4 shadow-inner">
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
  );
};

export default TemplateModal;
