<template>
  <div id="app">
    <header class="header">
      <router-link
        class="header__link"
        active-class="header__link_active"
        v-if="!isLogin" to="/login">
        Log In
      </router-link>
      <router-link
        class="header__link"
        active-class="header__link_active"
        v-if="!isLogin"
        to="/sign-up">
        Sign Up
      </router-link>
      <router-link
        class="header__link"
        active-class="header__link_active"
        v-if="isLogin"
        to="/archive">
        Archive
      </router-link>
      <router-link
        class="header__link"
        active-class="header__link_active"
        v-if="isLogin"
        to="/tasks">
        Tasks
      </router-link>
      <p class="header__controls" v-if="isLogin">
        <span class="header__name">{{userName}}</span>
        <button class="header__button" v-on:click="backLogout">LogOut</button>
      </p>
    </header>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import backEndMixin from './mixins/backendMixin';

export default {
  name: 'App',
  data: function () {
    return {

    };
  },
  mixins: [backEndMixin],
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
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
  }
  .header {
    background: blue;
    font-weight: bold;
    color: white;

    &__link {
      display: inline-block;
      height: 100%;
      margin: 0 10px;
      padding: 5px;
      text-decoration: none;
      color: white;

      &_active {
        background: white;
        color: blue;
      }
    }

    &__controls {
      display: inline-block;
      float: right;
      margin: 0 10px;
      padding: 3px;
      height: 100%;
    }

    &__button {
      background: bisque;
      border-radius: 10px;
    }

    &__name {
      margin: 0 10px;
    }
  }

  .content {
    background: white;
  }
</style>
