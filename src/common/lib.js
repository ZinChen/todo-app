export const timehash = () =>
  (+new Date).toString(36);

const initalTodoTemplate = () => ({
  type: 'simple',
  status: 'planned',
  created: Date.now()
})

export const initialTodo = initalTodoTemplate()

export const saveFile = (value, name = 'todo-app-export') => {
  const data = JSON.stringify(value)
  const blob = new Blob([data], {type: 'text/plain'})
  const e = document.createEvent('MouseEvents'),
  a = document.createElement('a');
  a.download = `${name}.json`;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  a.dispatchEvent(e);
}
