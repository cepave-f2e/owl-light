const nqmPingTask = {
  namespaced: true,
  state: {
    pingTasks: [],
    pagePos: 1,
    totalCount: 10,
    pageSize: 50,
    pageMore: false,
    isps: [],
    ispOptions: [], //isp opstions for forms
    provinces: [],
    cities: [],
    nameTags: [],
    groupTags: [],
    agents: [],
    singlePingTaskInfo: [],
    agentPagePos: 1,
    agentTotalCount: 10,
    agentPageSize: 50,
    agentPageMore: false,
    enableOptions: [
      { title: '啟用正常', value: true, selected: true },
      { title: '啟用關閉', value: false }
    ],
    currentPingTaskInfo: {
      selectedOpts: {
        isps: [],
        provinces: [],
        cities: [],
        nameTags: [],
        groupTags: []
      }
    },
    ispIds: [],
    provincesIds: [],
    cityIds: [],
    nameTagIds: [],
    groupTagIds: []
  },

  actions: require('./actions'),
  mutations: require('./mutations'),
}
module.exports = nqmPingTask