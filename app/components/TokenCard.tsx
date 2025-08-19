import Link from 'next/link';
import { Twitter, Globe, MessageCircle, Copy, Search, Users, Zap, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface TokenCardProps {
  address: string;
  name: string;
  symbol: string;
  imageUrl: string;
  createdAt: string;
  marketCap: string;
  price: string;
  priceChange24h: number;
  volume24h: string;
  holders: number;
  liquidity: string;
  progress?: number;
  bondingCurve?: string;
  status: 'creating' | 'bonding' | 'graduated';
  socialLinks: {
    twitter?: string;
    website?: string;
    telegram?: string;
  };
  isNew?: boolean;
  isTrending?: boolean;
}

export default function TokenCard({
  address,
  name,
  symbol,
  imageUrl,
  createdAt,
  marketCap,
  price,
  priceChange24h,
  volume24h,
  holders,
  liquidity,
  progress = 0,
  bondingCurve = '0 SOL',
  status,
  socialLinks,
  isNew = false,
  isTrending = false,
}: TokenCardProps) {
  const isPositive = priceChange24h >= 0;

  const copyAddress = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(address);
  };

  const searchToken = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('搜索代币:', symbol);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('买入:', symbol);
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'creating':
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-400 bg-blue-500/10">
            新创建
          </Badge>
        );
      case 'bonding':
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-400 bg-yellow-500/10">
            即将打满
          </Badge>
        );
      case 'graduated':
        return (
          <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
            已开盘
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:bg-gray-800/50 transition-all duration-200 cursor-pointer border-b border-l-0 border-r-0 border-t-0 first:border-t rounded-none">
      <Link href={`/token/${address}`} className="block">
        <div className="flex items-center gap-4 p-4">
          {/* 左侧：头像 */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {symbol.charAt(0)}
              </div>
              {isNew && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
              )}
            </div>
          </div>

          {/* 中间：内容区域 */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* 第一行：名称、状态和描述 */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-white text-base truncate">{symbol}</h3>
              {getStatusBadge()}
              <span className="text-gray-400 text-sm truncate">{name}</span>
              
              {/* 操作图标 */}
              <div className="flex items-center gap-1 ml-auto">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-500 hover:text-white"
                  onClick={copyAddress}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-gray-500 hover:text-white"
                  onClick={searchToken}
                >
                  <Search className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* 第二行：时间和地址 */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400">{createdAt}</span>
              <span className="text-gray-500 font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
              
              {/* 社交链接指示器 */}
              <div className="flex items-center gap-1 ml-2">
                {socialLinks.twitter && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Twitter" />
                )}
                {socialLinks.website && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Website" />
                )}
                {socialLinks.telegram && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Telegram" />
                )}
                <div className="w-2 h-2 bg-red-500 rounded-full" title="No Discord" />
              </div>
            </div>

            {/* 第三行：数据指标 */}
            <div className="flex items-center gap-4 text-xs flex-wrap">
              {/* 进度指示器 (仅bonding状态显示) */}
              {status === 'bonding' && (
                <div className="flex items-center gap-1 text-green-400">
                  <Users className="w-3 h-3" />
                  <span>{progress}%</span>
                </div>
              )}

              {/* 持有人数 */}
              <div className="flex items-center gap-1 text-gray-400">
                <Users className="w-3 h-3" />
                <span>{holders.toLocaleString()}</span>
              </div>

              {/* 价格变化 */}
              <div className={cn(
                "flex items-center gap-1 font-medium",
                isPositive ? "text-green-400" : "text-red-400"
              )}>
                {isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{isPositive ? '+' : ''}{priceChange24h.toFixed(2)}%</span>
              </div>

              {/* 交易量 */}
              <span className="text-yellow-400 whitespace-nowrap">V {volume24h}</span>

              {/* 市值 */}
              <span className="text-gray-300 whitespace-nowrap">MC {marketCap}</span>

              {/* 流动性 */}
              <span className="text-blue-400 whitespace-nowrap">Liq {liquidity}</span>
            </div>
          </div>

          {/* 右侧：买入按钮 */}
          <div className="flex-shrink-0">
            <Button
              onClick={handleBuy}
              className="bg-green-600 hover:bg-green-700 text-white font-medium"
              size="sm"
            >
              <Zap className="w-4 h-4 mr-1" />
              买入
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  );
}
