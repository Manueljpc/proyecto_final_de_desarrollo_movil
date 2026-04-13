import { useState } from 'react';
import { Download, Clipboard, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (url: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al pegar del portapapeles:', err);
    }
  };

  const handleSearch = () => {
    if (url.trim()) {
      onSearch(url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full space-y-4"
    >
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="flex-1 bg-gray-700/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          disabled={loading || !url.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:transform-none flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Buscar</span>
            </>
          )}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center"
      >
        <button
          onClick={handlePaste}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
            copied
              ? 'bg-green-600/30 text-green-400'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          <Clipboard className="w-4 h-4" />
          <span className="text-sm font-medium">
            {copied ? 'Pegado!' : 'Pegar desde portapapeles'}
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}
