<template lang="pug">
  router-link.todo(
    @click="openItem"
    :to="`/todo/${todo.id}`"
  )
    .todo-icon.icon
      i.ion-calendar(v-if="todo.scheduled")
      i.ion-android-time(v-else)
    .todo-checkbox
      input(
        :id="idAttr",
        :name="todo.id"
        type="checkbox",
      )
    .todo-content
      .todo-title {{ todo.title }}
      .todo-description {{ todo.description }}
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
