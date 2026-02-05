
import React from 'react';
import { LayoutDashboard, MessageSquare, BookOpen, Settings, Bell, User, Search as SearchIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onOpenAdvisor: () => void;
  onOpenDocs: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenAdvisor, onOpenDocs }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900">
      {/* Top Navigation - Glassmorphism */}
      <header 
        className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 h-16 flex items-center"
        role="banner"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm group-hover:shadow-indigo-200 transition-all">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-slate-900 leading-tight">DashLib <span className="text-indigo-600">AI</span></h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Platform v2.1</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main Navigation">
              {['Inventory', 'Workbench', 'Governance', 'Analytics'].map((item) => (
                <button 
                  key={item}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${item === 'Inventory' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 w-64 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <SearchIcon className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Jump to..." 
                className="bg-transparent border-none focus:outline-none text-xs ml-2 w-full font-medium"
                aria-label="Global search"
              />
              <span className="text-[10px] bg-white border border-slate-200 px-1 rounded text-slate-400 font-bold">⌘K</span>
            </div>

            <div className="flex items-center gap-1 border-l border-slate-200 pl-4">
              <button 
                onClick={onOpenDocs}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all relative"
                aria-label="Open Documentation"
              >
                <BookOpen className="w-5 h-5" />
              </button>
              <button 
                onClick={onOpenAdvisor}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all relative"
                aria-label="Ask Assistant"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
              </button>
              <button 
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 ml-2 overflow-hidden flex items-center justify-center">
                <User className="w-5 h-5 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] mx-auto w-full">
        {/* Left Mini Sidebar - Desktop */}
        <aside className="hidden md:flex w-16 flex-col items-center py-8 gap-6 border-r border-slate-200 shrink-0" role="complementary">
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-px bg-slate-200"></div>
          {['1', '2', '3'].map(i => (
            <div key={i} className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border border-transparent hover:border-slate-300"></div>
          ))}
        </aside>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8 min-w-0" role="main">
          {children}
        </main>
      </div>

      <footer className="bg-white border-t border-slate-200 py-10 mt-auto" role="contentinfo">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-500 tracking-tight uppercase">DashLib Enterprise Edition</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-slate-900">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900">API Terms</a>
            <a href="#" className="hover:text-slate-900">Help Center</a>
          </div>
          <p className="text-xs text-slate-400 font-medium">© 2025 DashLib AI Ecosystem</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
