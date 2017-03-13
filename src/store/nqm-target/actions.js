import fetch from '~utils/fetch'

module.exports = {

  'getIsp'({ commit, state }, n) {
    const opts = {
      method: 'GET',
      url: 'http://localhost:6040/api/v1/owl/isps',
    }
    fetch(opts)
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
    const opts = {
      method: 'GET',
      url: 'http://localhost:6040/api/v1/owl/provinces',
    }

    fetch(opts)
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
    const opts = {
      method: 'GET',
      url: `http://localhost:6040/api/v1/owl/province/${n.provinceId}/cities`,
    }

    fetch(opts)
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
    const opts = {
      method: 'GET',
      url: `http://localhost:6040/api/v1/owl/city/${n.cityId}`
    }

    fetch(opts)
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

  'getTargets'({ commit, state }, n) {
    const opts = {
      method: 'GET',
      url: 'http://localhost:6040/api/v1/nqm/targets',
      params: {
        ...n.params
      },
      headers: {
        ...n.headers
      }
    }

    fetch(opts)
    .then((res) => {
      commit('getTargets.success', {
        data: res.data,
        headers: res.headers
      })
    })
    .catch((err) => {
      commit('getTargets.fail', {
        
      })
    })
  },

  'createTarget'({ commit, state }, n) {
    return new Promise((resolve, reject) => {
      const opts = {
        method: 'POST',
        url: 'http://localhost:6040/api/v1/nqm/target',
        data: {
          ...n.createTarget
        }
      }

      fetch(opts)
      .then((res) => {
        commit('createTarget.success', {
          data: res.data
        })
        resolve()
      })
      .catch((err) => {
        commit('createTarget.fail', {
          err
        })
        reject()
      })
    })
  },

  'getTargetInfo'({ commit, state }, n) {
    return new Promise((resolve, reject) => {
      const opts = {
        method: 'GET',
        url: `http://localhost:6040/api/v1/nqm/target/${n.targetId}`,
      }
      fetch(opts)
      .then((res) => {
        commit('getTargetInfo.success', {
          data: res.data
        })
        resolve({
          province: res.data.province.id, 
          city: res.data.city.id
        })
      })
      .catch((err) => {
        commit('getTargetInfo.fail', {
          err
        })
      })
    })
  },

  'editTarget'({ commit, state }, n) {
    return new Promise((resolve, reject) => {
      const data = {
        status: 1,
        name: null,
        comment: null,
        isp_id: -1,
        province_id: -1,
        city_id: -1,
        name_tag: null,
        group_tag: [],
        ...n.editTarget.data
      }
      const opts = {
        method: 'PUT',
        url: `http://localhost:6040/api/v1/nqm/target/${n.editTarget.targetId}`,
        data,
      }

      fetch(opts)
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