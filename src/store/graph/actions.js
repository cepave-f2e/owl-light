import vfetch from '~utils/vuex-fetch'
const { _, moment } = window

module.exports = {
  complexQuery({ commit, state }, { category, value }) {
    const opts = {
      url: 'owlgraph/keyword_search',
      params: {
        q: value.trim(),
        filter_type: category,
        limit: 50,
      },
      commit,
      mutation: 'complexQuery'
    }
    const cats = {}
    return vfetch(opts)
      .then((res) => {
        commit('complexQuery.items', { endpoints: res.data[category], category })
      })
  },

  // 'getEndpoints'({ commit, state }, { q }) {
  //   const opts = {
  //     url: 'graph/endpoint',
  //     params: {
  //       limit: 50,
  //       q,
  //     },
  //     commit,
  //     mutation: 'getEndpoints',
  //   }

  //   return vfetch(opts)
  // },

  'getCounters'({ commit, state }, { endpoints = 'cnc', metricQuery = '.+' }) {
    const opts = {
      url: 'graph/endpointstr_counter',
      params: {
        limit: 50,
        endpoints,
        metricQuery,
      },
      commit,
      mutation: 'getCounters',
    }

    if (Array.isArray(opts.params.endpoints)) {
      opts.params.endpoints = opts.params.endpoints.join(',')
    }

    return vfetch(opts)
      .then((res) => {
        commit('getCounters.items', { counters: res.data })
      })
  },

  'viewGraph'({ commit, state }, { start, end, counters, endpoints, idx, vport, page, sampling }) {
    const opts = {
      method: 'POST',
      url: 'graph/history',
      data: {
        start_time: start || moment().add(-24, 'hours').unix(),
        end_time: end || moment().unix(),
        hostnames: endpoints,
        counters,
        step: 60,
        consol_fun: sampling || 'AVERAGE', // MAX, MIN
      },
    }

    return vfetch(opts)
      .then((res) => {
        const series = res.data.map((line) => {
          if (!line) {
            return {}
          }
          return {
            name: vport === 'combo' ? `${line.endpoint}${line.counter}` : (line[vport === 'endpoint' ? 'counter' : 'endpoint']),
            data: line.Values.map((Value) => {
              return [Value.timestamp, Value.value]
            }),
          }
        })
        commit('viewGraph.success', { idx, series, page })
      })
  },
}
