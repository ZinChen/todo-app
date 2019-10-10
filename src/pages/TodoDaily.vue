<template lang="pug">
main-layout
  template(v-slot:body)
    .todo-c
      todo-item(
        v-for="todo in todos",
        :key="todo.id"
        v-bind:todo="todo"
      )

    .field
      input.button.is-link.is-fullwidth(
        type="button"
        value="Todo Manager"
        @click="$router.push('/')"
      )

    //- replace create todo with add from existing or create screen
</template>

<script>
import MainLayout from './MainLayout.vue'
import TodoItem from '../components/TodoItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'todo-daily',
  components: {
    MainLayout,
    TodoItem,
  },
  computed: {
    // todos - only simple
    // check and create simple todos for schedule for current day
    // ...mapState([
    //   'todos'
    // ])
    todos() {
      return this.$store.getters.dailyTodos()
    }
  }
}
</script>
