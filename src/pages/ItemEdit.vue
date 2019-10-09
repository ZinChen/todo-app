<template lang="pug">
main-layout
  template(v-slot:header)
    .pointer(
      @click="goBack"
    ) Back
  template(v-slot:body)
    todo-form
</template>

<script>
import MainLayout from './MainLayout.vue'
import TodoForm from '../components/TodoForm.vue'
import { TODO_MODE } from '../common/constants'

export default {
  name: 'edit-todo',
  components: {
    MainLayout,
    TodoForm,
  },
  beforeCreate() {
    this.$store.commit('setCurrent', {
      todoId: this.$route.params.todoId,
      todoMode: TODO_MODE.EDIT
    })
    this.$store.getters.isTodosLoaded && this.$store.dispatch('setCurrentTodo')
  },
  methods: {
    goBack() {
      // this.$router.push('/todo')
      this.$router.go(-1)
    },
  }
}
</script>

