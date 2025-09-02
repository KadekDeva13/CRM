import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("[Reports] crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-300">
          <div className="text-lg mb-1">Something went wrong on Reports.</div>
          <div className="text-sm opacity-80">{String(this.state.error?.message || "")}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
    