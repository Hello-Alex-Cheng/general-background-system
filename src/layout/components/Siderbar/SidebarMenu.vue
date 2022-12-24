<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :uniqueOpened="true"
    default-active="1"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <!-- 子集 menu 菜单 -->
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
    </el-sub-menu>
    <!-- 具体菜单项 -->
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>导航四</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Location, Setting } from '@element-plus/icons-vue'
</script>
<style scoped></style>
