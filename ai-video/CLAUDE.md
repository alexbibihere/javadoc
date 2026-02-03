# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 提供在此代码库中工作的指导。

## 项目概述

这是一个基于 Node.js 和 Express 构建的**本地视频服务器**。它扫描本地磁盘驱动器中的视频文件，并提供用于浏览和播放的 Web 界面。服务器支持 HTTP 范围请求（Range requests）来流式传输视频，实现拖动进度和播放控制。

## 开发命令

```bash
# 安装依赖
npm install

# 启动服务器（开发模式，自动重载）
npm run dev

# 启动服务器（生产模式）
npm start

# 或直接使用 Node 启动
node server.js
```

在 Windows 上，可以使用提供的批处理脚本：
- `start.bat` - 增强脚本，检查 Node.js/npm、安装依赖、启动服务器并自动打开浏览器
- `start-server.bat` - 简单脚本，仅启动服务器

服务器默认运行在 **8080 端口**（配置位置：[server.js:7](server.js#L7)）。

## 架构

### 入口和服务器
- **[server.js](server.js)** - Express 主服务器（单文件架构，约 915 行）
  - 端口：8080，绑定到 `0.0.0.0` 以支持局域网访问
  - 中间件：CORS、JSON 解析、静态文件服务（来自 `public/`）
  - 启动行为：HTTP 服务器立即启动，后台视频扫描在 1 秒后开始

### 核心函数

**视频扫描** ([server.js:36-99](server.js#L36-L99))
- `getVideosFromDirectory(directory)` - 递归扫描目录中的视频文件
- 跳过系统目录：`$RECYCLE.BIN`、`System Volume Information`、`.git`、`node_modules`
- 仅包含 >= 100MB 的视频（104857600 字节）
- 使用 async/await 模式，每处理 100 个文件让出事件循环
- 使用 `fs.promises` 进行非阻塞文件系统操作

**磁盘扫描策略** ([server.js:163-203](server.js#L163-L203))
- 动态检测 Windows 上所有 A-Z 驱动器
- **C 盘**：仅扫描 `C:\迅雷下载` 文件夹
- **其他盘**：完整递归扫描
- 不可访问的驱动器会被静默跳过

**缓存层**
- `video_cache.json` - 已发现视频的持久化缓存
- `favorites_cache.json` - 用户收藏列表
- 缓存函数：`loadVideosFromCache()`、`saveVideosToCache()`、`loadFavoritesFromFile()`、`saveFavoritesToFile()`
- 刷新缓存：`GET /api/videos?refresh=true`

### API 端点

| 方法 | 路由 | 描述 |
|--------|-------|-------------|
| GET | `/api/videos` | 获取所有视频（使用 `?refresh=true` 重新扫描） |
| GET | `/api/directory/:path` | 浏览目录结构，可选 `?search=` 参数 |
| GET | `/api/video/*` | 流式传输视频（支持 HTTP Range 请求） |
| DELETE | `/api/video/*` | 将视频移入回收站 |
| POST | `/api/delete-video` | 删除视频（推荐方法，JSON 请求体） |
| POST | `/api/open-folder` | 在系统文件管理器中打开视频所在文件夹 |
| GET | `/api/favorites` | 获取所有收藏 |
| POST | `/api/favorites` | 添加视频到收藏 |
| DELETE | `/api/favorites/*` | 从收藏中移除 |
| GET | `/api/favorites/:path` | 检查视频是否已收藏 |

### 支持的视频格式

定义于 [server.js:22-30](server.js#L22-L30)：
- `.mp4` (video/mp4)
- `.avi` (video/x-msvideo)
- `.mov` (video/quicktime)
- `.wmv` (video/x-ms-wmv)
- `.flv` (video/x-flv)
- `.mkv` (video/x-matroska)
- `.webm` (video/webm)

### 前端

- **[public/index.html](public/index.html)** - 单页应用（内嵌 CSS/JS）
- 作为静态文件在根 URL 提供

### 文件删除行为

视频会被移入**系统回收站**（非永久删除）：
- Windows：使用 PowerShell `Microsoft.VisualBasic.FileIO.FileSystem`
- macOS：使用 `trash` 命令
- Linux：使用 `trash-put` 命令

删除成功后，缓存会自动更新以移除已删除的视频条目。

## 重要实现细节

1. **路径处理**：所有路径使用 `path.normalize()` 标准化以实现跨平台兼容性。API 路由中的路径使用正则表达式捕获组来处理带斜杠的完整 Windows 路径。

2. **错误处理**：服务器优雅地处理：
   - 扫描期间不可访问的驱动器
   - 删除期间缺失的文件
   - 被锁定的文件（返回 423 状态码）
   - 权限错误（返回 403 状态码）

3. **启动行为**：视频扫描在服务器启动后异步运行。HTTP 服务器立即可用，同时扫描在后台继续进行。

4. **缓存一致性**：删除视频时，仅移除该缓存条目（不会使整个缓存失效）。

5. **驱动器检测**：使用 ASCII 循环（65-90）生成 A-Z 驱动器字母，使用 `fs.accessSync()` 检查每个驱动器。
