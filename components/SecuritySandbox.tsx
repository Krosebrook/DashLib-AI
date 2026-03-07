
import React, { useState } from 'react';
import { ShieldAlert, Plus, Trash2, Bell, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight, X, ArrowRight, Settings2, Play, Activity } from 'lucide-react';
import { SecurityRule } from '../types';
import { usePersistentState } from '../hooks/usePersistentState';

interface SecuritySandboxProps {
  onTriggerAlert?: (templateId: string, message: string, severity: 'critical' | 'warning' | 'info') => void;
  templateId?: string;
}

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

const SecuritySandbox: React.FC<SecuritySandboxProps> = ({ onTriggerAlert, templateId }) => {
  const [metric, setMetric] = useState(METRICS[0]);
  const [condition, setCondition] = useState(CONDITIONS[0]);
  const [value, setValue] = useState(10);
  const [rules, setRules] = usePersistentState<SecurityRule[]>('dashlib-security-rules', []);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const addRule = () => {
    const newRule: SecurityRule = {
      id: Math.random().toString(36).substr(2, 9),
      metric,
      condition,
      value,
      enabled: true
    };
    setRules([...rules, newRule]);
    setSimulationLog(prev => [`[System] Added rule: ${metric} ${condition} ${value}`, ...prev]);
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const simulateTraffic = () => {
    setSimulationLog(prev => ["[Simulation] Generating random telemetry...", ...prev]);

    // Simulate random metric values
    const simulatedValues: Record<string, number> = {};
    METRICS.forEach(m => {
      simulatedValues[m] = Math.floor(Math.random() * 50); // Random value 0-50
    });

    // Check rules
    const violatedRule = rules.find(r => {
      if (!r.enabled) return false;
      const simVal = simulatedValues[r.metric];
      if (r.condition === 'greater than') return simVal > r.value;
      if (r.condition === 'less than') return simVal < r.value;
      if (r.condition === 'equal to') return simVal === r.value;
      return false;
    });

    if (violatedRule) {
      setTimeout(() => {
        const violationMsg = `Security Policy Triggered: ${violatedRule.metric} (${simulatedValues[violatedRule.metric]}) exceeded threshold.`;
        
        setSimulationLog(prev => [`[Alert] ${violationMsg}`, ...prev]);
        
        if (onTriggerAlert) {
          onTriggerAlert(templateId || 'security-compliance', violationMsg, 'critical');
        }
      }, 800);
    } else {
      setTimeout(() => {
        setSimulationLog(prev => [`[Info] Traffic normal. No violations detected.`, ...prev]);
      }, 800);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Rule Definition Form */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-900 rounded-2xl">
              <Settings2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Security Policy Builder</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Define Custom Governance Thresholds</p>
            </div>
          </div>
          
          <button 
            onClick={simulateTraffic}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-100 transition-all active:scale-95"
          >
            <Activity className="w-4 h-4" />
            Simulate Traffic
          </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rules Inventory */}
        <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-[2.5rem] p-8">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Active Policy Inventory</h4>
          </div>

          {rules.length === 0 ? (
            <div className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400 font-bold text-sm italic">No active security policies defined.</p>
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

        {/* Simulation Log */}
        <div className="bg-slate-900 text-slate-300 rounded-[2.5rem] p-8 border border-slate-800 flex flex-col h-full max-h-[500px]">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">System Log</h4>
          <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
            {simulationLog.length === 0 && <span className="text-slate-600 italic">Waiting for simulation...</span>}
            {simulationLog.map((log, i) => (
              <div key={i} className="pb-2 border-b border-slate-800/50 last:border-0">
                <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySandbox;
