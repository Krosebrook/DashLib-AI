
import React, { useState } from 'react';
import { ShieldAlert, Plus, Save, Trash2, Bell, CheckCircle2, AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react';

interface Rule {
  id: string;
  metric: string;
  condition: string;
  value: number;
  enabled: boolean;
}

const SecuritySandbox: React.FC = () => {
  const [metric, setMetric] = useState('Failed Login Attempts');
  const [condition, setCondition] = useState('greater than');
  const [value, setValue] = useState(10);
  const [rules, setRules] = useState<Rule[]>([
    { id: '1', metric: 'Policy Violations', condition: 'greater than', value: 0, enabled: true },
    { id: '2', metric: 'Security Incidents', condition: 'equal to', value: 1, enabled: false }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      metric,
      condition,
      value,
      enabled: true
    };
    setRules([newRule, ...rules]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Define Custom Alert Rule</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">Module: SOC2 Governance</span>
        </div>

        <div className="grid md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Metric</label>
            <select 
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none hover:bg-white transition-all cursor-pointer"
            >
              <option>Failed Login Attempts</option>
              <option>Policy Violations</option>
              <option>Data Access Events</option>
              <option>Security Incidents</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Condition</label>
            <select 
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none hover:bg-white transition-all cursor-pointer"
            >
              <option value="greater than">Greater than</option>
              <option value="less than">Less than</option>
              <option value="equal to">Equal to</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Value</label>
            <input 
              type="number"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none hover:bg-white transition-all"
            />
          </div>

          <button 
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
          >
            <Plus className="w-4 h-4" />
            Save Rule
          </button>
        </div>

        {showSuccess && (
          <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            New security threshold committed to registry
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white uppercase tracking-wider text-xs">Active Security Rules List</h3>
          </div>
          <div className="text-[10px] font-mono text-slate-500">LAST SYNC: JUST NOW</div>
        </div>

        <div className="space-y-3">
          {rules.length === 0 ? (
            <div className="py-12 text-center text-slate-600 border border-dashed border-slate-800 rounded-xl bg-slate-900/50">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-sm">No active custom rules found.</p>
            </div>
          ) : (
            rules.map((rule) => (
              <div 
                key={rule.id} 
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-xl transition-all group ${
                  rule.enabled 
                    ? 'bg-slate-800/40 border-slate-700 hover:border-indigo-500/50' 
                    : 'bg-slate-900/40 border-slate-800 opacity-60 grayscale hover:grayscale-0'
                }`}
              >
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <div className={`w-2.5 h-2.5 rounded-full ${rule.enabled ? 'bg-indigo-500 animate-pulse' : 'bg-slate-600 shadow-none'}`}></div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">
                      When <span className="text-indigo-400">{rule.metric}</span> is <span className="italic text-slate-400">{rule.condition}</span> <span className="text-white font-mono">{rule.value}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase font-bold flex items-center gap-2">
                      <Bell className="w-3 h-3" /> Notify Security Lead via Slack
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 ml-auto sm:ml-0">
                  <button 
                    onClick={() => toggleRule(rule.id)}
                    className="p-1 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {rule.enabled ? (
                      <ToggleRight className="w-8 h-8 text-indigo-500" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-slate-600" />
                    )}
                  </button>
                  <button 
                    onClick={() => deleteRule(rule.id)}
                    className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SecuritySandbox;
