// Vuex sample actions
module.exports = {
  changeName({ commit }, name) {
    commit('CHANGE_NAME', name)
  }
}
