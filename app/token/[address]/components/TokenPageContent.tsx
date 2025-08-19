'use client';

import { useEffect } from 'react';
import { useTokenStore } from '@/lib/stores/tokenStore';
import { TokenHeader } from './TokenHeader';
import { TradingChart } from './TradingChart';
import { TradingPanel } from './TradingPanel';
import { DataTabs } from './DataTabs';

interface TokenPageContentProps {
  address: string;
}

export function TokenPageContent({ address }: TokenPageContentProps) {
  const { loadTokenData, tokenInfo } = useTokenStore();

  useEffect(() => {
    loadTokenData(address);
  }, [address, loadTokenData]);

  if (!tokenInfo) {
    return <div>Loading token data...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* 头部区域 */}
      <div className="flex-shrink-0 border-b border-gray-800">
        <TokenHeader />
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 flex min-h-0">
        {/* 左侧图表区域 */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1">
            <TradingChart />
          </div>
          
          {/* 底部数据区域 */}
          <div className="flex-shrink-0 h-80 border-t border-gray-800">
            <DataTabs />
          </div>
        </div>

        {/* 右侧交易面板 */}
        <div className="w-80 flex-shrink-0 border-l border-gray-800">
          <TradingPanel />
        </div>
      </div>
    </div>
  );
}