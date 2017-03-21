import fetch from '~utils/fetch'
import vfetch from '~utils/vuex-fetch'

module.exports = {
  'getPingTasks'({ commit, state }, n) {
    const opts = {
      method: 'GET',
      url: 'http://localhost:6040/api/v1/nqm/pingtasks',
      params: {
        ...n.params
      },
      headers: {
        ...n.headers
      }
    }
    fetch(opts)
    .then((res) => {
      commit('getPingTasks.success', {
        data: res.data,
        headers: res.headers
      })
    })
    .catch((err) => {
      commit('getPingTasks.fail', {
        err
      })
    })
  },

  'getSinglePingTask'({ commit, state }, n) {
    const opts = {
      method: 'GET',
      url: `http://localhost:6040/api/v1/nqm/pingtask/${n.pingTaskId}`,
    }

    fetch(opts)
    .then((res) => {
      commit('getSinglePingTask.success', {
        data: res.data,
      })
    })
    .catch((err) => {
      commit('getSinglePingTask.fail', {
        err
      })
    })
  },

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

  'getCities'({ commit, state }, n) {
    const opts = {
      method: 'GET',
      url: 'http://localhost:6040/api/v1/owl/cities',
    }

    fetch(opts)
    .then((res) => {
      commit('getCities.success', {
        data: res.data
      })
    })
    .catch((err) => {
      commit('getCities.fail', {
        err
      })
    })
  },

  'getNameTags'({ commit, state }, n) {
    const opts = {
      method: 'GET',
      url: 'http://localhost:6040/api/v1/owl/nametags',
    }

    fetch(opts)
    .then((res) => {
      commit('getNameTags.success', {
        data: res.data
      })
    })
    .catch((err) => {
      commit('getNameTags.fail', {
        err
      })
    })
  },

  'getGroupTags'({ commit, state }, n) {
    const opts = {
      method: 'GET',
      url: 'http://localhost:6040/api/v1/owl/grouptags',
    }

    fetch(opts)
    .then((res) => {
      commit('getGroupTags.success', {
        data: res.data
      })
    })
    .catch((err) => {
      commit('getGroupTags.fail', {
        err
      })
    })
  },

  'getAgentsOfPingTask'({ commit, state }, n) {
    const opts = {
      method: 'GET',
      url: `http://localhost:6040/api/v1/nqm/pingtask/${n.pingTaskId}/agents`,
      params: {
        ...n.params
      },
      headers: {
        ...n.headers
      }
    }

    fetch(opts)
    .then((res) => {
      commit('getAgentsOfPingTask.success', {
        data: res.data,
        headers: res.headers
      })
    })
    .catch((err) => {
      commit('getAgentsOfPingTask.fail', {
        err
      })
    })
  },

  'createPingTask'({ commit, state }, n) {
    return new Promise((resolve, reject) => {
      const opts = {
        method: 'POST',
        url: 'http://localhost:6040/api/v1/nqm/pingtask',
        data: n.createPingTask
      }

      fetch(opts)
      .then((res) => {
        commit('createPingTask.success', {
          data: res.data,
        })
        resolve()
      })
      .catch((err) => {
        commit('createPingTask.fail', {
          err
        })
        reject()
      })
    })
  },

  'assignAgentToPingTask'({ commit, state }, n) {
    const opts = {
      method: 'POST',
      url: `http://localhost:6040/api/v1/nqm/pingtask/${n.pingTaskId}/agent`,
      params: {
        agent_id: n.agentId
      }
    }

    fetch(opts)
    .then((res) => {
      commit('assignAgentToPingTask.success', {
        data: res.data,
      })
    })
    .catch((err) => {
      commit('assignAgentToPingTask.fail', {
        err
      })
    })
  },

  'deleteAgentFromPingTask'({ commit, state }, n) {
    const opts = {
      method: 'DELETE',
      url: `http://localhost:6040/api/v1/nqm/pingtask/${n.pingTaskId}/agent/${n.agentId}`,
    }

    fetch(opts)
    .then((res) => {
      commit('deleteAgentFromPingTask.success', {
        data: res.data
      })
    })
    .catch((err) => {
      commit('deleteAgentFromPingTask.fail', {
        err
      })
    })
  },

  'getSinglePingTask'({ commit, state }, n) {
    const opts = {
      method: 'GET',
      url: `http://localhost:6040/api/v1/nqm/pingtask/${n.pingTaskId}`,
    }
    fetch(opts)
    .then((res) => {
      commit('getSinglePingTask.success', {
        data: res.data
      })
    })
    .catch((err) => {
      commit('getSinglePingTask.fail', {
        err
      })
    })
  },

  'editPingTask'({ commit, state }, n) {
    return new Promise((resolve, reject) => {
      const opts = {
        method: 'PUT',
        url: `http://localhost:6040/api/v1/nqm/pingtask/${n.pingTaskId}`,
        data: {
          ...n.editPingTask
        }
      }
      
      fetch(opts)
      .then((res) => {
        commit('editPingTask.success', {
          data: res.data
        })
        resolve()
      })
      .catch((err) => {
        commit('editPingTask.fail', {
          err
        })
        reject()
      })
    })
  }
}