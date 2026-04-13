import { Download, Music, Video, Calendar, Coins } from 'lucide-react';
import { Download as DownloadType } from '../types';

interface HistoryPageProps {
  downloads: DownloadType[];
}

export default function HistoryPage({ downloads }: HistoryPageProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const totalSpent = downloads.reduce((sum, d) => sum + d.cost, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Historial de Descargas
          </h1>
          <p className="text-gray-400 text-lg">
            Revisa todas tus descargas anteriores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Download className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-400">Total descargas</p>
            </div>
            <p className="text-3xl font-bold text-white">{downloads.length}</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-yellow-600 p-2 rounded-lg">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-400">Monedas gastadas</p>
            </div>
            <p className="text-3xl font-bold text-white">{totalSpent}</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Video className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-400">Formato favorito</p>
            </div>
            <p className="text-3xl font-bold text-white">
              {downloads.length > 0 ? downloads[0].format : 'N/A'}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {downloads.length === 0 ? (
            <div className="text-center py-16">
              <Download className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No hay descargas aún
              </h3>
              <p className="text-gray-500">
                Tus descargas aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {downloads.map((download) => (
                <div
                  key={download.id}
                  className="p-6 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={download.videoThumbnail}
                        alt={download.videoTitle}
                        className="w-32 h-20 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold mb-2 truncate">
                        {download.videoTitle}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                          {download.format === 'MP4' ? (
                            <Video className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Music className="w-4 h-4 text-purple-400" />
                          )}
                          <span>
                            {download.format} - {download.quality}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(download.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <span className="text-blue-400 font-semibold">{download.resolution}</span>
                          <span>•</span>
                          <span>{download.fileSize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">
                            {download.cost} monedas
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
