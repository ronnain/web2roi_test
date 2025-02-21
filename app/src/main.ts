import './index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts';
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App);

app.use(router);
app.use(VueApexCharts);
app.use(VueQueryPlugin);

app.mount('#app')
