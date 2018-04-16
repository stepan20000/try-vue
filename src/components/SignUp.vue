<template>
  <div class="signUp">
    <p>Let's create a new account</p>
    <h3>Sign In</h3>
    <p v-if="wrongEmail" class="signUp__wrong-message signUp__wrong-message_email">
      Please enter correct email
    </p>
    <input type="text" v-on:change="emailOnChange" v-model="email" placeholder="email"><br>
    <input type="password" v-on:change="passwordOnChange" v-model="password" placeholder="password"><br>
    <p v-if="passwordsNotMatch" class="signUp__wrong-message signUp__wrong-message_password">
      Passwords do not match
    </p>
    <input type="password" v-on:change="passwordOnChange" v-model="repeatPassword" placeholder="repeat password"><br>
    <button v-on:click="signUp">Sign Up</button>
    <span>Or go back to <router-link to="/login">login</router-link></span>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'signUp',
  data: function () {
    return {
      /* eslint-disable no-useless-escape */
      emailRegExp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      email: '',
      password: '',
      repeatPassword: '',
      wrongEmail: false,
      passwordsNotMatch: false
    };
  },
  methods: {
    signUp: function () {
      if (!this.checkEmail()) {
        this.wrongEmail = true;
        return;
      }
      if (!this.checkPassword()) {
        this.passwordsNotMatch = true;
        return;
      }
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.email, this.password)
        .then(
          () => alert('Your account has been created !'),
          (err) => alert(`Ooops. ${err.message}`));
    },

    checkEmail: function () {
      console.log(this.email);
      console.log(this.emailRegExp.test(String(this.email).toLowerCase()));
      return this.emailRegExp.test(String(this.email).toLowerCase());
    },

    checkPassword: function () {
      return this.password === this.repeatPassword && this.password;
    },

    emailOnChange: function () {
      console.log('emailOnChange');
      this.wrongEmail = false;
    },

    passwordOnChange: function () {
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
