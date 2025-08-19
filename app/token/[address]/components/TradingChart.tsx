'use client';

import { useEffect, useRef, useState } from 'react';
import { createChart, IChartApi, ColorType, CandlestickSeries, HistogramSeries } from 'lightweight-charts';
import { useTokenStore } from '@/lib/stores/tokenStore';
import { Fullscreen, Settings, TrendingUp, Volume2, BarChart3, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<any>(null);
  const volumeSeriesRef = useRef<any>(null);
  
  const { chartData, selectedPeriod, priceData } = useTokenStore();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 初始化图表
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartContainer = chartContainerRef.current;
    
    // 创建图表
    const chart = createChart(chartContainer, {
      width: chartContainer.clientWidth,
      height: chartContainer.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'rgba(255, 255, 255, 0.7)',
        fontSize: 11,
      },
      grid: {
        vertLines: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        horzLines: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'rgba(255, 255, 255, 0.3)',
          width: 1,
          style: 1,
        },
        horzLine: {
          color: 'rgba(255, 255, 255, 0.3)',
          width: 1,
          style: 1,
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textColor: 'rgba(255, 255, 255, 0.7)',
        entireTextOnly: false,
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
        secondsVisible: true,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    // 使用正确的 addSeries API 添加K线图系列
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#00c982', // 绿色上涨
      downColor: '#ff4757', // 红色下跌
      borderVisible: false,
      wickUpColor: '#00c982',
      wickDownColor: '#ff4757',
    });

    // 使用正确的 addSeries API 添加成交量系列  
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: 'rgba(0, 201, 130, 0.3)',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'volume',
    });

    // 设置成交量价格刻度
    try {
      chart.priceScale('volume').applyOptions({
        scaleMargins: {
          top: 0.7,
          bottom: 0,
        },
      });
    } catch (e) {
      console.warn('Volume price scale setup failed:', e);
    }

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;
    volumeSeriesRef.current = volumeSeries;

    // 处理窗口大小变化
    const handleResize = () => {
      if (chartContainer && chart) {
        chart.applyOptions({
          width: chartContainer.clientWidth,
          height: chartContainer.clientHeight,
        });
      }
    };

    // 使用ResizeObserver监听容器大小变化
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartContainer);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  // 更新图表数据
  useEffect(() => {
    if (!chartRef.current || !candlestickSeriesRef.current) return;
    
    if (chartData.length > 0) {
      // 转换数据格式为lightweight-charts格式
      const candlestickData = chartData.map(item => ({
        time: item.time,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      }));

      // 设置K线数据
      candlestickSeriesRef.current.setData(candlestickData);

      // 设置成交量数据
      if (volumeSeriesRef.current) {
        const volumeData = chartData.map(item => ({
          time: item.time,
          value: item.volume || 0,
          color: item.close >= item.open ? 'rgba(0, 201, 130, 0.3)' : 'rgba(255, 71, 87, 0.3)',
        }));
        
        volumeSeriesRef.current.setData(volumeData);
      }

      // 自动缩放到合适的时间范围
      chartRef.current.timeScale().fitContent();
    }
  }, [chartData, selectedPeriod]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={cn(
      "relative bg-gray-950 border border-gray-800",
      isFullscreen ? "fixed inset-0 z-50" : "w-full h-full"
    )}>
      <div
        ref={chartContainerRef}
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      />
      
      {/* 图表工具栏 - 左上角 */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs text-white">
          成交量(Volume) <span className="text-green-400">150</span>
        </div>
      </div>

      {/* 图表工具栏 - 右上角 */}
      <div className="absolute top-3 right-3 flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => console.log('切换图表类型')}
          className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
          title="切换图表类型"
        >
          <BarChart3 className="h-3 w-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
          title="设置"
        >
          <Settings className="h-3 w-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
          title="全屏"
        >
          <Fullscreen className="h-3 w-3" />
        </Button>
      </div>

      {/* 左侧图表工具栏 */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
          title="趋势线"
        >
          <TrendingUp className="h-3 w-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
          title="成交量"
        >
          <Volume2 className="h-3 w-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-gray-400 hover:text-white hover:bg-gray-800"
          title="指标"
        >
          <Activity className="h-3 w-3" />
        </Button>
      </div>

      {/* 实时价格指示器 */}
      {priceData && (
        <div className="absolute top-1/2 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-mono">
          ${priceData.price.toFixed(6)}
        </div>
      )}

      {/* 时间轴底部显示 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-400">
        {new Date().toLocaleString('zh-CN', { 
          hour12: false,
          timeZone: 'Asia/Shanghai',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })} (UTC+8)
      </div>
    </div>
  );
}