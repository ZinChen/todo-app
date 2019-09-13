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
          v-if="isNew && !isSubTodo"
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
        .field(
          v-if="isEpic"
        )
          .subtodos-title Todo
          .todo-item(
            v-for="todo in subTodos"
          )
            //- Show here task status, time planned/done, link to todo (show in subtask info about parent task -> if has parent, show info)
            .todo
              | {{ todo.title }}
        .field(
          v-if="isNotScheduleOld"
        )
          input.button(
            type="button"
            @click="addSubtodo"
            value="Add subtodo"
          )
        //- add button
        .field.task-add-subtodo(
          v-if="isSimpleOld"
        ) Add subtodo here, this will turn this simple todo to epic
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
    subTodos() {
      return this.$store.getters.subTodos(this.todo.id)
    },
    isNew() {
      return !this.todo.id
    },
    isSubTodo() {
      return (this.todo || {}).parentTodoId !== undefined
    },
    isEpic() {
      return this.todo.type == 'epic'
    },
    isSimpleOld() {
      return !this.isNew && this.todo.type == 'simple'
    },
    isNotScheduleOld() {
      return !this.isNew && this.todo.type != 'schedule'
    }
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

<style lang="scss" scoped>
  @import '../styles/todo-item';
</style>
