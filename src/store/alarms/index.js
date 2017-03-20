// Vuex state module

const alarms = {
  state: {
    rows: [],
  },
  actions: require('./actions'),
  mutations: require('./mutations'),
}

module.exports = alarms
