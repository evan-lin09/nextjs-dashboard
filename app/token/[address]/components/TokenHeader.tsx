'use client';

import { useTokenStore } from '@/lib/stores/tokenStore';
import { Copy, ExternalLink, Twitter, Globe, MessageCircle, Settings, ChevronDown, TrendingUp, TrendingDown, Users, DollarSign, Activity, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TIME_PERIODS = [
  { label: '1s', value: '1s' },
  { label: '30s', value: '30s' },
  { label: '1m', value: '1m' },
  { label: '1H', value: '1H' },
  { label: '4H', value: '4H' },
  { label: '1D', value: '1D' },
];

export function TokenHeader() {
  const { tokenInfo, priceData, selectedPeriod, setSelectedPeriod, holders } = useTokenStore();

  if (!tokenInfo || !priceData) {
    return (
      <div className="p-4 space-y-3 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="space-y-1">
              <div className="h-6 bg-gray-700 rounded w-32"></div>
              <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="h-8 bg-gray-700 rounded w-24"></div>
            <div className="h-8 bg-gray-700 rounded w-24"></div>
            <div className="h-8 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
        <div className="h-8 bg-gray-700 rounded w-full"></div>
      </div>
    );
  }

  const isPositive = priceData.change24h >= 0;
  const holdersCount = holders.length || 1231; // 使用实际持有者数量或默认值

  const copyAddress = () => {
    navigator.clipboard.writeText(tokenInfo.address);
  };

  // 格式化大数字显示
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
      {/* 顶部数据栏 */}
      <div className="px-4 py-2 border-b border-gray-800/50">
        <div className="flex items-center justify-between text-sm">
          {/* 左侧：代币名称和平台标识 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                {tokenInfo.symbol.charAt(0)}
              </div>
              <span className="text-white font-medium">{tokenInfo.symbol}</span>
              <span className="text-gray-400 text-xs">{tokenInfo.name}</span>
              <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400 text-xs px-1.5 py-0">
                GMGN.AI
              </Badge>
            </div>
            
            {/* 社交链接指示器 */}
            <div className="flex items-center gap-1">
              {tokenInfo.socialLinks.twitter && (
                <div className="w-2 h-2 bg-green-500 rounded-full" title="Twitter" />
              )}
              {tokenInfo.socialLinks.website && (
                <div className="w-2 h-2 bg-green-500 rounded-full" title="Website" />
              )}
              {tokenInfo.socialLinks.telegram && (
                <div className="w-2 h-2 bg-green-500 rounded-full" title="Telegram" />
              )}
              <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Verified" />
              <div className="w-2 h-2 bg-gray-500 rounded-full" title="Audit" />
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </div>
          </div>

          {/* 右侧：关键数据指标 */}
          <div className="flex items-center gap-6 text-xs">
            {/* 价格 */}
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-green-400" />
              <span className="text-red-400 font-mono">${priceData.price.toFixed(5)}</span>
            </div>
            
            {/* 市值 */}
            <div className="flex items-center gap-1">
              <span className="text-gray-400">市值</span>
              <span className="text-white font-mono">{priceData.marketCap}</span>
            </div>
            
            {/* 24h交易量 */}
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-blue-400" />
              <span className="text-white font-mono">{priceData.volume24h}</span>
            </div>

            {/* 24h涨跌 */}
            <div className={cn(
              "flex items-center gap-1 font-mono",
              isPositive ? "text-green-400" : "text-red-400"
            )}>
              {isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>24h {isPositive ? '+' : ''}{priceData.change24h.toFixed(2)}%</span>
            </div>

            {/* 持有者数量 */}
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 text-purple-400" />
              <span className="text-white">{formatLargeNumber(holdersCount)}</span>
            </div>

            {/* 开发进度指示 */}
            <div className="flex items-center gap-1">
              <span className="text-gray-400">开发</span>
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 text-xs px-1 py-0">
                0%
              </Badge>
            </div>

            {/* 时间指示 */}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-500" />
              <span className="text-gray-400">持有者</span>
              <span className="text-white">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="px-4 py-3 space-y-3">
        {/* OHLC价格数据行 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white font-mono">{tokenInfo.symbol}/USD</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-400">1</span>
            <span className="text-gray-400">·</span>
            <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400 text-xs">
              GMGN.AI
            </Badge>
            <span className="text-gray-400">开</span>
            <span className="text-blue-400 font-mono">${priceData.open.toFixed(5)}</span>
            <span className="text-gray-400">高</span>
            <span className="text-blue-400 font-mono">${priceData.high.toFixed(5)}</span>
            <span className="text-gray-400">低</span>
            <span className="text-blue-400 font-mono">${priceData.low.toFixed(5)}</span>
            <span className="text-gray-400">收</span>
            <span className="text-blue-400 font-mono">${priceData.close.toFixed(5)}</span>
            <span className={cn(
              "font-mono",
              isPositive ? "text-green-400" : "text-red-400"
            )}>
              {isPositive ? '+' : ''}{(priceData.close - priceData.open).toFixed(6)} ({isPositive ? '+' : ''}{priceData.change24h.toFixed(2)}%)
            </span>
          </div>
        </div>

        {/* 时间周期选择和工具栏 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {TIME_PERIODS.map((period) => (
              <Button
                key={period.value}
                variant={selectedPeriod === period.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod(period.value)}
                className={cn(
                  "h-7 px-2 text-xs font-medium transition-colors",
                  selectedPeriod === period.value 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
              >
                {period.label}
              </Button>
            ))}
            <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
            
            <div className="flex items-center gap-2 ml-4">
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-gray-400">
                多维度
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-gray-400">
                显示
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-gray-400">
                价格/市值
              </Button>
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-gray-400">
                USD/ETH
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Settings className="w-4 h-4" />
            <span>更多工具</span>
          </div>
        </div>
      </div>
    </div>
  );
}