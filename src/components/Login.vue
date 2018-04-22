<template>
  <form class="login" v-on:submit="login">
    <h3>Log In</h3>
    <input type="email" v-model="email" placeholder="email" required><br>
    <input type="password" v-model="password" placeholder="password" required><br>
    <button>Connection</button>
    <p>You do not hav an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </form>
</template>

<script>
import backEndMixin from '../mixins/backendMixin';

export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    };
  },
  mixins: [backEndMixin],
  methods: {
    login: function () {
      this.backLogin();
    }
  }
};
</script>

<style src="../styles/styles.scss">
</style>
<style scoped lang="scss" rel="stylesheet/scss">
.login {
  margin-top: 40px;
}
button {
  margin-top: 15px;
}

input {
  margin: 5px;
}

p {
  margin-top: 40px;
  font-size: 14px;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
