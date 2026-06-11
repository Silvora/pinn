# Pinn

Pinn 是一个用于收集碎片化知识并提供统一 RAG 检索入口的前端 monorepo。

目标是把平时散落在浏览器、Markdown、本地文件、临时记录中的知识内容先汇总到统一 inbox，再通过共享页面完成检索、回溯来源和后续整理。

## 项目定位

当前仓库聚焦前端层，采用三端共享页面的方式组织：

- `apps/web`
  - Web 入口，适合完整检索、筛选和来源回溯
- `apps/desktop`
  - Electron 桌面端，复用同一套页面，后续可扩展本地文件索引、快捷键、托盘等能力
- `apps/extension`
  - WXT 浏览器插件，负责轻量采集网页片段、当前链接和临时上下文

三端页面都复用 `@pinn/pages`，避免为每个平台重复维护业务 UI。

## 技术栈

- Monorepo: `pnpm workspace` + `turborepo`
- Web / Renderer: `Vite`
- Desktop: `Electron`
- Extension: `WXT`
- UI: `React 19` + `Tailwind CSS 4` + `@pinn/ui`
- Request: `Axios`

## 目录结构

```txt
apps/
  web/          Web 入口
  desktop/      Electron 桌面应用
  extension/    WXT 浏览器插件
packages/
  api-client/   Axios 请求封装
  pages/        三端共享页面
  types/        共享类型与 mock
  ui/           共享 UI 组件
```

## 包职责

### `@pinn/pages`

页面层，负责把共享 UI、请求逻辑和业务状态拼成真正可运行的三端页面。

当前主要内容：

- 共享工作台入口 `PinnApp`
- 检索面板
- 采集面板
- 数据源面板
- 侧边摘要区

### `@pinn/ui`

基础 UI 组件层，提供可复用组件。

建议使用子路径导入：

```ts
import { Button } from '@pinn/ui/components/ui/button'
import { Card } from '@pinn/ui/components/ui/card'
```

### `@pinn/api-client`

请求层，封装 Axios、Token 读取、统一错误处理和后续重试逻辑。

### `@pinn/types`

共享类型层，存放请求类型、响应类型、枚举和前端 mock 数据。

## 安装依赖

```sh
pnpm install
```

## 开发命令

### 启动全部

```sh
pnpm dev
```

### 只启动 Web

```sh
pnpm dev:web
```

### 只启动桌面端

```sh
pnpm dev:desktop
```

### 只启动插件端

```sh
pnpm dev:extension
```

## 构建命令

### 构建全部

```sh
pnpm build
```

### 构建单端

```sh
pnpm build:web
pnpm build:desktop
pnpm build:extension
```

## 类型检查与格式化

```sh
pnpm check-types
pnpm format
```

```ts
import { Button } from '@pinn/ui/components/ui/button'
```

## 三端说明

### Web

Web 端是主知识工作台，适合：

- 输入复杂检索问题
- 查看模型回答
- 回溯来源文档
- 按标签筛选结果

### Desktop

桌面端使用 Electron，继续复用 `@pinn/pages` 页面层。

适合后续扩展：

- 选择本地知识库目录
- 读取本地 Markdown / PDF / 文档
- 注册全局快捷键
- 系统托盘
- 离线能力

### Extension

插件端使用 WXT，适合：

- 采集当前网页标题、链接、上下文
- 获取页面选中文本
- 快速把碎片知识送进统一 inbox

## 当前开发现状

仓库已经具备：

- 三端入口骨架
- 共享页面包 `@pinn/pages`
- 共享 UI 包 `@pinn/ui`
- Axios 请求封装
- Electron 主进程 / preload 骨架
- WXT 插件入口 / content script / public 资源

## 后续建议

建议下一步按下面顺序继续推进：

1. 接通真实后端接口，替换 `@pinn/types` 中的 mock 数据
2. 把插件 content script 和 popup 联动起来，把当前页内容自动写入采集表单
3. 给桌面端补本地文件选择、目录扫描和 preload API
4. 给页面层增加路由、详情页、登录态和知识编辑能力
