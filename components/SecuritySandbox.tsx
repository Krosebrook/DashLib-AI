
import React, { useState } from 'react';
import { ShieldAlert, Plus, Save, Trash2, Bell, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, Settings2, Zap, RotateCcw } from 'lucide-react';
import { SecurityRule } from '../types';
import { usePersistentState } from '../hooks/usePersistentState';

const DEFAULT_RULES: SecurityRule[] = [
  { id: '1', metric: 'Policy Violations', condition: 'greater than', value: 0, enabled: true },
  { id: '2', metric: 'Security Incidents', condition: 'equal to', value: 1, enabled: false }
];

const SecuritySandbox: React.FC = () => {
  const [metric, setMetric] = useState('Failed Login Attempts');
  const [condition, setCondition] = useState('greater than');
  const [value, setValue] = useState(10);
  
  // Persist rules to localStorage
  const [rules, setRules] = usePersistentState<SecurityRule[]>('dashlib-security-rules', DEFAULT_RULES);
  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    const newRule: SecurityRule = {
      id: Date.now().toString(),
      metric,
      condition,
      value,
      enabled: true
    };
    setRules([newRule, ...rules]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleReset = () => {
    if (confirm('Reset all security rules to default?')) {
      setRules(DEFAULT_RULES);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12" role="region" aria-label="Security Rule Builder">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600 rounded-2xl shadow-lg shadow-red-100">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Security Policy Engine</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time Threshold Guard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Active Scanning</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] ml-1">Observation Metric</label>
            <select 
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-100 focus:bg-white outline-none transition-all cursor-pointer shadow-sm"
              aria-label="Select metric to monitor"
            >
              <option>Failed Login Attempts</option>
              <option>Policy Violations</option>
              <option>Data Access Events</option>
              <option>Security Incidents</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] ml-1">Condition</label>
            <select 
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-100 focus:bg-white outline-none transition-all cursor-pointer shadow-sm"
              aria-label="Select threshold condition"
            >
              <option value="greater than">Greater than</option>
              <option value="less than">Less than</option>
              <option value="equal to">Equal to</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] ml-1">Threshold Value</label>
            <input 
              type="number"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value) || 0)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-100 focus:bg-white outline-none transition-all shadow-sm"
              aria-label="Enter value"
            />
          </div>

          <div className="flex flex-col justify-end">
            <button 
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-200 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              Commit Rule
            </button>
          </div>
        </div>

        {showSuccess && (
          <div className="mt-8 flex items-center gap-3 text-emerald-600 bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-4" role="status">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-sm font-bold">Rule successfully propagated to global security cluster.</span>
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border border-slate-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
           <Settings2 className="w-64 h-64 text-white" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl">
                <Bell className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="font-black text-white text-lg tracking-tight">Active Governance Rules</h3>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[9px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-all"
                title="Reset to Defaults"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
              <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Synced: Local Storage
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {rules.length === 0 ? (
              <div className="py-20 text-center text-slate-600 border border-dashed border-slate-800 rounded-3xl bg-slate-900/50">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-10" />
                <p className="text-lg font-bold">No Governance Rules defined</p>
                <p className="text-sm text-slate-700 mt-1 italic">Use the builder above to initialize security thresholds.</p>
              </div>
            ) : (
              rules.map((rule) => (
                <div 
                  key={rule.id} 
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-[1.5rem] transition-all border ${
                    rule.enabled 
                      ? 'bg-white/5 border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.08]' 
                      : 'bg-black/20 border-white/5 opacity-40 grayscale grayscale-[0.8] hover:grayscale-0'
                  }`}
                >
                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <div className={`w-3 h-3 rounded-full ${rule.enabled ? 'bg-indigo-500 animate-pulse' : 'bg-slate-700'}`}></div>
                    <div>
                      <div className="text-base font-bold text-white tracking-tight">
                        When <span className="text-indigo-400">{rule.metric}</span> is <span className="text-slate-500 italic px-1 font-medium">{rule.condition}</span> <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10">{rule.value}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-2 uppercase font-black flex items-center gap-2">
                        <Zap className="w-3 h-3 text-indigo-500" /> Action: Immediate PagerDuty Trigger + Log Entry
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full md:w-auto justify-end border-t border-white/5 md:border-none pt-4 md:pt-0">
                    <button 
                      onClick={() => toggleRule(rule.id)}
                      className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                      aria-label={rule.enabled ? "Disable rule" : "Enable rule"}
                    >
                       <span className={`text-[10px] font-black uppercase tracking-widest ${rule.enabled ? 'text-indigo-400' : 'text-slate-500'}`}>
                         {rule.enabled ? 'Enabled' : 'Disabled'}
                       </span>
                       {rule.enabled ? <ToggleRight className="w-8 h-8 text-indigo-500" /> : <ToggleLeft className="w-8 h-8 text-slate-600" />}
                    </button>
                    <button 
                      onClick={() => deleteRule(rule.id)}
                      className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                      aria-label="Delete rule"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySandbox;
