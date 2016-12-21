module.exports = {
  'get/userGroups.success'(state, { data }) {
    state.rows = data.reduce((preVal, curVal) => {
      preVal.push({
        id: curVal.Team.id,
        groupName: curVal.Team.name,
        groupMember: curVal.Useres.reduce((preVal, curVal) => {
          return `${preVal} ${curVal.cnname}`
        }, ''),
        creator: curVal.creator_name
      })
      return preVal
    }, [])
    // state.notification = 'Sign up Success!'
    // state.status = true
  },
  'get/userGroups.fail'(state, { err }) {
    // state.notification = 'Error!'
    // state.status = false
  },
  'post/newUserGroup.success'(state, { data }) {
    state.notification = 'created!'
    state.status = true
  },
  'post/newUserGroup.fail'(state, { err }) {},
  'get/users.success'(state, { data }) {
    state.users = data
    state.userListRows = data
  },
  'get/users.fail'(state, { err }) {},
  'search/users.success'(state, { data }) {
    state.userListRows = data
  },
  'search/users.fail'(state, { err }) {},
  'put/userGroup.success'(state, { data }) {},
  'put/userGroup.fail'(state, { err }) {},
  'delete/userGroup.success'(state, { data }) {},
  'delete/userGroup.fail'(state, { err }) {},
  'singleTeam.start'(state) {
    state.getSingleTeamLoading = true
  },
  'singleTeam.end'(state) {
  },
  'singleTeam.success'(state, { data }) {
    state.singleTeamUsers = data.users.reduce((preVal, curVal) => {
      preVal.push({
        cnname: curVal.cnname,
        role: curVal.role,
        id: curVal.id,
        name: curVal.name,
      })
      return preVal
    }, [])
    const userIds = data.users.reduce((preVal, curVal) => {
      preVal.push(curVal.id)
      return preVal
    }, [])
    state.singleTeamUsersToSelect = state.users.reduce((preVal, curVal) => {
      if (userIds.indexOf(curVal.id) < 0) {
        preVal.push(curVal)
      }
      return preVal
    }, [])
    state.getSingleTeamLoading = false
  },
  'singleTeam.fail'(state, { err }) {},
  'search/group.success'(state, { data }) {
    if (!data) {
      state.rows = []
      return
    }
    state.rows = data.reduce((preVal, curVal) => {
      preVal.push({
        id: curVal.Team.id,
        groupName: curVal.Team.name,
        groupMember: curVal.Useres.reduce((preVal, curVal) => {
          return `${preVal} ${curVal.cnname}`
        }, ''),
        creator: curVal.Team.creator
      })
      return preVal
    }, [])
  },
  'search/group.fail'(state, { err }) {}
}
