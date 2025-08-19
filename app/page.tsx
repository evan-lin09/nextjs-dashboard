'use client';
import TokenCard from './components/TokenCard';

// 模拟数据 - 新创建的代币
const newTokens = [
  {
    address: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr',
    name: 'POPCAT',
    symbol: 'POPCAT',
    imageUrl: '/customers/balazs-orban.png',
    createdAt: '2分钟前',
    marketCap: '$12K',
    price: '$0.0012',
    priceChange24h: 0,
    volume24h: '$1.2K',
    holders: 23,
    liquidity: '$5.6K',
    status: 'creating' as const,
    progress: 15,
    bondingCurve: '2.1 SOL',
    socialLinks: {
      twitter: 'https://twitter.com/popcat',
      website: 'https://popcat.click',
      telegram: 'https://t.me/popcat',
    },
    isNew: true,
    isTrending: false,
  },
  {
    address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
    name: 'MEMECOIN',
    symbol: 'MEME',
    imageUrl: '/customers/evil-rabbit.png',
    createdAt: '5分钟前',
    marketCap: '$8K',
    price: '$0.0008',
    priceChange24h: 0,
    volume24h: '$800',
    holders: 12,
    liquidity: '$3.2K',
    status: 'creating' as const,
    progress: 8,
    bondingCurve: '0.8 SOL',
    socialLinks: {
      twitter: 'https://twitter.com/memecoin',
      telegram: 'https://t.me/memecoin',
    },
    isNew: true,
    isTrending: false,
  },
  {
    address: 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2',
    name: 'SHIBA INU',
    symbol: 'SHIB',
    imageUrl: '/customers/amy-burns.png',
    createdAt: '8分钟前',
    marketCap: '$5K',
    price: '$0.0005',
    priceChange24h: 0,
    volume24h: '$450',
    holders: 8,
    liquidity: '$2.1K',
    status: 'creating' as const,
    progress: 5,
    bondingCurve: '0.5 SOL',
    socialLinks: {
      twitter: 'https://twitter.com/shibainu',
    },
    isNew: true,
    isTrending: false,
  },
  {
    address: 'X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2',
    name: 'DOGE KILLER',
    symbol: 'KILL',
    imageUrl: '/customers/lee-robinson.png',
    createdAt: '12分钟前',
    marketCap: '$15K',
    price: '$0.0015',
    priceChange24h: 0,
    volume24h: '$2.1K',
    holders: 35,
    liquidity: '$7.8K',
    status: 'creating' as const,
    progress: 18,
    bondingCurve: '2.8 SOL',
    socialLinks: {
      telegram: 'https://t.me/dogekiller',
    },
    isNew: true,
    isTrending: false,
  },
  {
    address: 'M1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4A5B6C7D8E9F0G1H2',
    name: 'MOON ROCKET',
    symbol: 'MOON',
    imageUrl: '/customers/michael-novotny.png',
    createdAt: '15分钟前',
    marketCap: '$3K',
    price: '$0.0003',
    priceChange24h: 0,
    volume24h: '$320',
    holders: 6,
    liquidity: '$1.5K',
    status: 'creating' as const,
    progress: 3,
    bondingCurve: '0.3 SOL',
    socialLinks: {
      website: 'https://moonrocket.com',
    },
    isNew: true,
    isTrending: false,
  },
];

// 即将打满的代币
const bondingTokens = [
  {
    address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
    name: 'DOGE KILLER',
    symbol: 'KILLER',
    imageUrl: '/customers/lee-robinson.png',
    createdAt: '2小时前',
    marketCap: '$890K',
    price: '$0.89',
    priceChange24h: 245.67,
    volume24h: '$45.2K',
    holders: 1234,
    liquidity: '$56K',
    status: 'bonding' as const,
    progress: 87,
    bondingCurve: '67.3 SOL',
    socialLinks: {
      twitter: 'https://twitter.com/dogekiller',
      website: 'https://dogekiller.com',
    },
    isNew: false,
    isTrending: true,
  },
  {
    address: 'So11111111111111111111111111111111111111112',
    name: 'MOON SHOT',
    symbol: 'MOON',
    imageUrl: '/customers/michael-novotny.png',
    createdAt: '4小时前',
    marketCap: '$750K',
    price: '$0.75',
    priceChange24h: 156.43,
    volume24h: '$23.1K',
    holders: 987,
    liquidity: '$43K',
    status: 'bonding' as const,
    progress: 73,
    bondingCurve: '54.2 SOL',
    socialLinks: {
      telegram: 'https://t.me/moonshot',
    },
    isNew: false,
    isTrending: true,
  },
  {
    address: 'B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2',
    name: 'PEPE MAGIC',
    symbol: 'PEPE',
    imageUrl: '/customers/amy-burns.png',
    createdAt: '6小时前',
    marketCap: '$650K',
    price: '$0.65',
    priceChange24h: 89.34,
    volume24h: '$18.7K',
    holders: 789,
    liquidity: '$32K',
    status: 'bonding' as const,
    progress: 91,
    bondingCurve: '71.2 SOL',
    socialLinks: {
      twitter: 'https://twitter.com/pepemagic',
      website: 'https://pepemagic.io',
    },
    isNew: false,
    isTrending: true,
  },
];

// 已开盘的代币
const graduatedTokens = [
  {
    address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
    name: 'BONK',
    symbol: 'BONK',
    imageUrl: '/customers/delba-de-oliveira.png',
    createdAt: '1天前',
    marketCap: '$2.8B',
    price: '$0.000045',
    priceChange24h: 8.92,
    volume24h: '$123M',
    holders: 234560,
    liquidity: '$15.3M',
    status: 'graduated' as const,
    socialLinks: {
      twitter: 'https://twitter.com/bonk_inu',
      website: 'https://bonkcoin.com',
    },
    isNew: false,
    isTrending: true,
  },
  {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    name: 'PEPE COIN',
    symbol: 'PEPE',
    imageUrl: '/customers/amy-burns.png',
    createdAt: '3天前',
    marketCap: '$1.2B',
    price: '$0.000012',
    priceChange24h: -5.23,
    volume24h: '$67M',
    holders: 156780,
    liquidity: '$8.9M',
    status: 'graduated' as const,
    socialLinks: {
      website: 'https://pepecoin.com',
      twitter: 'https://twitter.com/pepecoin',
    },
    isNew: false,
    isTrending: false,
  },
  {
    address: 'C1D2E3F4G5H6I7J8K9L0M1N2O3P4Q5R6S7T8U9V0W1X2',
    name: 'SOLANA SHIBA',
    symbol: 'SSHIB',
    imageUrl: '/customers/balazs-orban.png',
    createdAt: '2天前',
    marketCap: '$850M',
    price: '$0.000085',
    priceChange24h: 15.67,
    volume24h: '$45M',
    holders: 189450,
    liquidity: '$12.1M',
    status: 'graduated' as const,
    socialLinks: {
      twitter: 'https://twitter.com/solanashiba',
      telegram: 'https://t.me/solanashiba',
    },
    isNew: false,
    isTrending: true,
  },
  {
    address: 'D1E2F3G4H5I6J7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2',
    name: 'WOJAK COIN',
    symbol: 'WOJAK',
    imageUrl: '/customers/evil-rabbit.png',
    createdAt: '5天前',
    marketCap: '$450M',
    price: '$0.00045',
    priceChange24h: -12.45,
    volume24h: '$28M',
    holders: 98760,
    liquidity: '$6.7M',
    status: 'graduated' as const,
    socialLinks: {
      website: 'https://wojakcoin.com',
    },
    isNew: false,
    isTrending: false,
  },
];

export default function Page() {
  return (
    <div className="flex flex-col h-full space-y-4">
        <div className="flex items-center justify-between flex-shrink-0">
          <h1 className="text-xl font-bold text-white">代币大厅</h1>
          <div className="text-sm text-gray-400">
            实时更新 • {newTokens.length + bondingTokens.length + graduatedTokens.length} 个代币
          </div>
        </div>
        
        {/* 三列自适应布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-0 flex-1">
          {/* 新创建 */}
          <div className="flex flex-col min-h-0">
            <div className="flex items-center justify-between p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-t-lg flex-shrink-0">
              <h2 className="text-sm font-semibold text-white flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>新创建</span>
              </h2>
              <span className="text-xs text-gray-400">{newTokens.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-900/30 border-l border-r border-b border-gray-700 rounded-b-lg min-h-0">
              <div className="space-y-0">
                {newTokens.map((token) => (
                  <TokenCard key={token.address} {...token} />
                ))}
              </div>
            </div>
          </div>

          {/* 即将打满 */}
          <div className="flex flex-col min-h-0">
            <div className="flex items-center justify-between p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-t-lg flex-shrink-0">
              <h2 className="text-sm font-semibold text-white flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>即将打满</span>
              </h2>
              <span className="text-xs text-gray-400">{bondingTokens.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-900/30 border-l border-r border-b border-gray-700 rounded-b-lg min-h-0">
              <div className="space-y-0">
                {bondingTokens.map((token) => (
                  <TokenCard key={token.address} {...token} />
                ))}
              </div>
            </div>
          </div>

          {/* 已开盘 */}
          <div className="flex flex-col min-h-0">
            <div className="flex items-center justify-between p-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-t-lg flex-shrink-0">
              <h2 className="text-sm font-semibold text-white flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>已开盘</span>
              </h2>
              <span className="text-xs text-gray-400">{graduatedTokens.length}</span>
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-900/30 border-l border-r border-b border-gray-700 rounded-b-lg min-h-0">
              <div className="space-y-0">
                {graduatedTokens.map((token) => (
                  <TokenCard key={token.address} {...token} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
