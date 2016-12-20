module.exports = new window.Vuex.Store({
  strict: true,
  modules: {
    sample: require('./sample'),
    userGroup: require('./user-group'),
    profile: require('./profile')
  }
})
