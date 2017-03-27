const alarm = {
  namespaced: true,
  state: {
    rows: [],
    pageRows: [],
    statusNotes: [],
    loading: false,
    processOpts: [
      { value: 'comment', title: 'Comment', selected: true },
      { value: 'in progress', title: 'In Progress' },
      { value: 'resolved', title: 'Resolved' }
    ]
  },
  actions: require('./actions'),
  mutations: require('./mutations'),
}

module.exports = alarm