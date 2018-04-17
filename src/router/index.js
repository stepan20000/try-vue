import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import Archive from '../components/Archive';
import Task from '../components/Task';
import Tasks from '../components/Tasks';
import SignUp from '../components/SignUp';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/task/:taskId',
      name: 'task',
      component: Task,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requireAuth && !currentUser) {
    next('login');
  } else if (!requireAuth && currentUser) {
    next('tasks');
  } else {
    next();
  }
});

export default router;
