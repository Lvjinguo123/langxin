<template>
  <div style="overflow: hidden">
    <div id='domain' class='domain'>
      <a class='logo'>{{SERVICENAME}}</a>
    </div>
    <div class='sidebar'>
      <el-menu class="sidebarwrap el-menu-vertical-demo" text-color= '#FFFFFF' background-color='#252a2f' :collapse="isCollapse">
        <div v-for = '(item,index) in menus' :key="index">
          <router-link :to="item.path" v-if='!item.children || item.children.length ===0'>
            <el-menu-item :index="`${index}`">
              <template>
                <i :class="item.meta.icon"></i>
                <span>{{item.meta.title}}</span>
              </template>
            </el-menu-item>
          </router-link>
          <el-submenu :index="`${index}`" v-else>
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span>{{item.meta.title}}</span>
            </template>
            <div v-for="(item2,index2) in item.children" :key="index2">
              <router-link :to="item2.path" v-if="!item2.children || item2.children.length ===0">
                <el-menu-item :index='`${index}-${index2}`'>
                  <template>
                    <i :class="item2.meta.icon"></i>
                    <span>{{item2.meta.title}}</span>
                  </template>
                </el-menu-item>
              </router-link>
              <el-submenu :index='`${index}-${index2}`' v-else>
                <template slot="title">
                  <i :class="item2.meta.icon"></i>
                  <span>{{item2.meta.title}}</span>
                </template>
                <router-link :to="item3.path" v-for="(item3,index3) in item2.children" :key="index3">
                  <el-menu-item :index='`${index}-${index2}-${index3}`'>
                    <template>
                      <i :class="item3.meta.icon"></i>
                      <span>{{item3.meta.title}}</span>
                    </template>
                  </el-menu-item>
                </router-link>
              </el-submenu>
            </div>
          </el-submenu>
        </div>
      </el-menu>
    </div>
    <div id='services-container' class='services-container'>

      <div :id="SERVICEID" :class="SERVICEID">
        <router-view :key="$route.fullPath"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { SERVICEID, SERVICENAME } from '../config.js'
import menu from '../router/menu.js'
import axios from 'axios'

const menus = JSON.parse(JSON.stringify(menu))
for (let i = menus.length - 1; i >= 0; i--) {
  let menu = menus[i]
  if (!menu.meta || !menu.meta.title) {
    menus.splice(i, 1)
  } else if (menu.children && menu.children.length) {
    for (let j = menu.children.length - 1; j >= 0; j--) {
      let submenu = menu.children[j]
      if (!submenu.meta || !submenu.meta.title) {
        menu.children.splice(j, 1)
      }
    }
  }
}
export default {
  data() {
    return {
      SERVICEID,
      SERVICENAME,
      menus,
      isCollapse: true
    }
  },
  created() {
    axios.get('/api/frameworkserver/frameRealmName').then(res => {
      localStorage.setItem('href', res.data)
    })
  }
}
</script>
<style>
ul {
  list-style: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu--collapse {
  width: 80px;
}
.sidebar {
  float: left;
}
.services-container {
  float: left;
  width: calc(100% - 80px);
  height: calc(100vh - 50px);
}
</style>
