// http://router.vuejs.org/en/advanced/lazy-loading.html
const router = new window.VueRouter({
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
      path: '/portal',
      component(resolve) {
        require(['./containers/portal'], resolve)
      }
    },
    {
      path: '/graph',
      component(resolve) {
        require(['./containers/graph'], resolve)
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
      path: '/aggregator/:id',
      component(resolve) {
        require(['./containers/aggregator'], resolve)
      }
    },
    {
      path: '/nqm-agent-list',
      component(resolve) {
        require(['./containers/nqm-agent-list'], resolve)
      }
    },
    {
      path: '/nqm-target',
      component(resolve) {
        require(['./containers/nqm-target'], resolve)
      }
    },
    {
      path: '/nqm-ping-task',
      component(resolve) {
        require(['./containers/nqm-ping-task'], resolve)
      }
    },
    {
      path: '/nqm-ping-task/:id',
      component(resolve) {
        require(['./containers/nqm-ping-task-edit-agents'], resolve)
      }
    },
    { path: '*', redirect: '/graph' },
  ],
})

/**
 * TODO
 * Reset Vuex's state, probably do in the scope. need more research.
 */
router.beforeEach((to, from, next) => {
  next()
})

module.exports = router
