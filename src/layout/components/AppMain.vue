<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>
<style scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
