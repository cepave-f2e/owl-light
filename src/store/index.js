module.exports = new window.Vuex.Store({
  strict: true,
  modules: {
    sample: require('./sample'),
    templateList: require('./template/list'),
    templateUpdate: require('./template/update'),
    userGroup: require('./user-group')
  }
})
