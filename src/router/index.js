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
      meta: {
        chinese: '用户管理',
        auth: ['userhandle']
      },
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
          meta: {
            chinese: '用户列表',
            auth: ['userhandle']
          },
          component: () => import('../views/UserList.vue')
        }, {
          path: '/user/add',
          name: 'userAdd',
          meta: {
            chinese: '增加用户',
            auth: ['userhandle']
          },
          component: () => import('../views/UserAdd.vue')
        }
      ]
    }, {
      path: '/department',
      name: 'department',
      meta: {
        chinese: '部门管理',
        auth: ['departhandle']
      },
      component: {
        render: h => h('router-view')
      },
      children: [{
        path: '',
        redirect: '/department/list'
      }, {
        path: '/department/list',
        name: 'departmentList',
        meta: {
          chinese: '部门列表',
          auth: ['departhandle']
        },
        component: () => import('../views/DepartList.vue'),
      }, {
        path: '/department/add',
        name: 'departmentAdd',
        meta: {
          chinese: '增加部门',
          auth: ['departhandle']
        },
        component: () => import('../views/DepartAdd.vue'),
      }]
    }, {
      path: 'job',
      name: 'job',
      meta: {
        chinese: '职务管理',
        auth: ['jobhandle']
      },
      component: {
        render: h => h('router-view')
      },
      children: [{
        path: '',
        redirect: '/job/list',
      }, {
        path: '/job/list',
        name: 'jobList',
        meta: {
          chinese: '职务列表',
          auth: ['jobhandle']
        },
        component: () => import('../views/JobList.vue'),
      }, {
        path: '/job/add',
        name: 'jobAdd',
        meta: {
          chinese: '增加职务',
          auth: ['jobhandle']
        },
        component: () => import('../views/JobAdd.vue'),
      }]
    }, {
      path: '/consumer',
      name: 'consumer',
      meta: {
        chinese: '客户管理',
      },
      component: {
        render: h => h('router-view')
      },
      children: [{
        path: '/consumer/my',
        name: 'consumerMy',
        meta: {
          chinese: '我的客户',
        },
        component: () => import('../views/ConsumerMy.vue')
      }, {
        path: '/consumer/all',
        name: 'consumerAll',
        meta: {
          chinese: '所有客户',
          auth: ['departcustomer', 'allcustomer']
        }, 
        component: () => import('../views/ConsumerAll.vue')
      }, {
        path: '/consumer/add',
        name: 'consumerAdd',
        meta: {
          chinese: '增加客户',
        },
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