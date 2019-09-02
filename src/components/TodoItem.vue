<template lang="pug">
  .task(
    @click="openItem"
  )
    .task-icon.icon
      i.ion-calendar(v-if="todo.scheduled")
      i.ion-android-time(v-else)
    .task-checkbox
      input(
        :id="idAttr",
        :name="todo.id"
        type="checkbox",
      )
    .task-content
      .task-title {{ todo.title }}
      .task-description {{ todo.description }}
</template>


<script>
export default {
  name: 'todo-item',
  props: ['todo'],
  computed: {
    idAttr() {
      return `item-${this.todo.id}`
    }
  },
  methods: {
    openItem() {
      this.$router.push(`/todo/${this.todo.id}`)
    }
  }
}
</script>


<style lang="scss" scoped>
  @import '../styles/todo-item';
</style>
