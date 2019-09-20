<template lang="pug">
main-layout
  template(v-slot:body)
    .todo-c
      todo-item(
        v-for="todo in todos",
        :key="todo.id"
        v-bind:todo="todo"
      )

    .field
      input.button.is-link.is-fullwidth(
        type="button"
        value="Todo Manager"
        @click="$router.push('/')"
      )

    //- replace create todo with add from existing or create screen
    .create-todo-c
      .create-todo.todo(
        @click="openNewtodo"
      )
        .create-todo-icon.icon.icon-is-medium
          i.ion-plus-round
</template>

<script>
import MainLayout from './MainLayout.vue'
import TodoItem from '../components/TodoItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'todo-daily',
  components: {
    MainLayout,
    TodoItem,
  },
  methods: {
    openNewtodo() {
      this.$router.push('/new')
    }
  },
  computed: {
    // todos - only simple
    // check and create simple todos for schedule for current day
    // ...mapState([
    //   'todos'
    // ])
    todos() {
      return this.$store.getters.dailyTodos()
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-c {
  flex: 1;
}

.create-todo {
  display: flex;
  // justify-content: flex-end;
  justify-content: center;
  cursor: pointer;
}

.create-todo-icon {
  // margin-right: 10px;
  line-height: 1;
  color: #fff;
  background: #00B2FE;
  // border: 1px solid #00B2FE;
  border-radius: 50%;
}
</style>
