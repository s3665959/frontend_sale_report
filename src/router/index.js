import { createRouter, createWebHistory } from 'vue-router';
//import Home from '../pages/Home.vue';
import SubmitSale from '../components/SubmitSale.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Branch from '../components/Branch.vue';
import Summary from '../components/Summary.vue';

const routes = [
  //{ path: '/', component: Home },
  { path: '/submit-sale', component: SubmitSale },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/branch', component: Branch },
  { path: '/summary', component: Summary },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
