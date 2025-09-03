import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Reports] crashed:", error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-300">
          <div className="text-lg mb-1">Something went wrong on Reports.</div>
          <div className="text-sm opacity-80">
            {String(this.state.error?.message || "")}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
