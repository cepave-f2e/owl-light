// import vfetch from '~utils/vuex-fetch'
import vfetch from '~utils/fetch'

module.exports = {
  'getTemplate'({ commit, state }, { id }) {
    const opts = {
      url: `template/${id}`,
      commit,
      mutation: 'getTemplate',
    }

    return vfetch(opts)
      .then((res) => {
        const tpl = res.data.template
        const caction = res.data.action
        const stratges = res.data.stratges.map((stratge) => {
          let col1 = stratge.metric
          if (stratge.tags.match(/.+/g)) {
            col1 = `${col1}/${stratge.tags}`
          }
          col1 = `${col1} [${stratge.note}]`
          let col4 = 'all day'
          if (stratge.run !== '' && stratge.run_end !== '') {
            col4 = `${stratge.run}~${stratge.run_end}`
          }
          return [
            {
              col: col1
            },
            {
              col: `${stratge.func}${stratge.op}${stratge.right_value}`
            },
            {
              col: stratge.max_step
            },
            {
              col: stratge.priority
            },
            {
              col: col4
            },
            {
              col: [`strategy/update/${stratge.id}`, `strategy/delete/${stratge.id}`]
            }
          ]
        })
        const parentName = res.data.parent_name
        commit('getTemplate', { tpl, parentName, caction, stratges })
      })
  }
}
