<template lang="pug">
main-layout
  template(v-slot:body)
    .task-new
      .task-icon.icon
        i.ion-calendar(v-if="todo.scheduled")
        i.ion-android-time(v-else)
      .task-content
        .task-title-label Title
        input.task-title-info(
          v-model="todo.title"
        )
        .task-description-label Description
        input.task-description-info(
          v-model="todo.description"
        )
      .control
        input(
          type="button"
          value="Discard"
          @click="goBack"
        )
        input(
          type="button"
          value="Save"
          @click="createTodo"
        )
</template>

<script>
import { timehash } from '../common/lib'
import MainLayout from './MainLayout.vue'

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
    MainLayout
  },
  methods: {

    createTodo() {
      const {
        title,
        description
      } = this.todo

      this.$store.commit('addTodo', {
        id: timehash(),
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

