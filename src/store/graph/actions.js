import vfetch from '~utils/vuex-fetch'
const { _, moment } = window

module.exports = {
  complexQuery({ commit, state }, { category, value }) {
    const opts = {
      url: 'owlgraph/keyword_search',
      params: {
        q: value.trim(),
        filter_type: category
      },
      commit,
      mutation: 'complexQuery'
    }
    const cats = {}
    return vfetch(opts)
      .then((res) => {
        res.data[category].map((item) => {
          const { idc, isp, platform, province, hostname, ip } = item
          const titleIDC = `IDC: ${idc}`
          const titleISP = `ISP: ${isp}`
          const titlePlatform = `Platform: ${platform}`
          const titleProvince = `Province: ${province}`

          if (category !== 'idc') {
            if (!cats[titleIDC]) {
              cats[titleIDC] = []
            }
            cats[titleIDC].push({ hostname, ip })
          }

          if (category !== 'isp') {
            if (!cats[titleISP]) {
              cats[titleISP] = []
            }
            cats[titleISP].push({ hostname, ip })
          }

          if (category !== 'platform') {
            if (!cats[titlePlatform]) {
              cats[titlePlatform] = []
            }
            cats[titlePlatform].push({ hostname, ip })
          }

          if (category !== 'province') {
            if (!cats[titleProvince]) {
              cats[titleProvince] = []
            }
            cats[titleProvince].push({ hostname, ip })
          }
        })
        commit('complexQuery.items', { cats })
      })
  },

  'getEndpoints'({ commit, state }, { q }) {
    const opts = {
      url: 'graph/endpoint',
      params: {
        limit: 50,
        q,
      },
      commit,
      mutation: 'getEndpoints',
    }

    return vfetch(opts)
  },

  'getCounters'({ commit, state }, { eid = '6,7', metricQuery = '.+' }) {
    const opts = {
      url: 'graph/endpoint_counter',
      params: {
        limit: 50,
        eid,
        metricQuery,
      },
      commit,
      mutation: 'getCounters',
    }

    if (Array.isArray(opts.params.eid)) {
      opts.params.eid = opts.params.eid.join(',')
    }

    return vfetch(opts)
      .then((res) => {
        const items = res.data.map((counter) => {
          return { counter }
        })
        commit('getCounters.items', items)
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
