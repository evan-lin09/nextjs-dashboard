'use client';

import { useTokenStore } from '@/lib/stores/tokenStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function DataTabs() {
  const { trades, holders } = useTokenStore();

  return (
    <div className="h-full bg-gray-950 p-4">
      <Tabs defaultValue="trades" className="h-full flex flex-col">
        <TabsList className="grid w-full max-w-md grid-cols-4 bg-gray-900">
          <TabsTrigger value="trades">交易</TabsTrigger>
          <TabsTrigger value="holders">持有者</TabsTrigger>
          <TabsTrigger value="positions">仓位</TabsTrigger>
          <TabsTrigger value="activity">活动</TabsTrigger>
        </TabsList>

        <div className="flex-1 mt-4 overflow-hidden">
          {/* 交易记录 */}
          <TabsContent value="trades" className="h-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">时间</TableHead>
                  <TableHead className="text-gray-400">类型</TableHead>
                  <TableHead className="text-gray-400">价格号</TableHead>
                  <TableHead className="text-gray-400">总额 USD</TableHead>
                  <TableHead className="text-gray-400">数量</TableHead>
                  <TableHead className="text-gray-400">交易者</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map((trade) => (
                  <TableRow key={trade.id} className="border-gray-800 hover:bg-gray-900/50">
                    <TableCell className="text-gray-300 text-xs">
                      {formatDistanceToNow(new Date(trade.timestamp), { 
                        addSuffix: false,
                        locale: zhCN 
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={trade.type === 'buy' ? 'default' : 'destructive'}
                        className={trade.type === 'buy' ? 'bg-green-600' : 'bg-red-600'}
                      >
                        {trade.type === 'buy' ? '买入' : '卖出'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">
                      ${trade.price.toFixed(6)}
                    </TableCell>
                    <TableCell className="text-white">
                      ${trade.totalUsd.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-white">
                      {trade.amount.toFixed(4)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 text-xs font-mono">
                          {trade.trader.slice(0, 6)}...{trade.trader.slice(-4)}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-400">{trade.tradeCount}</span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* 持有者 */}
          <TabsContent value="holders" className="h-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">持有者</TableHead>
                  <TableHead className="text-gray-400">数量</TableHead>
                  <TableHead className="text-gray-400">价值</TableHead>
                  <TableHead className="text-gray-400">占比</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holders.map((holder) => (
                  <TableRow key={holder.address} className="border-gray-800 hover:bg-gray-900/50">
                    <TableCell>
                      <span className="text-gray-300 text-xs font-mono">
                        {holder.address.slice(0, 8)}...{holder.address.slice(-8)}
                      </span>
                    </TableCell>
                    <TableCell className="text-white">
                      {holder.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-white">
                      ${holder.value.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {holder.percentage.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* 仓位 */}
          <TabsContent value="positions" className="h-full">
            <div className="flex items-center justify-center h-full text-gray-400">
              仓位功能开发中...
            </div>
          </TabsContent>

          {/* 活动 */}
          <TabsContent value="activity" className="h-full">
            <div className="flex items-center justify-center h-full text-gray-400">
              活动功能开发中...
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}