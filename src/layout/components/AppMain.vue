<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const store = useStore()

/**
 * 生成 title
 */
const getTitle = (route: RouteLocationNormalizedLoaded) => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title as string)
  }
  return title
}

watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return

    const { fullPath, meta, name, params, path, query } = to

    store.commit('app/addTagsViewList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)
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
