import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import SubmitSale from '../components/SubmitSale.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Branch from '../components/Branch.vue';
import Summary from '../components/Summary.vue';
import { store } from '../store'; // Import the store

const routes = [
  { path: '/', component: Home },
  { path: '/submit-sale', component: SubmitSale },
  { path: '/login', component: Login },
  {
    path: '/register',
    component: Register,
    meta: { requiresAdmin: true }, // Protect route
  },
  {
    path: '/branch',
    component: Branch,
    meta: { requiresAdmin: true }, // Protect route
  },
  {
    path: '/summary',
    component: Summary,
    meta: { requiresAdmin: true }, // Protect route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const user = store.user;

  // Redirect to login if not logged in
  if (!user && to.path !== '/login') {
    return next('/login');
  }

  // Check admin access for routes that require admin
  if (to.meta.requiresAdmin && user?.branch !== 'admin') {
    alert('You do not have permission to access this page.');
    return next('/');
  }

  next();
});

export default router;
