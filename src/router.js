// http://router.vuejs.org/en/advanced/lazy-loading.html
module.exports = new window.VueRouter({
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
      path: '/user',
      component(resolve) {
        require(['./containers/user'], resolve)
      }
    },
    {
      path: '/profile',
      component(resolve) {
        require(['./containers/profile'], resolve)
      }
    },
    {
      path: '/login',
      component(resolve) {
        require(['./containers/login'], resolve)
      }
    },
    {
      path: '/signup',
      component(resolve) {
        require(['./containers/signup'], resolve)
      }
    },
    {
      path: '/template',
      component(resolve) {
        require(['./containers/template/list'], resolve)
      }
    },
    {
      path: '/template/:id',
      component(resolve) {
        require(['./containers/template/edit'], resolve)
      }
    },
    {
      path: '/aggregator',
      component(resolve) {
        require(['./containers/aggregator'], resolve)
      }
    },
    { path: '*', redirect: '/alarm' },
  ],
})
