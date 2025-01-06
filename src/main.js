import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import uiComponents from "@/components/ui-components/index.js";
import store from "@/store/index.js";

const app = createApp(App)

uiComponents.map(component=>app.component(component.name,component))
app.use(router)
app.use(store)
app.mount('#app')
