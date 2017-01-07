module.exports = {
  'getEndpoints.start'(state) {
    state.hasEndpointLoading = true
  },

  'getEndpoints.end'(state) {
    state.hasEndpointLoading = false
  },

  'getEndpoints.success'(state, { data }) {
    state.hosts = data
  },

  'getEndpoints.fail'(state) {

  },

  'clearHosts'(state) {
    state.hosts = []
  },

  hostGroupSearchInput(state, value) {
    state.hostGroupSearchInput = value
  },

  'updateNewHostGroup'(state, hosts) {
    state.selectedHosts = hosts
  },

  'updateEditHostGroup'(state, hosts) {
    state.editSelectedHosts = hosts
  },

  'addHostsIntoNewHostGroup.start'(state) {
    state.hasCreateLoading = true
  },

  'addHostsIntoNewHostGroup.end'(state) {
    state.hasCreateLoading = false
  },

  'addHostsIntoNewHostGroup.success'(state, { data }) {

  },

  'getHostGroupList.start'(state) {

  },

  'getHostGroupList.end'(state) {

  },

  'getHostGroupList.success'(state, { data }) {
    state.hostGroupListItems = data
  },

  'getHostGroupList.fail'(state) {

  },

  'searchHostGroup.start'(state) {

  },

  'searchHostGroup.end'(state) {

  },

  'searchHostGroup.success'(state, { data }) {
    state.hostGroupListItems = data
  },

  'updateSearchHostGroupInput'(state, q) {
    state.searchHostGroupInput = q
  },

  'searchHostGroup.fail'(state) {

  },

  'tempDeleteCandidate'(state, data) {
    state.tempDeleteCandidate = data
  },

  'getHostsList.start'(state) {

  },

  'getHostsList.end'(state) {

  },

  'getHostsList.success'(state, { data }) {
    state.hostList.hostListItems = data.hosts
    state.hostList.hostGroup = data.hostgroup.grp_name
    state.hostList.hostGroupId = data.hostgroup.id
  },

  'getHostsList.fail'(state, { data }) {

  },

  'hostInGroupList'(state, data) {
    state.hostInGroupList = data
  },

  'deleteHostGroup.start'(state) {

  },

  'deleteHostGroup.end'(state) {

  },

  'deleteHostGroup.success'(state, data) {

  },

  'deleteHostGroup.fail'(state, err) {

  },

  'deleteHostFromGroup.start'(state) {

  },

  'deleteHostFromGroup.end'(state) {

  },

  'deleteHostFromGroup.success'(state, data) {

  },

  'deleteHostFromGroup.fail'(state, err) {

  },
}
