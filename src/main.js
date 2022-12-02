import { createApp } from 'vue'
import Vue from 'vur'
import App from './App.vue'
import router from './router'
import store from './store'
import materialize from 'materialize-css'
import App from './App.vue'

createApp(App).use(store).use(router).mount('#app')