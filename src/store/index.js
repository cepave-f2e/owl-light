import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

module.exports = new Vuex.Store({
  strict: true,
  modules: {
    sample: require('./sample')
  }
})
