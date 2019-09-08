<template lang="pug">
  main-layout
    template(v-slot:body)
      todo-item(
        v-for="todo in masterTodos"
      )
      //- add todo button

      //- may be two tabs:

</template>

<script>
export default {
  name: 'task-manager',
  data() {
    return {

    }
  },
  computed: {
    masterTodos() {
      // simple not done todos and master todo for schedule and epic(история)
    },
    doneTodos() {
      // done simple, master scheduled or epic todos
    }
  }
}
</script>