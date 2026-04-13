import { Settings, Moon, Sun, FolderOpen, Bell, RefreshCw } from 'lucide-react';
import { UserSettings } from '../types';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SettingsPageProps {
  settings: UserSettings;
  onSettingsChange: (settings: UserSettings) => void;
}

export default function SettingsPage({ settings, onSettingsChange }: SettingsPageProps) {
  const [currentVersion] = useState('1.0.0');
  const [updateChecking, setUpdateChecking] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const handleThemeChange = (theme: 'dark' | 'light') => {
    onSettingsChange({ ...settings, theme });
  };

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, savePath: e.target.value });
  };

  const handleNotificationChange = () => {
    onSettingsChange({ ...settings, autoNotify: !settings.autoNotify });
  };

  const checkForUpdates = () => {
    setUpdateChecking(true);
    setTimeout(() => {
      setUpdateMessage('Ya tienes la última versión instalada (v1.0.0)');
      setUpdateChecking(false);
      setTimeout(() => setUpdateMessage(''), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Ajustes
          </h1>
          <p className="text-gray-400 text-lg">
            Personaliza tu experiencia
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sun className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Tema</h2>
            </div>
            <p className="text-gray-400 mb-4">Selecciona tu tema preferido</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  settings.theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Moon className="w-4 h-4" />
                Oscuro
              </button>
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  settings.theme === 'light'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Sun className="w-4 h-4" />
                Claro
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <FolderOpen className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Ruta de Guardado</h2>
            </div>
            <p className="text-gray-400 mb-4">Especifica dónde guardar tus descargas</p>
            <input
              type="text"
              value={settings.savePath}
              onChange={handlePathChange}
              placeholder="/home/usuario/Descargas"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-gray-500 text-sm mt-2">
              Esta es una simulación. En una aplicación real, esto permitiría elegir una carpeta.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-purple-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Notificaciones</h2>
                  <p className="text-gray-400 text-sm">
                    Recibe alertas cuando se completen las descargas
                  </p>
                </div>
              </div>
              <button
                onClick={handleNotificationChange}
                className={`px-4 py-2 rounded-lg transition-all ${
                  settings.autoNotify
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {settings.autoNotify ? 'Activadas' : 'Desactivadas'}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-white">Actualizaciones</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Versión actual: <span className="text-white font-semibold">{currentVersion}</span></p>
                {updateMessage && (
                  <p className="text-green-400 text-sm mt-2">{updateMessage}</p>
                )}
              </div>
              <button
                onClick={checkForUpdates}
                disabled={updateChecking}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 px-4 py-2 rounded-lg text-white transition-all"
              >
                {updateChecking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Buscar actualizaciones
                  </>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-3 mb-3">
              <Settings className="w-6 h-6 text-gray-400" />
              <h3 className="text-lg font-bold text-gray-300">Información</h3>
            </div>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• Esta es una aplicación de demostración</li>
              <li>• Los datos se guardan localmente en tu navegador</li>
              <li>• Las descargas se simulan sin conexión real</li>
              <li>• Los ajustes se aplican inmediatamente</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
