// 获取目前所有的任务
const LOCAL_KEY = 'todomvc'
// 生成一个id
export function generateId() {
  return Date.now() + Math.random().toString(16).substr(2, 4)
}

export function fetch() {
  const result = localStorage.getItem(LOCAL_KEY)
  if (result) {
    return JSON.parse(result)
  }
  return []
}

export function save(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
}

export function filter(todos, visibility = 'all') {
  if (visibility == 'all') {
    return todos
  }
  else if (visibility == 'completed') {
    return todos.filter(it => it.completed)
  }
  else if (visibility == 'active') {
    return todos.filter(it => !it.completed)
  }
  throw new Error('Invalid visibility value:');
}