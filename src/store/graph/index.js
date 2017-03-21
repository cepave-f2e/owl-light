const { moment } = window

module.exports = {
  state: {
    counterItems: [],
    hasCounterLoading: false,
    charts: [],
    totalCharts: [],
    vport: 'endpoint',
    pageLimit: 6,
    pageCurrent: 1,
    submitBtnDisabled: true,
    grid: 2,
    sampling: 'AVERAGE',
    _cachePages: {},
    startTime: moment().add(-24, 'hours').unix(),
    endTime: moment().unix(),
    complexQueryItems: [],
    complexQueryLoading: false,
  },
  namespaced: true,

  actions: require('./actions'),
  mutations: require('./mutations'),
}
