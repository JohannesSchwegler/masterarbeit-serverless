import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Steps from 'primevue/steps'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Carousel from 'primevue/carousel'
import Sidebar from 'primevue/sidebar'
import Dialog from 'primevue/dialog'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import AvatarGroup from 'primevue/avatargroup'
import BadgeDirective from 'primevue/badgedirective'
import Badge from 'primevue/badge'
import { createRouter, createWebHistory } from 'vue-router'
import Checkout from './routes/checkout/Checkout.vue'
import Shop from './routes/shop/Shop.vue'

const routes = [
    { path: '/', component: Shop },
    { path: '/checkout', component: Checkout },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(router)
app.use(Vuex)
app.use(PrimeVue)

app.directive('badge', BadgeDirective)
app.component('Button', Button)
app.component('Carousel', Carousel)
app.component('Dialog', Dialog)
app.component('Menubar', Menubar)
app.component('InputText', InputText)
app.component('Sidebar', Sidebar)
app.component('Steps', Steps)
app.component('Avatar', Avatar)
app.component('Badge', Badge)
app.component('AvatarGroup', AvatarGroup)
app.component('Toast', Toast)

app.mount('#app')
