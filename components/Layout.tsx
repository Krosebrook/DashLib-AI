
import React from 'react';
import { LayoutDashboard, MessageSquare, BookOpen, Settings, Bell, User, Search as SearchIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onOpenAdvisor: () => void;
  onOpenDocs: () => void;
  bannerSlot?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenAdvisor, onOpenDocs, bannerSlot }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* Top Navigation - Glassmorphism */}
      <header 
        className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[55] h-16 flex items-center"
        role="banner"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm group-hover:shadow-indigo-300 transition-all">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">DashLib <span className="text-indigo-600">AI</span></h1>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">Enterprise OS</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main Navigation">
              {['Inventory', 'Workbench', 'Governance', 'Analytics'].map((item) => (
                <button 
                  key={item}
                  className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${item === 'Inventory' ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all">
              <SearchIcon className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="bg-transparent border-none focus:outline-none text-xs ml-2 w-full font-semibold"
                aria-label="Global search"
              />
              <span className="text-[9px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-black">⌘K</span>
            </div>

            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
              <button 
                onClick={onOpenDocs}
                className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all relative"
                title="Documentation"
              >
                <BookOpen className="w-5 h-5" />
              </button>
              <button 
                onClick={onOpenAdvisor}
                className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all relative"
                title="AI Architect Advisor"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
              </button>
              <button 
                className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 ml-2 overflow-hidden flex items-center justify-center text-white text-xs font-black shadow-lg shadow-slate-200">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Persistent Banner Slot */}
      {bannerSlot}

      <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] mx-auto w-full">
        {/* Left Mini Sidebar - Desktop */}
        <aside className="hidden md:flex w-20 flex-col items-center py-10 gap-8 border-r border-slate-200 shrink-0" role="complementary">
          <div className="space-y-6">
            <button className="p-3.5 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm hover:shadow-lg active:scale-95">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-10 h-px bg-slate-200 mx-auto"></div>
            {['1', '2', '3'].map(i => (
              <div key={i} className="w-12 h-12 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 transition-all cursor-pointer flex items-center justify-center group shadow-sm active:scale-95">
                <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors"></div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 px-4 sm:px-6 lg:px-12 py-10 min-w-0" role="main">
          {children}
        </main>
      </div>

      <footer className="bg-white border-t border-slate-200 py-12" role="contentinfo">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <LayoutDashboard className="w-6 h-6 text-indigo-600" />
                <span className="text-xl font-black text-slate-900 tracking-tight uppercase">DashLib AI</span>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
                Engineering the next generation of enterprise observability. Powered by Gemini 3 Pro and built for professional frontend engineers.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Platform</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">Inventory</a></li>
                <li><a href="#" className="hover:text-indigo-600">Magic Generator</a></li>
                <li><a href="#" className="hover:text-indigo-600">API Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Support</h4>
              <ul className="space-y-3 text-sm font-bold text-slate-600">
                <li><a href="#" className="hover:text-indigo-600">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-600">Security Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Status Page</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 font-medium">© 2025 DashLib Ecosystem. All rights reserved.</p>
            <div className="flex gap-8 text-xs font-black text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-slate-900">Privacy</a>
              <a href="#" className="hover:text-slate-900">Terms</a>
              <a href="#" className="hover:text-slate-900">Global Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
