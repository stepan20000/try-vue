<template>
  <div class="tasks">
    <h1>Tasks</h1>
    <form v-on:submit="addTask" id="taskForm">
      <textarea
        form="taskForm"
        v-model="taskText"
        rows="4" cols="50"
        placeholder="Enter text here ..."
        required>
      </textarea>
      <div>
        <button>Add task</button>
      </div>
    </form>
    <input class="tasks__search" placeholder="Search..." type="text" v-model="searchQuery" maxlength="10"/>
    <ul class="tasks__list">
      <task
        toggle="true" archive="true"
        v-for="task in showedTasks"
        v-bind:key="task.id"
        v-bind:task="task"
        v-on:toggleTask="toggleTask"
        v-on:deleteTask="deleteTask"
        v-on:archiveTask="archiveTask">
      </task>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase';
import Task from './Task';
import backEndMixin from '../mixins/backendMixin';
import search from '../mixins/searchMixin';

export default {
  name: 'tasks',
  data: () => {
    return {
      taskText: '',
      searchQuery: ''
    };
  },
  components: {
    Task
  },
  mixins: [backEndMixin, search],
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
    showedTasks: {
      get () {
        return this.search(this.tasks, this.searchQuery);
      }
    },
    archive: {
      get () {
        return this.$store.state.archive;
      }
    },
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
      this.tasks[this.nextId] = {
        id: this.nextId,
        text: this.taskText,
        isCompleted: false
      };
      this.nextId++;
      this.taskText = '';
      this.backSetNextId(this.nextId);
      this.backSetTasks(this.userId, this.tasks);
    },
    deleteTask: function (id) {
      delete this.tasks[id];
      this.backSetTasks(this.userId, this.tasks);
    },
    toggleTask: function (id) {
      this.tasks[id].isCompleted = !this.tasks[id].isCompleted;
      this.backSetTasks(this.userId, this.tasks);
    },
    archiveTask: function (id) {
      const tasks = Object.assign({}, this.tasks);
      const archive = Object.assign({}, this.archive);
      archive[id] = tasks[id];
      delete tasks[id];
      this.backSetTasks(this.userId, tasks);
      this.backSetArchive(this.userId, archive);
    }
  },
  created: function () {
    const self = this;
    const store = this.$store;
    if (this.userId) {
      const archiveRef = firebase.database().ref('users/' + self.userId + '/archive');
      archiveRef.on('value', function (snapshot) {
        store.commit('setArchive', Object.assign({}, snapshot.val()));
      });
      const tasksRef = firebase.database().ref('users/' + self.userId + '/tasks');
      tasksRef.on('value', function (snapshot) {
        store.commit('setTasks', Object.assign({}, snapshot.val()));
      });
    } else {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .tasks {

    &__list {
      margin-top: 40px;
      padding: 0;
    }

    &__search {
      margin-top: 20px;
         }
  }
</style>
