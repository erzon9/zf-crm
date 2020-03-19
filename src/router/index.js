import Vue from 'vue';
import VueRouter from 'vue-router';
import BasicLayout from '../layouts/BasicLayout.vue';
import NotFound from '../views/404.vue';

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: BasicLayout,
  children: [{
      path: '',
      redirect: '/user'
    },
    {
      path: '/user',
      name: 'user',
      component: {
        render: h => h('router-view')
      },
      children: [{
          path: '',
          redirect: '/user/list',

        },
        {
          path: '/user/list',
          name: 'userList',
          component: () => import('../views/UserList.vue')
        }, {
          path: '/user/add',
          name: 'userAdd',
          component: () => import('../views/UserAdd.vue')
        }
      ]
    }, {
      path: '/department',
      name: 'department',
      component: {
        render: h => h('router-view')
      },
      children: [{
        path: '',
        redirect: '/department/list'
      }, {
        path: '/department/list',
        name: 'departmentList',
        component: () => import('../views/DepartList.vue'),
      }, {
        path: '/department/add',
        name: 'departmentAdd',
        component: () => import('../views/DepartAdd.vue'),
      }]
    }, {
      path: 'job',
      name: 'job',
      component: {
        render: h => h('router-view')
      },
      children: [{
        path: '',
        redirect: '/job/list',
      }, {
        path: '/job/list',
        name: 'jobList',
        component: () => import('../views/JobList.vue'),
      }, {
        path: '/job/add',
        name: 'jobAdd',
        component: () => import('../views/JobAdd.vue'),
      }]
    }, {
      path: '/consumer',
      name: 'consumer',
      component: {
        render: h => h('router-view')
      },
      children: [{
        path: '/consumer/my',
        name: 'consumerMy',
        component: () => import('../views/ConsumerMy.vue')
      }, {
        path: '/consumer/all',
        name: 'consumerAll',
        component: () => import('../views/ConsumerAll.vue')
      }, {
        path: '/consumer/add',
        name: 'consumerAdd',
        component: () => import('../views/ConsumerAdd.vue')
      }]
    }
  ]
}, {
  path: '/login',
  component: () => import('../views/Login.vue'),
}, {
  path: '/404',
  component: NotFound
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router