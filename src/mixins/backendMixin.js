import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAJoGXBhkYe-Wmx8EYfw5zdUbRGQAiaHYY',
  authDomain: 'try-vue.firebaseapp.com',
  databaseURL: 'https://try-vue.firebaseio.com',
  projectId: 'try-vue',
  storageBucket: 'try-vue.appspot.com',
  messagingSenderId: '365042355612'
};

let isInited = false;

export default {
  created: function () {
    if (!isInited) {
      isInited = true;
      firebase.initializeApp(firebaseConfig);

      let nextIdRef, archiveRef, tasksRef;

      const store = this.$store;
      const router = this.$router;

      firebase.auth().onAuthStateChanged(
        function (user) {
          if (user) {
            store.commit('setUser', {userName: user.displayName, userId: user.uid});
            store.commit('login');

            if (archiveRef) {
              archiveRef.off();
            }
            archiveRef = firebase.database().ref('users/' + self.userId + '/archive');
            archiveRef.on('value', function (snapshot) {
              if (snapshot.val()) {
                store.commit('setArchive', snapshot.val());
              }
            });

            if (tasksRef) {
              tasksRef.off();
            }
            tasksRef = firebase.database().ref('users/' + self.userId + '/tasks');
            tasksRef.on('value', function (snapshot) {
              if (snapshot.val()) {
                store.commit('setTasks', snapshot.val());
              }
            });

            router.replace('/tasks');
          } else {
            store.commit('clear');
            router.replace('/login');
          }
        });

      nextIdRef = firebase.database().ref('nextId');
      nextIdRef.on('value', function (snapshot) {
        store.commit('setNextId', snapshot.val());
      });
    }
  },
  methods: {
    backLogout: function () {
      const self = this;
      firebase.auth().signOut().then(function () {
        self.$store.commit('logout');
        self.$router.replace('login');
      }, function (error) {
        console.error('Sign Out Error', error);
      });
    },
    backLogin: function () {
      const self = this;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          function () {
            self.$router.replace('tasks');
          },
          function (err) {
            alert('! ' + err.message);
          });
    },
    backSignUp: function (name, email, password) {
      firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
        .then(
          function () {
            return firebase.auth().currentUser.updateProfile({
              displayName: name,
              photoURL: ''
            });
          },
          function (err) {
            alert('Ooops! ' + err.message);
          })
        .then(
          function () {
          },
          function (err) {
            alert('Ooops! ' + err.message);
          })
        .then(
          () => {
            alert('Your account has been created !');
          },
          (err) => alert(`Ooops. ${err.message}`));
    },
    backSetNextId: function (nextId) {
      firebase.database().ref('nextId').set(String(nextId));
    },
    backSetTasks: function (userId, tasks) {
      firebase.database().ref('users/' + userId + '/tasks').set(tasks);
    },
    backSetArchive: function (userId, archive) {
      firebase.database().ref('users/' + userId + '/archive').set(archive);
    }
  }
};
