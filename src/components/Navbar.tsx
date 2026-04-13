import { Download, Coins, History, User, Settings } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  coinBalance: number;
}

export default function Navbar({ currentPage, onNavigate, coinBalance }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              VidDownloader
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'home'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Descargar</span>
            </button>

            <button
              onClick={() => onNavigate('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'history'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Historial</span>
            </button>

            <button
              onClick={() => onNavigate('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 'settings'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Ajustes</span>
            </button>

            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-700">
              <button
                onClick={() => onNavigate('coins')}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 px-4 py-2 rounded-lg transition-all transform hover:scale-105"
              >
                <Coins className="w-4 h-4 text-white" />
                <span className="text-white font-bold">{coinBalance}</span>
              </button>

              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
