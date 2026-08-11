// @ts-nocheck
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught Error Boundary caught error:", error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 shadow-lg">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold text-zinc-100 mb-2">
            {this.props.fallbackTitle || "Something went wrong rendering the UI"}
          </h1>
          <p className="text-xs text-zinc-400 max-w-md mb-6 leading-relaxed">
            {this.state.error?.message || "An unexpected error occurred while processing the schema layout."}
          </p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Application</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
