<template>
  <!-- 根容器：绑定暗黑模式类，使用 app-container 样式 -->
  <!-- :class="{ dark: isDark }" 根据 isDark 状态切换暗黑模式 -->
  <!-- class="app-container" 应用全局布局样式 -->
  <div :class="{ dark: isDark }" class="app-container">
  
    <!-- 导航栏 -->
    <!-- 
      1. 粘性定位：滚动时固定在顶部
      2. 使用 flex 布局水平排列子元素
      3. background-color 由主题变量控制
    -->
    <nav class="navbar">

      <!-- 右侧用户头像 -->
      <!-- 
        1. 绝对定位在右侧 6% 的位置
        2. 使用 flex 布局垂直居中子元素
      -->
      <div class="navbar-right">
        <!-- 登录/用户按钮 -->
        <!-- 
          1. 无边框设计，背景色继承主题
          2. 点击事件：未登录时跳转到登录页
          3. z-index 确保按钮在导航栏背景之上
        -->
        <button 
          class="login-button" 
          @click="handleLoginClick"
        >
          <!-- 已登录状态 -->
          <template v-if="user_login_state">
            <!-- 用户头像：圆形，覆盖容器 -->
            <img 
              :src="user_avatarUrl" 
              alt="avatar" 
              class="user_avatar" 
            />
            欢迎，{{ user_name }}！
          </template>
          <!-- 未登录状态 -->
          <template v-else>
            未登录
          </template>
        </button>
      </div>
    </nav>

    <!-- 内容区域 -->
    <!-- 
      1. flex:1 占据剩余垂直空间
      2. 水平居中布局
      3. 滚动条处理：内容溢出时显示
    -->
    <div class="content">
      <slot />
    </div>

    <!-- 页脚 -->
    <!-- 
      1. 粘性定位：固定在底部
      2. 使用 flex 布局水平排列子元素
      3. 背景色继承主题变量
    -->
    <footer class="footer">
      <!-- 暗黑模式切换按钮 -->
      <div class="footer-left">
        <button 
          class="theme-toggle-btn"
          @click="isDark = !isDark"
          :class="{ 'dark-mode': isDark }"
          :title="isDark ? '切换到亮色模式' : '切换到暗黑模式'"
        >
          <div class="theme-toggle-icon">
            <Icon 
              :name="isDark ? 'lucide:moon' : 'lucide:sun'" 
              class="icon"
            />
          </div>
          <div class="theme-toggle-track">
            <div class="theme-toggle-thumb"></div>
          </div>
        </button>
      </div>
      <!-- 版权信息 -->
      <div class="footer-center">
        <p>© {{ new Date().getFullYear() }} lava081.</p>
      </div>
      <!-- 右侧占位 -->
      <div class="footer-right"></div>
    </footer>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

// 暗黑模式状态管理
// 
// 1. 监听系统颜色模式（通过 useColorMode）
// 2. 计算属性 isDark 实现双向绑定：
//    - get()：判断当前模式是否为暗黑
//    - set()：设置系统偏好模式并持久化
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  }
})

// 动态favicon管理
// 
// 1. 根据暗黑模式状态动态切换favicon
// 2. 暗黑模式：使用 favicon-dark.png
// 3. 亮色模式：使用 favicon.png（移除-dark后缀）
const faviconUrl = computed(() => {
  return isDark.value 
    ? 'https://github.githubassets.com/favicons/favicon-dark.png'
    : 'https://github.githubassets.com/favicons/favicon.png'
})

// 监听暗黑模式变化，动态更新favicon
watch(isDark, () => {
  updateFavicon(faviconUrl.value)
}, { immediate: true })

// 更新favicon的函数
function updateFavicon(url) {
  // 确保在客户端环境中执行
  if (typeof window !== 'undefined') {
    // 移除现有的favicon链接
    const existingLinks = document.querySelectorAll('link[rel*="icon"]')
    existingLinks.forEach(link => link.remove())
    
    // 添加新的favicon链接
    const link = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/png'
    link.href = url
    document.head.appendChild(link)
    
    // 同时更新apple-touch-icon（如果需要）
    const appleLink = document.createElement('link')
    appleLink.rel = 'apple-touch-icon'
    appleLink.href = url
    document.head.appendChild(appleLink)
  }
}

// 使用useHead设置初始favicon
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: faviconUrl
    }
  ]
})

// 用户状态模拟（实际应从 Vuex/Pinia store 获取）
// 
// 1. user_login_state：模拟登录状态
// 2. user_name：模拟用户名
// 3. user_avatarUrl：模拟用户头像地址
const user_login_state = true // 模拟已登录状态
const user_name = 'lava081'   // 模拟用户名
const user_avatarUrl = 'https://gitee.com/lava081.png' // 模拟用户头像地址

// 处理登录按钮点击事件
function handleLoginClick() {
  const router = useRouter()
  if (user_login_state) {
    // 已登录状态：可以跳转到用户中心或个人资料页面
    // 这里可以根据实际需求跳转到不同页面
    // router.push('/profile') // 假设有个人资料页面
  } else {
    // 未登录状态：跳转到登录页面
    router.push('/login')
  }
}

// 模拟点击功能
function simulateClick(elementSelector) {
  // 确保在客户端环境中执行
  if (typeof window !== 'undefined') {
    const element = document.querySelector(elementSelector)
    if (element) {
      // 创建并分发点击事件
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
      element.dispatchEvent(clickEvent)
      console.log(`模拟点击了元素: ${elementSelector}`)
    } else {
      console.warn(`未找到元素: ${elementSelector}`)
    }
  }
}
</script>

<style>
/* 全局基础样式 */
/* 
  1. 移除默认外边距
  2. 设置全局字体
  3. 主题切换过渡动画
  4. Flex 容器垂直排列子元素
*/
body {
  margin: 0;
  font-family: Arial, sans-serif;
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  flex-direction: column;
}

/* 外层容器 */
/* 
  1. Flex 容器垂直排列子元素
  2. min-height: 100vh 确保占据完整视口高度
  3. width:100% 占满父容器宽度
*/
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

/* 导航栏样式 */
/* 
  1. 粘性定位固定顶部
  2. flex 布局水平排列子元素
  3. padding: 1rem 0 0 1rem 左侧 1rem 外边距
  4. z-index:51 确保在页脚之上
*/
.navbar {
  display: flex;
  padding: 1rem 0 0 1rem;
  align-items: center;
  background-color: var(--background-color);
  position: sticky;
  top: 0;
  z-index: 51;
  width: 100%;
}

/* 导航栏右侧按钮容器 */
/* 
  1. 绝对定位在右侧 6% 的位置
  2. flex 布局垂直居中子元素
  3. gap:0.5rem 子元素间距
*/
.navbar .navbar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  right: 6%;
}

/* 登录/用户按钮样式 */
/* 
  1. 无边框设计
  2. 圆角边框
  3. 背景色和文字色继承主题变量
  4. z-index:52 确保在导航栏背景之上
*/
.navbar .login-button {
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
  height: 30px;
  font-size: 1rem;
  padding: 0;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: var(--background-color);
  color: var(--text-color);
  z-index: 52;
}

/* 用户头像样式 */
/* 
  1. 占据容器高度的 90%
  2. 圆形设计
  3. 图片覆盖容器
*/
.navbar .user_avatar {
  height: 90%;
  border-radius: 50%;
  margin-right: 0.5rem;
  object-fit: cover;
}

/* 内容区域样式 */
/* 
  1. flex:1 占据剩余垂直空间
  2. 水平居中布局
  3. overflow-y:auto 内容溢出时显示滚动条
*/
.content {
  flex: 1;
  margin: 0 auto;
  overflow-y: auto;
}

/* 页脚样式 */
/* 
  1. 粘性定位固定底部
  2. flex 布局水平排列子元素
  3. 背景色继承主题变量
  4. z-index:50 确保在导航栏之下
*/
.footer {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--background-color);
  position: sticky;
  bottom: 0;
  z-index: 50;
  width: 100%;
}

/* 页脚左侧按钮容器 */
/* 
  1. flex 布局垂直居中子元素
  2. 添加左侧间距
*/
.footer-left {
  display: flex;
  align-items: center;
  padding-left: 2rem;
  min-width: 120px;
  justify-content: flex-start;
}

/* 页脚居中文本 */
/* 
  1. flex:1 占据剩余水平空间
  2. 文本水平居中
*/
.footer-center {
  flex: 1;
  text-align: center;
}

/* 页脚右侧占位 */
/* 
  1. flex 布局垂直居中子元素
  2. 添加右侧间距
*/
.footer-right {
  display: flex;
  align-items: center;
  padding-right: 2rem;
  min-width: 120px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-left {
    padding-left: 1rem;
    min-width: 80px;
  }
  
  .footer-right {
    padding-right: 1rem;
    min-width: 80px;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 0.5rem;
  }
  
  .footer-left {
    padding-left: 0.5rem;
    min-width: 60px;
  }
  
  .footer-right {
    padding-right: 0.5rem;
    min-width: 60px;
  }
}

/* 暗黑模式主题变量 */
/* 
  1. 定义暗黑模式的背景色和文字色
  2. 通过类名 .dark 触发主题切换
*/
.dark {
  --background-color: #1a1a1a;
  --text-color: white;
}

/* 暗黑模式样式覆盖 */
/* 
  1. 导航栏和页脚背景色继承主题变量
  2. 登录按钮文字和背景色调整
  3. 暗黑模式切换按钮样式调整
*/
.dark .navbar,
.dark .footer {
  background-color: var(--background-color);
}

.dark .login-button {
  color: white;
  background-color: var(--background-color);
}

/* 现代化主题切换按钮样式 */
.theme-toggle-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  background: linear-gradient(135deg, #22c55e 0%, #6b7280 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
}

.theme-toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
}

.theme-toggle-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
}

.theme-toggle-btn.dark-mode {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  box-shadow: 0 4px 15px rgba(45, 55, 72, 0.3);
}

.theme-toggle-btn.dark-mode:hover {
  box-shadow: 0 8px 25px rgba(45, 55, 72, 0.4);
}

.theme-toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle-btn:hover .theme-toggle-icon {
  transform: rotate(15deg) scale(1.1);
}

.theme-toggle-btn.dark-mode .theme-toggle-icon {
  transform: rotate(180deg);
}

.theme-toggle-btn.dark-mode:hover .theme-toggle-icon {
  transform: rotate(195deg) scale(1.1);
}

.theme-toggle-track {
  position: relative;
  width: 40px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.theme-toggle-btn.dark-mode .theme-toggle-track {
  background: rgba(255, 255, 255, 0.1);
}

.theme-toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.theme-toggle-btn.dark-mode .theme-toggle-thumb {
  transform: translateX(20px);
}

.icon {
  width: 16px;
  height: 16px;
  transition: all 0.3s ease;
}

/* 添加脉冲动画效果 */
.theme-toggle-btn::before {
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

.theme-toggle-btn:hover::before {
  transform: translateX(100%);
}

/* 主体背景色和文字色 */
/* 
  1. 动态背景色和文字色继承主题变量
*/
body {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
