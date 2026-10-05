'use client';

interface NavbarProps {
  onToggleSidebar: () => void;
  title?: string;
}

export default function Navbar({ onToggleSidebar, title = 'AgriLink' }: NavbarProps) {
  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Toggle Button for Sidebar */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 focus:outline-none transition-colors"
          title="Toggle Navigation Menu"
        >
          ☰
        </button>
        <h1 className="text-xl font-bold text-emerald-400">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-300">Rahim Uddin</span>
        <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
          RU
        </div>
      </div>
    </header>
  );
}