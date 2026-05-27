import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(router) // <-- Włączamy router w aplikacji
app.mount('#app')