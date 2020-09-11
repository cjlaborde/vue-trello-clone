import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import {
  saveStatePlugin,
  uuid
} from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK(state, {
      tasks,
      name
    }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    CREATE_COLUMN(state, {
      name
    }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    UPDATE_TASK(state, {
      task,
      key,
      value
    }) {
      task[key] = value
      // Vue.set(task, key, value)
    },
    MOVE_TASK(state, {
      fromTasks,
      toTasks,
      fromTaskIndex,
      toTaskIndex
    }) {
      // 1) Remove Task from current column
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      // 2) Column we moving column to
      // Instead of push to the end we going to use splice to move it to correct position
      // toTasks.push(taskToMove)
      // splice(what we going to move,0 since we don't want to remove just move, where we want to move it)
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN(state, {
      fromColumnIndex,
      toColumnIndex
    }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      // zero since we don't want to remove we want to move element that is why we set it to 0
      columnList.splice(toColumnIndex, 0, columnToMove)
    }
  }
})
