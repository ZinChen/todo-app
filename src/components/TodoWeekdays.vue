<template lang="pug">
  .weekdays
    .row
      input(
        type="checkbox"
        v-for="day in days"
        :value="day"
        v-model="schedule"
        @change="updateSchedule"
      )
    .row
    | {{ schedule }}
</template>

<script>
export default {
  name: 'todo-weekdays',
  props: ['todo'],
  data() {
    return {
      days: [
        'Mon',
        'Tue',
        'Wed',
        'Thur',
        'Fri',
        'Sat'
      ],
      schedule: this.todo.schedule || []
    }
  },
  methods: {
    updateSchedule() {
      this.$emit('updateSchedule', this.schedule)
    }
  }
}
</script>