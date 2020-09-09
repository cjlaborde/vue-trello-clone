export function uuid() {
  return Math.random().toString(16).slice(2)
}

// Saves to localstorage
export function saveStatePlugin(store) {
  store.subscribe(
    (mutation, state) => localStorage.setItem('boards', JSON.stringify(state.boards))
  )
}
