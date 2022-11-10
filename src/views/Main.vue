<template>
  <el-container class="layout-container-demo" style="height: 800px">
    <el-aside width="150px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-autocomplete placeholder="搜索" />
          <el-button :disabled="disabledButton" text @click="dialogVisible = true">创建任务</el-button>
          <el-menu-item v-for="item in run" :key="item.id" :index="item.id" @click="menuClick(item)">
            {{item.name}}
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-aside width="220px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']" v-model="value">
          <el-menu-item v-for="item in infoTable" :key="item.sampleId" :index="item.sampleId" @click="sampleSheet(item)">
<!--          <el-menu-item v-for="item in secMenu" :key="item.sid" :index="item.name" @click="selectSample(item)">-->
<!--            {{item.sampleId}}{{item.name}}-->
<!--            <el-checkbox :key="item.taskId" v-model="item.check" >{{item.sampleId}}{{item.name}}</el-checkbox>-->
            <el-checkbox>{{item.sampleId}}{{item.name}}</el-checkbox>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <!-- <el-button @click="querylistBK">获取实验室</el-button> -->
<!--          <el-dropdown trigger="click" @command="taskListBK">-->
<!--            <span class="el-dropdown-link">-->
<!--              选择实验室<el-icon class="el-icon&#45;&#45;right">-->
<!--                <arrow-down />-->
<!--              </el-icon>-->
<!--            </span>-->
<!--            <template #dropdown>-->
<!--              <el-dropdown-menu>-->
<!--                <el-dropdown-item @command="taskListBK" v-for="item in lab" :key="item.id" :command="item.id">-->
<!--                  {{item.name}}-->
<!--                  &lt;!&ndash;                实验室列表获取  &ndash;&gt;-->
<!--                </el-dropdown-item>-->
<!--              </el-dropdown-menu>-->
<!--            </template>-->
<!--          </el-dropdown>-->
          <el-select v-model="value" clearable placeholder="选择实验室">
            <el-option v-for="item in lab" :key="item.id" :label="item.name" :id="item.id"
              @click="taskListBK(item.id)" />
          </el-select>

        </div>
      </el-header>

      <!--        结果展示-->
      <el-main>
        <template>
        </template>
        <el-scrollbar>
          <el-table v-show="firTableData.length" border :data="firTableData" style="width: 80%">
            <el-table-column prop="name" label="项目名称" width="140" />
            <el-table-column prop="status" label="分析状态" width="120" />
            <el-table-column prop="id" label="id" width="220" />
            <el-table-column prop="createdAt" label="完成时间" width="120" />
            <el-table-column prop="sequenceId" label="数据路径" width="220" />
            <el-table-column prop="sampleInfoFile" label="样本路径" />
          </el-table><br />

          <el-button :disabled="disabledButton" @click="missionStart">启动任务</el-button>
          <!--          <el-button  @click="startTask">启动任务</el-button>-->
          <el-dialog v-model="dialogStart" title="开始分析" width="20%"  >
            <span>输入项目id</span>
            <el-input v-model="proId" />
            <span class="dialog-footer">
              <el-button size="small" @click="startTask">开始分析</el-button>
            </span>
          </el-dialog>

          <el-button :disabled="disabledButton" @click="dialogStop = true">中止任务</el-button>
<!--          <el-button @click="sampleResult">展示样本</el-button>-->
          <el-button @click="sampleInfo">展示样本</el-button>
<!--          <el-button @click="sampleResult">获取结果</el-button>-->
          <!-- 你刚刚这么写，不对，这个item什么都不是，你并没有传东西进去 -->
          <!-- 你现在要做的就是获取你要对比的那条数据
               怎么获取呢，去找到你点击左侧第一列的那个事件，点一下，就能获取到了
               现在跟莫老师一起去看看
               周围都没有v-for出来的item，所以这是一个不存在的东西
          -->
<!--          <el-button @click="selectSample">展开结果</el-button><br /><br />-->
          <!--          <el-button v-if="result.id===run.id" @click="sampleResult" @click="dialogStart = true">展示样本</el-button>-->
          <el-dialog v-model="dialogStop" title="中止任务" width="20%" >
            <span>输入项目id</span>
            <el-input v-model="proId" />
            <span class="dialog-footer">
              <el-button size="small" @click="stopTask">中止分析</el-button>
            </span>
          </el-dialog>

          <!--          <el-button  @click="startTask">开始分析</el-button>-->
          <!--          <el-button  @click="startTask">中止分析9</el-button>-->
          <!--          <el-table v-show="secTable.length" :data="secTable" height="100" @selection-change="handleSelectionChange">-->
          <el-table v-show="midTable.length" :data="midTable" border style="width: 90%">
            <el-table-column prop="name" label="患者姓名" width="100" />
            <el-table-column prop="sex" label="性别" width="60" />
            <el-table-column prop="sampleId" label="样本编号" width="160" />
            <el-table-column prop="agent" label="代理商" width="220" />
            <el-table-column prop="hospital" label="医院" width="180" />
            <el-table-column prop="id" label="科室" />
          </el-table>
          <el-table v-show="midTable.length" :data="midTable" border style="width: 90%">
            <el-table-column prop="analysisItem" label="检测项目" width="100" />
            <el-table-column prop="age" label="年龄" width="60" />
            <el-table-column prop="receiveSampleDate" label="收样日期" width="160" />
            <!--            <el-table-column prop="status" label="审核状态" width="220" />-->
            <el-table-column prop="status" label="审核状态" width="220">
              <template #default="scope">
                <el-select v-model="scope.row.status" @change="sampleVerify" class="m-2" placeholder="Select"
                  size="large">
                  <el-option label="未审核" value="未审核" />
                  <el-option label="待讨论" value="待讨论" />
                  <el-option label="复测" value="复测" />
                  <el-option label="已发送" value="已发送" />
                  <el-option label="审核通过" value="审核通过" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="libraryConcentration" label="文库浓度" width="180" />
            <el-table-column prop="resultFromHospital" label="医院诊断" />
          </el-table><br />
          <el-table v-show="secTable.length" :data="secTable" border height="200">
            <el-table-column type="selection" width="50" />
            <el-table-column prop="sid" label="样本编号" width="120" />
            <el-table-column prop="id" label="id" width="120" />
            <el-table-column prop="pathogensClassify" label="病原体分类" width="120" />
            <el-table-column prop="pathogensChsName" label="中文名" width="120" />
            <el-table-column prop="pathogensEngName" label="英文名" width="120" />
            <el-table-column prop="readsNums" label="reads数" width="120" />
            <el-table-column prop="sign" label="信号强度" width="120" />
            <el-table-column prop="copyMums" label="病原体浓度" width="120" />
            <el-table-column prop="status" label="初始状态" width="120" />
            <el-table-column prop="status" label="审核状态" width="120" />
            <el-table-column prop="status" label="病原结果归属">
              <template #default="scope">
                <el-select v-model="scope.row.status" class="m-2" @change="resultVerify" placeholder="Select"
                  size="large">
                  <el-option label="主报告" value="主报告" />
                  <el-option label="背景菌" value="背景菌" />
                  <el-option label="灰区" value="灰区" />
                  <el-option label="不展示" value="不展示" />
                </el-select>
              </template>
            </el-table-column>
          </el-table>
          <el-button v-show="secTable.length" @click="generateRepo">生成报告</el-button>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>

  <el-dialog v-model="dialogVisible" title="创建文件夹" width="30%" >
    <span>文件夹名称</span>
    <el-input v-model="proName" />
    <span>上传样本信息</span>
    <el-input v-model="sampleXlsx" />
    <el-upload ref="upload" class="upload-demo" :action="baseUrl" :limit="1" :on-exceed="handleExceed"
      :auto-upload="false" accept=".xlsx
              ">
      <template #trigger>
        <el-button text>添加</el-button>
      </template>
      <el-button class="ml-3" type="success" @click="submitUpload">
        上传
      </el-button>
      <template #tip>
        <div class="el-upload__tip text-red">
          limit 1 file, new file will cover the old file
        </div>
      </template>
    </el-upload>
    <span>数据路径</span>
    <el-input v-model="dataAddress" />
    <el-upload ref="upload1" class="upload-demo" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :limit="1" :on-exceed="handleExceed" :auto-upload="false">
<!--      <template #trigger>-->
<!--        <el-button text>添加</el-button>-->
<!--      </template>-->
<!--      <el-button class="ml-3" type="success">-->
<!--        上传-->
<!--      </el-button>-->
<!--      <template #tip>-->
<!--        <div class="el-upload__tip text-red">-->
<!--          limit 1 file, new file will cover the old file-->
<!--        </div>-->
<!--      </template>-->
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" @click="createTask">创建任务</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from '../plugin/axios/interface';
import axurl from '../plugin/axios';
// import { Menu as IconMenu, Message, MessageBox, Setting } from '@element-plus/icons-vue';
import { ElMessage, genFileId, UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
// import { ArrowDown } from '@element-plus/icons-vue';
// import { clippingParents } from '@popperjs/core';



const dialogVisible = ref(false)
const dialogStart = ref(false)
// const dialogList = ref(false)
const dialogStop = ref(false)
const baseUrl = ref(`${axurl.defaults.baseURL}/upload/`)

// const handleSelectionChange = (val: Result[]) => {
//   multipleSelection.value = val
// }


interface Lab {
  id: number,
  name: string
}
interface Run {
  id: number, createdBy: string, name: string, workDir: string,
  sampleInfoFile: string, sequenceId: string, lab: number, status: string, step: string, createdAt: string,
}
// interface Samp {
//   taskId: number, remotePath: string, sid: string
// }
interface Result {
  id: number, taskId: number,copyMums:string, sid: string, pathogensClassify: string, pathogensChsName: string, pathogensEngName: string, sampleType: string, pathogensNote: string, agent: string, hospital: string, office: string, name: string, sex: string, age: string, sign: string, readsNums: string, status: string
}
interface Samplesheet {
  id: number; lab: string; name: string; status: string; agent: string; hospital: string; office: string; doctor: string; sampleId: string; sex: string; analysisItem: string; sampleType: string; nucleicAcidConcentration: string; libraryConcentration: string; receiveSampleDate: string; paymentStatus: string; sickbedNum: string; medicalRecordNum: string; age: string; phoneNum: string; identityCardNum: string;
}

const currentPage = ref(1);
const pageSize = ref(100);
const labId = ref(1);
const taskId = ref('');
const task = ref('');
// const sampleId = ref('');
const sid = ref('');
const id = ref('');
// const sampleInfoFile = ref('');
// const name = ref('');
const proName = ref('20221007');
const proId = ref('');
// const status = ref('');

const sampleXlsx = ref('');
const dataAddress = ref('file://')
// const checkSample = ref('');
// 定义lab类型的数组
let lab = ref([] as Lab[]);
let run = ref([] as Run[]);
// let samplepsheet = ref([] as Samplesheet[]);

// let samp = ref([] as Samp[]);
// 第二列菜单的数据
let secMenu = ref([] as Result[]);
// 第二列菜单点击的那条数据
let secClickMenu: any = ref([]);
// let xlsxPath: any = ref([]);
let secMenuClick = ref([] as Result[]);
let resultTable: any = ref([]);
const disabledButton = ref(true)

// 右边第一个列表的数据
let firTableData = ref([] as Run[]);
// 右边第二个列表的数据
let secTable = ref([] as Result[]);
let midTable = ref([] as Samplesheet[]);
let infoTable = ref([] as Samplesheet[]);
// let midTable = infoTable.filter((item) => {
//   return item.name == midTable.name
// });

onMounted(() => {
  querylistBK()
})

async function querylistBK() {
  const res = (await axios.queryList({ currentPage: currentPage.value, pageSize: pageSize.value }))?.data || [];
  lab.value = res[0].result;
}
async function taskListBK(id: number) {
  labId.value = id;
  disabledButton.value = false
  const res = (await axios.taskList({ currentPage: currentPage.value, pageSize: pageSize.value, labId: id }))?.data || [];
  run.value = res[0].result;
  // js中，一串数字超过16位，就会失真，就是所谓的失去精度
  // 解决办法就是叫你的后端把这个id字段转成字符串再传回来给你
  // 前端没办法再处理

}

// async function sampleResult(item: any) {
async function sampleResult() {
  const params = {
    result: {
      taskId: firTableData.value[0].id,
      sid: sid.value
    },
    "pageSize": 100,
    "currentPage": 1
  }
  const res = (await axios.sampleResult(params))?.data || []
  secMenu.value = res[0].result // 钱都没放到你自己的钱包里，怎么拿出去花
  resultTable = res[0].result
  secMenuClick.value = res[0].result.sort((a: any, b: any) => {
    return a.agent.localeCompare(b.agent)
  });
  taskId.value = String(firTableData.value[0].id); //先把各种值print出来 看看哪个是我要的 然后赋值给那个不听话的变量TnT
  if (res[0].code === 2001) {
    ElMessage({ message: '创建成功', type: 'success' })

  }
}// 这个位置少了括号，删代码的时候多注意，不要删多了

//样本信息
// async function sampleInfo(item: any) {
//   const params = {
//     info: {
//       // task: firTableData.value[0].id,
//       task: secTable.value[0].taskId,
//       sampleId: secTable.value[0].sid,
//       // task :task.value,
//     },
//     "pageSize": 100,
//     "currentPage": 1
//   }
//   const res = (await axios.sampleInfo(params))?.data || []
//   // secTable.value = secMenu.value.filter((item) => item.id == obj.id)
//   infoTable.value = res[0].result // 钱都没放到你自己的钱包里，怎么拿出去花
//   task.value = String(secTable.value[0].taskId);
//   name.value = String(secTable.value[0].name);
//   sampleId.value = String(secTable.value[0].sid);
//   console.log(444);
//   console.log(infoTable.value);
//   console.log(secTable.value[0].name)
//   console.log(secTable.value)
// }
// async function sampleInfo(item: any) {
async function sampleInfo() {
  const params = {
    info: {
      task: firTableData.value[0].id,
      // task: secTable.value[0].taskId,
      // sampleId: secTable.value[0].sid,
      // task :task.value,
    },
    "pageSize": 100,
    "currentPage": 1
  }
  const res = (await axios.sampleInfo(params))?.data || []
  // secTable.value = secMenu.value.filter((item) => item.id == obj.id)
  infoTable.value = res[0].result // 钱都没放到你自己的钱包里，怎么拿出去花
  secMenuClick.value = res[0].result.sort((a: any, b: any) => {
    return a.agent.localeCompare(b.agent)
  });
  task.value = String(firTableData.value[0].id);
  // console.log(secTable.value[0].name)
  // console.log(secTable.value)
}
async function createTask() {
  const params = {
    task: {
      name: proName.value,
      sampleInfoFile: sampleXlsx.value,
      lab: labId.value
    },
    sequenceData: {
      desc: 'dsfas',
      remotePath: dataAddress.value,
      sequenceType: 'paired-end'
    }
  }
  const res = (await axios.createTask(params))?.data || []

  if (res[0].code === 2001) {
    ElMessage({ message: '创建成功', type: 'success' })

  }
}
async function sampleVerify() {
  const params = {
    id: midTable.value[0].id,
    status: midTable.value[0].status
  }
  // id.value = String(midTable.value[0].id)
  const res = (await axios.sampleVerify(params))?.data || []
}

async function resultVerify() {
  const params = {
    id: secTable.value[0].id,
    status: secTable.value[0].status
  }
  // id.value = String(midTable.value[0].id)
  const res = (await axios.resultVerify(params))?.data || []
}

async function generateRepo() {
  const params: number[] = [];
  id.value = String(midTable.value[0].id);
  params.push(midTable.value[0].id);
  // secTable.value.forEach(item=>{
  //   params.push(item.id);
  // })
  console.log(midTable.value[0].id)
  const res = (await axios.generateRepo(params))?.data || []
}



function missionStart() {
  dialogStart.value = true;
  console.log(firTableData);
  proId.value = String(firTableData.value[0].id)
}

async function startTask() {
  const res = (await axios.startTask({ id: proId.value }))?.data || []
  proId.value = String(firTableData.value[0].id)
  if (res[0].code === 0) {
    return ElMessage({ message: res[0].msg, type: 'success' })
  }
  ElMessage({ message: res[0].msg, type: 'warning' })
}

async function stopTask() {
  const res = (await axios.stopTask({ id: proId.value }))?.data || []
  if (res[0].code === 0) {
    return ElMessage({ message: res[0].msg, type: 'success' })
  }
  ElMessage({ message: res[0].msg, type: 'warning' })
}

// 第一列菜单点击事件
function menuClick(obj: Run) {
  firTableData.value = run.value.filter((item) => item.id == obj.id)
  // secTable.value = []
  secMenu.value = []
  infoTable.value = []
  midTable.value = []
}

// 这个obj就是你点击传进来的item，名字不一样，但是是一个东西
// 有空去搜一下：方法的形参和实参
// 打电话吧，敲累了
// 那晚上打？现在不是很方便T T
// 第2列菜单点击事件
function selectSample() {
  // 将点击的数据存secClickMenu里备用
  secTable.value = secMenu.value.filter((item) => {
    return item.sid == secClickMenu.value.sampleId
  })
  secMenu.value = []
  // secTable.value =[]
}
// function sampleSheet() {
//   midTable.value = infoTable.value.filter((item) => {
//     return item.name == secClickMenu.value.name
//   })
// }
async function sampleSheet(obj:Samplesheet) {
  secClickMenu.value = obj
  midTable.value = infoTable.value.filter((item) => {
    return item.name == secClickMenu.value.name
  })

  console.log(555);
  console.log(infoTable.value);
  console.log(midTable.value);
  console.log(secClickMenu.value);
  console.log(secMenuClick.value)
  // console.log(midTable.value);
  secTable.value =[]
  await  sampleResult()
  selectSample()
}

//
// const handleCommand = (command: string | number | object) => {
//   ElMessage(`click on item ${command}`)
// }
const value = ref('')


const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}


// const submitUpload = () => {
//   upload.value!.submit()
// }

async function submitUpload(){
  upload.value!.submit()
  const params={}

  const res = (await axios.submitUpload(params))?.data||[]
  if (res[0].code === 2001) {
    ElMessage({ message: '创建成功', type: 'success' })
  }
  console.log(999)
  console.log(res[0].result)

}

</script>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  /*align-items: center;*/
}

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
  /*align-items: center;*/
  /*justify-content: center;*/
  height: 100%;
  right: 20px;
}
</style>
