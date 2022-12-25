<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 menu -->
    <siderbar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></siderbar>

    <div class="main-container">
      <div class="fixed-header">
        <nav-bar></nav-bar>
      </div>

      <app-main></app-main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Siderbar from './components/Siderbar/index.vue'
import NavBar from './components/NavBar.vue'
import AppMain from './components/AppMain.vue'

// 导入 variable.scss 中定义的变量
import variables from '@/styles/variables.scss'
</script>

<style scoped lang="scss">
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
