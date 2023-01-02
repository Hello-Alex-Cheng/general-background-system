<!-- [处理基于路由的动态过渡](https://next.router.vuejs.org/zh/guide/advanced/transitions.html#%E5%9F%BA%E4%BA%8E%E8%B7%AF%E7%94%B1%E7%9A%84%E5%8A%A8%E6%80%81%E8%BF%87%E6%B8%A1) -->
<!-- 官方已经给出了示例代码，结合 `router-view` 和 `transition` 我们可以非常方便的实现这个功能 -->
<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import { isTags } from '@/utils/tags'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'
import watchSwitchLang from '@/i18n/watchSwitchLang'

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
    // generateTitle 根据 i18n 生成 title
    title = generateTitle(route.meta.title as string)
  }
  return title
}

// 监听国际化语言变化
watchSwitchLang(() => {
  store.getters.tagsViewList.forEach(
    (route: RouteLocationNormalizedLoaded, index: number) => {
      store.commit('app/changeTagsView', {
        index,
        tag: {
          ...route,
          title: getTitle(route)
        }
      })
    }
  )
})

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

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
