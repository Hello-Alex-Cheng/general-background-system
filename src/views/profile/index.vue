<template>
  <div class="white">个人中心</div>
  <div class="black">个人中心</div>

  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
$color: #187;

.white {
  color: mix(white, $color, 50%);
}
.black {
  color: mix(black, $color, 50%);
}
</style>
