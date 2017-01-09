const aggregator = {
  state: {
    rows: [],
  },
  actions: require('./actions'),
  mutations: require('./mutations')
}
module.exports = aggregator
