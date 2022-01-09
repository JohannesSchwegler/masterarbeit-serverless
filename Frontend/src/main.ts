import { createApp } from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

import Router from './router'
import { setupPrimevue } from './plugins/primevue'
const app = createApp(App)
app.use(Router)

setupPrimevue(app)

app.mount('#app')
