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
              col: [[`/#/template/${tpl.template.id}`], [`/#/template/${tpl.template.id}`]]
            }
          ]
        })
        commit('getTemplates', tpls)
      })
  },
  'getSimpleTplList'({ commit, state }, { limit }) {
    const opts = {
      url: 'template_simple',
      params: {
        limit: limit || 500,
      },
      commit,
      mutation: 'getSimpleTplList',
    }

    return vfetch(opts)
      .then((res) => {
        const tpls = res.data.map((tpl) => {
          return { id: tpl.id.toString(), text: tpl.tpl_name }
        })
        commit('getSimpleTplList', tpls)
      })
  },
  'createTemplate'({ commit, state }, data) {
    const opts = {
      url: 'template',
      data,
      method: 'POST',
      commit,
      mutation: 'createTemplate',
    }

    return vfetch(opts)
      .then((res) => {
        commit('createTemplate', res.data)
      })
  }
}
