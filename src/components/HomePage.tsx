import { useState } from 'react';
import { Music, Video } from 'lucide-react';
import { VideoInfo, DownloadOption, ActiveDownload } from '../types';
import Modal from './Modal';
import SearchBar from './SearchBar';
import ActiveDownloads from './ActiveDownloads';
import { motion } from 'framer-motion';

interface HomePageProps {
  coinBalance: number;
  onDownload: (option: DownloadOption, videoInfo: VideoInfo) => void;
}

export default function HomePage({ coinBalance, onDownload }: HomePageProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [selectedOption, setSelectedOption] = useState<DownloadOption | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeDownloads, setActiveDownloads] = useState<ActiveDownload[]>([]);

  const downloadOptions: DownloadOption[] = [
    { format: 'MP4', quality: '1080p', cost: 50 },
    { format: 'MP4', quality: '720p', cost: 30 },
    { format: 'MP4', quality: '480p', cost: 20 },
    { format: 'MP3', quality: '320kbps', cost: 15 },
    { format: 'MP3', quality: '128kbps', cost: 10 },
  ];

  const fetchVideoInfo = (searchUrl: string) => {
    if (!searchUrl.trim()) return;

    setUrl(searchUrl);
    setLoading(true);
    setTimeout(() => {
      setVideoInfo({
        title: 'Increíble Tutorial de Programación - Aprende React en 2024',
        thumbnail: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600',
        duration: '15:42',
        url: searchUrl,
      });
      setLoading(false);
    }, 1500);
  };

  const handleDownloadClick = (option: DownloadOption) => {
    if (coinBalance < option.cost) {
      return;
    }
    setSelectedOption(option);
    setShowModal(true);
  };

  const confirmDownload = () => {
    if (selectedOption && videoInfo) {
      const downloadId = Date.now().toString();
      const newActiveDownload: ActiveDownload = {
        id: downloadId,
        videoTitle: videoInfo.title,
        progress: 0,
        format: selectedOption.format,
        quality: selectedOption.quality,
        status: 'downloading',
      };

      setActiveDownloads((prev) => [...prev, newActiveDownload]);

      setTimeout(() => {
        setActiveDownloads((prev) =>
          prev.map((d) =>
            d.id === downloadId ? { ...d, progress: 100, status: 'completed' } : d
          )
        );
        onDownload(selectedOption, videoInfo);
      }, 3000);

      const interval = setInterval(() => {
        setActiveDownloads((prev) =>
          prev.map((d) =>
            d.id === downloadId && d.progress < 90
              ? { ...d, progress: d.progress + Math.random() * 30 }
              : d
          )
        );
      }, 500);

      setTimeout(() => clearInterval(interval), 3000);

      setShowModal(false);
      setSelectedOption(null);
      setVideoInfo(null);
      setUrl('');
    }
  };

  const removeActiveDownload = (id: string) => {
    setActiveDownloads((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Descarga Videos de YouTube
          </h1>
          <p className="text-gray-400 text-lg">
            Pega la URL del video y elige tu formato preferido
          </p>
        </motion.div>

        <ActiveDownloads downloads={activeDownloads} onRemove={removeActiveDownload} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 mb-8"
        >
          <SearchBar onSearch={fetchVideoInfo} loading={loading} />

          {videoInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-700 rounded-lg overflow-hidden mb-6">
                <div className="relative">
                  <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-white text-sm font-semibold">
                    {videoInfo.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg">{videoInfo.title}</h3>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-blue-400" />
                  Opciones de descarga
                </h4>
                <div className="grid gap-3">
                  {downloadOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleDownloadClick(option)}
                      disabled={coinBalance < option.cost}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all transform hover:scale-[1.02] ${
                        coinBalance < option.cost
                          ? 'bg-gray-700/50 cursor-not-allowed opacity-50'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {option.format === 'MP4' ? (
                          <Video className="w-5 h-5 text-blue-400" />
                        ) : (
                          <Music className="w-5 h-5 text-purple-400" />
                        )}
                        <div className="text-left">
                          <p className="text-white font-semibold">
                            {option.format} - {option.quality}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {option.format === 'MP4' ? 'Video' : 'Solo audio'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${coinBalance < option.cost ? 'text-gray-500' : 'text-yellow-400'}`}>
                          {option.cost}
                        </span>
                        <span className="text-gray-400">monedas</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Confirmar descarga"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            ¿Confirmas la descarga de este video?
          </p>
          {selectedOption && (
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Formato:</span>
                <span className="text-white font-semibold">
                  {selectedOption.format} - {selectedOption.quality}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Costo:</span>
                <span className="text-yellow-400 font-bold">
                  {selectedOption.cost} monedas
                </span>
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDownload}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg transition-all font-semibold"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
