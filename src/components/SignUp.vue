<template>
  <form class="signUp" v-on:submit="signUp">
    <p>Let's create a new account</p>
    <h3>Sign Up</h3>
    <input type="text" v-model="name" placeholder="name" pattern=".{3,}" required>
    <input type="email" v-model="email" placeholder="email" required><br>
    <input type="password" v-on:change="passwordOnchange" v-model="password" placeholder="password" required><br>
    <p v-if="passwordsNotMatch" class="signUp__wrong-message signUp__wrong-message_password">
      Passwords do not match
    </p>
    <input type="password" v-model="repeatPassword" v-on:change="passwordOnchange" placeholder="repeat password" required><br>
    <button>Sign Up</button>
    <span>Or go back to <router-link to="/login">login</router-link></span>
  </form>
</template>

<script>
import backEndMixin from '../mixins/backendMixin';

export default {
  name: 'signUp',
  data: function () {
    return {
      /* eslint-disable no-useless-escape */
      emailRegExp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      wrongEmail: false,
      passwordsNotMatch: false
    };
  },
  mixins: [backEndMixin],
  methods: {
    signUp: function () {
      if (!this.checkPassword()) {
        this.passwordsNotMatch = true;
        return;
      }
      this.backSignUp(this.name, this.email, this.password);
    },
    checkPassword: function () {
      return this.password === this.repeatPassword && this.password;
    },

    passwordOnchange: function () {
      this.passwordsNotMatch = false;
    }
  }
};
</script>

<style src="../styles/styles.scss">
</style>
<style scoped lang="scss" rel="stylesheet/scss">
.signUp {
  margin-top: 40px;

  &__wrong-message {
    color: red;
    font-style: italic;

    &_email {

    }

    &_passwords {

    }
  }
}

input {
  margin: 5px;
}

button {
  margin-top: 15px;
}

span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
