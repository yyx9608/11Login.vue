<template>
  <div class="loginbackground">
    <div class="login">
      <div style="font-size: 30px; font-weight: 700; margin-top: 20px">
        登陆
      </div>
      <el-form>
        <el-form-item label="账号">
          <el-input v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="info">注册</el-button>
        <el-button type="primary" @click="loginBoke">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity';
import { login } from '../plugin/axios/interface';
import { ElMessage } from 'element-plus';
import router from '../router';
// 用户名
const account = ref('');
const password = ref('');
async function loginBoke() {
  const { data: res } = await login({
    account: account.value,
    password: password.value,
  });
  if (res.meta.status === 1) {
    return ElMessage.error(res.meta.msg);
  }
  const data = res.data;
  data.uname = account.value;
  sessionStorage.setItem('loginInfo', JSON.stringify(data));
  router.push({ name: 'main' });
}
</script>

<style lang="scss" scoped>
.loginbackground {
  width: 100%;
  height: 100%;
  background: url(../../public/bg_menu.png) no-repeat;
  background-size: 100%;
}
.login {
  width: 500px;
  height: 500px;
  background-color: aliceblue;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgb(63, 61, 61);
}
:deep(.el-form) {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
}
</style>
