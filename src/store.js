import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import {
  saveStatePlugin
} from './utils'

Vue.use(Vuex)

// Using plugin from utils.js to store in localStorage
// If there no items then it will use defaultBoard items instead
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    // board: board removed since both named the same
    board
  },
  mutations: {}
})
