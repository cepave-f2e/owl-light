import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

module.exports = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/alarm', component: require('./containers/alarm') },
    { path: '/graph', component: require('./containers/graph') },
    { path: '*', redirect: '/alarm' },
  ],
})
