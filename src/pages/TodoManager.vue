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
      )
      .comments
        | add todo button

        | may be two tabs:

</template>

<script>
import MainLayout from './MainLayout.vue'
import TodoItem from '../components/TodoItem.vue'

export default {
  name: 'todo-manager',
  components: {
    MainLayout
  },
  data() {
    return {

    }
  },
  computed: {
    masterTodos() {
      // simple not done todos and master todo for schedule and epic(история)
    },
    doneTodos() {
      // done simple, master scheduled or epic todos
    }
  }
}
</script>