<template lang="pug">
  main-layout
    template(v-slot:header)
      input.button.is-link.is-fullwidth(
        type="button"
        value="Todo Today"
        @click="$router.push('/todo')"
      )

    template(v-slot:body)
      todo-item(
        v-for="todo in masterTodos"
        :key="todo.id"
        v-bind:todo="todo"
      )
      .comments
        | add todo button

        | may be two tabs:

      .create-todo-c
        .create-todo.todo(
          @click="openNewtodo"
        )
          .create-todo-icon.icon.icon-is-medium
            i.ion-plus-round

</template>

<script>
import MainLayout from './MainLayout.vue'
import TodoItem from '../components/TodoItem.vue'

export default {
  name: 'todo-manager',
  components: {
    MainLayout,
    TodoItem
  },
  data() {
    return {

    }
  },
  computed: {
    masterTodos() {
      return this.$store.getters.masterTodos()
      // simple not done todos and master todo for schedule and epic(история)
    },
    doneTodos() {
      // done simple, master scheduled or epic todos
    }
  },
  methods: {
    openNewtodo() {
      this.$router.push('/new')
    }
  }
}
</script>