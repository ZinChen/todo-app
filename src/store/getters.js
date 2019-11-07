import { TODO_TYPE } from '../common/constants'

export default {
  isTodosLoaded: state => () => {
    return state.todoListStatus == 'loaded'
  },
  todoById: state => id => {
    return id && state.todos.find((todo) => todo.id === id)
  },
  subTodos: state => parentId => {
    return state.todos.filter((todo) => todo.parentTodoId === parentId)
  },
  currentTodo: state => () => {
    return state.current.todo
  },
  masterTodos: state => () => {
    return state.todos.filter((todo) =>
      [TODO_TYPE.EPIC, TODO_TYPE.SCHEDULED].includes(todo.type)
      && !todo.parentTodoId
    )
  },
  dailyTodos: state => () => {
    return state.todos.filter((todo) =>
      todo.type == TODO_TYPE.SIMPLE
    )
  }
}
