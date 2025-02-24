import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import "./assets/styles/main.scss"

createApp(App).use(PrimeVue, {
  theme: {
      preset: Aura
  }
}).mount('#app')
