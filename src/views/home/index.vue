<template>
   <div class="hello">
    <h2>{{ msg }}</h2>
        <p>头像：<img :src="avatar" height="50" /></p>
        <p>角色：{{roles}}</p>
        <p>用户名：{{name}}</p>
        <p>介绍：{{introduction}}</p>
    <ul>
      <li>
        <el-button type="primary" size="medium" v-on:click="createUser">创建用户</el-button>
        <el-button type="primary" size="medium" v-on:click="getUser">获取用户</el-button>
        <el-button type="primary" size="medium" v-on:click="editUser">修改用户</el-button>
        <el-button type="primary" size="medium" v-on:click="deleteUser">删除用户</el-button>
        <el-button type="primary" size="medium" v-on:click="getRole">获取角色</el-button>
        <el-button type="primary" size="medium" v-on:click="switchedRoles">切换角色</el-button>
        <el-button type="primary" size="medium" @click='testJqeury'>测试jquery</el-button>
      </li>
    </ul>
    <el-carousel v-if="pmddata.length > 0" id="applist" :autoplay="false" type="card" indicator-position="none" height="200px" arrow="always">
      <el-carousel-item v-for="(item,index) in pmddata" :key="item.title">
        <li class="lis" :style="{backgroundColor: getIdColor(index)}">
          <h3>名称：</h3>
          <h3>地址：</h3>
        </li>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
// 根据业务模块命名，和 /api/* 一一对应
import { mapGetters } from 'vuex'
import Store from '@/store'
import {
  fakeUser,
  queryUser,
  modifyUser,
  removeUser,
  getRole,
  switchedRoles
} from '@/api/home'
// import { SERVICEID } from '@/config.js'

// import { SessionStorage, LocalStorage } from '@/utils/storage.js'
// import Cookies from '@/utils/cookies.js'
const colors = [
  '#EA6E91',
  '#FF823E',
  '#FCBB26',
  '#49CB84',
  '#28C5CD',
  '#0AAEF4',
  '#8468BD'
]
export default {
  name: 'home',
  components: {},
  data() {
    return {
      msg: '欢迎使用',
      user: {
        id: '82073',
        roles: '',
        name: '',
        introduction: '',
        avatar: ''
      },
      paraCreate: {
        username: 'michael',
        password: '123456'
      },
      paraEdit: {
        username: 'jordan'
      },
      pmddata: []
    }
  },
  methods: {
    // jquery
    testJqeury() {
      $('.services-container').fadeOut()
    },
    // vuex 写法
    getUser() {
      // 任何状态的改变都是通过触发 action 开始
      Store.dispatch('GetUserInfo').then(response => {
        const { status, statusText, headers, data } = response
      })
    },
    getIdColor(index) {
      return colors[index % colors.length]
    },
    // 获取角色
    getRole() {
      getRole('getRole').then(response => {
        console.log('getRole-------', response.data)
        this.pmddata = response.data.array
      })
    },
    switchedRoles() {
      switchedRoles('switchedRoles').then(response => {
        console.log('switchedRoles-----', response.data)
        this.pmddata = response.data.array
      })
    },
    // 调用http请求
    createUser() {
      // 创建用户
      fakeUser(this.paraCreate).then(response => {
        const { code, addtionalMessage } = response.data
        // 业务逻辑
        this.$message({
          message: addtionalMessage,
          type: 'success'
        })
      })
    },
    // getUser() {
    //   // 获取用户
    //   queryUser(this.user.id).then(response => {
    //     const { roles, name, avatar, introduction } = response.data
    //     // 业务逻辑
    //     this.user.name = name
    //     this.user.roles = roles
    //     this.user.introduction = introduction
    //     this.user.avatar = avatar
    //   })
    // },
    editUser() {
      // 修改用户
      modifyUser(this.paraEdit).then(response => {
        const { code, addtionalMessage } = response.data
        // 业务逻辑
        this.$message({
          message: addtionalMessage,
          type: 'success'
        })
      })
    },
    deleteUser() {
      // 创建用户
      removeUser(this.user.id).then(response => {
        const { code, addtionalMessage } = response.data
        // 业务逻辑
        this.$message({
          message: addtionalMessage,
          type: 'success'
        })
      })
    }
  },
  created: function() {
    // LocalStorage.setServiceId(SERVICEID) // 设置子应用id
    // LocalStorage.setItem('testLS', '测试LocalStorage')
    // SessionStorage.setServiceId(SERVICEID) // 设置子应用id
    // SessionStorage.setItem('testSS', '测试SessionStorage')
    // 操作 Cookies 是往浏览器 LocalStorage 里存值，通过 key 来区分，为了防止多个子应用设置 cookies 超量
    // Cookies.setServiceId(SERVICEID) // 设置子应用id
    // Cookies.set('testCookies', '测试Cookies') // 永不过期
  },
  // 通过计算属性返回状态
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['name', 'avatar', 'introduction', 'roles'])
  }
}
</script>
<style>
.hello {
  padding: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 16px;
  opacity: 0.75;
  height: 100px;
  margin: 0;
  line-height: 100px;
}
#applist {
  margin-top: 50px;
  text-align: center;
}
.lis {
  width: 316px;
  margin: 0 auto;
}
ul,
li {
  list-style: none;
}
</style>
