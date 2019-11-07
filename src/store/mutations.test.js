import mutations from './mutations'
import { initialTodoTemplate } from '../common/lib'

const todosRef = {
  add(todo) {
    this.todos.push(todo)
  },
  doc(todoId) {
    const todos = this.todos
    return {
      update(todo) {
        const todoIndex = todos.findIndex(todo => todo.id === todoId)
        if (todoIndex > -1) {
          todos[todoIndex] = todo
        }
      },
      delete() {
        const todoIndex = todos.findIndex(todo => todo.id === todoId)
        todoIndex > -1 && todos.splice(todoIndex, 1)
      }
    }
  }
}

describe('vuex mutations', () => {
  it('should add todo in todos', () => {
    const todo = {
      title: 'Todo test add',
      ...initialTodoTemplate()
    }
    const todos = []
    todosRef.todos = todos
    const state = {
      todos,
      todosRef,
      current: {
        todo
      }
    }

    mutations.addTodo(state)
    expect(state.todos.length).toBe(1)
  })

  it('should update todo by id in todos', () => {
    const todo = {
      id: 'uniquetodoid',
      title: 'Todo test update before',
      ...initialTodoTemplate()
    }
    const updatedTodo = {
      ...todo,
      title: 'Todo test update after',
    }
    const todos = [ todo ]
    todosRef.todos = todos
    const state = {
      todos,
      todosRef,
    }

    mutations.updateTodo(state, updatedTodo)
    const stateTodo = state.todos.find(stateTodo => stateTodo.id === todo.id)
    expect(stateTodo).toEqual(updatedTodo)
  })

  it('should delete todo by id in todos', () => {
    const todo = {
      id: 'uniquetodoid',
      title: 'Todo test delete',
      ...initialTodoTemplate()
    }
    const todos = [ todo ]
    todosRef.todos = todos
    const state = {
      todos,
      todosRef,
    }

    mutations.deleteTodo(state, todo.id)
    const stateTodo = state.todos.find(stateTodo => stateTodo.id === todo.id)
    expect(stateTodo).toBeUndefined()
  })

  it('should set ref', () => {
    const state = {}
    todosRef.todos = []
    mutations.setTodosRef(state, todosRef)
    expect(state.todosRef).toEqual(todosRef)
  })

  it('should set current object poperty', () => {
    const state = {}
    const todo = initialTodoTemplate()
    mutations.setCurrent(state, { todo })
    expect(state.current.todo).toEqual(todo)
  })

  it('should set todoListStatus', () => {
    const state = {}
    const todoListStatus = 'loaded'
    mutations.setTodoListStatus(state, todoListStatus)
    expect(state.todoListStatus).toEqual(todoListStatus)
  })
})
