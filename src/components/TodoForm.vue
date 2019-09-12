<template lang="pug">
  .todo-form
    slot(name="fields", v-if="todo")
      .task-icon.icon
        i.ion-calendar(v-if="todo.type == 'scheduled'")
        i.ion-android-time(v-else)
      .task-content
        slot(name="custom-fields")
        .field
          label.label.task-title-label Title
          .control
            input.input.task-title-info(
              type="text"
              v-model="todo.title"
            )
        .field
          label.label.task-description-label Description
          .control
            input.input.task-description-info(
              type="text"
              v-model="todo.description"
            )
        //- .task-parent-label Parent task
        //- select.task-parent(
        //-   v-model="todo.parentTodo"
        //- )
        //-   option(
        //-     v-for="todo in todos"
        //-     :value="todo.id"
        //-   ) {{ todo.title }}
        .field(
          v-if="isNew"
        )
          label.checkbox.task-scheduled-lable
            input.task-scheduled(
              type="checkbox"
              @change="scheduledCheckbox"
              v-model="scheduled"
            )
            |  Scheduled
        .field(
          v-if="todo.type == 'simple'"
        )
          label.label.task-date-label Planned on
          .control
            input.input.task-date(
              type="date"
              v-model="todo.datePlanned"
            )
        .field.schedule-container(
          v-if="todo.type == 'scheduled'"
        ) Schedule
          todo-weekdays
        .field.task-add-subtodo(
          v-if="!isNew && todo.type != 'scheduled'"
        ) Add subtodo here, this will turn this simple todo to epic
          input.button(
            type="button"
            @click="addSubtodo"
            value="Add subtodo"
          )
        slot(name="controls")
          .field.is-grouped
            .control
              input.button.is-link(
                type="button"
                value="Save"
                @click="save"
              )
            .control
              input.button.is-text(
                type="button"
                value="Discard"
                @click="discard"
              )
</template>

<script>
import { mapState } from 'vuex'
import TodoWeekdays from './TodoWeekdays.vue'
import { initialTodo } from '../common/lib'

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
      this.$emit('discard')
    },
    save() {
      this.$emit('save')
    },
    scheduledCheckbox() {
      this.todo.type = this.scheduled ? 'scheduled' : 'simple'
    },
    addSubtodo() {
      this.todo.type = 'epic'
      this.$store.commit('updateTodo')
      const subTodo = {
        ...initialTodo,
        parentTodoId: this.todo.id
      }
      this.$store.commit('setCurrent', { subTodo })
      this.$router.push('/new')
    }
  }
}
</script>
