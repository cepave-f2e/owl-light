// Vuex state module

const atpl = {
  state: {
    name: { id: 0, name: 'N/A' },
    parent: { id: 0, name: 'no' },
    actionId: 0,
    uics: '',
    callback: {
      url: '',
      before_callback_sms: 0,
      before_callback_mail: 0,
      after_callback_sms: 0,
      after_callback_mail: 0,
    },
    stratges: [],
  },
  actions: require('./actions'),
  mutations: require('./mutations'),
}

module.exports = atpl
