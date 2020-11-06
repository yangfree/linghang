import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: resolve => require(['@/components/page/Home'], resolve),
      name: 'home',
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/info',
      component: resolve => require(['@/components/page/BBSInfo'], resolve),
      name: 'info'
    },
    {
      path: '/message',
      component: resolve => require(['@/components/page/Message'], resolve),
      name: 'message'
    },
    {
      path: '/vote',
      component: resolve => require(['@/components/page/Vote'], resolve),
      name: 'vote'
    },

    {
      path: '/createvote',
      component: resolve => require(['@/components/page/CreateVote'], resolve),
      name: 'create'
    },
    {
      path: '/about',
      component: resolve => require(['@/components/page/AboutMe'], resolve),
      name: 'about'
    },
    {
      path: '*',
      component: resolve => require(['@/components/page/Home'], resolve),
      meta: {
        keepAlive: true
      }
    },
  ]
})
