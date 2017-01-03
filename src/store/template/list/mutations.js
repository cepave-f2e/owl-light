module.exports = {
  'getTemplates'(state, tpls) {
    state.rows = tpls
  },
  'getSimpleTplList'(state, tpls) {
    state.simpleTList = tpls
  },
  'createTemplate'(state, repose) {
    console.log(repose)
    state.createRepose = repose
  },
}
