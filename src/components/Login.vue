<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" placeholder="email"><br>
    <input type="password" placeholder="password"><br>
    <button v-on:click="login">Connection</button>
    <p>You do not hav an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => { return {}; },
  methods: {
    login: function () { this.$router.replace('tasks'); }
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
