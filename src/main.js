// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';

Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyAJoGXBhkYe-Wmx8EYfw5zdUbRGQAiaHYY',
  authDomain: 'try-vue.firebaseapp.com',
  databaseURL: 'https://try-vue.firebaseio.com',
  projectId: 'try-vue',
  storageBucket: 'try-vue.appspot.com',
  messagingSenderId: '365042355612'
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
