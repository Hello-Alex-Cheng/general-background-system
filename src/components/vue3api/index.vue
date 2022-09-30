<template>
  <slot name="header"></slot>
  <h1><slot :flag="flag"></slot></h1>
  <slot name="footer"></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      flag: '🔥',
    }
  },
})
</script>

<style>
</style>
