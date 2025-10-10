<template>
  <div class="center-container">
    <title>早上好喵! - lava081的测试页</title>
    <h1>你好喵，这里是 lava081 的静态测试页！</h1>
    <p>部署成功！🎉</p>
    <div class="status-display">
      <div class="status-item">
        <p class="status-label">访问地址：</p>
        <p class="status-text">{{ currentUrl }}</p>
      </div>
      <div class="status-item">
        <p class="status-label">浏览器标识：</p>
        <p class="status-text" @click="copyBrowserInfo" title="点击复制User Agent">{{ browserInfo }}</p>
      </div>
      <div class="status-item">
        <p class="status-label">访问延迟：</p>
        <p class="status-text">{{ latency }}ms</p>
      </div>
    </div>
  
  <!-- 剪贴板内容显示区域 -->
  <div class="clipboard-section">
    <div class="clipboard-header">
      <h3>剪贴板内容</h3>
    </div>
    <textarea 
      ref="clipboardTextarea"
      v-model="clipboardContent" 
      readonly 
      class="clipboard-textarea"
      placeholder="正在加载剪贴板内容..."
    ></textarea>
  </div>
    
    <!-- 联系方式区域 -->
    <div class="contact-section">
      <h2>联系我</h2>
      <div class="contact-buttons">
        <!-- GitHub 链接 -->
        <button 
          class="contact-btn github-btn"
          @click="openGitHub"
          title="前往我的GitHub主页"
        >
          <Icon name="lucide:github" class="btn-icon" />
          <span>GitHub</span>
        </button>
        
        <!-- Gitee 链接 -->
        <button 
          class="contact-btn gitee-btn"
          @click="openGitee"
          title="前往我的Gitee主页"
        >
          <Icon name="lucide:git-branch" class="btn-icon" />
          <span>Gitee</span>
        </button>
        
        <!-- QQ 添加 -->
        <button 
          class="contact-btn qq-btn"
          @click="addQQ"
          title="添加我的QQ"
        >
          <Icon name="lucide:message-circle" class="btn-icon" />
          <span>QQ</span>
        </button>
        
        <!-- 微信 添加 -->
        <button 
          class="contact-btn wechat-btn"
          @click="addWeChat"
          title="添加我的微信"
        >
          <Icon name="lucide:smartphone" class="btn-icon" />
          <span>微信</span>
        </button>
        
        <!-- 发邮件 -->
        <button 
          class="contact-btn email-btn"
          @click="sendEmail"
          title="给我发邮件"
        >
          <Icon name="lucide:mail" class="btn-icon" />
          <span>邮件</span>
        </button>
        
        <!-- Telegram 链接 -->
        <button 
          class="contact-btn telegram-btn"
          @click="openTelegram"
          title="通过Telegram联系我"
        >
          <Icon name="lucide:send" class="btn-icon" />
          <span>Telegram</span>
        </button>
        
        <!-- 视奸 链接 -->
        <button 
          class="contact-btn spy-btn"
          @click="openSpy"
          title="感谢sleepy-project/sleepy"
        >
          <Icon name="lucide:eye" class="btn-icon" />
          <span>视奸</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
// 获取当前URL
const currentUrl = ref('')
const browserInfo = ref('检测中...')
const latency = ref(0)
let refreshInterval = null

// 剪贴板相关状态
const clipboardContent = ref('')
const clipboardTextarea = ref(null)
let clipboardInterval = null

// 在客户端获取当前URL和网络信息
onMounted(() => {
  if (typeof window !== 'undefined') {
    currentUrl.value = window.location.href
    
    // 获取浏览器标识信息
    getBrowserInfo()
    
    // 测量访问延迟
    measureLatency()
    
    // 设置10秒自动刷新延迟
    refreshInterval = setInterval(() => {
      measureLatency()
    }, 10000)
    
    // 启动剪贴板自动刷新
    startAutoRefresh()
  }
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
  if (clipboardInterval) {
    clearInterval(clipboardInterval)
  }
})

// 获取浏览器标识信息
function getBrowserInfo() {
  try {
    const userAgent = navigator.userAgent
    const language = navigator.language
    const cookieEnabled = navigator.cookieEnabled
    const doNotTrack = navigator.doNotTrack
    const hardwareConcurrency = navigator.hardwareConcurrency
    
    // 检测操作系统
    let os = '未知'
    if (userAgent.includes('Windows NT 10.0')) os = 'Windows 10/11'
    else if (userAgent.includes('Windows NT 6.3')) os = 'Windows 8.1'
    else if (userAgent.includes('Windows NT 6.1')) os = 'Windows 7'
    else if (userAgent.includes('Windows NT 6.0')) os = 'Windows Vista'
    else if (userAgent.includes('Windows NT 5.1')) os = 'Windows XP'
    else if (userAgent.includes('Mac OS X')) os = 'macOS'
    else if (userAgent.includes('Android')) os = 'Android'
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS'
    else if (userAgent.includes('Linux')) os = 'Linux'
    
    // 检测浏览器
    let browser = '未知'
    let browserVersion = ''
    if (userAgent.includes('Edge/')) {
      browser = 'Edge'
      const match = userAgent.match(/Edge\/(\d+\.\d+)/)
      if (match) browserVersion = match[1]
    } else if (userAgent.includes('Chrome/')) {
      browser = 'Chrome'
      const match = userAgent.match(/Chrome\/(\d+\.\d+)/)
      if (match) browserVersion = match[1]
    } else if (userAgent.includes('Firefox/')) {
      browser = 'Firefox'
      const match = userAgent.match(/Firefox\/(\d+\.\d+)/)
      if (match) browserVersion = match[1]
    } else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) {
      browser = 'Safari'
      const match = userAgent.match(/Version\/(\d+\.\d+)/)
      if (match) browserVersion = match[1]
    } else if (userAgent.includes('Opera/') || userAgent.includes('OPR/')) {
      browser = 'Opera'
      const match = userAgent.match(/(?:Opera|OPR)\/(\d+\.\d+)/)
      if (match) browserVersion = match[1]
    }
    
    // 检测屏幕信息
    const screenWidth = screen.width
    const screenHeight = screen.height
    const screenColorDepth = screen.colorDepth
    
    // 检测时区
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    // 检测网络连接信息
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const connectionType = connection ? connection.effectiveType || '未知' : '未知'
    
    // 构建浏览器标识字符串
    const browserFingerprint = [
      `${browser}${browserVersion ? ' ' + browserVersion : ''}`,
      os,
      `${screenWidth}x${screenHeight}`,
      `${screenColorDepth}bit`,
      language,
      timezone,
      `${hardwareConcurrency}核`,
      connectionType,
      cookieEnabled ? 'Cookie启用' : 'Cookie禁用',
      doNotTrack === '1' ? 'DNT启用' : 'DNT禁用'
    ].join(' | ')
    
    browserInfo.value = browserFingerprint
  } catch {
    browserInfo.value = '检测失败'
  }
}

// 复制浏览器标识信息
async function copyBrowserInfo() {
  try {
    // 复制原始的User Agent字符串
    const originalUA = navigator.userAgent
    await navigator.clipboard.writeText(originalUA)
    // 临时显示复制成功提示
    const originalText = browserInfo.value
    browserInfo.value = 'User Agent已复制到剪贴板！'
    setTimeout(() => {
      browserInfo.value = originalText
    }, 2000)
  } catch {
    // 如果剪贴板API不可用，显示User Agent
    alert(`User Agent：\n${navigator.userAgent}`)
  }
}


// 启动自动刷新
function startAutoRefresh() {
  if (clipboardInterval) {
    clearInterval(clipboardInterval)
  }
  
  // 立即读取一次剪贴板内容
  readClipboardContent()
  
  // 设置定时器每2秒自动刷新一次
  clipboardInterval = setInterval(async () => {
    await readClipboardContent()
  }, 2000)
}

// 读取剪贴板内容
async function readClipboardContent() {
  try {
    const text = await navigator.clipboard.readText()
    clipboardContent.value = text
  } catch (error) {
    clipboardContent.value = '无法读取剪贴板内容，可能是权限问题或浏览器不支持'
  }
}


// 测量访问延迟
async function measureLatency() {
  const startTime = performance.now()
  
  try {
    // 发送一个轻量级请求来测量延迟
    await fetch(window.location.origin, {
      method: 'HEAD',
      cache: 'no-cache'
    })
    
    const endTime = performance.now()
    latency.value = Math.round(endTime - startTime)
  } catch {
    // 如果请求失败，使用页面加载时间作为替代
    latency.value = Math.round(performance.now())
  }
}

// 联系方式功能
function openGitHub() {
  // 打开GitHub主页
  window.open('https://github.com/lava081', '_blank')
}

function addQQ() {
  // QQ添加功能 - 复制QQ号到剪贴板
  const qqNumber = '3100679727' // 请替换为您的真实QQ号
  navigator.clipboard.writeText(qqNumber).then(() => {
    alert(`QQ号 ${qqNumber} 已复制到剪贴板！`)
  }).catch(() => {
    // 如果剪贴板API不可用，显示QQ号
    alert(`我的QQ号：${qqNumber}`)
  })
}

function addWeChat() {
  // 微信添加功能 - 复制微信号到剪贴板
  const wechatId = 'lava081' // 请替换为您的真实微信号
  navigator.clipboard.writeText(wechatId).then(() => {
    alert(`微信号 ${wechatId} 已复制到剪贴板！`)
  }).catch(() => {
    // 如果剪贴板API不可用，显示微信号
    alert(`我的微信号：${wechatId}`)
  })
}

function sendEmail() {
  // 发邮件功能
  const email = 'lava081@lava081.cloudns.club' // 请替换为您的真实邮箱
  const subject = '来自网站的联系'
  const body = '你好，我想联系你...'
  
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = mailtoLink
}

function openGitee() {
  // 打开Gitee主页
  window.open('https://gitee.com/lava081', '_blank')
}

function openTelegram() {
  // 打开Telegram聊天
  const telegramUsername = 'lava081' // 请替换为您的Telegram用户名
  window.open(`https://t.me/${telegramUsername}`, '_blank')
}

function openSpy() {
  // 打开视奸页面
  window.open('https://lava081-sleepy.hf.space', '_blank')
}
</script>
<style scoped>
/* 居中容器 */
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
}

/* 标题样式 */
h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #22c55e 0%, #6b7280 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  width: 100%;
}

h2 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-color);
  text-align: left;
  width: 100%;
  font-weight: 600;
}

p {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: var(--text-color);
}


/* 状态显示区域 */
.status-display {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 1200px;
}

.status-item {
  padding: 1rem;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(107, 114, 128, 0.1) 100%);
  border-radius: 10px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  backdrop-filter: blur(10px);
  text-align: center;
}

.status-label {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  opacity: 0.8;
}

.status-text {
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  color: #22c55e;
  font-weight: 600;
  margin: 0;
  word-break: break-all;
}

/* 浏览器标识特殊样式 */
.status-item:has(.status-text[title="点击复制"]) .status-text {
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 6px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.status-item:has(.status-text[title="点击复制"]) .status-text:hover {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.5);
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.2);
}

.status-item:has(.status-text[title="点击复制"]) .status-text:active {
  transform: scale(0.98);
}

/* 剪贴板内容显示区域样式 */
.clipboard-section {
  margin: 1.5rem 0;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(107, 114, 128, 0.05) 100%);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 10px;
  animation: slideIn 0.3s ease-out;
  box-sizing: border-box;
  overflow: hidden;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.clipboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(34, 197, 94, 0.3);
}

.clipboard-header h3 {
  margin: 0;
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 600;
}


.clipboard-textarea {
  width: 100%;
  height: 120px;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.4;
  resize: vertical;
  background: #f9fafb;
  color: #374151;
  outline: none;
  transition: border-color 0.2s ease;
  min-height: 80px;
  max-height: 200px;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.clipboard-textarea:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}


/* 暗黑模式适配 */
.dark .clipboard-section {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(107, 114, 128, 0.1) 100%);
  border-color: rgba(34, 197, 94, 0.3);
}

.dark .clipboard-header {
  border-bottom-color: rgba(34, 197, 94, 0.4);
}

.dark .clipboard-header h3 {
  color: #f9fafb;
}


.dark .clipboard-textarea {
  background: #374151;
  border-color: #4b5563;
  color: #f9fafb;
}

.dark .clipboard-textarea:focus {
  border-color: #22c55e;
}

/* 联系方式区域 */
.contact-section {
  width: 100%;
  max-width: 1000px;
}

.contact-buttons {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.8rem;
  margin-top: 2rem;
}

/* 联系按钮基础样式 */
.contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.contact-btn:active {
  transform: translateY(-1px);
}

/* GitHub 按钮样式 */
.github-btn {
  background: linear-gradient(135deg, #24292e 0%, #1a1e22 100%);
  color: white;
}

.github-btn:hover {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  box-shadow: 0 8px 25px rgba(36, 41, 46, 0.3);
}

/* QQ 按钮样式 */
.qq-btn {
  background: linear-gradient(135deg, #12b7f5 0%, #0ea5e9 100%);
  color: white;
}

.qq-btn:hover {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  box-shadow: 0 8px 25px rgba(18, 183, 245, 0.3);
}

/* 微信 按钮样式 */
.wechat-btn {
  background: linear-gradient(135deg, #07c160 0%, #06ad56 100%);
  color: white;
}

.wechat-btn:hover {
  background: linear-gradient(135deg, #06ad56 0%, #059e4e 100%);
  box-shadow: 0 8px 25px rgba(7, 193, 96, 0.3);
}

/* 邮件按钮样式 */
.email-btn {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.email-btn:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
}

/* Gitee 按钮样式 */
.gitee-btn {
  background: linear-gradient(135deg, #c71d23 0%, #a91c1c 100%);
  color: white;
}

.gitee-btn:hover {
  background: linear-gradient(135deg, #a91c1c 0%, #991b1b 100%);
  box-shadow: 0 8px 25px rgba(199, 29, 35, 0.3);
}

/* Telegram 按钮样式 */
.telegram-btn {
  background: linear-gradient(135deg, #0088cc 0%, #006699 100%);
  color: white;
}

.telegram-btn:hover {
  background: linear-gradient(135deg, #006699 0%, #004d73 100%);
  box-shadow: 0 8px 25px rgba(0, 136, 204, 0.3);
}

/* 视奸 按钮样式 */
.spy-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
}

.spy-btn:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
}

/* 按钮图标 */
.btn-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.contact-btn:hover .btn-icon {
  transform: scale(1.1);
}

/* 按钮文字 */
.contact-btn span {
  font-weight: 600;
}

/* 脉冲动画效果 */
.contact-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.contact-btn:hover::before {
  transform: translateX(100%);
}

/* 响应式设计 */
@media (max-width: 1600px) {
  .contact-section {
    max-width: 1200px;
  }
}

@media (max-width: 1400px) {
  .contact-section {
    max-width: 1000px;
  }
}

@media (max-width: 1200px) {
  .status-display {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .contact-buttons {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 1024px) {
  .contact-buttons {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .status-display {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .contact-buttons {
    grid-template-columns: repeat(7, 1fr) !important;
    gap: 0.1rem !important;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .contact-btn {
    padding: 0.2rem 0.1rem !important;
    font-size: 0.6rem !important;
    gap: 0 !important;
    height: auto !important;
    min-height: 1.5rem !important;
    font-weight: 500 !important;
  }
  
  .btn-icon {
    display: none !important;
  }
  
  /* 手机端剪贴板区域优化 */
  .clipboard-section {
    margin: 1rem 0;
    padding: 0.75rem;
  }
  
  .clipboard-textarea {
    font-size: 0.8rem;
    padding: 0.5rem;
    height: 100px;
    min-height: 60px;
  }
}

@media (max-width: 480px) {
  .contact-section {
    max-width: 100%;
    padding: 0 1rem;
  }
  
  .contact-btn {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
  
  .btn-icon {
    width: 18px;
    height: 18px;
  }
}

/* 暗黑模式适配 */
.dark .contact-btn {
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
}

.dark .contact-btn:hover {
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
}

/* 暗黑模式标题渐变 */
.dark h2 {
  background: linear-gradient(135deg, #22c55e 0%, #6b7280 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .clipboard-header h3 {
  background: linear-gradient(135deg, #22c55e 0%, #6b7280 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
