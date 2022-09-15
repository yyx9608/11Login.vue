<template>
  <div class="loginbackground">
    <div class="login">
      <!--      <img src="../../public/pathogeno.png" alt="My test image">-->
      <el-form>
        <el-form-item>
          <el-input v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="password"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <!--        <el-button type="info">注册</el-button>-->
        <div class="btn">登录</div>
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
  width:80%; /*长度*/
  height:150%;
  margin: auto;
  margin-top: 1px;/*边框与上面的距离*/
  margin-left: 190px;
  margin-right: 210px;
  background-color:darkred;
  color: white;
}
img {

  width:500px;
  height:200px;

  padding-bottom: 10px;
}
:deep(.el-form) {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 20px;
}
</style>




########################################################################################

<template>
  <el-container class="layout-container-demo" style="height: 500px">
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>实验室
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">广州</el-menu-item>
              <el-menu-item index="1-2">北京</el-menu-item>
              <el-menu-item index="1-2">良培</el-menu-item>
              <el-menu-item index="1-2">康圣</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
            /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>View</el-dropdown-item>
                <el-dropdown-item>Add</el-dropdown-item>
                <el-dropdown-item>Delete</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>Tom</span>
        </div>
      </el-header>

      <!--        结果展示-->
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>

