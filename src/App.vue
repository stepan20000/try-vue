<template>
  <div id="app">
    <header class="header">
      <span>{{userName}}</span>
      <button v-if="isLogin" v-on:click="logout">LogOut</button>
      <router-link v-if="!isLogin" to="/login">Log In</router-link>
      <router-link v-if="!isLogin" to="/sign-up">Sign Up</router-link>
      <router-link v-if="isLogin" to="/archive">Archive</router-link>
    </header>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'App',
  data: function () {
    return {

    };
  },
  methods: {
    logout: function () {
      const self = this;
      firebase.auth().signOut().then(function () {
        console.log('Signed Out');
        self.$store.commit('logout');
        self.$router.replace('login');
      }, function (error) {
        console.error('Sign Out Error', error);
      });
    }
  },
  computed: {
    isLogin: {
      get () {
        return this.$store.state.isLogin;
      }
    },
    userName: {
      get () {
        return this.$store.state.userName;
      },
      set (name) {
        return this.$store.commit('setName', name);
      }
    }
  },
  created: function () {
    const store = this.$store;
    console.log('created');
    const nextIdRef = firebase.database().ref('nextId');
    nextIdRef.on('value', function (snapshot) {
      store.commit('setNextId', snapshot.val());
    });

    // const tasksRef = firebase.database().ref('nextId');
    // nextIdRef.on('value', function (snapshot) {
    //   store.commit('setNextId', snapshot.val());
    // });

    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          console.log('auth true');
          store.commit('setUser', { userName: user.displayName, userId: user.uid });
          store.commit('login');

          const tasksRef = firebase.database().ref('users/' + user.uid + '/tasks');
          tasksRef.on('value', function (snapshot) {
            console.log('task changed', snapshot.val());
            if (snapshot.val()) {
              store.commit('setTasks', Object.assign({}, snapshot.val()));
            }
          });
        } else {
          console.log('auth false');
          store.commit('clear');
        }
      });
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
