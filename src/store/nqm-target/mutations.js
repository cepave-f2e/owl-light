module.exports = {
  'getIspList.success'(state, { data }) {
    state.isps = [...data]
    state.ispOptions = [...data]
    state.isps[0] = {
      name: '全部ISP',
      id: 0,
      selected: true
    }
    state.ispOptions[0] = {
      name: '無',
      id: -1,
      selected: true
    }
  },
  'getIspList.fail'(state, { err }) {

  },
  'getProvince.success'(state, { data }) {
    state.provinces = [...data]
    state.provinces[0] = {
      id: -1,
      name: '無'
    }
  },
  'getProvince.fail'(state, { err }) {

  },
  'getCitiesByProvince.success'(state, { data, selected }) {
    state.cities = [{
      id: -1,
      name: '無'
    }, ...data]
    
    if (selected) {
      state.cities.map((city, idx) => {
        if (city.id === selected) {
          city.selected = true
        } else {
          city.selected = false
        }
        return city
      })
    }
  },
  'getCityName.success'(state, { data }) {
    data.selected = true
    state.cities = [data]
  },
  'getCityName.fail'(state, { err }) {

  },
  'getCitiesByProvince.fail'(state, { err }) {

  },
  'getTargets.success'(state, { data, headers }) {
    state.pagePos = +headers['page-pos']
    state.totalCount = +headers['total-count']
    state.pageSize = +headers['page-size']
    state.pageMore = headers['page-more']
    state.targets = data
  },
  'getTargets.fail'(state, { err }) {

  },
  'createTarget.success'(state, { data }) {
    console.log('create success', data)
  },
  'createTarget.fail'(state, { err }) {

  },
  'getTargetInfo.success'(state, { data }) {
    state.currentTargetInfo = { ...data }
    state.currentTargetInfo.nameTag = (data.name_tag.id !== -1) ? data.name_tag.value : ''
    state.currentTargetInfo.groupTags = [...data.group_tags]
    if (data.isp.id !== -1) {
      state.currentTargetInfo.ispOptions = [...state.ispOptions].map((isp, idx) => {
        if (idx === 0) {
          isp.selected = false
        }
        if (isp.id === data.isp.id) {
          isp.selected = true
        } else {
          isp.selected = false
        }
        return isp
      })
    } else {
      state.currentTargetInfo.ispOptions = [...state.ispOptions].map((isp, idx) => {
        if (idx === 0) {
          isp.selected = true
        } else {
          isp.selected = false
        }
        return isp
      })
    }

    if (data.province.id  !== -1) {
      state.currentTargetInfo.provincesOptions = [...state.provinces].map((province, idx) => {
        if (idx === 0) {
          province.selected = false
        }
        if (province.id === data.province.id) {
          province.selected = true
        } else {
          province.selected = false
        }
        return province
      })
    } else {
      state.currentTargetInfo.provincesOptions = [...state.provinces].map((province, idx) => {
        if (idx === 0) {
          province.selected = true
        } else {
          province.selected = false
        }
        return province
      })
    }
  },
  'getTargetInfo.fail'(state, { err }) {

  },
  'editAgent.success'(state, { data }) {
    console.log('edit target success', data)
  },
  'editAgent.fail'(state, { err }) {

  }
}