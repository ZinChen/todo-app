import { TODO_TYPE, TODO_STATUS } from '../common/constants'

export const timehash = () =>
  (+new Date).toString(36);

export const initialTodoTemplate = () => ({
  type: TODO_TYPE.SIMPLE,
  status: TODO_STATUS.PLANNED,
  created: Date.now()
})

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
