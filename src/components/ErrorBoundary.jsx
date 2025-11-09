import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Unexpected error' };
  }

  componentDidCatch(error, info) {
    // You could log this to an error reporting service
    // console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-6 w-full max-w-3xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <p className="font-semibold">Something went wrong rendering this section.</p>
          <p className="mt-1">{this.state.message}</p>
          <p className="mt-2 text-xs text-red-600/80">Try reloading the page. If the issue persists, continue without the 3D header.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
