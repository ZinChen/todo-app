<template lang="pug">
main-layout
  template(v-slot:body)
    todo-form(
      @discard="goBack",
      @save="editTodo",
      :todo="todo"
    )
</template>

<script>
import { timehash } from '../common/lib'
import MainLayout from './MainLayout.vue'
import TodoForm from '../components/TodoForm.vue'

const emptyTodo = {
  scheduled: false,
  title: '',
  description: ''
}

export default {
  name: 'new-item',
  data() {
    return {
      todo: emptyTodo
    }
  },
  components: {
    MainLayout,
    TodoForm,
  },
  methods: {

    createTodo() {
      const {
        title,
        description
      } = this.todo

      this.$store.commit('addTodo', {
        // id: timehash(),
        title,
        description
      })
      console.log('store', this.$store.state)
      this.todo = emptyTodo
      this.$router.push('/')
    },

    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">


</style>
