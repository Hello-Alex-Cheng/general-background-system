<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVars.menuBg"
    :text-color="$store.getters.cssVars.menuText"
    :active-text-color="$store.getters.cssVars.menuActiveText"
    router
    :collapse="!$store.getters.sidebarOpened"
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const route = useRoute()

const routes = computed(() => {
  const routes = filterRouters(router.getRoutes())

  return generateMenus(routes)
})

const activeMenu = computed(() => {
  const { path } = route
  return path
})

console.log(routes.value)
</script>
<style scoped></style>
