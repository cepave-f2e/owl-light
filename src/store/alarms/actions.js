import fetch from '~utils/fetch'

module.exports = {
  'getAlarms'({ commit, state }, q) {
    const opts = {
      url: 'http://localhost:8088/api/v1/alarm/eventcases',
      params: {
        startTime: 1463754091,
        endTime: 1489674055,
        ...q
      },
      commit,
      mutation: 'getAlarms',
    }
    return fetch(opts)
      .then((res) => {
        const alarms = res.data.map((alarm) => {
          return alarm
        })
        commit('getAlarms', alarms)
      })
  },
}
