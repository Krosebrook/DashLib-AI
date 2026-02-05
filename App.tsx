
import React, { useState, useMemo, useEffect } from 'react';
import Layout from './components/Layout';
import TemplateCard from './components/TemplateCard';
import TemplateModal from './components/TemplateModal';
import AIAdvisor from './components/AIAdvisor';
import BespokeGeneratorModal from './components/BespokeGeneratorModal';
import DocsPortal from './components/DocsPortal';
import { templates } from './data';
import { Template, DashboardCategory } from './types';
import { Search, Filter, Bell, ShieldAlert, Zap, Lock, BarChart3, Sparkles, Wand2, ArrowRight, Grid, List } from 'lucide-react';

const App: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isAlertCenterOpen, setIsAlertCenterOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
      
      {/* Platform Hero Area */}
      <section className="mb-12" aria-labelledby="hero-title">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row items-stretch">
          <div className="p-8 md:p-12 lg:w-3/5">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white"></div>)}
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Used by 500+ Engineering Teams</span>
            </div>
            <h2 id="hero-title" className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
              Enterprise UI <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Engineered by AI.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
              Don't build from scratch. Browse our repository of production-ready templates or use the Magic Generator to synthesize bespoke code in seconds.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setIsGeneratorOpen(true)}
                className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group active:scale-95"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Launch Magic Generator
              </button>
              <button 
                onClick={() => setIsAlertCenterOpen(!isAlertCenterOpen)}
                className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                <Bell className={`w-5 h-5 ${isAlertCenterOpen ? 'text-amber-500' : 'text-slate-400'}`} />
                View Alert Center
              </button>
            </div>
          </div>
          
          <div className="lg:w-2/5 bg-slate-900 p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
               <Zap className="w-64 h-64 text-white" />
             </div>
             <div className="relative z-10 space-y-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                   <div className="flex items-center gap-3 mb-2">
                      <ShieldAlert className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Active Monitoring</span>
                   </div>
                   <p className="text-xs text-slate-400 leading-normal italic font-medium">"System detected security anomaly in SaaS Finance Cluster. Recommend initializing SOC-2 Governance dashboard."</p>
                </div>
                <div className="flex items-center justify-between text-white border-t border-white/10 pt-6">
                   <div>
                     <p className="text-2xl font-black">50+</p>
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Templates</p>
                   </div>
                   <div className="h-10 w-px bg-white/10"></div>
                   <div>
                     <p className="text-2xl font-black">2.1s</p>
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Gen Latency</p>
                   </div>
                   <div className="h-10 w-px bg-white/10"></div>
                   <div>
                     <p className="text-2xl font-black">99%</p>
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Up-time</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Alert Slide-Over Panel (Global Status) */}
      {isAlertCenterOpen && (
        <div className="mb-10 p-8 bg-indigo-50 border border-indigo-100 rounded-[2rem] shadow-sm animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-indigo-900 tracking-tight flex items-center gap-3">
              <Bell className="w-5 h-5 text-indigo-500" />
              Critical Events Log
            </h3>
            <button 
              onClick={() => setIsAlertCenterOpen(false)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-900 uppercase tracking-widest"
            >
              Clear Buffer
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: 'security-compliance', title: 'Security Breach', desc: 'Failed logins > 10/hr detected.', color: 'red' },
              { id: 'llm-performance-comparison', title: 'LLM Hallucination', desc: 'Alert: Rate spiked to 6.2%.', color: 'amber' },
              { id: 'mrr-growth', title: 'MRR Growth Dip', desc: 'Performance < 4.2% MoM.', color: 'indigo' }
            ].map(alert => (
              <div key={alert.id} className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm flex flex-col justify-between group hover:border-indigo-400 transition-all cursor-pointer" onClick={() => setSelectedTemplate(templates.find(t => t.id === alert.id) || null)}>
                <div>
                  <div className={`w-2 h-2 rounded-full bg-${alert.color}-500 mb-3`}></div>
                  <h4 className="font-bold text-slate-900 mb-1">{alert.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{alert.desc}</p>
                </div>
                <div className="mt-4 text-[10px] font-black text-indigo-600 uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Investigate Impact <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workspace Controls */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 sticky top-[4.5rem] z-40 bg-slate-50/80 backdrop-blur-sm py-4">
        <div className="w-full md:max-w-md">
          <label htmlFor="search" className="sr-only">Search templates</label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              id="search"
              type="text" 
              placeholder="Filter repository by tag, KPI, or tech..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none text-slate-700 font-bold placeholder:text-slate-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <div className="hidden xl:flex items-center gap-1 bg-white border border-slate-200 p-1.5 rounded-xl mr-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              aria-label="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl' 
                  : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-200 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Inventory Grid */}
      <div 
        className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 animate-in fade-in duration-700" 
          : "flex flex-col gap-4 animate-in fade-in duration-700"
        }
        aria-live="polite"
      >
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map(template => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onClick={setSelectedTemplate} 
            />
          ))
        ) : (
          <div className="col-span-full py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
              <Search className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Inventory Discrepancy</h3>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed mb-8">The search query yielded zero results within the active registry filter.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="px-8 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>

      {/* Active Workstream Modals */}
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
    </Layout>
  );
};

export default App;
