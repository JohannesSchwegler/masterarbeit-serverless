import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Router from './router'
import { setupPrimevue } from './plugins/primevue'
const app = createApp(App)
app.use(Router)

setupPrimevue(app)

app.mount('#app')
