<template lang="pug">
main-layout
  template(v-slot:body)
    todo-form(
      @discard="goBack",
      @save="createTodo"
    )
</template>

<script>
import MainLayout from './MainLayout.vue'
import TodoForm from '../components/TodoForm.vue'

export default {
  name: 'new-item',
  components: {
    MainLayout,
    TodoForm,
  },
  beforeCreate() {
    this.$store.commit('setCurrent', { todoId: null })
  },
  methods: {
    createTodo(todo) {
      this.$store.commit('addTodo', todo)
      this.$router.push('/todo')
    },

    goBack() {
      this.$router.push('/todo')
    }
  }
}
</script>

<style lang="scss">


</style>
