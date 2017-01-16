import Vue from 'vue';
import Vuex from 'vuex';
import store from './vuex/index';
import VueRouter from 'vue-router';
import routes from './routers';
import filters from './filters';
import FastClick from 'fastclick';

import './styles/reset.scss';
import './styles/common.scss';

Vue.use(VueRouter);
Vue.use(Vuex);

// install filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// install VueRouter
const router = new VueRouter({
  mode: 'hash',
  routes
});

FastClick.attach(document.body);

import { SET_USER } from './vuex/actions';
// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
  store.dispatch({
    type: SET_USER,
    user: JSON.parse(window.sessionStorage.user)
  });
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
/* router.beforeEach((to, from, next) => {
  // 处理左侧滚动不影响右边
  $('html, body, #page').removeClass('scroll-hide');
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.userId) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
}); */

new Vue({
  router,
  store,
  template: `<transition name="page"><router-view class="container"></router-view></transition>`
}).$mount('#app');
