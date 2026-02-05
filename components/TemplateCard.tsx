
import React from 'react';
import { Template } from '../types';
import { BarChart3, Activity, PieChart, Users, Lock, Zap, ArrowUpRight, Code2, PlayCircle } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onClick: (template: Template) => void;
}

const getCategoryStyles = (category: string) => {
  switch (category) {
    case 'SaaS Financial': return { icon: <BarChart3 className="w-4 h-4" />, color: 'bg-indigo-50 text-indigo-700 border-indigo-100' };
    case 'Product & Usage': return { icon: <Activity className="w-4 h-4" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
    case 'AI/LLM Operations': return { icon: <Zap className="w-4 h-4" />, color: 'bg-purple-50 text-purple-700 border-purple-100' };
    case 'Marketing & Sales': return { icon: <PieChart className="w-4 h-4" />, color: 'bg-orange-50 text-orange-700 border-orange-100' };
    case 'Team & Operations': return { icon: <Users className="w-4 h-4" />, color: 'bg-blue-50 text-blue-700 border-blue-100' };
    case 'Enterprise & Governance': return { icon: <Lock className="w-4 h-4" />, color: 'bg-slate-100 text-slate-700 border-slate-200' };
    default: return { icon: <BarChart3 className="w-4 h-4" />, color: 'bg-slate-50 text-slate-600' };
  }
};

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => {
  const styles = getCategoryStyles(template.category);

  return (
    <div 
      onClick={() => onClick(template)}
      className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden"
      role="article"
      aria-labelledby={`title-${template.id}`}
    >
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowUpRight className="w-5 h-5 text-indigo-500" />
      </div>

      <div className="flex items-center gap-2 mb-5">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${styles.color}`}>
          {styles.icon}
          {template.category.split(' ')[0]}
        </div>
        <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{template.refreshRate}</span>
      </div>
      
      <h3 id={`title-${template.id}`} className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
        {template.title}
      </h3>
      
      <p className="text-sm text-slate-500 mb-8 flex-grow leading-relaxed font-medium">
        {template.purpose}
      </p>

      <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-50">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Metrics</span>
            <span className="text-xs font-bold text-slate-700">{template.metrics.length} Tracking</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Sources</span>
            <span className="text-xs font-bold text-slate-700">{template.dataSources.length} Ready</span>
          </div>
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
          {template.hasInteractiveSandbox && (
            <div className="p-2 bg-slate-100 rounded-lg text-slate-500" title="Interactive Sandbox Available">
              <PlayCircle className="w-4 h-4" />
            </div>
          )}
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Code2 className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
