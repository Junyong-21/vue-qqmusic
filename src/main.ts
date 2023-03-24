import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import 'element-plus/dist/index.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import 'vue-progressive-image/dist/style.css'; // <--- very important!
import VueProgressiveImage from 'vue-progressive-image';

import '@/assets/tailwindCSS.css'
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/assets/bootstrap.css'
import 'animate.css';

const app = createApp(App)

const pinia  = createPinia()
pinia.use(piniaPluginPersistedstate);
app.use(pinia)
app.use(router)
app.use(VueProgressiveImage)

app.mount('#app')
