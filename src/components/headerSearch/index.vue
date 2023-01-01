<template>
  <div :class="{ show: isShow }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon="search"
      @click.stop="onShowClick"
    />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      placeholder="Search"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join(' > ')"
        :value="option.item"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { filterRouters } from '@/utils/route'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { generateRoutes } from './FuseData'

const router = useRouter()

// 控制 search 显示
const isShow = ref(false)

// el-select 实例
const headerSearchSelectRef = ref(null)

// 检索数据源: 和 SidebarMenu 逻辑一样
const searchPool = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateRoutes(filterRoutes)
})

// 模糊搜索🔍
const fuse = new Fuse(searchPool.value, {
  // 是否按优先级进行排序
  shouldSort: true,
  // 匹配长度超过这个值的才会被认为是匹配的
  minMatchCharLength: 1,
  // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
  // name：搜索的键
  // weight：对应的权重
  // 表示我们将用户输入的值，与 title 和 path 进行匹配
  keys: [
    {
      name: 'title',
      weight: 0.7
    },
    {
      name: 'path',
      weight: 0.3
    }
  ]
})

const onShowClick = () => {
  isShow.value = !isShow.value

  if (headerSearchSelectRef.value) {
    ;(headerSearchSelectRef.value as HTMLInputElement).focus()
  }
}

// search 相关
const search = ref('')
const searchOptions = ref<
  {
    item: { path: string; title: string[] }
    refIndex: number
  }[]
>([])
// 搜索方法
const querySearch = (value: string) => {
  if (value !== '') {
    searchOptions.value = fuse.search(value)
  } else {
    searchOptions.value = []
  }
}
// 选中回调
const onSelectChange = (value: { path: string; title: string[] }) => {
  router.push(value.path)
}
</script>
<style scoped lang="scss">
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      // border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
