import api from './api'
import vfetch from '~utils/vuex-fetch'

module.exports = {
  'getUserGroups'({ commit, state }, n) {
    api['get/userGroups']({
      ...state.rows,
    })
    .then((res) => {
      commit('get/userGroups.success', {
        data: res.data,
      })
    })
    .catch((err) => {
      commit('get/userGroups.fail', {
        err
      })
    })
  },
  'newUserGroup'({ commit, state, dispatch }, n) {
    api['post/newUserGroup']({
      ...n
    })
    .then((res) => {
      commit('post/newUserGroup.success', {
        data: res.data
      })
      dispatch('getUserGroups')
    })
    .catch((err) => {
      commit('post/newUserGroup.fail', {
        err
      })
    })
  },
  'deleteUserGroup'({ commit, state, dispatch }, n) {
    api['delete/userGroup']({
      ...n
    })
    .then((res) => {
      commit('delete/userGroup.success', {
        data: res.data
      })
      dispatch('getUserGroups')
    })
    .catch((err) => {
      commit('delete/userGroup.fail', {
        err
      })
    })
  },
  'editUserGroup'({ commit, state, dispatch }, n) {
    api['put/userGroup']({
      ...n
    })
    .then((res) => {
      commit('put/userGroup.success', {
        data: res.data
      })
      dispatch('getUserGroups')
    })
    .catch((err) => {
      commit('put/userGroup.fail', {
        err
      })
    })
  },
  'getOneTeam'({ commit, state }, n) {
    const opts = {
      url: `http://113.207.30.198:8088/api/v1/team/${n.team_id}`,
      commit,
      mutation: 'singleTeam'
    }
    return vfetch(opts)
    // api['get/singleTeam']({
    //   ...n
    // })
    // .then((res) => {
    //   commit('get/singleTeam.success', {
    //     data: res.data
    //   })
    // })
    // .catch((err) => {
    //   commit('get/singleTeam.fail', {
    //     err
    //   })
    // })
  },
  'searchGroup'({ commit, state }, n) {
    api['search/group']({
      ...n
    })
    .then((res) => {
      commit('search/group.success', {
        data: res.data
      })
    })
    .catch((err) => {
      commit('search/group.fail', {
        err
      })
    })
  },
  'getUsers'({ commit, state }, n) {
    api['get/users']({
      ...state.users,
    })
    .then((res) => {
      commit('get/users.success', {
        data: res.data
      })
    })
    .catch((err) => {
      commit('get/users.fail', {
        err
      })
    })
  },
  'searchUser'({ commit, state }, n) {
    api['search/user']({
      ...n
    })
    .then((res) => {
      commit('search/users.success', {
        data: res.data
      })
    })
    .catch((err) => {
      commit('search/users.fail', {
        err
      })
    })
  },
}
