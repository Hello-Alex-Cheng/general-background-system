<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          generateTitle((item.meta && item.meta.title) as string)
        }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          generateTitle((item.meta && item.meta.title) as string)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const breadcrumbData = ref<RouteRecordRaw[]>([]) // 存放计算出的面包屑数据

const store = useStore()
const route = useRoute()
const router = useRouter()
const getBreadcrumbData = () => {
  console.log(route.matched)

  // 只有存在 meta 并且 meta.title 的路由，我们才会显示到面包屑中
  // 就像 menu 菜单一样，类似 404 login 的我们不要显示
  breadcrumbData.value = route.matched.filter(r => r.meta && r.meta.title)
}

watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

// 跳转路由
const onLinkClick = (item: RouteRecordRaw) => {
  router.push(item.path)
}

// 将来需要进行主题替换，所以这里获取下动态样式
const linkHoverColor = ref(store.getters.cssVars.menuBg)
</script>
<style scoped lang="scss">
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;

    &:hover {
      color: v-bind(linkHoverColor);
    }
  }

  ::v-deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
