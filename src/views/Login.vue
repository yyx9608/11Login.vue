<template>
  <div class="loginbackground">
    <div class="login">
      <div style="font-size: 30px; font-weight: 700; margin-top: 20px">

      </div>
      <el-form>
        <el-form-item>
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="password"></el-input>
        </el-form-item>
      </el-form>
      <div>
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
const username = ref('');
const password = ref('');
async function loginBoke() {
  const { data: res } = await login({
    username: username.value,
    password: password.value,
  });
  if (res.meta.status === 1) {
    return ElMessage.error(res.meta.msg);
  }
  const data = res.data;
  data.uname = username.value;
  sessionStorage.setItem('loginInfo', JSON.stringify(data));
  router.push({ name: 'main' });
}
</script>

<style lang="scss" scoped>
.loginbackground {
  width: 100%;
  height: 100%;
  background: url(../../public/background.png) no-repeat;
  background-size: 100%;
}
.login {
  width: 30%;
  height: 500px;
  margin: auto;
  position: fixed;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  color: rgb(63, 61, 61);
}
.btn { /*登录按钮*/
  display: inline-block;
  text-align: center;

  transform: translate(-50%, -50%);
  /*display:flex;*/
  padding: 5px;
  width: 80%; /*长度*/
  height: 150%;
  margin: auto;
  margin-top: 1px; /*边框与上面的距离*/
  margin-left: 190px;
  margin-right: 210px;
  background-color: darkred;
  color: #492626;
}
:deep(.el-form) {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
}
</style>