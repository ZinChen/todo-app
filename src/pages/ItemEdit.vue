<template lang="pug">
main-layout
  template(v-slot:header)
    .pointer(
      @click="goBack"
    ) Back
  template(v-slot:body)
    todo-form(
      @discard="goBack",
      @save="editTodo",
    )
      template(v-slot:custom-fields)
        input(
          type="button"
          value="Delete"
          @click="deleteItem"
        )
</template>

<script>
import MainLayout from './MainLayout.vue'
import TodoForm from '../components/TodoForm.vue'

export default {
  name: 'edit-todo',
  components: {
    MainLayout,
    TodoForm,
  },
  beforeCreate() {
    this.$store.commit('setCurrent', { todoId: this.$route.params.id })
  },
  computed: {
    todo() {
      return this.$store.getters.currentTodo()
    },
  },
  methods: {
    editTodo(todo) {
      this.$store.commit('updateTodo', todo)
      this.$router.push('/')
    },
    deleteItem() {
      this.$store.commit('deleteTodo', this.todo.id)
      this.$router.push('/')
    },
    goBack() {
      this.$router.push('/')
    },
  }
}
</script>

