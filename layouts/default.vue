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
      <!-- 左侧 Logo -->
      <!-- 
        1. 固定位置在导航栏左侧
        2. 图标高度由 CSS 控制
      -->
      <div class="navbar-left">
        <img src="/logo.png" alt="Logo" class="logo" />
      </div>

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
          @click="user_login_state ? null : $router.push('/login')"
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
        <UButton
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          variant="outline"
          class="dark-mode-toggle"
          @click="isDark = !isDark"
        />
      </div>
      <!-- 版权信息 -->
      <div class="footer-center">
        <p>© {{ new Date().getFullYear() }} lava081.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>

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

// 用户状态模拟（实际应从 Vuex/Pinia store 获取）
// 
// 1. user_login_state：模拟登录状态
// 2. user_name：模拟用户名
// 3. user_avatarUrl：模拟用户头像地址
const user_login_state = true // 模拟已登录状态
const user_name = 'lava081'   // 模拟用户名
const user_avatarUrl = 'https://gitee.com/lava081.png' // 模拟用户头像地址
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

/* 导航栏Logo样式 */
/* 
  1. 固定高度 60px
  3. z-index:53 确保层级最高
*/
.navbar .logo {
  height: 60px;
  z-index: 53;
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
*/
.footer-left {
  display: flex;
  align-items: center;
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

.dark .dark-mode-toggle {
  color: white;
  background-color: var(--background-color);
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
