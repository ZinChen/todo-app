<template lang="pug">
main-layout
  template(v-slot:body)
    todo-form
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
    this.$store.getters.isTodosLoaded && this.$store.dispatch('setCurrentTodo')
  },
  methods: {
    goBack() {
      this.$router.push('/todo')
    }
  }
}
</script>

<style lang="scss">


</style>
