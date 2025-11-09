import React from 'react';

export default function AppShell({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-gray-900">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600" />
            <span className="font-semibold">AttendanceDoc</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {user ? (
              <>
                <span className="hidden sm:block text-gray-600">Hi, {user.name || 'Guest User'}</span>
                <button
                  onClick={onLogout}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <span className="text-gray-600">Welcome</span>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs text-gray-500">
        Built with ❤️ for students tracking their attendance.
      </footer>
    </div>
  );
}
