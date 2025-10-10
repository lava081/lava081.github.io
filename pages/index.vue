<template>
  <div class="center-container">
    <title>早上好喵! - lava081的测试页</title>
  <h1>你好喵，这里是 lava081 的静态测试页！</h1>
    <div class="status-display">
      <div class="status-item">
        <p class="status-label">访问地址：</p>
        <p class="status-text">{{ currentUrl }}</p>
      </div>
      <div class="status-item">
        <p class="status-label">DNS服务器：</p>
        <p class="status-text">{{ dnsInfo }}</p>
      </div>
      <div class="status-item">
        <p class="status-label">访问延迟：</p>
        <p class="status-text">{{ latency }}ms</p>
      </div>
    </div>
    
  <p>部署成功！🎉</p>
    
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
      </div>
    </div>
  </div>
</template>
<script setup>
// 获取当前URL
const currentUrl = ref('')
const dnsInfo = ref('检测中...')
const latency = ref(0)
let refreshInterval = null

// 在客户端获取当前URL和网络信息
onMounted(() => {
  if (typeof window !== 'undefined') {
    currentUrl.value = window.location.href
    
    // 获取DNS信息
    getDNSInfo()
    
    // 测量访问延迟
    measureLatency()
    
    // 设置10秒自动刷新延迟
    refreshInterval = setInterval(() => {
      measureLatency()
    }, 10000)
  }
})

// 组件卸载时清理定时器
onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})

// 获取DNS信息
async function getDNSInfo() {
  try {
    // 尝试通过WebRTC获取本地IP来推断DNS
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (connection) {
      dnsInfo.value = connection.dns || '未知'
    } else {
      // 备用方案：通过API获取DNS信息
      const response = await fetch('https://dns.google/resolve?name=google.com&type=A')
      if (response.ok) {
        dnsInfo.value = 'Google DNS'
      } else {
        dnsInfo.value = '系统默认'
      }
    }
  } catch (error) {
    dnsInfo.value = '检测失败'
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
  } catch (error) {
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
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--text-color);
  text-align: left;
  width: 100%;
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

/* 联系方式区域 */
.contact-section {
  width: 100%;
  max-width: 1000px;
}

.contact-buttons {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 1024px) {
  .contact-buttons {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .status-display {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .contact-buttons {
    grid-template-columns: repeat(6, 1fr) !important;
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
</style>
