import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../assets/js/axios.defaults';
import { ut_pick, ut_store } from "../utils";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: ut_pick('localUserInfo') || {},
    isLogin: false,
    powers: [],
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload.userInfo;
      // 将内容保存到 localStorage
      ut_store('localUserInfo', payload.userInfo);
    },
    setIsLogin(state, payload) {
      state.isLogin = payload.login;
    },
    setPowers(state, payload) {
      // console.log('power change');
      state.powers = payload.powers;
    }
  },
  actions: {
    isLoginAaync({commit}) {
      try {
        let rst = axios.get('/api/user/login');
        if (parseInt(rst.code) === 0) {
          commit('setUserInfo', true);
        } else {
          throw new Error();
        }
      } catch (error) {
        // 路由跳转
      }
     
    }
  },
  modules: {
  }
})
