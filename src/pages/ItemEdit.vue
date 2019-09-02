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
      :todo="todo"
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
  data() {
    return {
      todo: { ...this.$store.getters.todoById(this.$route.params.id) }
    }
  },
  methods: {
    editTodo() {
      this.$store.commit('updateTodo', this.todo)
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

