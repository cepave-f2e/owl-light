const nqmTarget = {
  namespaced: true,
  state: {
    pagePos: 1,
    totalCount: 10,
    pageSize: 50,
    pageMore: false,
    orderBy: 'name#asc',
    targets: [],
    currentTargetInfo: {
      ispOptions: [],
      provincesOptions: [],
      groupTags: []
    },
    statusOptions: [
      { title: '狀態正常', value: '1', selected: true },
      { title: '狀態關閉', value: '0' },
    ],
    isps: [],
    cities: [{
      id: -1,
      name: '無'
    }],
    ispOptions: [],
    provinces: []
  },

  actions: require('./actions'),
  mutations: require('./mutations'),
}
module.exports = nqmTarget
