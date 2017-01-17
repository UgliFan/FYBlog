import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import * as mutations from './mutations';
import * as actions from './actions';

const store = new Vuex.Store({
  state: {
    navStatus: false,
    navList: [{
      name: '推荐',
      routerName: 'index',
      className: 'recommend',
      icon: 'iconfont icon-newshot'
    }, {
      name: '文章',
      routerName: 'list',
      className: 'list',
      icon: 'iconfont icon-list'
    }, {
      name: '精华',
      routerName: 'cream',
      className: 'cream',
      icon: 'iconfont icon-hot'
    }, {
      name: 'Q&A',
      routerName: 'help',
      className: 'help',
      icon: 'iconfont icon-question'
    }],
    activeNav: {},
    userInfo: {
      id: '123',
      icon: '//back.fyq2yj.cn/images/404.jpg',
      name: 'UgliFan',
      sex: 'male',
      groupId: 0
    }
  },
  getters: {
    NAV_STAT(state) {
      return state.navStatus;
    },
    NAV_LIST(state) {
      return state.navList;
    },
    ACTIVE_NAV(state) {
      return state.activeNav;
    },
    USER_INFO(state) {
      return state.userInfo;
    }
  },
  mutations: {
    [mutations.SET_NAV_STAT](state, payload) {
      state.navStatus = payload.status;
    },
    [mutations.SET_ACTIVE_NAV](state, payload) {
      state.activeNav = payload.nav;
    },
    [mutations.SET_USER_INFO](state, payload) {
      state.userInfo = payload.user;
    }
  },
  actions: {
    [actions.TRIGGER_NAV]({ commit }, payload) {
      commit(mutations.SET_NAV_STAT, payload);
    },
    [actions.CHANGE_NAV]({ commit }, payload) {
      commit(mutations.SET_ACTIVE_NAV, payload);
    },
    [actions.SET_USER]({ commit }, payload) {
      commit(mutations.SET_USER_INFO, payload);
    }
  }
});

export default store;
