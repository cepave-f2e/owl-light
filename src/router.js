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
    { path: '*', redirect: '/alarm' },
  ],
})
