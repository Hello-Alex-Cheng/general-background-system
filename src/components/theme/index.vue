<template>
  <h3>暗黑主题</h3>
  <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <n-button type="primary" @click="theme = darkTheme">深色</n-button>
        <n-button @click="theme = null">浅色</n-button>
      </n-space>
    </n-card>
  </n-config-provider>
  <br />

  <h3>修改主题</h3>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-card>
      <n-space>
        <n-button type="primary" @click="theme = darkTheme">深色</n-button>
        <n-button @click="theme = null">浅色</n-button>
      </n-space>
    </n-card>
  </n-config-provider>

  <h3>主题编辑器</h3>
  <n-theme-editor> </n-theme-editor>

  <h3>国际化</h3>
  <n-config-provider :locale="customizedLocale" :date-locale="dateZhCN">
    <n-select></n-select>

    <n-input v-model:value="value" />
    <p>value: {{ value }}</p>
  </n-config-provider>

  <my-button>JSX button</my-button>

  <pre>
  {{ JSON.stringify(formValue, 0) }}
  </pre>
</template>

<script lang="ts" setup>
import { defineComponent, ref, getCurrentInstance } from 'vue'
import {
  NButton,
  darkTheme,
  NCard,
  NSpace,
  NConfigProvider,
  GlobalThemeOverrides,
  NThemeEditor,
  NSelect,
  zhCN,
  dateZhCN,
  NInput,
  createLocale
} from 'naive-ui'

import MyButton from '../jsx/index.vue'

const customizedLocale = createLocale(
  {
    Input: {
      placeholder: '不提班'
    }
  },
  zhCN
)

/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: 'skyblue'
  },
  Button: {
    textColor: 'red'
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: '#FF0000'
      }
    }
  }
}

const theme = ref(null)
const value = ref('')

const formValue = {
  user: {
    name: '',
    age: ''
  },
  phone: ''
}
</script>
