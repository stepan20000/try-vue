<template>
  <div class="modifyTask">
    <textarea class="modifyTask__textarea" name="text" v-model="taskText" cols="50" rows="4"></textarea>
    <div>
      <button v-on:click="back">Back</button>
      <button v-on:click="modifyTask">Submit</button>
    </div>
  </div>
</template>

<script>
import backEndMixin from '../mixins/backendMixin';

export default {
  name: 'modifyTask',
  data: () => {
    return {
      taskText: ''
    };
  },
  mixins: [backEndMixin],
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
    taskId: {
      get () {
        return this.$route.params['taskId'];
      }
    }
  },
  methods: {
    modifyTask: function () {
      this.tasks[this.taskId].text = this.taskText;
      this.backSetTasks(this.userId, this.tasks);
      this.$router.replace('/tasks');
    },
    back: function () {
      this.$router.replace('/tasks');
    }
  },
  created: function () {
    this.taskText = this.tasks[this.taskId].text;
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .modifyTask {
    margin-top: 40px;
    &__textarea {
      margin: auto;
    }
  }
</style>
