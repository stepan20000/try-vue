<template>
  <div class="tasks">
    <h1>Tasks</h1>
    <form v-on:submit="addTask" id="taskForm">
      <textarea form="taskForm" type="textarea" v-model="taskText" rows="4" cols="50">
        Enter text here ...
      </textarea>
      <button>Submit</button>
    </form>
    <ul>
      <task
        v-for="task in tasks"
        v-bind:key="task.id"
        v-bind:task="task"
        v-on:toggleTask="toggleTask"
        v-on:deleteTask="deleteTask"
        v-on:modifyTask="modifyTask">
      </task>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase';
import Task from './Task';

export default {
  name: 'tasks',
  data: () => {
    return {
      taskText: ''
    };
  },
  components: {
    Task
  },
  computed: {
    userId: {
      get () {
        return this.$store.state.userId;
      }
    },
    tasks: {
      get () {
        return this.$store.state.tasks;
      }
    },
    archive
    nextId: {
      get () {
        return this.$store.state.nextId;
      },
      set (nextId) {
        return this.$store.commit('setNextId', nextId);
      }
    }
  },
  methods: {
    addTask: function () {
      const self = this;
      this.tasks[self.nextId] = {
        id: self.nextId,
        text: this.taskText,
        isCompleted: false
      };
      self.nextId = self.nextId + 1;
      console.log('self.nextId', self.nextId);
      this.saveTasks();
    },
    deleteTask: function (id) {
      delete this.tasks[id];
      this.saveTasks();
    },
    toggleTask: function (id) {
      this.tasks[id].isCompleted = !this.tasks[id].isCompleted;
      this.saveTasks();
    },
    modifyTask: function (id, text) {
      this.tasks[id].text = text;
      this.saveTasks();
    },
    saveTasks: function () {
      const self = this;
      firebase.database().ref('users/' + self.userId).set({tasks: Object.assign({}, self.tasks)});
      firebase.database().ref('nextId').set(self.nextId);
    },
    archiveTask: function (id) {
      const processedTask = Object.assign({}, this.tasks[id]);
      this.archive =
    }
  },
  created: function () {
    const self = this;
    const store = this.$store;
    if (this.userId) {
      const archiveRef = firebase.database().ref('users/' + self.userId + '/archive');
      archiveRef.on('value', function (snapshot) {
        console.log('archiveRef changed', snapshot.val());
        if (snapshot.val()) {
          store.commit('setArchive', Object.assign({}, snapshot.val()));
        }
      });
    } else {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
