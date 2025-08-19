export function TokenPageSkeleton() {
  return (
    <div className="flex flex-col h-screen animate-pulse">
      {/* 头部骨架 */}
      <div className="flex-shrink-0 border-b border-gray-800 p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-700 rounded w-24"></div>
          </div>
          <div className="ml-auto space-y-2">
            <div className="h-8 bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-700 rounded w-16"></div>
          </div>
        </div>
      </div>

      {/* 主要内容骨架 */}
      <div className="flex-1 flex min-h-0">
        {/* 图表区域骨架 */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 bg-gray-900/50 m-4 rounded"></div>
          
          {/* 底部数据区域骨架 */}
          <div className="flex-shrink-0 h-80 border-t border-gray-800 p-4">
            <div className="h-full bg-gray-900/50 rounded"></div>
          </div>
        </div>

        {/* 交易面板骨架 */}
        <div className="w-80 flex-shrink-0 border-l border-gray-800 p-4">
          <div className="space-y-4">
            <div className="h-10 bg-gray-700 rounded"></div>
            <div className="h-16 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}