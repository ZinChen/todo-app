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
        .level-right
          .field.level-item
            input.button.is-link.is-pulled-right(
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
    this.$store.commit('setCurrent', { todoId: this.$route.params.todoId })
    this.$store.state.todoListStatus == 'loaded' && this.$store.dispatch('setCurrentTodo')
  },
  computed: {
    todo() {
      return this.$store.getters.currentTodo()
    },
  },
  methods: {
    editTodo() {
      this.$store.commit('updateTodo')
      this.$router.push('/todo')
    },
    deleteItem() {
      this.$store.commit('deleteTodo', this.$route.params.todoId)
      this.$router.push('/todo')
    },
    goBack() {
      this.$router.push('/todo')
    },
  }
}
</script>

