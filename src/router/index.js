import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'
import Dashboard from '../views/Dashboard/index.vue'

Vue.use(VueRouter)

function checkCredentials(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem('token'))
    isAuthenticated = true;
  else
    isAuthenticated = false;
  if (isAuthenticated) {
    next();
  }
  else {
    next('/');
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    beforeEnter: checkCredentials,
    component: Dashboard
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
