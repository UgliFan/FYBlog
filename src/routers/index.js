// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
const Home = resolve => {
  require.ensure(['../views/index.vue'], () => {
    resolve(require('../views/index.vue'));
  });
};

const routers = [{
  path: '/',
  name: 'home',
  component: Home
}];

export default routers;
