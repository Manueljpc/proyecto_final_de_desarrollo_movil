export interface Download {
  id: string;
  videoTitle: string;
  videoThumbnail: string;
  format: string;
  quality: string;
  cost: number;
  date: Date;
  fileSize: string;
  resolution: string;
}

export interface DownloadOption {
  format: string;
  quality: string;
  cost: number;
}

export interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
}

export interface CoinPackage {
  id: string;
  coins: number;
  price: number;
  popular?: boolean;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface ActiveDownload {
  id: string;
  videoTitle: string;
  progress: number;
  format: string;
  quality: string;
  status: 'downloading' | 'completed' | 'failed';
}

export interface UserSettings {
  theme: 'dark' | 'light';
  savePath: string;
  autoNotify: boolean;
}

export interface DownloadStats {
  fileSize: string;
  resolution: string;
}
