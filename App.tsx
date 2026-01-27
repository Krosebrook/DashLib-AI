import React, { useState, useMemo } from 'react';
import Layout from './components/Layout';
import TemplateCard from './components/TemplateCard';
import TemplateModal from './components/TemplateModal';
import AIAdvisor from './components/AIAdvisor';
import { templates } from './data';
import { Template, DashboardCategory } from './types';
import { Search, Filter } from 'lucide-react';

const App: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

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
    <Layout onOpenAdvisor={() => setIsAdvisorOpen(!isAdvisorOpen)}>
      
      {/* Search & Filter Header */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search templates (e.g., 'churn', 'AI costs')..." 
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="text-sm text-slate-500 font-medium">
            Showing {filteredTemplates.length} templates
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <Filter className="w-5 h-5 text-slate-400 shrink-0 mr-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map(template => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              onClick={setSelectedTemplate} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <h3 className="text-lg font-medium text-slate-900 mb-1">No templates found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Modals */}
      {selectedTemplate && (
        <TemplateModal 
          template={selectedTemplate} 
          onClose={() => setSelectedTemplate(null)} 
        />
      )}

      <AIAdvisor 
        templates={templates}
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />

    </Layout>
  );
};

export default App;