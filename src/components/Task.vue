<template>
  <li class="task">
    <p
      class="task__text"
      v-bind:class="{task__text_completed: task.isCompleted}"
      v-on:click="onToggle">
      {{task.text}}
    </p>
    <div class="task__controls">
      <button v-on:click="$emit('deleteTask', task.id)">
        Remove
      </button>
      <button v-on:click="onMove">
        {{archive ? 'Archive' : 'Restore'}}
      </button>
      <router-link :to="{path: '/task', name: 'task', params: {taskId: task.id}}">Modify</router-link>
    </div>
  </li>
</template>

<script>

export default {
  name: 'task',
  data: () => {
    return {
      taskText: '',
      isModifiedWindowOpen: false
    };
  },
  props: ['task', 'toggle', 'archive', 'moveToTasks'],
  methods: {
    onMove: function () {
      if (this.archive) {
        this.$emit('archiveTask', this.task.id);
      }
      if (this.moveToTasks) {
        this.$emit('moveToTasks', this.task.id);
      }
    },
    onToggle: function () {
      this.$emit('toggleTask', this.task.id);
    }
  }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .task {
    margin: 5px;
    padding: 5px;
    border: solid 1px black;

    &__text {
      &_completed {
        text-decoration: line-through;
      }
    }
  }
</style>
