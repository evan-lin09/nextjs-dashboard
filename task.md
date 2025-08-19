# Token 详情页开发任务

## 项目概述
根据 prototype/token.png 原型图开发动态路由 `/token/${address}` 的代币详情页面。

## 技术栈
- **Next.js**: 动态路由
- **lightweight-charts**: K线图表
- **shadcn/ui**: UI组件库  
- **WebSocket**: 实时数据推送
- **Zustand**: 状态管理

## 页面功能分析

### 1. 页面头部区域
- 代币基本信息：头像、名称、符号、社交链接
- 实时价格数据：当前价格、24h涨跌幅、市值、交易量等
- 多个时间周期选择：1s, 30s, 1m, 1H, 4H, 1D等

### 2. 图表区域 
- K线图表（使用lightweight-charts）
- 成交量柱状图
- 时间轴和价格轴
- 多种图表工具和指标

### 3. 右侧交易面板
- 买入/卖出切换
- 数量输入和预设比例按钮
- 实时价格显示
- 交易确认按钮

### 4. 底部数据区域
- 活动、仓位、持有者、交易者等Tab页
- 实时交易记录表格
- 筛选和排序功能

## 开发任务拆解

### **阶段一：基础设施搭建** 🔧
- [x] 查看token.png原型图并分析页面结构
- [x] 分析页面功能需求和技术栈
- [x] 拆解开发任务
- [x] 安装和配置lightweight-charts、zustand、shadcn/ui
- [x] 创建动态路由页面结构
- [x] 修复lucide-react依赖问题
- [x] 使用shadcn/ui重构TokenCard.tsx
- [x] 安装class-variance-authority依赖
- [x] 验证页面编译成功

### **阶段二：核心功能开发** 📊
- [ ] 实现页面头部区域（代币信息、价格数据）
- [ ] 集成lightweight-charts实现K线图表
- [ ] 实现右侧交易面板

### **阶段三：数据和交互** 🌐
- [ ] 实现底部数据区域（Tab页和表格）
- [ ] 使用Zustand创建状态管理
- [ ] 实现WebSocket实时数据推送

### **阶段四：优化完善** ✨
- [ ] 优化响应式设计和交互体验

## 详细任务说明

### 阶段一：基础设施搭建

#### 1. 安装依赖包
```bash
# 图表库
npm install lightweight-charts

# 状态管理
npm install zustand

# UI组件
npx shadcn-ui@latest add button input tabs card badge

# WebSocket (可选，可使用原生WebSocket)
npm install ws @types/ws
```

#### 2. 创建页面结构
- 创建 `app/token/[address]/page.tsx`
- 设计响应式布局（头部、图表、交易面板、底部数据）
- 建立组件文件夹结构

### 阶段二：核心功能开发

#### 3. 页面头部区域
- **TokenHeader 组件**
  - 代币基本信息展示
  - 实时价格数据展示
  - 时间周期选择器

#### 4. 图表系统集成
- **TradingChart 组件**
  - lightweight-charts 配置
  - K线图表实现
  - 成交量图表
  - 实时数据更新机制

#### 5. 交易面板
- **TradingPanel 组件**
  - 买入/卖出切换
  - 数量输入和比例选择
  - 实时价格计算
  - 交易确认功能

### 阶段三：数据和交互

#### 6. 底部数据区域
- **DataTabs 组件**
  - Tab 导航实现
  - 交易记录表格
  - 数据筛选和分页

#### 7. 状态管理
- **Zustand Store 设计**
  - 代币信息状态
  - 价格数据状态
  - 交易状态
  - UI状态

#### 8. 实时数据推送
- **WebSocket 集成**
  - 连接管理
  - 数据订阅
  - 错误处理和重连

### 阶段四：优化完善

#### 9. 用户体验优化
- 响应式设计完善
- 加载状态处理
- 错误边界处理
- 性能优化

## 技术细节

### lightweight-charts 配置
- 支持K线图和成交量图
- 实时数据更新
- 自定义样式主题
- 交互功能（缩放、平移）

### Zustand 状态设计
```typescript
interface TokenStore {
  // 代币基本信息
  tokenInfo: TokenInfo | null
  // 价格数据
  priceData: PriceData
  // K线数据
  chartData: ChartData[]
  // 交易数据
  trades: Trade[]
  // WebSocket 连接状态
  wsConnected: boolean
  // 操作方法
  updatePrice: (price: PriceData) => void
  updateChart: (data: ChartData) => void
  // ...
}
```

### WebSocket 数据格式
```typescript
interface WSMessage {
  type: 'price' | 'trade' | 'chart'
  data: any
  timestamp: number
}
```

## 文件结构
```
app/
├── token/
│   └── [address]/
│       ├── page.tsx                 # 主页面
│       └── components/
│           ├── TokenHeader.tsx      # 代币头部信息
│           ├── TradingChart.tsx     # 图表组件
│           ├── TradingPanel.tsx     # 交易面板
│           ├── DataTabs.tsx         # 底部数据区域
│           └── ...
├── lib/
│   ├── stores/
│   │   └── tokenStore.ts           # Zustand 状态管理
│   ├── websocket/
│   │   └── tokenWS.ts              # WebSocket 管理
│   └── types/
│       └── token.ts                # 类型定义
```

## 开发顺序建议
1. 先完成静态布局和基础组件
2. 集成 lightweight-charts 实现基础图表
3. 添加状态管理和模拟数据
4. 实现 WebSocket 实时数据推送
5. 完善交互功能和用户体验

## 注意事项
- 确保响应式设计在移动端正常显示
- WebSocket 连接需要错误处理和重连机制
- 图表性能优化，避免频繁重绘
- 数据格式要与后端API保持一致