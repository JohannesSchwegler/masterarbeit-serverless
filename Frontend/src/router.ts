import { createRouter, createWebHistory } from 'vue-router'
import Checkout from './routes/checkout/Checkout.vue'
import Shop from './routes/shop/Shop.vue'
import Erp from './routes/erp/Erp.vue'
import ErpCustomers from './routes/erp/customers/ErpCustomers.vue'
import ErpMaterialsmanagement from '@/routes/erp/material-management/ErpMaterialsmanagement.vue'

const routes = [
    { path: '/', component: Erp },
    { path: '/erp/customers', component: ErpCustomers },
    { path: '/erp/materials-management', component: ErpMaterialsmanagement },
    { path: '/shop', component: Shop },
    { path: '/shop/checkout', component: Checkout },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router
