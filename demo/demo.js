const routes = [{
  path: '/',
  children: [{
      path: '',
      redirect: '/user'
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        chinese: '用户管理',
        auth: ['userhandle'],
        icon: 'el-icon-user-solid',
        activeIndex: '1'
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
            auth: ['userhandle'],
            activeIndex: '1'
          },

        }, {
          path: '/user/add',
          name: 'userAdd',
          meta: {
            chinese: '增加用户',
            auth: ['userhandle'],
            activeIndex: '1'
          },

        }
      ]
    }, {
      path: '/department',
      name: 'department',
      meta: {
        chinese: '部门管理',
        auth: ['departhandle'],
        activeIndex: '1',
        icon: 'el-icon-s-management'
      },

      children: [{
        path: '',
        redirect: '/department/list'
      }, {
        path: '/department/list',
        name: 'departmentList',
        meta: {
          chinese: '部门列表',
          auth: ['departhandle'],
          activeIndex: '1'
        },

      }, {
        path: '/department/add',
        name: 'departmentAdd',
        meta: {
          chinese: '增加部门',
          auth: ['departhandle'],
          activeIndex: '1'
        },

      }]
    }, {
      path: '/job',
      name: 'job',
      meta: {
        chinese: '职务管理',
        auth: ['jobhandle'],
        activeIndex: '1',
        icon: 'el-icon-s-platform'
      },
      children: [{
        path: '',
        redirect: '/job/list',
      }, {
        path: '/job/list',
        name: 'jobList',
        meta: {
          chinese: '职务列表',
          auth: ['jobhandle'],
          activeIndex: '1'
        },

      }, {
        path: '/job/add',
        name: 'jobAdd',
        meta: {
          chinese: '增加职务',
          auth: ['jobhandle'],
          activeIndex: '1'
        },

      }]
    }, {
      path: '/consumer',
      name: 'consumer',
      meta: {
        chinese: '客户管理',
        activeIndex: '2',
        icon: 'el-icon-s-custom'
      },

      children: [{
        path: '/consumer/my',
        name: 'consumerMy',
        meta: {
          chinese: '我的客户',
          activeIndex: '2'
        },

      }, {
        path: '/consumer/all',
        name: 'consumerAll',
        meta: {
          chinese: '所有客户',
          activeIndex: '2',
          auth: ['departcustomer', 'allcustomer']
        },

      }, {
        path: '/consumer/add',
        name: 'consumerAdd',
        meta: {
          chinese: '增加客户',
          activeIndex: '2',
        },

      }]
    }
  ]
}, {
  path: '/login',
}, {
  path: '/404',
}];

let check = (auth, powers) => {
  return !!auth.find(item => {
    return powers.includes(item);
  });
};

let powers = ["userhandle", "departhandle", "jobhandle", "departcustomer", "allcustomer", "resetpassword"]
let activeIndex = '1';
/**
 * 删选规则：
 *  1. 有 name 属性的才能获取
 *  2. 如果有 auth 则需要进行 权限校验
 *  3. 没有 auth 的表示都可以进入
 *  4. activeIndex 表示激活的
 */

function filterRoutes(routes) {
  let arr = [];
  routes.forEach(item => {
    if (item.name) {
      if (item.meta && item.meta.auth && !check(item.meta.auth, powers)) return;
      if (item.meta &&  item.meta.activeIndex !== activeIndex) return;

      let obj = {...item};
      delete obj.children;
      if (item.children) {
        obj.children = filterRoutes(item.children);
      }
      arr.push(obj);
    } else {
      if (item.children) {
        arr.push(...filterRoutes(item.children));
      }
    }
  });

  return arr;
}

console.log(filterRoutes(routes));