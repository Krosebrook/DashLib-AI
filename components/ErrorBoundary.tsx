import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// TypeScript: explicitly declare inherited members because React 19 ships without
// bundled type declarations and @types/react is not installed in this project.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare props: Readonly<ErrorBoundaryProps>;
  declare setState: (state: Partial<ErrorBoundaryState> | ((prev: ErrorBoundaryState) => Partial<ErrorBoundaryState>)) => void;
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-12 max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">Something went wrong</h2>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              An unexpected error occurred. Try refreshing the page or resetting the view.
            </p>
            {this.state.error && (
              <pre className="text-left text-xs bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 overflow-auto max-h-32 text-red-600 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-colors active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                Reset View
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-colors active:scale-95"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
