<template lang="pug">
  .weekdays
    .row
      input(
        type="checkbox"
        v-for="day in days"
        :value="day"
        v-model="schedule"
      )
    .row
    | {{ schedule }}
</template>

<script>
export default {
  name: 'todo-weekdays',
  data() {
    return {
      days: [
        'Mon',
        'Tue',
        'Wed',
        'Thur',
        'Fri',
        'Sat',
        'Sun'
      ],
    }
  },
  computed: {
    todo() {
      return this.$store.getters.currentTodo()
    },
    schedule: {
      get: function() {
        return (this.todo || {}).schedule || []
      },
      set: function(value) {
        this.todo.schedule = value
        this.$store.commit('setCurrent', { todo: this.todo })
      }
    }
  }
}
</script>