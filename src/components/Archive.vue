<template>
  <div class="archive">
    <h1>Archive</h1>
    <input type="text" v-model="searchQuery" maxlength="10"  />
    <ul class="archive__list">
      <task
        moveToTasks="true" toggle="true"
        v-for="task in showedTasks"
        v-bind:key="task.id"
        v-bind:task="task"
        v-on:toggleTask="toggleTask"
        v-on:moveToTasks="moveToTasks"
        v-on:deleteTask="deleteTask">
      </task>
    </ul>
  </div>
</template>

<script>
import Task from './Task';
import backEndMixin from '../mixins/backendMixin';
import search from '../mixins/searchMixin';

export default {
  name: 'archive',
  data: () => {
    return {
      searchQuery: ''
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
    showedTasks: {
      get () {
        return this.search(this.archive, this.searchQuery);
      }
    },
    archive: {
      get () {
        return this.$store.state.archive;
      }
    }
  },
  mixins: [backEndMixin, search],
  methods: {
    deleteTask: function (id) {
      delete this.archive[id];
      this.backSetArchive(this.userId, this.archive);
    },
    moveToTasks: function (id) {
      const tasks = Object.assign({}, this.tasks);
      const archive = Object.assign({}, this.archive);
      tasks[id] = archive[id];
      delete archive[id];
      this.backSetArchive(this.userId, archive);
      this.backSetTasks(this.userId, tasks);
    },
    toggleTask: function (id) {
      this.archive[id].isCompleted = !this.archive[id].isCompleted;
      this.backSetArchive(this.userId, this.archive);
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .archive {

    &__list {
      margin-top: 40px;
      padding: 0;

    }
  }
</style>
