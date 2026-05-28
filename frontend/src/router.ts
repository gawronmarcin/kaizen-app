import {createRouter, createWebHistory} from 'vue-router';
import EmployeeView from './views/EmployeeView.vue';
import ManagerDashboard from './views/ManagerDashboard.vue';
import LoginView from './views/LoginView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/',
            name: 'employee',
            component: EmployeeView,
            meta: {requiresAuth: true}
        },
        {
            path: '/manager',
            name: 'manager',
            component:ManagerDashboard,
            meta: {requiresAuth: true, requiresManager: true}
        }
    ]
});

router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('userRole');

    if (to.meta.requiresAuth && !role) {
        return next('/login');
    }

    if (to.meta.requiresManager && role !== 'MANAGER') {
        alert('Brak dostępu! Tylko menedżer może tu wejść.');
        return next('/'); 
    }

    next();
});

export default router;