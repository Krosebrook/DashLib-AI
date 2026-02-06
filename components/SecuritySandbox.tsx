
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Plus, Trash2, Bell, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, X, ArrowRight, Settings2 } from 'lucide-react';
import { SecurityRule } from '../types';
import { usePersistentState } from '../hooks/usePersistentState';

const METRICS = [
  'Failed Login Attempts',
  'Policy Violations',
  'Data Access Events',
  'Security Incidents',
  'Unauthorized API Requests'
];

const CONDITIONS = [
  'greater than',
  'less than',
  'equal to'
];

const SecuritySandbox: React.FC = () => {
  const [metric, setMetric] = useState(METRICS[0]);
  const [condition, setCondition] = useState(CONDITIONS[0]);
  const [value, setValue] = useState(10);
  const [rules, setRules] = usePersistentState<SecurityRule[]>('dashlib-security-rules', []);
  const [showBanner, setShowBanner] = useState(false);

  // Simulate alert detection based on rules
  useEffect(() => {
    if (rules.some(r => r.enabled && r.metric === 'Failed Login Attempts' && r.value < 15)) {
      setShowBanner(true);
    }
  }, [rules]);

  const addRule = () => {
    const newRule: SecurityRule = {
      id: Math.random().toString(36).substr(2, 9),
      metric,
      condition,
      value,
      enabled: true
    };
    setRules([...rules, newRule]);
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Persistent Local Banner */}
      {showBanner && (
        <div className="bg-red-600 text-white p-4 rounded-2xl flex items-center justify-between shadow-xl shadow-red-100 animate-in slide-in-from-top-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase tracking-widest">Rule Violation Detected</h4>
              <p className="text-xs font-medium opacity-90">Abnormal Failed Login Attempts volume detected in EMEA cluster.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
              View Log <ArrowRight className="w-3 h-3" />
            </button>
            <button onClick={() => setShowBanner(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Rule Definition Form */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-slate-900 rounded-2xl">
            <Settings2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Security Policy Builder</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Define Custom Governance Thresholds</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Observation Metric</label>
            <select 
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer"
            >
              {METRICS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Threshold Condition</label>
            <select 
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-100 transition-all cursor-pointer"
            >
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Threshold Value</label>
            <input 
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
            />
          </div>

          <div className="flex items-end">
            <button 
              onClick={addRule}
              className="w-full h-[58px] bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
            >
              <Plus className="w-5 h-5" /> Save Rule
            </button>
          </div>
        </div>
      </div>

      {/* Rules Inventory */}
      <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-5 h-5 text-indigo-600" />
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Active Policy Inventory</h4>
        </div>

        {rules.length === 0 ? (
          <div className="py-12 text-center">
            <AlertCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold text-sm italic">No active security policies defined in this workspace.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rules.map(rule => (
              <div 
                key={rule.id}
                className={`flex items-center justify-between p-5 rounded-3xl border transition-all ${rule.enabled ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-100 border-slate-200 opacity-60'}`}
              >
                <div className="flex items-center gap-6">
                  <div className={`p-2 rounded-xl ${rule.enabled ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200 text-slate-400'}`}>
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">Monitoring Strategy</p>
                    <p className="text-sm font-bold text-slate-900">
                      IF <span className="text-indigo-600 font-black">{rule.metric}</span> IS <span className="italic">{rule.condition}</span> <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">{rule.value}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleRule(rule.id)}
                    className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {rule.enabled ? <ToggleRight className="w-10 h-10 text-indigo-600" /> : <ToggleLeft className="w-10 h-10" />}
                  </button>
                  <button 
                    onClick={() => deleteRule(rule.id)}
                    className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecuritySandbox;
