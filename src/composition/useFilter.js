import { ref, onMounted, onUnmounted, computed } from "vue";
import { filter } from "../util/todoStorage";
const validHash = ['all', 'active', 'completed']

export default function useFilter(todosRef) {
  const visibilitiyRef = ref('all');

  // hash值变化时的处理函数
  const onHashChange = () => {
    const hash = location.hash.replace(/#\/?/, '')
    if (validHash.includes(hash)) {
      visibilitiyRef.value = hash
    } else {
      location.hash = ''
      visibilitiyRef.value = 'all'
    }
  }

  // 1.组件挂载完成的生命周期函数
  onMounted(() => {
    window.addEventListener('hashchange', onHashChange)
  })
  // 2.组件销毁后的生命周期函数
  onUnmounted(() => {
    window.removeEventListener('hashchange', onHashChange)
  })

  // 根据hash值筛选的列表
  const filteredTodosRef = computed(() => filter(todosRef.value, visibilitiyRef.value))
  // 未完成的数量
  const remainingRef = computed(() => filter(todosRef.value, 'active').length)
  // 完成的数量
  const completedRef = computed(() => filter(todosRef.value, 'completed').length)

  return {
    visibilitiyRef,
    filteredTodosRef,
    remainingRef,
    completedRef,
    validHash
  }
}