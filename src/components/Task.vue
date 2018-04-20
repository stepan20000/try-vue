<template>
  <div class="task">
    <p class="task__text">{{task.text}}</p>
    <div class="task__controls">
      <button v-on:click="$emit('toggleTask', task.id)">
        {{task.isCompleted ? 'Set not complete' : 'Complete' }}
      </button>
      <button v-on:click="$emit('deleteTask', task.id)">
        Remove
      </button>
      <button v-on:click="$emit('archiveTask', task.id)">
        Archive task
      </button>
      <button v-on:click="toggleModifyWindow">{{this.isModifiedWindowOpen ? 'Close modify window': 'Modify'}}</button>
      <div class="task__modify" v-if="isModifiedWindowOpen">
        <textarea name="text" id="" v-model="taskText" cols="50" rows="4" :placeholder="task.text"></textarea>
        <button v-on:click="$emit('modifyTask', task.id, taskText)">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task',
  data: () => {
    return {
      isModifyWindowOpen: false,
      taskText: '',
      isModifiedWindowOpen: false
    };
  },
  props: ['task'],
  computed: {},
  methods: {
    toggleModifyWindow: function () {
      this.isModifiedWindowOpen = !this.isModifiedWindowOpen;
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .task {

  }
</style>
