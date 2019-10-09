<template lang="pug">
  .todo-form
    slot(name="fields", v-if="todo")
      .todo-icon.icon
        i.ion-calendar(v-if="todo.type == TODO_TYPE.SCHEDULED")
        i.ion-android-time(v-else)
      .todo-content
        div(
          class="field"
          v-if="!isEditMode"
        )
          .control
            button(
              class="button.is-warning"
              @click="goTodoEdit"
            ) Edit
        div(
          class="level-right"
          v-if="isClosed"
        )
          .field.level-item
            input(
              class="button is-link is-pulled-right"
              type="button"
              value="Delete"
              @click="deleteTodo"
            )
        .field
          label.label.todo-title-label Title
          .control
            input(
              class="input todo-title-info"
              type="text"
              v-model="todo.title"
              :readonly="!isEditMode"
            )
        .field
          label.label.todo-description-label Description
          .control
            input.input.todo-description-info(
              type="text"
              v-model="todo.description"
              :readonly="!isEditMode"
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
              :readonly="!isEditMode"
            )
            |  Scheduled
        .field(
          v-if="todo.type == TODO_TYPE.SIMPLE"
        )
          label.label.todo-date-label Planned on
          .control
            input.input.todo-date(
              type="date"
              v-model="todo.datePlanned"
              :disabled="!isEditMode"
            )
        .field.schedule-container(
          v-if="todo.type == TODO_TYPE.SCHEDULED"
        ) Schedule
          todo-weekdays

        //- subtodo section
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
          v-if="isNotScheduledOld"
        )
          input.button(
            type="button"
            @click="addSubtodo"
            value="Add subtodo"
          )

        //- TODO: Replace with button group "simple", "epic", "schedule", current is highlighted. Description below, when switch, confirm button appears
        .field.todo-add-subtodo(
          v-if="isSimpleEdit"
        ) Add subtodo here, this will turn this simple todo to epic

        slot(name="controls")
          .status-container(
            v-if="isViewMode"
          )
            .buttons.has-addons(
              v-if="isTodoTime"
            )
              button(
                class="button"
                :class="{ 'is-active': todo.status == TODO_STATUS.DONE }"
                @click="clickStatus(TODO_STATUS.DONE)"
              ) Done
              button(
                class="button"
                @click="clickStatus(TODO_STATUS.NOT_FINISHED)"
              ) Not finished
              button(
                class="button"
                @click="clickStatus(TODO_STATUS.SKIPPED)"
              ) Skipped

            button(
              v-if="status == 'clicked' && originalStatus != todo.status"
              class="button is-pulled-right is-link"
              @click="setStatus"
            ) Confirm

            button(
              v-if="status == 'clicked' && originalStatus != todo.status"
              class="button is-pulled-right"
              @click="declineStatus"
            ) Decline

            .buttons.has-addons(
              v-if="isSecondStatusNeed"
            )
              button(
                class="button"
                @click="goBack"
              ) Close
              button(
                class="button"
                @click="createNextTodo"
              ) Move


          .field.is-grouped(
            v-if="isEditMode"
          )
            .control
              button.button.is-link(
                @click="save"
              ) Save
            .control
              button.button.is-text(
                @click="discard"
              ) Discard
</template>

<script>
import { TODO_TYPE, TODO_STATUS, TODO_MODE } from '../common/constants'
import TodoWeekdays from './TodoWeekdays.vue'
import { initialTodoTemplate } from '../common/lib'

export default {
  name: 'todo-form',
  components: {
    TodoWeekdays
  },
  data() {
    return {
      originalStatus: undefined,
      status: undefined,
      scheduled: false,
      TODO_MODE,
      TODO_TYPE,
      TODO_STATUS,
    }
  },
  computed: {
    todo() {
      return this.$store.getters.currentTodo()
    },
    mode() {
      return this.$store.state.current.todoMode
    },
    subTodos() {
      return this.$store.getters.subTodos(this.todo.id)
    },
    isEditMode() {
      return this.mode == TODO_MODE.EDIT
    },
    isViewMode() {
      return this.mode == TODO_MODE.VIEW
    },
    isNew() {
      return !this.todo.id
    },
    isClosed() {
      return this.todo.status == TODO_STATUS.CLOSED
    },
    isSubTodo() {
      return (this.todo || {}).parentTodoId !== undefined
    },
    isEpic() {
      return this.todo.type == TODO_TYPE.EPIC
    },
    isScheduled() {
      return this.todo.type == TODO_TYPE.SCHEDULED
    },
    isSimple() {
      return this.todo.type == TODO_TYPE.SIMPLE
    },
    isSimpleEdit() {
      return !this.isNew && this.isSimple
    },
    isNotScheduledOld() {
      return !this.isNew && !this.isScheduled
    },
    isTodoTime() {
      return new Date(this.todo.datePlanned) < new Date()
    },
    isSecondStatusNeed() {
      return this.status == 'confirmed' && [TODO_STATUS.NOT_FINISHED, TODO_STATUS.SKIPPED].includes(this.todo.status)
    }
  },
  methods: {
    goBack() {
      if (this.todo.parentTodoId) {
        this.$router.push(`/todo/${this.todo.parentTodoId}`)
      } else if(this.todo.type == TODO_TYPE.SIMPLE) {
        this.$router.push('/todo')
      } else {
        this.$router.push('/')
      }
    },
    goTodo() {
      this.$router.push(`/todo/${this.todo.id}`)
    },
    goTodoEdit() {
      this.$router.push(`/todo/${this.todo.id}/edit`)
    },
    save() {
      if (this.isNew) {
        this.$store.dispatch('addTodo')
        this.goBack()
      } else if (this.todo.parentTodoId) {
        this.$store.dispatch('addSubAndSetParentTodo')
        this.goTodo()
      } else {
        this.$store.dispatch('updateTodo')
        this.goTodo()
      }

    },
    discard() {
      if (this.isNew) {
        this.goBack()
      } else {
        this.$store.dispatch('setCurrentTodo')
        this.goTodo()
      }
    },
    setMode(todoMode) {
      this.$store.commit('setCurrent', { todoMode })
    },
    setStatus() {
      this.$store.dispatch('updateTodo')
      this.status = 'confirmed'
    },
    clickStatus(status) {
      if (this.status != 'clicked') {
        this.originalStatus = this.todo.status
        this.status = 'clicked'
      }
      this.todo.status = status

      // show popup , buttongroup better, one is highlited, next button group will show up:
      // done -> status, check parent (on redirect)
      // not finished -> button to create (plan) new task
      // skipped -> status 'skipped', create new task or just close this
    },
    declineStatus() {
      this.status = undefined
      this.todo.status = this.originalStatus
    },
    createNextTodo() {
      const initialTodo = initialTodoTemplate()
      const { parentTodoId } = this.todo
      const subTodo = {
        ...initialTodo,
        ...( parentTodoId && { parentTodoId }),
        prevTodoId: this.todo.id,
      }

      this.$store.commit('setCurrent', { subTodo })
      this.$router.push('/new')
    },
    deleteTodo() {
      if (confirm('You really want to delete this todo forever?')) {
        this.$store.commit('deleteTodo', this.$route.params.todoId)

        this.goBack()
      }
    },
    scheduledCheckbox() {
      this.todo.type = this.scheduled ? TODO_TYPE.SCHEDULED : TODO_TYPE.SIMPLE
    },
    addSubtodo() {
      this.$store.dispatch('updateTodo')
      const initialTodo = initialTodoTemplate()
      const subTodo = {
        ...initialTodo,
        parentTodoId: this.todo.id
      }
      this.$store.commit('setCurrent', { subTodo, parentTodo: this.todo })
      this.$router.push('/new')
    }
  }
}
</script>
