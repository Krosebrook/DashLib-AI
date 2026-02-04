
import React from 'react';
import { LayoutDashboard, MessageSquare, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onOpenAdvisor: () => void;
  onOpenDocs: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onOpenAdvisor, onOpenDocs }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">DashLib AI</h1>
              <span className="text-xs text-indigo-600 font-medium tracking-wide uppercase">50+ Template Library</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenDocs}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all text-sm font-semibold"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Documentation</span>
            </button>
            <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
            <button 
              onClick={onOpenAdvisor}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-sm font-medium shadow-sm hover:shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI Architect</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2025 DashLib AI. Optimized for React 18 & Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
