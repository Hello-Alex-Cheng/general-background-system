<template>
  <slot name="header"></slot>
  <h1><slot :flag="flag"></slot></h1>
  <slot name="footer"></slot>
</template>

<script lang="ts" setup>
const flag = '🔥'
</script>

<style scoped lang="scss">
@import '@/assets/scss/variable.scss';

:slotted(.header) {
  color: $color-sub-theme;
}
</style>
