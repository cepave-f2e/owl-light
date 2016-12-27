// import vfetch from '~utils/vuex-fetch'
import vfetch from '~utils/fetch'

module.exports = {
  'getTemplates'({ commit, state }, { q }) {
    const opts = {
      url: 'template',
      params: {
        limit: 500,
        q,
      },
      commit,
      mutation: 'getTemplates',
    }

    return vfetch(opts)
      .then((res) => {
        const tpls = res.data.templates.map((tpl) => {
          return [
            {
              col: tpl.template.tpl_name,
            },
            {
              col: tpl.parent_name,
            },
            {
              col: tpl.template.create_user
            },
            {
              col: [[`template/update#${tpl.template.id}`], [`template/delete#${tpl.template.id}`]]
            }
          ]
        })
        commit('getTemplates', tpls)
      })
  }
}
