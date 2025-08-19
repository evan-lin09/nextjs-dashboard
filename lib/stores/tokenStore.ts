import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 类型定义
export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  socialLinks: {
    twitter?: string;
    website?: string;
    telegram?: string;
  };
}

export interface PriceData {
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  timestamp: number;
}

export interface ChartData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface Trade {
  id: string;
  type: 'buy' | 'sell';
  price: number;
  amount: number;
  totalUsd: number;
  trader: string;
  timestamp: number;
  tradeCount: number;
}

export interface Holder {
  address: string;
  amount: number;
  value: number;
  percentage: number;
}

interface TokenStore {
  // State
  tokenInfo: TokenInfo | null;
  priceData: PriceData | null;
  chartData: ChartData[];
  trades: Trade[];
  holders: Holder[];
  selectedPeriod: string;
  wsConnected: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  setTokenInfo: (tokenInfo: TokenInfo) => void;
  setPriceData: (priceData: PriceData) => void;
  setChartData: (chartData: ChartData[]) => void;
  addTrade: (trade: Trade) => void;
  setTrades: (trades: Trade[]) => void;
  setHolders: (holders: Holder[]) => void;
  setSelectedPeriod: (period: string) => void;
  setWsConnected: (connected: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Async actions
  loadTokenData: (address: string) => Promise<void>;
  connectWebSocket: (address: string) => void;
  disconnectWebSocket: () => void;
}

// 模拟数据生成函数
const generateMockChartData = (): ChartData[] => {
  const data: ChartData[] = [];
  let basePrice = 0.47026;
  const now = Date.now();
  
  for (let i = 100; i >= 0; i--) {
    const timestamp = now - i * 24 * 60 * 60 * 1000; // 每天一个数据点，往前100天
    const time = new Date(timestamp).toISOString().slice(0, 10); // 格式: yyyy-mm-dd
    const change = (Math.random() - 0.5) * 0.01; // ±0.5% 随机变化
    
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.random() * 0.005;
    const low = Math.min(open, close) - Math.random() * 0.005;
    const volume = Math.random() * 1000 + 100;
    
    data.push({
      time,
      open,
      high,
      low,
      close,
      volume,
    });
    
    basePrice = close;
  }
  
  return data;
};

const generateMockTrades = (): Trade[] => {
  const trades: Trade[] = [];
  const now = Date.now();
  
  for (let i = 0; i < 20; i++) {
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const price = 0.47026 + (Math.random() - 0.5) * 0.01;
    const amount = Math.random() * 1000 + 10;
    
    trades.push({
      id: `trade-${i}`,
      type,
      price,
      amount,
      totalUsd: price * amount,
      trader: `0x${Math.random().toString(16).slice(2, 42)}`,
      timestamp: now - i * 60000,
      tradeCount: Math.floor(Math.random() * 10) + 1,
    });
  }
  
  return trades;
};

const generateMockHolders = (): Holder[] => {
  const holders: Holder[] = [];
  
  for (let i = 0; i < 10; i++) {
    const amount = Math.random() * 100000 + 1000;
    const price = 0.47026;
    
    holders.push({
      address: `0x${Math.random().toString(16).slice(2, 42)}`,
      amount,
      value: amount * price,
      percentage: Math.random() * 10,
    });
  }
  
  return holders.sort((a, b) => b.amount - a.amount);
};

export const useTokenStore = create<TokenStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      tokenInfo: null,
      priceData: null,
      chartData: [],
      trades: [],
      holders: [],
      selectedPeriod: '1m',
      wsConnected: false,
      loading: false,
      error: null,

      // Actions
      setTokenInfo: (tokenInfo) => set({ tokenInfo }),
      
      setPriceData: (priceData) => set({ priceData }),
      
      setChartData: (chartData) => set({ chartData }),
      
      addTrade: (trade) => set((state) => ({
        trades: [trade, ...state.trades].slice(0, 100), // 保持最新100条交易
      })),
      
      setTrades: (trades) => set({ trades }),
      
      setHolders: (holders) => set({ holders }),
      
      setSelectedPeriod: (period) => set({ selectedPeriod: period }),
      
      setWsConnected: (connected) => set({ wsConnected: connected }),
      
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),

      // Async actions
      loadTokenData: async (address: string) => {
        set({ loading: true, error: null });
        
        try {
          // 模拟API调用延迟
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // 模拟数据
          const tokenInfo: TokenInfo = {
            address,
            name: 'Tom Lee Token',
            symbol: 'TOM',
            decimals: 18,
            totalSupply: '1000000000',
            socialLinks: {
              twitter: 'https://twitter.com/tomlee',
              website: 'https://tomlee.io',
              telegram: 'https://t.me/tomlee',
            },
          };
          
          const priceData: PriceData = {
            price: 0.47026,
            open: 0.48715,
            high: 0.51608,
            low: 0.47026,
            close: 0.47026,
            change24h: -3.47,
            marketCap: '$19.75K',
            volume24h: '$763.12',
            timestamp: Date.now(),
          };
          
          const chartData = generateMockChartData();
          const trades = generateMockTrades();
          const holders = generateMockHolders();
          
          set({
            tokenInfo,
            priceData,
            chartData,
            trades,
            holders,
            loading: false,
          });
          
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            loading: false,
          });
        }
      },

      connectWebSocket: (address: string) => {
        // TODO: 实现WebSocket连接
        console.log('Connecting WebSocket for:', address);
        set({ wsConnected: true });
      },

      disconnectWebSocket: () => {
        // TODO: 断开WebSocket连接
        console.log('Disconnecting WebSocket');
        set({ wsConnected: false });
      },
    }),
    {
      name: 'token-store',
    }
  )
);