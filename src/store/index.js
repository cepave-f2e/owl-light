module.exports = new window.Vuex.Store({
  strict: true,
  modules: {
    sample: require('./sample'),
    userGroup: require('./user-group'),
    signup: require('./signup'),
    login: require('./login'),
    graph: require('./graph'),
  }
})
