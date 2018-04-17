<template>
  <form class="login" v-on:submit="signIn">
    <h3>Sign In</h3>
    <input type="email" v-model="email" placeholder="email" required><br>
    <input type="password" v-model="password" placeholder="password" required><br>
    <button>Connection</button>
    <p>You do not hav an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </form>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'login',
  data: () => {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          function () {
            return firebase.auth().currentUser.updateProfile({
              displayName: this.name,
              photoURL: ''
            });
          },
          function (err) {
            alert('Ooops! ' + err.message);
          })
        .then(
          function () {
            alert('Well done! You are now connected');
          },
          function (err) {
            alert('Ooops! ' + err.message);
          });
      this.$router.replace('tasks');
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
