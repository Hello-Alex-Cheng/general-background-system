<template>
  <div id="app">
    <router-view></router-view>

    <div class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank">
        京ICP备2022010298号-1
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance } from 'vue'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { useStore } from 'vuex'

// 获取全局属性上的值
const instance = getCurrentInstance()
console.log(instance?.appContext.config.globalProperties)

const store = useStore()
const themeColor = computed(() => store.getters.cssVars.menuBg)

generateNewStyle(store.getters.mainColor).then(newStyleText => {
  writeNewStyle(newStyleText)
})
</script>

<style lang="scss">
@import '@/assets/scss/mixin.scss';

#app {
  background-color: rgb(246, 248, 250);
  .footer {
    width: 100%;
    position: fixed;
    bottom: 12px;
    text-align: center;

    a {
      text-decoration: none;
      color: v-bind(themeColor);
    }
  }
}
</style>
