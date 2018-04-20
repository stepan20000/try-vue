// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Task from './components/Task';
import router from './router';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyAJoGXBhkYe-Wmx8EYfw5zdUbRGQAiaHYY',
  authDomain: 'try-vue.firebaseapp.com',
  databaseURL: 'https://try-vue.firebaseio.com',
  projectId: 'try-vue',
  storageBucket: 'try-vue.appspot.com',
  messagingSenderId: '365042355612'
};
firebase.initializeApp(firebaseConfig);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false,
    userName: '',
    userId: '',
    tasks: {},
    archive: {},
    nextId: 0
  },
  mutations: {
    setUser (state, payload) {
      state.userName = payload.userName;
      state.userId = payload.userId;
    },
    clear (state) {
      state.isLogin = false;
      state.userName = '';
      state.tasks = {};
      state.userId = '';
    },
    login (state) {
      state.isLogin = true;
    },
    logout (state) {
      state.isLogin = false;
    },
    setTasks (state, payload) {
      state.tasks = payload;
    },
    setArchive (state, payload) {
      state.archive = payload;
    },
    setNextId (state, payload) {
      state.nextId = payload;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App, Task },
  template: '<App/>'
});
