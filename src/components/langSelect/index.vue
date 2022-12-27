<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="'dark'">
        <svg-icon icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const i18n = useI18n()
const store = useStore()
const language = computed(() => store.getters.language)

const handleSetLanguage = (value: string) => {
  i18n.locale.value = value
  store.commit('app/setLanguage', value)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>
<style scoped></style>
