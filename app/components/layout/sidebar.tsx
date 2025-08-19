'use client';

import { ChevronDown, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const [selectedChain, setSelectedChain] = useState('all');
  const [selectedTime, setSelectedTime] = useState('24h');
  const [selectedSort, setSelectedSort] = useState('marketcap');

  const chains = [
    { value: 'all', label: '全部链' },
    { value: 'solana', label: 'Solana' },
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'bsc', label: 'BSC' },
    { value: 'polygon', label: 'Polygon' },
  ];

  const timeRanges = [
    { value: '5m', label: '5分钟' },
    { value: '1h', label: '1小时' },
    { value: '6h', label: '6小时' },
    { value: '24h', label: '24小时' },
  ];

  const sortOptions = [
    { value: 'marketcap', label: '按市值' },
    { value: 'volume', label: '按交易量' },
    { value: 'price_change', label: '按涨跌幅' },
    { value: 'created_time', label: '按创建时间' },
  ];

  return (
    <aside className="w-56 bg-gray-950 border-r border-gray-800 p-4">
      {/* 筛选器标题 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-medium">筛选器</h2>
        <Settings className="w-4 h-4 text-gray-400" />
      </div>

      {/* 区块链筛选 */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2">区块链</label>
        <div className="relative">
          <select 
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          >
            {chains.map((chain) => (
              <option key={chain.value} value={chain.value}>
                {chain.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* 时间范围 */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2">时间范围</label>
        <div className="grid grid-cols-2 gap-2">
          {timeRanges.map((time) => (
            <button
              key={time.value}
              onClick={() => setSelectedTime(time.value)}
              className={`px-3 py-2 rounded-md text-sm transition-colors ${
                selectedTime === time.value
                  ? 'bg-green-500 text-black font-medium'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
              }`}
            >
              {time.label}
            </button>
          ))}
        </div>
      </div>

      {/* 排序方式 */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2">排序方式</label>
        <div className="relative">
          <select 
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* 市值范围 */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2">市值范围</label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="最小值"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
            <span className="text-gray-400 text-xs">USD</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="最大值"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
            />
            <span className="text-gray-400 text-xs">USD</span>
          </div>
        </div>
      </div>

      {/* 快速筛选标签 */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-2">快速筛选</label>
        <div className="flex flex-wrap gap-2">
          {['新上线', '热门', '涨幅榜', '大户关注'].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 bg-gray-900 text-gray-300 rounded-full text-xs hover:bg-gray-800 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 重置按钮 */}
      <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-md text-sm transition-colors">
        重置筛选
      </button>
    </aside>
  );
}
