import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CoinsPage from './components/CoinsPage';
import HistoryPage from './components/HistoryPage';
import SettingsPage from './components/SettingsPage';
import Toast from './components/Toast';
import { Download, DownloadOption, VideoInfo, Toast as ToastType, UserSettings, DownloadStats } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [coinBalance, setCoinBalance] = useState(120);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    theme: 'dark',
    savePath: '/home/usuario/Descargas',
    autoNotify: true,
  });

  useEffect(() => {
    const savedBalance = localStorage.getItem('coinBalance');
    const savedDownloads = localStorage.getItem('downloads');
    const savedSettings = localStorage.getItem('settings');

    if (savedBalance) {
      setCoinBalance(parseInt(savedBalance));
    }
    if (savedDownloads) {
      const parsedDownloads = JSON.parse(savedDownloads);
      setDownloads(parsedDownloads.map((d: Download) => ({
        ...d,
        date: new Date(d.date)
      })));
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('coinBalance', coinBalance.toString());
  }, [coinBalance]);

  useEffect(() => {
    localStorage.setItem('downloads', JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const addToast = (message: string, type: ToastType['type']) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getDownloadStats = (quality: string, format: string): DownloadStats => {
    const qualityMap: { [key: string]: string } = {
      '1080p': '1920x1080',
      '720p': '1280x720',
      '480p': '854x480',
      '320kbps': '320kbps',
      '128kbps': '128kbps',
    };

    const fileSizeMap: { [key: string]: string } = {
      '1080p': '450-600 MB',
      '720p': '200-300 MB',
      '480p': '80-150 MB',
      '320kbps': '8-12 MB',
      '128kbps': '3-5 MB',
    };

    return {
      resolution: qualityMap[quality] || quality,
      fileSize: fileSizeMap[quality] || '20-50 MB',
    };
  };

  const handleDownload = (option: DownloadOption, videoInfo: VideoInfo) => {
    if (coinBalance < option.cost) {
      addToast('No tienes suficientes monedas', 'error');
      return;
    }

    const stats = getDownloadStats(option.quality, option.format);

    const newDownload: Download = {
      id: Date.now().toString(),
      videoTitle: videoInfo.title,
      videoThumbnail: videoInfo.thumbnail,
      format: option.format,
      quality: option.quality,
      cost: option.cost,
      date: new Date(),
      fileSize: stats.fileSize,
      resolution: stats.resolution,
    };

    setCoinBalance((prev) => prev - option.cost);
    setDownloads((prev) => [newDownload, ...prev]);
    addToast(`¡Descarga iniciada! Se descontaron ${option.cost} monedas`, 'success');
  };

  const handlePurchase = (coins: number) => {
    setCoinBalance((prev) => prev + coins);
    addToast(`¡Compra exitosa! Se agregaron ${coins} monedas`, 'success');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        coinBalance={coinBalance}
      />

      {currentPage === 'home' && (
        <HomePage coinBalance={coinBalance} onDownload={handleDownload} />
      )}
      {currentPage === 'coins' && <CoinsPage onPurchase={handlePurchase} />}
      {currentPage === 'history' && <HistoryPage downloads={downloads} />}
      {currentPage === 'settings' && (
        <SettingsPage settings={settings} onSettingsChange={setSettings} />
      )}

      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </div>
  );
}

export default App;
