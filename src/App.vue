<template>
  <div id="app">
    <header class="header">
      <span>{{userName}}</span>
      <button v-if="isLogin" v-on:click="logout">LogOut</button>
      <router-link v-if="!isLogin" to="/login">LogIn</router-link>
    </header>
    <main class="content">
      <router-view/>
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
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          console.log('auth true');
          store.commit('setName', user.displayName);
          store.commit('login');
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
