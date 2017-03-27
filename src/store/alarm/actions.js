import vfetch from '~utils/vuex-fetch'
import fetch from '~utils/fetch'

module.exports = {
  'getAlarms'({ commit, state }, q) {
    const opts = {
      method: 'post',
      url: 'http://113.207.30.198:8089/api/v1/alarm/eventcases',
      data: {
        page: -1,
        limit: 2000,
        ...q
      },
      mutation: 'getAlarms',
      commit
    }
    vfetch(opts)
  },
  'getStatusNotes'({ commit, state }, q) {
    const opts = {
      url: 'http://113.207.30.198:8089/api/v1/alarm/event_note',
      params: {
        ...q
      },
      mutation: 'getStatusNotes',
      commit
    }
    vfetch(opts)
  },
  'addNote'({ commit, state }, q) {
    const opts = {
      method: 'POST',
      url: 'http://113.207.30.198:8089/api/v1/alarm/event_note',
      data: {
        ...q
      }
    }

    return new Promise((resolve, reject) => {
      fetch(opts)
      .then((val) => {
        resolve()
      }).catch(() => {
        reject()
      })
    })
  }
}
