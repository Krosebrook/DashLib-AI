
import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import TemplateCard from './components/TemplateCard';
import TemplateModal from './components/TemplateModal';
import AIAdvisor from './components/AIAdvisor';
import BespokeGeneratorModal from './components/BespokeGeneratorModal';
import DocsPortal from './components/DocsPortal';
import { templates } from './data';
import { Template, DashboardCategory } from './types';
import { Search, Filter, Bell, ShieldAlert, Zap, Lock, BarChart3, Sparkles, Wand2 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isAlertCenterOpen, setIsAlertCenterOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  const categories = ['All', ...Object.values(DashboardCategory)];

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => {
      const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.purpose.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <Layout 
      onOpenAdvisor={() => setIsAdvisorOpen(!isAdvisorOpen)}
      onOpenDocs={() => setIsDocsOpen(true)}
    >
      
      {/* Alert System Status & Magic Generator CTA */}
      <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center mb-8 gap-4">
        <div className="flex flex-col md:flex-row flex-1 items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
            <ShieldAlert className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-900">Advanced Governance Enabled</h2>
            <p className="text-xs text-slate-500">Global monitoring for MRR (&lt;5%), Hallucinations (&gt;5%), and Security breached.</p>
          </div>
          <div className="h-10 w-px bg-slate-100 hidden md:block mx-2"></div>
          <button 
            onClick={() => setIsAlertCenterOpen(!isAlertCenterOpen)}
            className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all text-sm font-semibold shadow-md active:scale-95"
          >
            <Bell className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            Alert Center (4)
          </button>
        </div>

        <button 
          onClick={() => setIsGeneratorOpen(true)}
          className="flex items-center gap-3 px-8 py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:shadow-indigo-300 active:scale-95 group overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
          <Sparkles className="w-5 h-5" />
          <span>Magic Generator</span>
          <Wand2 className="w-4 h-4 ml-1 opacity-60" />
        </button>
      </div>

      {/* Global Alert Center */}
      {isAlertCenterOpen && (
        <div className="mb-10 p-6 bg-slate-900 rounded-2xl text-white shadow-2xl animate-in slide-in-from-top duration-500 border border-slate-800">
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg">
                  <Bell className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">System-Wide Alert Center</h3>
                  <p className="text-xs text-slate-400">Triggered from Custom Threshold Rules</p>
                </div>
              </div>
              <button onClick={() => setIsAlertCenterOpen(false)} className="text-slate-400 hover:text-white text-sm font-medium bg-slate-800 px-3 py-1 rounded-lg">Dismiss All</button>
           </div>
           
           <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-red-500 flex justify-between items-start gap-4 hover:bg-slate-800 transition-colors">
                <div className="flex gap-3">
                  <Lock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">Security Breach: Failed Logins &gt; 10/hr</p>
                    <p className="text-xs text-slate-400 mt-1">Dashboard: Security & Compliance • 4m ago</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTemplate(templates.find(t => t.id === 'security-compliance') || null)}
                  className="text-xs font-bold bg-red-500/10 text-red-400 px-4 py-1.5 rounded-lg border border-red-500/20 whitespace-nowrap"
                >
                  Investigate
                </button>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-amber-500 flex justify-between items-start gap-4 hover:bg-slate-800 transition-colors">
                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">High Hallucination Detected (6.2%)</p>
                    <p className="text-xs text-slate-400 mt-1">Dashboard: Model Performance & Cost • 12m ago</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTemplate(templates.find(t => t.id === 'llm-performance-comparison') || null)}
                  className="text-xs font-bold bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-lg border border-amber-500/20 whitespace-nowrap"
                >
                  Analyze Test
                </button>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-indigo-500 flex justify-between items-start gap-4 hover:bg-slate-800 transition-colors">
                <div className="flex gap-3">
                  <BarChart3 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold">MRR Growth Drop: &lt; 4.2% MoM</p>
                    <p className="text-xs text-slate-400 mt-1">Dashboard: MRR Growth • 1h ago</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTemplate(templates.find(t => t.id === 'mrr-growth') || null)}
                  className="text-xs font-bold bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-lg border border-indigo-500/20 whitespace-nowrap"
                >
                  View MRR
                </button>
              </div>
           </div>
        </div>
      )}
      
      {/* Search & Filter Header */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-xl w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search library for 'A/B test', 'GDPR', 'ReAct'..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none text-slate-700 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
              {filteredTemplates.length} TEMPLATES
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          <Filter className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                activeCategory === cat 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Bespoke Generator Starter Card */}
        {activeCategory === 'All' && !searchQuery && (
          <div 
            onClick={() => setIsGeneratorOpen(true)}
            className="group relative bg-indigo-600 rounded-2xl p-6 cursor-pointer overflow-hidden border border-indigo-500 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 transition-transform">
               <Sparkles className="w-24 h-24 text-white" />
            </div>
            <div className="relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Build from Prompt</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                Need something unique? Describe any enterprise dashboard and I'll generate the full component code for you.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-2 text-white font-bold text-sm bg-white/10 w-fit px-4 py-2 rounded-lg">
              Launch Bespoke Generator <Sparkles className="w-4 h-4" />
            </div>
          </div>
        )}

        {filteredTemplates.length > 0 ? (
          filteredTemplates.map(template => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onClick={setSelectedTemplate} 
            />
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No templates found</h3>
            <p className="text-slate-500 max-w-xs mx-auto mb-6">Try searching for other terms or use the magic generator below.</p>
            <button 
              onClick={() => setIsGeneratorOpen(true)}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
            >
              Start Magic Generator
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedTemplate && (
        <TemplateModal 
          template={selectedTemplate} 
          onClose={() => setSelectedTemplate(null)} 
        />
      )}

      <BespokeGeneratorModal 
        isOpen={isGeneratorOpen} 
        onClose={() => setIsGeneratorOpen(false)} 
      />

      <AIAdvisor 
        templates={templates}
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />

      <DocsPortal 
        isOpen={isDocsOpen}
        onClose={() => setIsDocsOpen(false)}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />

    </Layout>
  );
};

export default App;
