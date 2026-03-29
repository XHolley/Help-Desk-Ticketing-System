import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import NewTicketView from '../views/NewTicketView.vue';

const routes = [
  { path: '/', component: DashboardView },
  { path: '/new-ticket', component: NewTicketView }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
