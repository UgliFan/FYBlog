import Vue from 'vue';
import Vuex from 'vuex';
import store from './vuex/user';
import VueRouter from 'vue-router';
import routes from './routers';
import filters from './filters';
import $ from 'webpack-zepto';
import FastClick from 'fastclick';

Vue.use(VueRouter);
Vue.use(Vuex);

// install filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

// install VueRouter
const router = new VueRouter({
  mode: 'history',
  routes
});

FastClick.attach(document.body);

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (window.sessionStorage.user) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user));
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
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
});

new Vue({
  router,
  store
}).$mount('#app');
