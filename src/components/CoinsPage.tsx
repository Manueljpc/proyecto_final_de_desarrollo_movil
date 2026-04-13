import { Coins, Sparkles, Zap, Crown } from 'lucide-react';
import { CoinPackage } from '../types';

interface CoinsPageProps {
  onPurchase: (coins: number) => void;
}

export default function CoinsPage({ onPurchase }: CoinsPageProps) {
  const packages: CoinPackage[] = [
    { id: '1', coins: 100, price: 4.99 },
    { id: '2', coins: 500, price: 19.99, popular: true },
    { id: '3', coins: 1000, price: 34.99 },
    { id: '4', coins: 2500, price: 79.99 },
  ];

  const getIcon = (coins: number) => {
    if (coins >= 2500) return <Crown className="w-8 h-8" />;
    if (coins >= 1000) return <Zap className="w-8 h-8" />;
    if (coins >= 500) return <Sparkles className="w-8 h-8" />;
    return <Coins className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Comprar Monedas
          </h1>
          <p className="text-gray-400 text-lg">
            Elige el paquete perfecto para tus necesidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-gray-800 rounded-xl p-6 transition-all transform hover:scale-105 hover:shadow-2xl ${
                pkg.popular ? 'ring-2 ring-yellow-500' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-4 rounded-full mb-4 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    : 'bg-gray-700'
                }`}>
                  <div className="text-white">
                    {getIcon(pkg.coins)}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {pkg.coins}
                </h3>
                <p className="text-gray-400">monedas</p>
              </div>

              <div className="text-center mb-6">
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  ${pkg.price}
                </p>
                <p className="text-gray-500 text-sm mt-1">USD</p>
              </div>

              <button
                onClick={() => onPurchase(pkg.coins)}
                className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                Comprar ahora
              </button>

              {pkg.coins >= 500 && (
                <div className="mt-4 text-center">
                  <span className="text-green-400 text-sm font-semibold">
                    {pkg.coins >= 2500 ? '40% de descuento' : pkg.coins >= 1000 ? '30% de descuento' : '20% de descuento'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            ¿Por qué comprar monedas?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="bg-blue-600 p-3 rounded-lg h-fit">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Descargas rápidas</h3>
                <p className="text-gray-400 text-sm">
                  Obtén acceso instantáneo a todos tus videos favoritos
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-purple-600 p-3 rounded-lg h-fit">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Alta calidad</h3>
                <p className="text-gray-400 text-sm">
                  Descarga en resoluciones hasta 1080p
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-yellow-600 p-3 rounded-lg h-fit">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Sin límites</h3>
                <p className="text-gray-400 text-sm">
                  Las monedas nunca expiran, úsalas cuando quieras
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
