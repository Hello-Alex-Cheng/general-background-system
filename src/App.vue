<template>
  <div id="app">
    <router-view></router-view>

    <div class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >京ICP备2022010298号-1</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, getCurrentInstance } from 'vue'

// 获取全局属性上的值
const instance = getCurrentInstance()
console.log(instance?.appContext.config.globalProperties)
</script>

<style lang="scss">
@import '@/assets/scss/mixin.scss';

#app {
  background-color: slategray;
  height: 100vh;

  .header {
    display: flex;
    background-color: antiquewhite;
  }

  .icon {
    display: inline-block;
    width: 48px;
    height: 33px;
    @include bg-image('logo');
    background-size: 100%;
  }

  .footer {
    width: 100%;
    position: fixed;
    bottom: 12px;
    text-align: center;

    a {
      text-decoration: none;
      color: #ccc;
    }
  }
}
</style>
