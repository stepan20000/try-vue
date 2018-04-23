import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import Archive from '../components/Archive';
import ModifyTask from '../components/ModifyTask';
import Tasks from '../components/Tasks';
import SignUp from '../components/SignUp';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/tasks'
    },
    {
      path: '/',
      redirect: '/tasks'
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/task/:taskId',
      name: 'task',
      component: ModifyTask
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    }
  ]
});

// router.beforeEach((to, from, next) => {
//
// });

export default router;
