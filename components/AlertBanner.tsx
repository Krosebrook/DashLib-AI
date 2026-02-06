
import React from 'react';
import { X, AlertCircle, ShieldAlert, Zap, ArrowRight } from 'lucide-react';
import { SystemAlert } from '../types';

interface AlertBannerProps {
  alerts: SystemAlert[];
  onDismiss: (id: string) => void;
  onViewDetails: (templateId: string) => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ alerts, onDismiss, onViewDetails }) => {
  if (alerts.length === 0) return null;

  const currentAlert = alerts[0]; // Show most recent/important

  const getStyles = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'warning': return 'bg-amber-500 text-white';
      default: return 'bg-indigo-600 text-white';
    }
  };

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <ShieldAlert className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className={`w-full py-2.5 px-4 flex items-center justify-between gap-4 animate-in slide-in-from-top duration-500 sticky top-16 z-[45] ${getStyles(currentAlert.severity)}`}
      role="alert"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="shrink-0 p-1 bg-white/20 rounded-lg">
          {getIcon(currentAlert.severity)}
        </div>
        <p className="text-sm font-bold truncate tracking-tight">
          <span className="uppercase opacity-80 mr-2">System Alert:</span>
          {currentAlert.message}
        </p>
        <button 
          onClick={() => onViewDetails(currentAlert.templateId)}
          className="hidden md:flex items-center gap-1 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded-md text-[10px] font-black uppercase tracking-widest transition-colors shrink-0"
        >
          View Impact <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <button 
        onClick={() => onDismiss(currentAlert.id)}
        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
        aria-label="Dismiss alert"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AlertBanner;
