module.exports = {
  'complexQuery.items'(stage, { endpoints, category }) {
    const cats = {}
    endpoints.forEach((endpoint) => {
      // Grouping logic
      const { idc, isp, platform, province, hostname, ip } = endpoint
      const titleIDC = `IDC: ${idc}`
      const titleISP = `ISP: ${isp}`
      const titlePlatform = `平台: ${platform}`
      const titleProvince = `省份: ${province}`

      if (!cats[titleIDC]) {
        cats[titleIDC] = []
      }

      if (!cats[titleISP]) {
        cats[titleISP] = []
      }

      if (!cats[titlePlatform]) {
        cats[titlePlatform] = []
      }

      if (!cats[titleProvince]) {
        cats[titleProvince] = []
      }

      if (category !== 'idc') {
        cats[titleIDC].push({ hostname, ip })
      }

      if (category !== 'isp') {
        cats[titleISP].push({ hostname, ip })
      }

      if (category !== 'platform') {
        cats[titlePlatform].push({ hostname, ip })
      }

      if (category !== 'province') {
        cats[titleProvince].push({ hostname, ip })
      }
    })

    stage.complexQueryItems = Object.keys(cats).map((cat) => {
      return {
        name: cat,
        children: cats[cat].map((host)=> {
          return {
            name: host.hostname,
            value: host.hostname
          }
        })
      }
    })
  },
  'complexQuery.start'(state) {
    state.complexQueryLoading = true
  },
  'complexQuery.success'(state) {

  },
  'complexQuery.end'(state) {
    state.complexQueryLoading = false
  },

  'switchViewPoint'(state, { viewpoint  }) {
    state.vport = viewpoint
  },

  'getCounters.start'(state) {
    state.hasCounterLoading = true
  },

  'getCounters.end'(state) {
    state.hasCounterLoading = false
  },

  'getCounters.items'(state, { counters }) {
    const cats = {}

    counters.forEach((counter) => {
      const m = /^(http|disk|net|cpu)\./.test(counter) && RegExp.$1
      const cat = m || 'others'

      if (!cats[cat]) {
        cats[cat] = []
      }
      cats[cat].push(counter)
    })

    state.counterItems = Object.keys(cats).map((name) => {
      return {
        name,
        children: cats[name].map((counter)=> {
          return {
            name: counter,
            value: counter,
          }
        })
      }
    })
  },

  'viewGraph.start'(state, { totalCharts }) {
    state.totalCharts = totalCharts
    state._cachePages = {}
  },

  'viewGraph.page'(state, { charts, page }) {
    state.pageCurrent = page
    state.charts = charts
  },

  'viewGraph.success'(state, { series, idx, page }) {
    state.charts[idx].loading = false
    state.charts[idx].series = series

    if (!state._cachePages[page]) {
      state._cachePages[page] = []
    }

    state._cachePages[page] = state.charts
  },

  'switchGrid'(state, { grid }) {
    state.grid = grid
  },

  'submitBtnStatus'(state, { disabled }) {
    state.submitBtnDisabled = disabled
  },

  'syncStartTime'(state, { unix }) {
    state.startTime = unix
  },

  'syncEndTime'(state, { unix }) {
    state.endTime = unix
  }

}
