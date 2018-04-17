// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
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
    userName: '',
    tasks: []
  },
  mutations: {
    setName (state, payload) {
      state.userName = payload;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
