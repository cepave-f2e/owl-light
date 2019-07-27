const nqmAgentList = {
  namespaced: true,
  state: {
    pagePos: 1,
    totalCount: 10,
    pageSize: 50,
    pageMore: false,
    orderBy: 'connection_id#asc',
    agents: [],
    isps: [],
    ispOptions: [], //isp opstions for forms
    currentAgentInfo: {
      ispOptions: [],
      provincesOptions: [],
      groupTags: []
    },
    statusOptions: [
      { title: 'normal', value: '1', selected: true },
      { title: 'disable', value: '0' },
    ],
    provinces: [],
    cities: [{
      id: -1,
      name: '無'
    }]
  },

  actions: require('./actions'),
  mutations: require('./mutations'),
}
module.exports = nqmAgentList
