<template lang="pug">
  .todo-form
    slot(name="fields")
      .task-icon.icon
        i.ion-calendar(v-if="todo.scheduled")
        i.ion-android-time(v-else)
      .task-content
        .task-title-label Title
        slot(name="custom-fields")
        input.task-title-info(
          v-model="todo.title"
        )
        .task-description-label Description
        input.task-description-info(
          v-model="todo.description"
        )
    slot(name="controls")
      .control
        input(
          type="button"
          value="Discard"
          @click="discard"
        )
        input(
          type="button"
          value="Save"
          @click="save"
        )
</template>

<script>
export default {
  name: 'todo-form',
  props: ['todo'],
  methods: {
    discard() {
      this.$emit('discard')
    },
    save() {
      this.$emit('save')
    },
  }
}
</script>

