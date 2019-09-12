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
import { initialTodo } from '../common/lib'

export default {
  name: 'new-item',
  components: {
    MainLayout,
    TodoForm,
  },
  beforeCreate() {
    this.$store.commit('setCurrent', { todoId: undefined })
    this.$store.state.todoListStatus == 'loaded' && this.$store.dispatch('setCurrentTodo')
  },
  methods: {
    createTodo() {
      this.$store.commit('addTodo')
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
