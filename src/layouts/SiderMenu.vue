<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :default-openeds="defaultOpeneds"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <el-submenu v-for="item in routeList" :key="item.name" :index="item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{item.meta.chinese}}</span>
        </template>
        <el-menu-item
          :index="it.path"
          v-for="it in item.children"
          :key="it.path"
        >{{it.meta.chinese}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { check } from "../utils/auth";
export default {
  inject: ['reload'],
  props: {
    activeIndex: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      lastUrl: this.$route.path,
    };
  },
  computed: {
    ...mapState(["powers"]),
    routeList() {
      return this.screenRoutes(this.$router.options.routes);
    },
    defaultOpeneds() {
      if (this.routeList.length > 0) {
        return [this.routeList[0].path];
      }
      return [];
    },
    defaultActive() {
      if (this.routeList.length > 0 && this.routeList[0].children.length > 0) {
        let path = this.routeList[0].children[0].path;
        this.$router.push(path);
        return path;
      }
    }
  },
  methods: {
    screenRoutes(routes) {
      let arr = [];
      routes.forEach(item => {
        if (item.name) {
          if (item.meta && item.meta.auth && !check(item.meta.auth, this.powers))
            return;
          if (item.meta && item.meta.activeIndex !== this.activeIndex) return;

          let obj = { ...item };
          delete obj.children;
          if (item.children) {
            obj.children = this.screenRoutes(item.children);
          }
          arr.push(obj);
        } else {
          if (item.children) {
            arr.push(...this.screenRoutes(item.children));
          }
        }
      });

      return arr;
    },
    handleOpen(key, keyPath) {
      // defaultOpeneds = [...defaultOpeneds, key];
    },
    handleClose(key, keyPath) {
      // console.log("close--", key, keyPath);
    },
    handleSelect(key, keyPath) {
      if (this.lastUrl === key) {
        this.reload();
      } else {
        this.lastUrl = key;
        this.$router.push(key);
      }
    }
  }
};
</script>

<style>
</style>