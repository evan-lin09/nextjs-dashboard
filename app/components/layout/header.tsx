'use client';

import Link from 'next/link';
import { Search, Wallet, Globe, Sun, Moon, ChevronDown } from 'lucide-react';
import { JSX, useState } from 'react';

export default function Header(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('搜索:', searchQuery);
  };

  return (
    <header className="bg-black border-b border-gray-800 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-green-500 rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">🐸</span>
            </div>
            <span className="text-lg font-bold text-white">GMGN</span>
          </Link>

          {/* 导航菜单 */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/trending" className="text-gray-400 hover:text-white transition-colors text-sm">
              热门
            </Link>
            <Link href="/new" className="text-gray-400 hover:text-white transition-colors text-sm">
              新币
            </Link>
            <Link href="/gainers" className="text-gray-400 hover:text-white transition-colors text-sm">
              涨幅榜
            </Link>
            <Link href="/sniper" className="text-gray-400 hover:text-white transition-colors text-sm">
              狙击器
            </Link>
            <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors text-sm">
              投资组合
            </Link>
          </nav>
        </div>

        {/* 右侧工具栏 */}
        <div className="flex items-center space-x-3">
          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="搜索代币或地址"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1.5 pl-9 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 w-64 text-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </form>

          {/* 语言切换 */}
          <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
            <Globe className="w-4 h-4" />
            <span className="text-sm">EN</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* 主题切换 */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* SOL价格显示 */}
          <div className="flex items-center space-x-1 text-sm">
            <span className="text-gray-400">SOL</span>
            <span className="text-white">$234.56</span>
            <span className="text-green-400">+2.4%</span>
          </div>

          {/* 连接钱包 */}
          <button className="bg-green-500 hover:bg-green-600 text-black px-3 py-1.5 rounded-md flex items-center space-x-2 transition-colors text-sm font-medium">
            <Wallet className="w-4 h-4" />
            <span>连接钱包</span>
          </button>
        </div>
      </div>
    </header>
  );
}
