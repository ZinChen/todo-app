<template lang="pug">
  .todo-form
    slot(name="fields", v-if="todo")
      .todo-icon.icon
        i.ion-calendar(v-if="todo.type == 'scheduled'")
        i.ion-android-time(v-else)
      .todo-content
        slot(name="custom-fields")
        .level-right(
          v-if="!isNew"
        )
          .field.level-item
            input.button.is-link.is-pulled-right(
              type="button"
              value="Delete"
              @click="deleteItem"
            )
        .field
          label.label.todo-title-label Title
          .control
            input.input.todo-title-info(
              type="text"
              v-model="todo.title"
            )
        .field
          label.label.todo-description-label Description
          .control
            input.input.todo-description-info(
              type="text"
              v-model="todo.description"
            )
        //- .todo-parent-label Parent todo
        //- select.todo-parent(
        //-   v-model="todo.parentTodo"
        //- )
        //-   option(
        //-     v-for="todo in todos"
        //-     :value="todo.id"
        //-   ) {{ todo.title }}
        .field
          label Status
          .status
          | {{ todo.status }}
        .field(
          v-if="isNew && !isSubTodo"
        )
          label.checkbox.todo-scheduled-lable
            input.todo-scheduled(
              type="checkbox"
              @change="scheduledCheckbox"
              v-model="scheduled"
            )
            |  Scheduled
        .field(
          v-if="todo.type == 'simple'"
        )
          label.label.todo-date-label Planned on
          .control
            input.input.todo-date(
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
            //- Show here todo status, time planned/done, link to todo (show in subtodo info about parent todo -> if has parent, show info)
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
        .field.todo-add-subtodo(
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
                @click="goBack"
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
    goBack() {
      if (this.todo.parentTodoId) {
        this.$router.push(`/todo/${this.todo.parentTodoId}`)
      } else if(this.todo.type == 'simple') {
        this.$router.push('/todo')
      } else {
        this.$router.push('/')
      }
    },
    save() {
      this.todo.id ?
        this.$store.commit('updateTodo')
        : this.$store.commit('addTodo')

      this.goBack()
    },
    deleteItem() {
      this.$store.commit('deleteTodo', this.$route.params.todoId)

      this.goBack()
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
