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
      <button v-on:click="toggleModifyWindow"></button>
      <div class="task__modify">
        <textarea name="text" id="" v-model="taskText" cols="50" rows="4" :placeholder="task.text"></textarea>
        <button v-on:click="$emit('modifyTask', task.id, taskText)">Modify</button>
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
      taskText: ''
    };
  },
  props: ['task'],
  computed: {},
  methods: {
    toggleModifyWindow: function () {

    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .task {

  }
</style>
