'use client';

import { useState } from 'react';
import { useTokenStore } from '@/lib/stores/tokenStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, TrendingUp, TrendingDown, Zap, Percent, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRESET_PERCENTAGES = ['25%', '50%', '75%', '100%'];
const QUICK_AMOUNTS = [0.01, 0.02, 0.05, 1];

export function TradingPanel() {
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('0.01');
  const [isPercentage, setIsPercentage] = useState(false);
  const { tokenInfo, priceData } = useTokenStore();

  if (!tokenInfo || !priceData) {
    return (
      <div className="w-full h-full bg-gray-950 p-4">
        <div className="space-y-4 animate-pulse">
          <div className="h-10 bg-gray-800 rounded"></div>
          <div className="h-32 bg-gray-800 rounded"></div>
          <div className="h-12 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  const handlePresetAmount = (value: number) => {
    setAmount(value.toString());
    setIsPercentage(false);
  };

  const handlePresetPercentage = (percentage: string) => {
    setAmount(percentage);
    setIsPercentage(true);
  };

  const handleTrade = () => {
    console.log(`${tradeType} ${amount} ${isPercentage ? 'percentage' : 'ETH'} of ${tokenInfo.symbol}`);
    // TODO: 实现交易逻辑
  };

  const numericAmount = parseFloat(amount);
  const tokenAmount = isPercentage ? 0 : numericAmount / priceData.price;
  const totalValue = isPercentage ? 0 : numericAmount * priceData.price;

  return (
    <div className="w-full h-full bg-gray-950 border-l border-gray-800 flex flex-col">
      {/* 顶部价格摘要 */}
      <div className="p-4 border-b border-gray-800/50">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-white font-medium text-sm">交易面板</div>
            <Badge variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400 text-xs">
              ${priceData.price.toFixed(6)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">24h变化</span>
            <div className={cn(
              "flex items-center gap-1",
              priceData.change24h >= 0 ? "text-green-400" : "text-red-400"
            )}>
              {priceData.change24h >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{priceData.change24h >= 0 ? '+' : ''}{priceData.change24h.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 交易tabs */}
      <div className="p-4 flex-1">
        <Tabs value={tradeType} onValueChange={(value) => setTradeType(value as 'buy' | 'sell')}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 h-9">
            <TabsTrigger 
              value="buy" 
              className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-white text-sm font-medium"
            >
              买入
            </TabsTrigger>
            <TabsTrigger 
              value="sell" 
              className="text-white data-[state=active]:bg-red-600 data-[state=active]:text-white text-sm font-medium"
            >
              卖出
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 mt-4">
            {/* 数量输入区域 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">数量</label>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPercentage(!isPercentage)}
                    className="h-6 px-2 text-xs text-gray-400 hover:text-white"
                  >
                    <Percent className="w-3 h-3 mr-1" />
                    {isPercentage ? 'ETH' : '%'}
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white text-right pr-12 h-12 text-lg font-mono"
                  step={isPercentage ? "1" : "0.001"}
                  min="0"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  {isPercentage ? '%' : 'ETH'}
                </div>
              </div>
              
              {/* 快捷按钮 */}
              <div className="grid grid-cols-4 gap-2">
                {isPercentage 
                  ? PRESET_PERCENTAGES.map((preset) => (
                      <Button
                        key={preset}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePresetPercentage(preset)}
                        className={cn(
                          "bg-gray-800/30 border-gray-700 text-white hover:bg-gray-700 text-xs h-8",
                          amount === preset && "bg-blue-600 border-blue-500"
                        )}
                      >
                        {preset}
                      </Button>
                    ))
                  : QUICK_AMOUNTS.map((preset) => (
                      <Button
                        key={preset}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePresetAmount(preset)}
                        className={cn(
                          "bg-gray-800/30 border-gray-700 text-white hover:bg-gray-700 text-xs h-8",
                          amount === preset.toString() && "bg-blue-600 border-blue-500"
                        )}
                      >
                        {preset}
                      </Button>
                    ))
                }
              </div>
            </div>

            {/* 预计结果 */}
            {amount && !isPercentage && (
              <div className="bg-gray-800/30 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calculator className="w-4 h-4" />
                  <span>预计结果</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">获得</span>
                    <span className="text-white font-mono">
                      {tokenAmount.toFixed(6)} {tokenInfo.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">价值</span>
                    <span className="text-white font-mono">${totalValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 买入按钮 */}
            <Button
              onClick={handleTrade}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium h-12 text-base"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              <Zap className="w-4 h-4 mr-2" />
              买入 {tokenInfo.symbol}
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 mt-4">
            {/* 卖出面板 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">卖出数量</label>
                <span className="text-xs text-gray-500">余额: 0 {tokenInfo.symbol}</span>
              </div>
              
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white text-right pr-16 h-12 text-lg font-mono"
                  disabled
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  {tokenInfo.symbol}
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                <div className="text-gray-400 text-sm mb-2">暂无持仓</div>
                <div className="text-xs text-gray-500">请先买入代币</div>
              </div>

              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium h-12 text-base"
                disabled
              >
                卖出 {tokenInfo.symbol}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部统计信息 */}
      <div className="border-t border-gray-800/50 p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Wallet className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400">钱包余额</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">ETH</span>
              <span className="text-white font-mono">0.065 ($150.07)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{tokenInfo.symbol}</span>
              <span className="text-white font-mono">0 ($0.00)</span>
            </div>
            <div className="flex justify-between border-t border-gray-800 pt-2">
              <span className="text-gray-400">总价值</span>
              <span className="text-white font-mono">$150.07</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}