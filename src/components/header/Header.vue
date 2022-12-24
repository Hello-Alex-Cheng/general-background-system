<template>
  <div class="header">
    <div class="theme">头部</div>
    <span class="icon"></span>
  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/variable.scss';

.header {
  height: 44px;
  color: $color-theme;
  font-size: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .theme {
    margin-left: 10px;
    margin-right: 32vw;
  }
  .icon {
    display: inline-block;
    width: 48px;
    height: 33px;
    @include bg-image('logo');
    background-size: 100%;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
}
</style>
