
import React, { useState, useMemo, useEffect } from 'react';
import Layout from './components/Layout';
import TemplateCard from './components/TemplateCard';
import TemplateModal from './components/TemplateModal';
import AIAdvisor from './components/AIAdvisor';
import BespokeGeneratorModal from './components/BespokeGeneratorModal';
import DocsPortal from './components/DocsPortal';
import AlertBanner from './components/AlertBanner';
import BrandConfigModal from './components/BrandConfigModal';
import { templates } from './data';
import { Template, DashboardCategory, SystemAlert, BrandConfig } from './types';
import { Search, Filter, Bell, ShieldAlert, Zap, Lock, BarChart3, Sparkles, Wand2, ArrowRight, Grid, List, Layers, Cpu, Heart, Palette, Database } from 'lucide-react';
import { usePersistentState } from './hooks/usePersistentState';

const App: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSourceFilter, setActiveSourceFilter] = useState<string>('All Sources');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isBrandConfigOpen, setIsBrandConfigOpen] = useState(false);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Persistence features
  const [favorites, setFavorites] = usePersistentState<string[]>('dashlib-favorites', []);
  const [brandConfig, setBrandConfig] = usePersistentState<BrandConfig>('dashlib-brand', {
    primaryColor: 'indigo',
    borderRadius: 'rounded-2xl',
    density: 'comfortable'
  });

  // Simulated System Alerts
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    { 
      id: 'alert-1', 
      templateId: 'llm-performance-comparison', 
      message: 'Hallucination rate spike detected in GPT-4o stream.', 
      severity: 'warning', 
      timestamp: Date.now() 
    },
    { 
      id: 'alert-2', 
      templateId: 'security-compliance', 
      message: 'Unauthorized IAM role escalation attempt blocked.', 
      severity: 'critical', 
      timestamp: Date.now() - 50000 
    }
  ]);

  const categories = ['All', 'Favorites', ...Object.values(DashboardCategory)];
  
  // Extract unique data sources for Smart Filtering
  const allDataSources = useMemo(() => {
    const sources = new Set<string>();
    templates.forEach(t => t.dataSources.forEach(s => sources.add(s)));
    return ['All Sources', ...Array.from(sources).sort()];
  }, []);

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => {
      const matchesCategory = activeCategory === 'All' || 
                              t.category === activeCategory || 
                              (activeCategory === 'Favorites' && favorites.includes(t.id));
      
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.purpose.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSource = activeSourceFilter === 'All Sources' || t.dataSources.includes(activeSourceFilter);

      return matchesCategory && matchesSearch && matchesSource;
    });
  }, [activeCategory, searchQuery, activeSourceFilter, favorites]);

  const dismissAlert = (id: string) => {
    setSystemAlerts(prev => prev.filter(a => a.id !== id));
  };

  const handleViewAlertDetails = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) setSelectedTemplate(template);
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fid => fid !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <Layout 
      onOpenAdvisor={() => setIsAdvisorOpen(!isAdvisorOpen)}
      onOpenDocs={() => setIsDocsOpen(true)}
      bannerSlot={
        <AlertBanner 
          alerts={systemAlerts} 
          onDismiss={dismissAlert} 
          onViewDetails={handleViewAlertDetails} 
        />
      }
    >
      
      {/* Platform Hero Area */}
      <section className="mb-16" aria-labelledby="hero-title">
        <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50 flex flex-col lg:flex-row items-stretch group">
          <div className="p-10 md:p-16 lg:w-[60%] flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="h-4 w-px bg-slate-200 mx-2"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Validated by Global Platform Teams</span>
            </div>
            
            <h2 id="hero-title" className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8">
              Observability <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500">Synthesized at Scale.</span>
            </h2>
            
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12 max-w-xl">
              Eliminate boilerplate. Transform business requirements into functional enterprise dashboards using the world's most advanced AI component engine.
            </p>
            
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => setIsGeneratorOpen(true)}
                className="flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100 group active:scale-95"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Open Magic Generator
              </button>
              <button 
                onClick={() => setIsBrandConfigOpen(true)}
                className="flex items-center gap-3 px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                <Palette className="w-5 h-5 text-slate-400" />
                Brand Engine
              </button>
            </div>
          </div>
          
          <div className="lg:w-[40%] bg-slate-900 p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-[0.03] scale-[2] rotate-12 group-hover:rotate-45 transition-transform duration-[3000ms]">
               <Cpu className="w-96 h-96 text-white" />
             </div>
             
             <div className="relative z-10 space-y-8">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-emerald-500/20 rounded-xl">
                            <ShieldAlert className="w-4 h-4 text-emerald-400" />
                         </div>
                         <span className="text-[10px] font-black text-white uppercase tracking-widest">AIOps Engine</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-150"></div>
                      </div>
                   </div>
                   <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                     "Neural link active. 50+ templates indexed. Ready for component synthesis in SaaS, Financial, and Governance sectors."
                   </p>
                </div>
                
                <div className="grid grid-cols-3 gap-6 text-white text-center">
                   <div>
                     <p className="text-3xl font-black tracking-tighter">50+</p>
                     <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Modules</p>
                   </div>
                   <div className="w-px h-10 bg-white/10 mx-auto self-center"></div>
                   <div>
                     <p className="text-3xl font-black tracking-tighter">1.4s</p>
                     <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-1">Inference</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Workspace Navigation & Filter Hub */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 sticky top-[5.5rem] z-40 bg-slate-50/95 backdrop-blur-md py-6 border-b border-transparent">
        <div className="w-full md:max-w-xl space-y-4">
          <label htmlFor="search-main" className="sr-only">Search templates</label>
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500/5 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              id="search-main"
              type="text" 
              placeholder="Search by KPI, Data Source, or Template ID..." 
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-200/50 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-slate-900 font-bold placeholder:text-slate-300 relative z-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Smart Filtering: Data Sources */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
             <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest px-2">Data Source:</span>
             {allDataSources.slice(0, 6).map(source => (
               <button
                 key={source}
                 onClick={() => setActiveSourceFilter(source)}
                 className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                   activeSourceFilter === source 
                     ? 'bg-slate-800 text-white border-slate-800' 
                     : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                 }`}
               >
                 {source}
               </button>
             ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          <div className="hidden lg:flex items-center gap-1.5 bg-white border border-slate-200 p-2 rounded-2xl mr-4 shadow-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              aria-label="Switch to Grid Layout"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              aria-label="Switch to List Layout"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all border-2 flex items-center gap-2 ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xl shadow-indigo-200' 
                  : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600 shadow-sm'
              }`}
            >
              {cat === 'Favorites' && <Heart className={`w-3 h-3 ${activeCategory === cat ? 'fill-white' : ''}`} />}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Inventory Engine */}
      <div 
        className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000" 
          : "flex flex-col gap-6 animate-in fade-in duration-1000"
        }
        aria-live="polite"
      >
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map(template => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onClick={setSelectedTemplate}
              isFavorite={favorites.includes(template.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <div className="col-span-full py-40 bg-white rounded-[4rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-center px-8 group">
            <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform duration-700">
              <Search className="w-12 h-12 text-slate-200" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-4 uppercase">Registry Empty</h3>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed mb-10">We couldn't locate any modules matching your filter criteria in the current workspace.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveSourceFilter('All Sources'); }}
              className="px-12 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
            >
              Clear Global Filters
            </button>
          </div>
        )}
      </div>

      {/* Active Workstream Modals */}
      {selectedTemplate && (
        <TemplateModal 
          template={selectedTemplate} 
          onClose={() => setSelectedTemplate(null)}
          brandConfig={brandConfig} 
        />
      )}

      <BespokeGeneratorModal 
        isOpen={isGeneratorOpen} 
        onClose={() => setIsGeneratorOpen(false)}
        brandConfig={brandConfig}
      />

      <BrandConfigModal 
        isOpen={isBrandConfigOpen}
        onClose={() => setIsBrandConfigOpen(false)}
        config={brandConfig}
        setConfig={setBrandConfig}
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
