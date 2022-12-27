<template>
  <div class="login-container">
    <el-form class="login-form" ref="ruleFormRef" :model="user" :rules="rules">
      <div class="title-container">
        <h3 class="title">
          {{ $t('msg.login.title') }} {{ $store.state.globalName }}
        </h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="user.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          v-model="user.password"
          :type="isPwd"
        ></el-input>
        <span class="show-pwd">
          <el-icon v-if="isPwd === 'password'" @click="isPwd = ''">
            <View />
          </el-icon>
          <el-icon v-else @click="isPwd = 'password'"><Hide /></el-icon>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="submitForm(ruleFormRef)"
      >
        {{ $t('msg.login.loginBtn') }}
      </el-button>

      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { View, Hide } from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useStore } from 'vuex'
import router from '@/router'
import { useI18n } from 'vue-i18n'

const ruleFormRef = ref<FormInstance>()

const i18n = useI18n()

const user = ref({
  username: 'super-admin',
  password: '123456'
})

// 处理密码小眼睛
const isPwd = ref('')

const rules = ref<FormRules>({
  username: [
    {
      required: true,
      message: i18n.t('msg.login.usernameRule'),
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      min: 3,
      max: 6,
      message: i18n.t('msg.login.passwordRule'),
      trigger: 'blur'
    }
  ]
})

const store = useStore()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      store
        .dispatch('user/login', user.value)
        .then(res => {
          console.log('login res', res)
          router.replace('/')
        })
        .catch(err => {
          console.log('err ', err)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep(.el-form-item) {
      border: 1px solid rgba(225, 225, 225, 0.1);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      .el-input__wrapper {
        width: 100%;
        background: transparent;
        padding: 8px 5px 8px 15px;
        box-shadow: none;
      }

      input {
        border: none;
        border-radius: 0px;
        background: transparent;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor; // 光标颜色
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0 auto 40px auto;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
