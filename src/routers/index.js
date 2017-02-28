import Home from '../views/index';
// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const List = resolve => {
  require.ensure(['../views/list.vue'], () => {
    resolve(require('../views/list.vue'));
  });
};
const Detail = resolve => {
  require.ensure(['../views/detail.vue'], () => {
    resolve(require('../views/detail.vue'));
  });
};
const Reply = resolve => {
  require.ensure(['../views/reply.vue'], () => {
    resolve(require('../views/reply.vue'));
  });
};
const Edit = resolve => {
  require.ensure(['../views/edit.vue'], () => {
    resolve(require('../views/edit.vue'));
  });
};
const Cream = resolve => {
  require.ensure(['../views/cream.vue'], () => {
    resolve(require('../views/cream.vue'));
  });
};
const Help = resolve => {
  require.ensure(['../views/help.vue'], () => {
    resolve(require('../views/help.vue'));
  });
};
const Issue = resolve => {
  require.ensure(['../views/issue.vue'], () => {
    resolve(require('../views/issue.vue'));
  });
};
const IssueReply = resolve => {
  require.ensure(['../views/issue-reply.vue'], () => {
    resolve(require('../views/issue-reply.vue'));
  });
};
const Login = resolve => {
  require.ensure(['../views/login.vue'], () => {
    resolve(require('../views/login.vue'));
  });
};
const Register = resolve => {
  require.ensure(['../views/register.vue'], () => {
    resolve(require('../views/register.vue'));
  });
};

const routers = [{
  path: '/',
  name: 'index',
  component: Home
}, {
  path: '/list',
  name: 'list',
  component: List
}, {
  path: '/detail/:id',
  name: 'detail',
  component: Detail
}, {
  path: '/reply/:id',
  name: 'reply',
  component: Reply
}, {
  path: '/new',
  name: 'new',
  component: Edit
}, {
  path: '/cream',
  name: 'cream',
  component: Cream
}, {
  path: '/help',
  name: 'help',
  component: Help
}, {
  path: '/issue',
  name: 'issue',
  component: Issue
}, {
  path: '/issue-reply/:id',
  name: 'issue-reply',
  component: IssueReply
}, {
  path: '/login',
  name: 'login',
  component: Login
}, {
  path: '/register',
  name: 'register',
  component: Register
}];

export default routers;
