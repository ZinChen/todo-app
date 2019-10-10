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

        .field.type-container(
          v-if="isViewMode"
        )
          .buttons.has-addons
            button(
              class="button is-primary"
              :class="{ 'is-active': todo.type == TODO_TYPE.SIMPLE }"
              :disabled="todo.type == TODO_TYPE.SIMPLE"
              @click="clickType(TODO_TYPE.SIMPLE)"
            ) Simple
            button(
              class="button is-info"
              :class="{ 'is-active': todo.type == TODO_TYPE.SCHEDULED }"
              :disabled="todo.type == TODO_TYPE.SCHEDULED"
              @click="clickType(TODO_TYPE.SCHEDULED)"
            ) Scheduled
            button(
              class="button is-warning"
              :class="{ 'is-active': todo.type == TODO_TYPE.EPIC }"
              :disabled="todo.type == TODO_TYPE.EPIC"
              @click="clickType(TODO_TYPE.EPIC)"
            ) Epic

          .buttons(
            v-if="typeState == 'clicked' && originalType != todo.type"
          )
            button(
              class="button is-pulled-right is-link"
              @click="setType"
            ) Confirm

            button(
              class="button is-pulled-right"
              @click="declineType"
            ) Decline

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
          v-if="isEpic && !isNew"
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
                class="button is-success"
                :class="{ 'is-active': todo.status == TODO_STATUS.DONE }"
                @click="clickStatus(TODO_STATUS.DONE)"
              ) Done
              button(
                class="button is-info"
                :class="{ 'is-active': todo.status == TODO_STATUS.NOT_FINISHED }"
                @click="clickStatus(TODO_STATUS.NOT_FINISHED)"
              ) Not finished
              button(
                class="button is-danger"
                :class="{ 'is-active': todo.status == TODO_STATUS.SKIPPED }"
                @click="clickStatus(TODO_STATUS.SKIPPED)"
              ) Skipped

            .buttons(
              v-if="statusState == 'clicked' && originalStatus != todo.status"
            )
              button(
                class="button is-pulled-right is-link"
                @click="setStatus"
              ) Confirm

              button(
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
      statusState: undefined,
      originalType: undefined,
      typeState: undefined,
      scheduled: undefined,
      nothingTodoHere: undefined,
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
    isTodoTime() {
      return new Date(this.todo.datePlanned) < new Date()
    },
    isSecondStatusNeed() {
      return this.statusState == 'confirmed' && [TODO_STATUS.NOT_FINISHED, TODO_STATUS.SKIPPED].includes(this.todo.status)
    },
    isTypeConfirmNeed() {
      // there is something strange with 'originalType' if you paste it in template, 'undefined' error appears
      return this.typeState == 'clicked' && this.originaltype != this.todo.type
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
      this.statusState = 'confirmed'
    },
    clickStatus(status) {
      if (this.statusState != 'clicked') {
        this.originalStatus = this.todo.status
        this.statusState = 'clicked'
      }
      this.todo.status = status

      // show popup , buttongroup better, one is highlited, next button group will show up:
      // done -> status, check parent (on redirect)
      // not finished -> button to create (plan) new task
      // skipped -> status 'skipped', create new task or just close this
    },
    declineStatus() {
      this.statusState = undefined
      this.todo.status = this.originalStatus
    },
    setType() {
      this.$store.dispatch('updateTodo')
      this.typeState = 'confirmed'
    },
    clickType(type) {
      if (this.typeState != 'clicked') {
        this.originalType = this.todo.type
        this.typeState = 'clicked'
      }

      const isComplexTosimple = type == TODO_TYPE.SIMPLE && type != this.originalType
      if (isComplexTosimple && this.hasSubtodo) {
        alert('You cannot turn complex todo with subtodos to simple, sorry')
      } else {
        this.todo.type = type
      }
    },
    declineType() {
      this.typeState = undefined
      this.todo.type = this.originalType
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
    },
    hasSubtodo() {
      return this.$store.todos.find(todo => todo.parentTodoId == this.todo.id)
    }
  }
}
</script>
