<template lang="pug">
main-layout
  template(v-slot:body)
    .task-c
      todo-item(
        v-for="todo in todos",
        :key="todo.id"
        v-bind:todo="todo"
      )

    //- replace create task with add from existing or create screen
    .create-task-c
      .create-task.task(
        @click="openNewTask"
      )
        .create-task-icon.icon.icon-is-medium
          i.ion-plus-round
</template>

<script>
import MainLayout from './MainLayout.vue'
import TodoItem from '../components/TodoItem.vue'
import { mapState } from 'vuex'

export default {
  name: 'main-page',
  components: {
    MainLayout,
    TodoItem,
  },
  methods: {
    openNewTask() {
      this.$router.push('/new')
    }
  },
  computed: {
    ...mapState([
      'todos'
    ])
  }
}
</script>

<style lang="scss" scoped>
.task-c {
  flex: 1;
}

.create-task {
  display: flex;
  // justify-content: flex-end;
  justify-content: center;
  cursor: pointer;
}

.create-task-icon {
  // margin-right: 10px;
  line-height: 1;
  color: #fff;
  background: #00B2FE;
  // border: 1px solid #00B2FE;
  border-radius: 50%;
}
</style>
