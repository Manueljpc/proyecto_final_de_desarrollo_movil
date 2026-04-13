import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActiveDownload } from '../types';

interface ActiveDownloadsProps {
  downloads: ActiveDownload[];
  onRemove: (id: string) => void;
}

export default function ActiveDownloads({ downloads, onRemove }: ActiveDownloadsProps) {
  if (downloads.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700"
    >
      <h3 className="text-lg font-bold text-white mb-4">Descargas Activas</h3>

      <div className="space-y-4">
        <AnimatePresence>
          {downloads.map((download) => (
            <motion.div
              key={download.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-white font-semibold truncate">
                    {download.videoTitle}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {download.format} - {download.quality}
                  </p>
                </div>
                {download.status === 'completed' && (
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 ml-2" />
                )}
                {download.status === 'failed' && (
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 ml-2" />
                )}
              </div>

              <div className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-xs">Progreso</span>
                  <span className="text-blue-400 text-xs font-semibold">
                    {download.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${download.progress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>

              <button
                onClick={() => onRemove(download.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
