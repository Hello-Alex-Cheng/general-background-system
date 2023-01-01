<template>
  <svg-icon
    :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    @click="onToggle"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 切换事件
const onToggle = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

// 监听变化
const change = () => {
  if (screenfull.isEnabled) {
    isFullscreen.value = screenfull.isFullscreen
  }
}

// 设置侦听器
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', change)
  }
})

// 删除侦听器
onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', change)
  }
})
</script>
<style scoped></style>
