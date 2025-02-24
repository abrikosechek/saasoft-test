import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import "./assets/styles/main.scss"

const pinia = createPinia()

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .use(pinia).mount('#app')
