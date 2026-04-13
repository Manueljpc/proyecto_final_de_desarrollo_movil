import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { Toast as ToastType } from '../types';

interface ToastProps {
  toast: ToastType;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="flex items-center gap-3 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg min-w-[300px] animate-slide-in">
      <div className={`${colors[toast.type]} p-1 rounded`}>
        {icons[toast.type]}
      </div>
      <p className="flex-1 text-sm">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
