<template>
  <div class="">
    个人中心

    <el-button @click="change">切换为英文</el-button>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const store = useStore()
const i18n = useI18n()

const change = () => {
  const lang = store.getters.language === 'zh' ? 'en' : 'zh'
  i18n.locale.value = lang
  store.commit('app/setLanguage', lang)
}
</script>

<style lang="scss" scoped></style>
