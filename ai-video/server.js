const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

// 视频列表缓存文件路径
const VIDEO_CACHE_FILE = './video_cache.json';
// 收藏列表缓存文件路径
const FAVORITES_CACHE_FILE = './favorites_cache.json';

// 允许跨域请求
app.use(cors());
// 解析JSON请求体
app.use(express.json());
// 静态文件服务
app.use(express.static('public'));

// 支持的视频格式和对应的MIME类型
const videoFormats = {
  '.mp4': 'video/mp4',
  '.avi': 'video/x-msvideo',
  '.mov': 'video/quicktime',
  '.wmv': 'video/x-ms-wmv',
  '.flv': 'video/x-flv',
  '.mkv': 'video/x-matroska',
  '.webm': 'video/webm'
};

// 获取所有支持的视频扩展名
const videoExtensions = Object.keys(videoFormats);

// 获取指定目录下的所有视频文件
async function getVideosFromDirectory(directory) {
  const videos = [];
  
  // 跳过一些系统目录和隐藏目录
  const skipDirectories = ['$RECYCLE.BIN', 'System Volume Information', '.git', 'node_modules', '$WINDOWS.~BT', '$Windows.~WS'];
  const dirName = path.basename(directory);
  
  if (skipDirectories.includes(dirName)) {
    return videos;
  }
  
  try {
    // 使用异步读取目录
    const files = await fs.promises.readdir(directory);
    
    // 使用for...of循环，配合await，确保顺序执行但不阻塞事件循环
    for (const file of files) {
      const filePath = path.join(directory, file);
      
      // 跳过隐藏文件
      if (file.startsWith('.')) {
        continue;
      }
      
      try {
        // 使用异步获取文件状态
        const stats = await fs.promises.stat(filePath);
        
        if (stats.isFile()) {
          const ext = path.extname(file).toLowerCase();
          // 只包含100MB以上的视频文件
          if (videoExtensions.includes(ext) && stats.size >= 104857600) {
            // 获取视频所在的磁盘（如C:, D:, 等）
            const drive = filePath.split(':')[0] + ':';
            videos.push({
              name: file,
              path: filePath,
              size: stats.size,
              mtime: stats.mtime,
              ext: ext,
              drive: drive
            });
          }
        } else if (stats.isDirectory()) {
          // 递归遍历子目录，使用await等待结果
          const subVideos = await getVideosFromDirectory(filePath);
          videos.push(...subVideos);
        }
      } catch (error) {
        // 跳过无法访问的文件或目录
        console.error(`无法访问 ${filePath}:`, error.message);
      }
      
      // 每处理100个文件，让出事件循环，让HTTP服务有机会处理请求
      if (videos.length % 100 === 0 && videos.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
  } catch (error) {
    console.error(`无法访问目录 ${directory}:`, error.message);
  }
  
  return videos;
}

// 从缓存文件加载视频列表
function loadVideosFromCache() {
  try {
    if (fs.existsSync(VIDEO_CACHE_FILE)) {
      const cacheData = fs.readFileSync(VIDEO_CACHE_FILE, 'utf8');
      return JSON.parse(cacheData);
    }
  } catch (error) {
    console.error('读取视频缓存失败:', error.message);
  }
  return null;
}

// 保存视频列表到缓存文件
function saveVideosToCache(videos) {
  try {
    fs.writeFileSync(VIDEO_CACHE_FILE, JSON.stringify(videos, null, 2), 'utf8');
    console.log(`视频列表已保存到缓存文件，共 ${videos.length} 个视频`);
  } catch (error) {
    console.error('保存视频缓存失败:', error.message);
  }
}

// 从文件加载收藏列表
function loadFavoritesFromFile() {
  try {
    if (fs.existsSync(FAVORITES_CACHE_FILE)) {
      const favoritesData = fs.readFileSync(FAVORITES_CACHE_FILE, 'utf8');
      return JSON.parse(favoritesData);
    }
  } catch (error) {
    console.error('读取收藏列表失败:', error.message);
  }
  return [];
}

// 保存收藏列表到文件
function saveFavoritesToFile(favorites) {
  try {
    fs.writeFileSync(FAVORITES_CACHE_FILE, JSON.stringify(favorites, null, 2), 'utf8');
    console.log(`收藏列表已保存到文件，共 ${favorites.length} 个收藏`);
  } catch (error) {
    console.error('保存收藏列表失败:', error.message);
  }
}

// 获取所有磁盘的视频文件
app.get('/api/videos', async (req, res) => {
  // 检查是否需要刷新缓存
  const refresh = req.query.refresh === 'true';
  
  // 如果不需要刷新且缓存存在，直接返回缓存内容
  if (!refresh) {
    const cachedVideos = loadVideosFromCache();
    if (cachedVideos) {
      console.log(`从缓存文件加载视频列表，共 ${cachedVideos.length} 个视频`);
      return res.json(cachedVideos);
    }
  }
  
  try {
    // 否则重新扫描视频
    // 策略：其他盘全部扫描，C盘只扫描迅雷下载文件夹
    let allVideos = [];
    
    console.log('开始扫描视频文件...');
    
    // 动态检测所有可用的磁盘驱动器（A-Z）
    const allPossibleDrives = [];
    for (let i = 65; i <= 90; i++) { // ASCII A-Z
      const drive = String.fromCharCode(i) + ':';
      allPossibleDrives.push(drive);
    }
    
    // 遍历所有可能的驱动器，只扫描可访问的
    for (const drive of allPossibleDrives) {
      try {
        // 检查磁盘是否存在且可读
        fs.accessSync(drive, fs.constants.R_OK);
        
        if (drive === 'C:') {
          // C盘只扫描迅雷下载文件夹
          const thunderDownloadPath = path.join(drive, '迅雷下载');
          if (fs.existsSync(thunderDownloadPath)) {
            console.log(`正在扫描C盘 ${thunderDownloadPath} 文件夹...`);
            const videos = await getVideosFromDirectory(thunderDownloadPath);
            console.log(`C盘 ${thunderDownloadPath} 文件夹找到 ${videos.length} 个视频文件`);
            allVideos.push(...videos);
          } else {
            console.log(`C盘 ${thunderDownloadPath} 文件夹不存在`);
          }
        } else {
          // 其他盘全部扫描
          console.log(`正在扫描磁盘 ${drive}...`);
          const videos = await getVideosFromDirectory(drive);
          console.log(`磁盘 ${drive} 找到 ${videos.length} 个视频文件`);
          allVideos.push(...videos);
        }
      } catch (error) {
        // 忽略不可访问的驱动器
        console.log(`磁盘 ${drive} 不可访问或不存在，跳过扫描`);
      }
    }
    
    console.log(`扫描完成，共找到 ${allVideos.length} 个视频文件`);
    
    // 保存到缓存文件
    saveVideosToCache(allVideos);
    
    // 扫描完成提醒
    console.log('========================================');
    console.log('✅ 视频扫描已完成！');
    console.log(`📁 共扫描 ${allVideos.length} 个100MB以上的视频文件`);
    console.log('💾 视频列表已保存到缓存文件');
    console.log('🌐 请在浏览器中访问 http://localhost:3000 查看视频');
    console.log('========================================');
    
    res.json(allVideos);
  } catch (error) {
    console.error('扫描视频文件失败:', error.message);
    res.status(500).json({ success: false, message: '扫描视频文件失败', error: error.message });
  }
});

// 获取指定路径的目录结构
app.get('/api/directory/:path', (req, res) => {
  try {
    const directoryPath = decodeURIComponent(req.params.path);
    const searchTerm = req.query.search || '';
    console.log(`获取目录结构: ${directoryPath}, 搜索关键词: ${searchTerm}`);
    
    const items = fs.readdirSync(directoryPath);
    const directoryStructure = [];
    
    items.forEach(item => {
      const itemPath = path.join(directoryPath, item);
      try {
        const stats = fs.statSync(itemPath);
        
        // 如果有搜索关键词，检查是否匹配
        const matchesSearch = searchTerm ? item.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        
        if (stats.isDirectory()) {
          // 跳过系统目录
          const skipDirs = ['$RECYCLE.BIN', 'System Volume Information', '.git', 'node_modules', '$WINDOWS.~BT', '$Windows.~WS'];
          if (!skipDirs.includes(item) && matchesSearch) {
            directoryStructure.push({
              name: item,
              path: itemPath,
              type: 'directory',
              mtime: stats.mtime
            });
          }
        } else if (stats.isFile()) {
          const ext = path.extname(item).toLowerCase();
          // 只包含500MB以上的视频文件，并且匹配搜索关键词
          if (videoExtensions.includes(ext) && stats.size >= 104857600 && matchesSearch) {
            // 获取视频所在的磁盘（如C:, D:, 等）
            const drive = itemPath.split(':')[0] + ':';
            directoryStructure.push({
              name: item,
              path: itemPath,
              type: 'video',
              size: stats.size,
              mtime: stats.mtime,
              ext: ext,
              drive: drive
            });
          }
        }
      } catch (error) {
        console.error(`无法访问 ${itemPath}:`, error.message);
      }
    });
    
    res.json(directoryStructure);
  } catch (error) {
    console.error('获取目录结构失败:', error.message);
    res.status(500).json({ error: '获取目录结构失败: ' + error.message });
  }
});

// 视频流服务 - 使用正则表达式路由，匹配包含斜杠的完整路径
app.get(/^\/api\/video\/(.*)$/, (req, res) => {
  // 获取完整的视频路径参数
  const fullPathParam = req.params[0];
  
  // 解码视频路径
  const videoPath = decodeURIComponent(fullPathParam);
  
  try {
    const stats = fs.statSync(videoPath);
    const fileSize = stats.size;
    const ext = path.extname(videoPath).toLowerCase();
    // 根据扩展名获取正确的MIME类型
    const contentType = videoFormats[ext] || 'video/mp4';
    const range = req.headers.range;
    
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
      };
      
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': contentType,
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    console.error('视频流服务错误:', error.message);
    res.status(404).send('视频文件未找到');
  }
});

// 添加一个测试路由，用于验证API是否正常工作
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API服务正常工作', timestamp: new Date().toISOString() });
});

// 日志中间件，记录所有请求
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 删除视频文件 - 使用正则表达式路由，匹配包含斜杠的完整路径
app.delete(/^\/api\/video\/(.*)$/, (req, res) => {
  console.log('=== 删除视频文件请求开始 (DELETE) ===');
  
  // 获取完整的视频路径参数
  const fullPathParam = req.params[0];
  console.log(`req.params:`, req.params);
  console.log(`fullPathParam: ${fullPathParam}`);
  
  // 解码视频路径
  let videoPath = decodeURIComponent(fullPathParam);
  console.log(`解码后的路径: ${videoPath}`);
  
  // 调用通用删除逻辑
  handleVideoDelete(videoPath, res);
});

// 删除视频文件 - 使用POST请求，通过JSON body传递路径（推荐）
app.post('/api/delete-video', (req, res) => {
  console.log('=== 删除视频文件请求开始 (POST) ===');
  
  // 从请求体获取视频路径
  const { path: videoPath } = req.body;
  console.log(`从请求体获取的路径: ${videoPath}`);
  
  if (!videoPath) {
    console.error('删除请求缺少路径参数');
    res.status(400).json({ 
      success: false, 
      message: '删除请求缺少路径参数' 
    });
    console.log('=== 删除视频文件请求结束 ===');
    return;
  }
  
  // 调用通用删除逻辑
  handleVideoDelete(videoPath, res);
});

// 通用删除视频逻辑
function handleVideoDelete(videoPath, res) {
  console.log('=== 开始执行文件删除逻辑 ===');
  console.log(`原始输入路径: ${videoPath}`);
  
  try {
    // 标准化路径，处理不同系统的路径分隔符
    videoPath = path.normalize(videoPath);
    console.log(`标准化后的路径: ${videoPath}`);
    
    // 验证路径是否为绝对路径
    if (!path.isAbsolute(videoPath)) {
      throw new Error(`无效的文件路径: ${videoPath}（必须是绝对路径）`);
    }
    
    console.log(`验证为绝对路径: ${videoPath}`);
    
    // 检查文件是否存在
    const fileExists = fs.existsSync(videoPath);
    console.log(`文件存在检查结果: ${fileExists}`);
    
    if (fileExists) {
      console.log(`准备将文件放入回收站: ${videoPath}`);
      
      // 检查文件是否可写
      console.log('正在检查文件写入权限...');
      fs.accessSync(videoPath, fs.constants.W_OK);
      console.log(`✅ 文件具有写入权限: ${videoPath}`);
      
      // 使用child_process模块执行系统命令将文件放入回收站
      const { execSync } = require('child_process');
      let command;
      let successMessage;
      
      if (process.platform === 'win32') {
        // Windows系统：使用PowerShell命令将文件移动到回收站
        command = `powershell.exe -Command "Add-Type -AssemblyName Microsoft.VisualBasic; [Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile('${videoPath}', 'OnlyErrorDialogs', 'SendToRecycleBin')"`;
        successMessage = `文件已成功放入回收站: ${videoPath}`;
      } else if (process.platform === 'darwin') {
        // macOS系统：使用trash命令
        command = `trash "${videoPath}"`;
        successMessage = `文件已成功放入回收站: ${videoPath}`;
      } else {
        // Linux系统：使用trash-put命令
        command = `trash-put "${videoPath}"`;
        successMessage = `文件已成功放入回收站: ${videoPath}`;
      }
      
      console.log(`正在执行命令: ${command}`);
      execSync(command, { stdio: 'ignore' });
      
      // 验证文件是否真的被放入回收站
      console.log('正在验证文件是否真的被放入回收站...');
      
      let stillExists = true;
      let checkAttempts = 0;
      const maxAttempts = 5;
      
      while (stillExists && checkAttempts < maxAttempts) {
        checkAttempts++;
        
        // 添加短暂延迟，避免文件系统缓存影响
        if (checkAttempts > 1) {
          console.log(`第 ${checkAttempts} 次检查，添加 100ms 延迟...`);
          // 使用同步延迟
          const startTime = Date.now();
          while (Date.now() - startTime < 100) {
            // 空循环实现延迟
          }
        }
        
        try {
          // 方法1: 使用fs.existsSync检查
          stillExists = fs.existsSync(videoPath);
          console.log(`   检查 ${checkAttempts}/${maxAttempts} - fs.existsSync: ${stillExists}`);
          
          if (stillExists) {
            // 方法2: 尝试读取文件，确认是否真的存在
            try {
              fs.accessSync(videoPath, fs.constants.R_OK);
              console.log(`   补充检查 - 文件仍可访问`);
            } catch (accessError) {
              console.log(`   补充检查 - 文件不可访问: ${accessError.message}`);
              stillExists = false;
            }
          }
          
        } catch (checkError) {
          console.log(`   检查出错: ${checkError.message}，认为文件已放入回收站`);
          stillExists = false;
        }
      }
      
      if (stillExists) {
        console.error(`❌ 多次检查后文件仍显示存在，放入回收站操作可能失败`);
        console.error(`   可能原因：文件系统缓存、权限问题或文件被锁定`);
        console.error(`   实际文件路径: ${videoPath}`);
        
        // 抛出错误，终止删除流程
        throw new Error(`放入回收站操作执行成功，但文件仍然存在: ${videoPath}`);
      } else {
        console.log(`✅ ${successMessage}`);
      }
      
      // 更新缓存：只删除当前视频的缓存条目，保留其他视频
      if (fs.existsSync(VIDEO_CACHE_FILE)) {
        console.log('正在更新缓存文件，移除已删除的视频...');
        
        try {
          // 读取现有缓存
          const cacheData = fs.readFileSync(VIDEO_CACHE_FILE, 'utf8');
          const cachedVideos = JSON.parse(cacheData);
          
          // 过滤掉已删除的视频
          const updatedVideos = cachedVideos.filter(video => {
            // 标准化路径进行比较，确保跨平台兼容
            const cachedPath = path.normalize(video.path);
            const deletedPath = path.normalize(videoPath);
            return cachedPath !== deletedPath;
          });
          
          // 保存更新后的缓存
          fs.writeFileSync(VIDEO_CACHE_FILE, JSON.stringify(updatedVideos, null, 2), 'utf8');
          
          console.log(`✅ 缓存已更新: 移除了1个视频，剩余 ${updatedVideos.length} 个视频`);
        } catch (cacheError) {
          console.error('更新缓存失败:', cacheError.message);
          console.log('正在删除整个缓存文件以确保数据一致性...');
          // 如果更新缓存失败，删除整个缓存文件
          fs.unlinkSync(VIDEO_CACHE_FILE);
          console.log('✅ 成功删除缓存文件');
        }
      }
      
      res.json({ 
        success: true, 
        message: `文件 ${path.basename(videoPath)} 已成功放入回收站`,
        deletedPath: videoPath
      });
    } else {
      console.log(`❌ 文件不存在: ${videoPath}`);
      res.status(404).json({ 
        success: false, 
        message: `文件不存在: ${path.basename(videoPath)}`,
        path: videoPath
      });
    }
  } catch (error) {
    console.error(`❌ 删除文件失败: ${videoPath}`);
    console.error(`   错误类型: ${error.code || '未知错误'}`);
    console.error(`   错误详情: ${error.message}`);
    console.error(`   完整错误:`, error);
    
    // 提供更详细的错误信息
    let errorMessage = `删除文件失败: ${error.message}`;
    let statusCode = 500;
    
    if (error.code === 'EPERM') {
      errorMessage = `⛔ 没有权限删除文件: ${path.basename(videoPath)}。请以管理员身份运行服务器，或检查文件权限。`;
      statusCode = 403; // Forbidden
    } else if (error.code === 'ENOENT') {
      errorMessage = `📁 文件不存在: ${path.basename(videoPath)}`;
      statusCode = 404; // Not Found
    } else if (error.code === 'EBUSY') {
      errorMessage = `🔒 文件正在被使用，无法删除: ${path.basename(videoPath)}。请关闭所有使用该文件的程序后重试。`;
      statusCode = 423; // Locked
    } else if (error.code === 'EACCES') {
      errorMessage = `🚫 访问被拒绝: ${path.basename(videoPath)}。请检查文件或文件夹权限。`;
      statusCode = 403; // Forbidden
    }
    
    res.status(statusCode).json({ 
      success: false, 
      message: errorMessage,
      code: error.code,
      path: videoPath,
      originalError: error.message
    });
  } finally {
    console.log('=== 删除视频文件请求结束 ===');
  }
};

// 打开视频所在的文件夹
app.post('/api/open-folder', (req, res) => {
  console.log('=== 打开文件夹请求开始 ===');
  
  // 从请求体获取视频路径
  const { path: videoPath } = req.body;
  console.log(`从请求体获取的视频路径: ${videoPath}`);
  
  if (!videoPath) {
    console.error('打开文件夹请求缺少路径参数');
    res.status(400).json({ 
      success: false, 
      message: '打开文件夹请求缺少路径参数' 
    });
    console.log('=== 打开文件夹请求结束 ===');
    return;
  }
  
  try {
    // 标准化路径，处理不同系统的路径分隔符
    const normalizedPath = path.normalize(videoPath);
    console.log(`标准化后的视频路径: ${normalizedPath}`);
    
    // 获取文件夹路径
    const folderPath = path.dirname(normalizedPath);
    console.log(`要打开的文件夹路径: ${folderPath}`);
    
    // 验证路径是否为绝对路径
    if (!path.isAbsolute(folderPath)) {
      throw new Error(`无效的文件夹路径: ${folderPath}（必须是绝对路径）`);
    }
    
    // 检查文件夹是否存在
    if (!fs.existsSync(folderPath)) {
      throw new Error(`文件夹不存在: ${folderPath}`);
    }
    
    console.log(`准备打开文件夹: ${folderPath}`);
    
    // 使用child_process模块打开文件夹
    const { exec } = require('child_process');
    
    // 根据操作系统选择不同的命令
    let command;
    
    if (process.platform === 'win32') {
      // Windows系统
      // 使用cmd /c start来打开文件夹
      command = `cmd /c start "" "${folderPath}"`;
    } else if (process.platform === 'darwin') {
      // macOS系统
      command = `open "${folderPath}"`;
    } else {
      // Linux系统
      command = `xdg-open "${folderPath}"`;
    }
    
    console.log(`执行命令: ${command}`);
    
    // 使用exec来执行命令，这样可以捕获输出和错误
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ 打开文件夹失败 (exec): ${error.message}`);
        console.error(`   stdout: ${stdout}`);
        console.error(`   stderr: ${stderr}`);
        
        res.status(500).json({ 
          success: false, 
          message: `打开文件夹失败: ${error.message}`,
          folderPath: folderPath,
          command: command,
          stdout: stdout,
          stderr: stderr,
          error: error.message
        });
      } else {
        console.log(`✅ 成功打开文件夹: ${folderPath}`);
        console.log(`   stdout: ${stdout}`);
        console.log(`   stderr: ${stderr}`);
        
        res.json({ 
          success: true, 
          message: `成功打开文件夹: ${folderPath}`,
          folderPath: folderPath,
          command: command,
          stdout: stdout,
          stderr: stderr
        });
      }
      console.log('=== 打开文件夹请求结束 ===');
    });
    
  } catch (error) {
    console.error(`❌ 打开文件夹失败 (try-catch): ${error.message}`);
    console.error(`   错误类型: ${error.code || '未知错误'}`);
    console.error(`   完整错误:`, error);
    console.error(`   错误堆栈:`, error.stack);
    
    // 提供更详细的错误信息
    let errorMessage = `打开文件夹失败: ${error.message}`;
    let statusCode = 500;
    
    if (error.code === 'EPERM') {
      errorMessage = `⛔ 没有权限打开文件夹。请以管理员身份运行服务器，或检查文件夹权限。`;
      statusCode = 403; // Forbidden
    } else if (error.code === 'ENOENT') {
      errorMessage = `📁 文件夹不存在: ${path.basename(path.dirname(videoPath))}`;
      statusCode = 404; // Not Found
    } else if (error.code === 'EACCES') {
      errorMessage = `🚫 访问被拒绝: ${folderPath}。请检查文件或文件夹权限。`;
      statusCode = 403; // Forbidden
    }
    
    res.status(statusCode).json({ 
      success: false, 
      message: errorMessage,
      code: error.code,
      path: videoPath,
      folderPath: folderPath,
      originalError: error.message,
      stack: error.stack
    });
    console.log('=== 打开文件夹请求结束 ===');
  }
});

// 收藏相关API

// 获取所有收藏
app.get('/api/favorites', (req, res) => {
  console.log('=== 获取所有收藏请求开始 ===');
  try {
    const favorites = loadFavoritesFromFile();
    console.log(`✅ 成功获取收藏列表，共 ${favorites.length} 个收藏`);
    res.json(favorites);
  } catch (error) {
    console.error(`❌ 获取收藏列表失败: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: '获取收藏列表失败', 
      error: error.message 
    });
  } finally {
    console.log('=== 获取所有收藏请求结束 ===');
  }
});

// 添加收藏
app.post('/api/favorites', (req, res) => {
  console.log('=== 添加收藏请求开始 ===');
  try {
    const video = req.body;
    if (!video || !video.path) {
      console.error('❌ 添加收藏请求缺少视频信息或路径');
      return res.status(400).json({ 
        success: false, 
        message: '添加收藏请求缺少视频信息或路径' 
      });
    }
    
    const favorites = loadFavoritesFromFile();
    
    // 检查是否已经收藏
    const isFavorited = favorites.some(v => v.path === video.path);
    if (isFavorited) {
      console.log(`⚠️  视频已在收藏列表中: ${video.name}`);
      return res.status(409).json({ 
        success: false, 
        message: '视频已在收藏列表中' 
      });
    }
    
    // 添加到收藏列表
    favorites.push(video);
    saveFavoritesToFile(favorites);
    
    console.log(`✅ 成功添加收藏: ${video.name}`);
    res.json({ 
      success: true, 
      message: '视频已添加到收藏列表', 
      favorites: favorites 
    });
  } catch (error) {
    console.error(`❌ 添加收藏失败: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: '添加收藏失败', 
      error: error.message 
    });
  } finally {
    console.log('=== 添加收藏请求结束 ===');
  }
});

// 删除收藏
app.delete(/^\/api\/favorites\/(.*)$/, (req, res) => {
  console.log('=== 删除收藏请求开始 ===');
  try {
    const fullPathParam = req.params[0];
    const videoPath = decodeURIComponent(fullPathParam);
    
    const favorites = loadFavoritesFromFile();
    const initialCount = favorites.length;
    
    // 过滤掉要删除的收藏
    const updatedFavorites = favorites.filter(v => v.path !== videoPath);
    
    if (updatedFavorites.length === initialCount) {
      console.log(`⚠️  收藏不存在: ${videoPath}`);
      return res.status(404).json({ 
        success: false, 
        message: '收藏不存在' 
      });
    }
    
    saveFavoritesToFile(updatedFavorites);
    
    console.log(`✅ 成功删除收藏: ${videoPath}`);
    res.json({ 
      success: true, 
      message: '收藏已删除', 
      favorites: updatedFavorites 
    });
  } catch (error) {
    console.error(`❌ 删除收藏失败: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: '删除收藏失败', 
      error: error.message 
    });
  } finally {
    console.log('=== 删除收藏请求结束 ===');
  }
});

// 检查视频是否被收藏
app.get('/api/favorites/:path', (req, res) => {
  console.log('=== 检查收藏状态请求开始 ===');
  try {
    const videoPath = decodeURIComponent(req.params.path);
    const favorites = loadFavoritesFromFile();
    
    const isFavorited = favorites.some(v => v.path === videoPath);
    
    console.log(`✅ 成功检查收藏状态: ${videoPath} - ${isFavorited ? '已收藏' : '未收藏'}`);
    res.json({ 
      success: true, 
      isFavorited: isFavorited 
    });
  } catch (error) {
    console.error(`❌ 检查收藏状态失败: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: '检查收藏状态失败', 
      error: error.message 
    });
  } finally {
    console.log('=== 检查收藏状态请求结束 ===');
  }
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  // 获取本机IP地址
  const os = require('os');
  const networkInterfaces = os.networkInterfaces();
  let localIp = 'localhost';
  
  // 遍历网络接口，获取本地IP
  Object.keys(networkInterfaces).forEach(iface => {
    networkInterfaces[iface].forEach(ip => {
      if (ip.family === 'IPv4' && !ip.internal) {
        localIp = ip.address;
      }
    });
  });
  
  console.log(`服务器运行在 http://localhost:${PORT} (本地访问)`);
  console.log(`服务器运行在 http://${localIp}:${PORT} (局域网访问)`);
  console.log(`请在浏览器中访问上述地址查看视频列表`);
  
  // 服务器启动时异步扫描视频，不阻塞HTTP服务
  console.log('========================================');
  console.log('开始异步扫描所有磁盘的视频文件...');
  console.log(`HTTP服务已启动，您可以立即访问 http://localhost:3000 或 http://${localIp}:3000 查看视频列表`);
  console.log('视频扫描将在后台持续进行，扫描结果会自动更新到缓存文件');
  console.log('========================================');
  
  // 使用setTimeout将扫描操作放入事件队列，让HTTP服务先启动
  setTimeout(() => {
    scanAllVideos();
  }, 1000);
});

// 扫描所有视频的函数，用于服务器启动时自动扫描
async function scanAllVideos() {
  let allVideos = [];
  const allPossibleDrives = [];
  
  // 生成所有可能的驱动器字母 A-Z
  for (let i = 65; i <= 90; i++) {
    const drive = String.fromCharCode(i) + ':';
    allPossibleDrives.push(drive);
  }
  
  // 遍历所有可能的驱动器，只扫描可访问的
  for (const drive of allPossibleDrives) {
    try {
      // 使用异步方式检查磁盘是否存在且可读
      await fs.promises.access(drive, fs.constants.R_OK);
      
      if (drive === 'C:') {
        // C盘只扫描迅雷下载文件夹
        const thunderDownloadPath = path.join(drive, '迅雷下载');
        if (fs.existsSync(thunderDownloadPath)) {
          console.log(`正在扫描C盘 ${thunderDownloadPath} 文件夹...`);
          const videos = await getVideosFromDirectory(thunderDownloadPath);
          console.log(`C盘 ${thunderDownloadPath} 文件夹找到 ${videos.length} 个视频文件`);
          allVideos.push(...videos);
          
          // 每扫描完一个磁盘，就保存一次缓存，避免数据丢失
          saveVideosToCache(allVideos);
        } else {
          console.log(`C盘 ${thunderDownloadPath} 文件夹不存在`);
        }
      } else {
        // 其他盘全部扫描
        console.log(`正在扫描磁盘 ${drive}...`);
        const videos = await getVideosFromDirectory(drive);
        console.log(`磁盘 ${drive} 找到 ${videos.length} 个视频文件`);
        allVideos.push(...videos);
        
        // 每扫描完一个磁盘，就保存一次缓存，避免数据丢失
        saveVideosToCache(allVideos);
      }
    } catch (error) {
      // 忽略不可访问的驱动器
      console.log(`磁盘 ${drive} 不可访问或不存在，跳过扫描: ${error.message}`);
    }
  }
  
  console.log(`扫描完成，共找到 ${allVideos.length} 个视频文件`);
  
  // 最终保存一次缓存
  saveVideosToCache(allVideos);
  
  // 扫描完成提醒
  console.log('========================================');
  console.log('✅ 视频扫描已完成！');
  console.log(`📁 共扫描 ${allVideos.length} 个100MB以上的视频文件`);
  console.log('💾 视频列表已保存到缓存文件');
  console.log('🌐 请在浏览器中访问 http://localhost:3000 查看视频');
  console.log('========================================');
}


