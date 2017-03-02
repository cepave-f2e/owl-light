import api from './api'

module.exports = {

  'getAgentList'({ commit, state }, n) {
    api['get/agentList'](n)
    .then((res) => {
      commit('getAgentList.success', {
        data: res.data,
        headers: res.headers
      })
    })
    .catch((err) => {
      commit('getAgentList.fail', {
        err
      })
    })
  },

  'getIsp'({ commit, state }, n) {
    api['get/ispList'](n)
    .then((res) => {
      commit('getIspList.success', {
        data: res.data,
      })
    })
    .catch((err) => {
      commit('getIspList.success', {
        err
      })
    })
  },

  'getProvince'({ commit, state }, n) {
    api['get/provinces'](n)
    .then((res) => {
      commit('getProvince.success', {
        data: res.data
      })
    })
    .catch((err) => {
      commit('getProvince.fail', {
        err
      })
    })
  },

  'getCitiesByProvince'({ commit, state }, n) {
    api['get/citiesByProvince'](n)
    .then((res) => {
      commit('getCitiesByProvince.success', {
        data: res.data,
        selected: n.selected
      })
    })
    .catch((err) => {
      commit('getCitiesByProvince.fail', {
        err
      })
    })
  },

  'getCityName'({ commit, state }, n) {
    api['get/cityName'](n)
    .then((res) => {
      commit('getCityName.success', {
        data: res.data
      })
    })
    .catch((err) => {
      commit('getCityName.fail', {
        err
      })
    })
  },

  'getAgentInfo'({ commit, state }, n) {
    return new Promise((resolve, reject) => {
      api['get/agentInfo'](n)
      .then((res) => {
        commit('getAgentInfo.success', {
          data: res.data
        })
        resolve({
          province: res.data.province.id,
          city: res.data.city.id
        })
      })
      .catch((err) => {
        commit('getAgentInfo.fail', {
          err
        })
      })
    })
  },

  'createAgent'({ commit, state }, n) {
    return new Promise((resolve, reject) => {
      api['post/newAgent'](n.createAgent)
      .then((res) => {
        commit('createAgentList.success', {
          res
        })
        resolve()
      })
      .catch((err) => {
        commit('createAgentList.fail', {
          err
        })
        reject()
      })
    })
  },

  'editAgent'({ commit, state, dispatch }, n) {
    return new Promise((resolve, reject) => {
      api['put/editAgent'](n.editAgent)
      .then((res) => {
        commit('editAgent.success', {
          data: res.data
        })
        resolve()
      })
      .catch((err) => {
        commit('editAgent.fail', {
          err
        })
        reject()
      })
    })
  }
}
