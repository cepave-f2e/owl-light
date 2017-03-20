module.exports = new window.Vuex.Store({
  strict: true,
  modules: {
    userGroup: require('./user-group'),
    signup: require('./signup'),
    login: require('./login'),
    graph: require('./graph'),
    templateList: require('./template/list'),
    templateUpdate: require('./template/update'),
    alarms: require('./alarms'),
    profile: require('./profile'),
    aggregator: require('./aggregator'),
    portal: require('./portal'),
  }
})
