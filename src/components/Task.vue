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
      <button v-if="modify" v-on:click="toggleModifyWindow">
        {{this.isModifiedWindowOpen ? 'Close modify window': 'Modify'}}
      </button>
      <div class="task__modify" v-if="isModifiedWindowOpen">
        <textarea name="text" v-model="taskText" cols="50" rows="4" :placeholder="task.text"></textarea>
        <div>
          <button v-on:click="$emit('modifyTask', task.id, taskText)">Submit</button>
        </div>
      </div>
    </div>
  </li>
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
  props: ['task', 'modify', 'toggle', 'archive', 'moveToTasks'],
  methods: {
    toggleModifyWindow: function () {
      this.isModifiedWindowOpen = !this.isModifiedWindowOpen;
    },
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
