import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// http://router.vuejs.org/en/advanced/lazy-loading.html
module.exports = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/alarm',
      component(resolve) {
        require(['./containers/alarm'], resolve)
      }
    },
    {
      path: '/graph',
      component(resolve) {
        require(['./containers/graph'], resolve)
      }
    },
    {
      path: '/vuex',
      component(resolve) {
        require(['./containers/vuex-page'], resolve)
      }
    },
    {
      path: '/profile',
      component(resolve) {
        require(['./containers/profile'], resolve)
      }
    },
    { path: '*', redirect: '/alarm' },
  ],
})
