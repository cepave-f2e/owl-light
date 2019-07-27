module.exports = {
  'getAlarms.start'(state, alarms) {
    state.loading = true
  },
  'getAlarms.end'(state, alarms) {
    state.loading = false
  },
  'getAlarms.success'(state, alarms) {
    state.rows = alarms.data
    state.pageRows = state.rows.slice(0, 10)
  },
  'getAlarms.fail'(state, alarms) {
  },
  'changePage'(state, page) {
    state.pageRows = state.rows.slice(page * 10 - 10, page * 10)
  },
  'getStatusNotes.start'(state, notes) {
    state.loading = true
  },
  'getStatusNotes.end'(state, notes) {
    state.loading = false
  },
  'getStatusNotes.success'(state, notes) {
    state.statusNotes = notes.data
  },
  'getStatusNotes.fail'(state, notes) {
  },
  'resetProcessOpts'(state) {
    state.processOpts = [
      { value: 'comment', title: 'Comment', selected: true },
      { value: 'in progress', title: 'In Progress' },
      { value: 'resolved', title: 'Resolved' }
    ]
  }
}