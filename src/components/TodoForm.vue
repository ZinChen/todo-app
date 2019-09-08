<template lang="pug">
  .todo-form
    slot(name="fields", v-if="todo")
      .task-icon.icon
        i.ion-calendar(v-if="this.todo.type == 'scheduled'")
        i.ion-android-time(v-else)
      .task-content
        .task-title-label Title
        slot(name="custom-fields")
        input.task-title-info(
          v-model="todo.title"
        )
        .task-description-label Description
        input.task-description-info(
          v-model="todo.description"
        )
        .task-parent-label Parent task
        //- select.task-parent(
        //-   v-model="todo.parentTodo"
        //- )
        //-   option(
        //-     v-for="todo in todos"
        //-     :value="todo.id"
        //-   ) {{ todo.title }}
        .task-scheduled-lable Scheduled
        input.task-scheduled(
          type="checkbox"
          @change="scheduledCheckbox"
          v-model="scheduled"
        )
        .form-group(
          v-if="this.todo.type == 'simple'"
        )
          .task-date-label Planned on
          input.task-date(
            type="date"
            v-model="todo.datePlanned"
          )
          .scheduled-checkbox-container(
            v-if="this.isNew"
          )
        .schedule-container(
          v-if="this.todo.type == 'scheduled'"
        ) Schedule
          todo-weekdays(
            :todo="todo"
            @updateSchedule="updateSchedule"
          )
        .task-add-subtask(
          v-if="!this.isNew && this.todo.type != 'scheduled'"
        ) Add subtask here
    slot(name="controls")
      .control
        input(
          type="button"
          value="Discard"
          @click="discard"
        )
        input(
          type="button"
          value="Save"
          @click="save"
        )
</template>

<script>
import { mapState } from 'vuex'
import TodoWeekdays from './TodoWeekdays.vue'

export default {
  name: 'todo-form',
  components: {
    TodoWeekdays
  },
  data() {
    return {
      scheduled: false,
    }
  },
  computed: {
    todo() {
      return this.$store.getters.currentTodo()
    },
    isNew() {
      return !this.todo.id
    },
    ...mapState([
      'todos'
    ])
  },
  methods: {
    discard() {
      this.$emit('discard', this.todo)
    },
    save() {
      this.$emit('save', this.todo)
    },
    scheduledCheckbox() {
      this.todo.type = this.scheduled ? 'scheduled' : 'simple'
    },
    updateSchedule(schedule) {
      this.todo.schedule = schedule
    }
  }
}
</script>
