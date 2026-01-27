import React from 'react';
import { Template } from '../types';
import { BarChart3, Activity, PieChart, Users, Lock, Zap, ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onClick: (template: Template) => void;
}

const getIcon = (category: string) => {
  switch (category) {
    case 'SaaS Financial': return <BarChart3 className="w-5 h-5 text-indigo-600" />;
    case 'Product & Usage': return <Activity className="w-5 h-5 text-emerald-600" />;
    case 'AI/LLM Operations': return <Zap className="w-5 h-5 text-purple-600" />;
    case 'Marketing & Sales': return <PieChart className="w-5 h-5 text-orange-600" />;
    case 'Team & Operations': return <Users className="w-5 h-5 text-blue-600" />;
    case 'Enterprise & Governance': return <Lock className="w-5 h-5 text-slate-600" />;
    default: return <BarChart3 className="w-5 h-5" />;
  }
};

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => {
  return (
    <div 
      onClick={() => onClick(template)}
      className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
          {getIcon(template.category)}
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{template.category.split(' ')[0]}</span>
        </div>
        <span className="text-xs text-slate-400">{template.refreshRate}</span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
        {template.title}
      </h3>
      
      <p className="text-sm text-slate-600 mb-6 flex-grow line-clamp-3">
        {template.purpose}
      </p>

      <div className="flex items-center text-indigo-600 font-medium text-sm mt-auto">
        View Template <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default TemplateCard;