import {createRouter, createWebHistory} from 'vue-router';
import EmployeeView from './views/EmployeeView.vue';
import ManagerDashboard from './views/ManagerDashboard.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'employee',
            component: EmployeeView
        },
        {
            path: '/manager',
            name: 'manager',
            component:ManagerDashboard
        }
    ]
});

export default router;