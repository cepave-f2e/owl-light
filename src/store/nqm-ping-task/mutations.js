module.exports = {
  'getPingTasks.success'(state, { data, headers }) {
    state.pingTasks = [...data]
    state.pagePos = +headers['page-pos']
    state.totalCount = +headers['total-count']
    state.pageSize = +headers['page-size']
    state.pageMore = headers['page-more']
  },
  'getPingTasks.fail'(state, { err }) {

  },
  'getProvince.success'(state, { data }) {
    state.provinces = [...data]
    if (state.provinces[0].id === -1) {
      state.provinces.splice(0, 1)
    }
    state.provinceIds = state.provinces.map((province, id) => {
      return province.id
    })
  },
  'getProvince.fail'(state, { err }) {

  },
  'getIspList.success'(state, { data }) {
    state.isps = [...data]
    state.ispOptions = [...data]
    state.isps[0] = {
      name: '全部ISP',
      id: 0,
      selected: true
    }
    if (state.ispOptions[0].id === -1) {
      state.ispOptions.splice(0, 1)
    }
    state.ispIds = state.ispOptions.map((isp, id) => {
      return isp.id
    })
  },
  'getIspList.fail'(state, { err }) {

  },
  'getCities.success'(state, { data }) {
    state.cities = [...data]
    if (state.cities[0].id === -1) {
      state.cities.splice(0, 1)
    }
    state.cityIds = state.cities.map((city, id) => {
      return city.id
    })
  },
  'getCities.fail'(state, { err }) {

  },
  'getNameTags.success'(state, { data }) {
    state.nameTags = [...data]
    state.nameTagIds = data.map((nameTag, id) => {
      return nameTag.id
    })
  },
  'getNameTags.fail'(state, { err }) {

  },
  'getGroupTags.success'(state, { data }) {
    state.groupTags = [...data]
    state.groupTagIds = data.map((groupTag, id) => {
      return groupTag.id
    })
  },
  'getGroupTags.fail'(state, { err }) {

  },
  'getAgentsOfPingTask.start'(state) {

  },
  'getAgentsOfPingTask.end'(state) {

  },
  'getAgentsOfPingTask.success'(state, { data, headers }) {
    state.agents = data
    state.agentPagePos = +headers['page-pos']
    state.agentTotalCount = +headers['total-count']
    state.agentPageSize = +headers['page-size']
    state.agentPageMore = headers['page-more']
  },
  'getAgentsOfPingTask.fail'(state, { err }) {

  },
  'createPingTask.success'(state, { data }) {
    console.log('create success: ', data);
  },
  'createPingTask.fail'(state, { err }) {

  },
  'getSinglePingTask.success'(state, { data }) {
    console.log('getSinglePingTask: ', data);
    state.singlePingTaskInfo = data
  },
  'getSinglePingTask.fail'(state, { err }) {

  },
  'assignAgentToPingTask.success'(state, { data }) {
    console.log('assign success', data);
  },
  'assignAgentToPingTask.fail'(state, { err }) {

  },
  'deleteAgentFromPingTask.success'(state, { data }) {
    console.log('delete success', data);
  },
  'deleteAgentFromPingTask.fail'(state, { err }) {

  },
  'getSinglePingTask.success'(state, { data }) {
    state.currentPingTaskInfo = data
    console.log('getSinglePingTaskSuccess: ', data);
    state.currentPingTaskInfo.selectedOpts = {
      isps: data.filter.isps.map((isp, id) => {
        if (isp.id in state.ispIds) {
          return state.ispIds.indexOf(isp.id)
        }
      }) || [],
      provinces: data.filter.provinces.map((province, id) => {
        if (province.id in state.provinceIds) {
          return state.provinceIds.indexOf(province.id)
        }
      }) || [],
      cities: data.filter.cities.map((city, id) => {
        if (city.id in state.cityIds) {
          return state.cityIds.indexOf(city.id)
        }
      }) || [],
      nameTags: data.filter.name_tags.map((nameTag, id) => {
        if (state.nameTagIds.indexOf(nameTag.id) !== -1) {
          return state.nameTagIds.indexOf(nameTag.id)
        }
      }) || [],
      groupTags: data.filter.group_tags.map((groupTag, id) => {
        if (groupTag.id in state.groupTagIds) {
          return state.groupTagIds.indexOf(groupTag.id)
        }
      }) || [],
    }
  },
  'getSinglePingTask.fail'(state, { err }) {

  },
  'editPingTask.success'(state, { data }) {
    console.log('edit data success', data);
  },
  'editPingTask.fail'(state, { err }) {

  }
}