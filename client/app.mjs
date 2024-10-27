import { Home } from "./views/Home.mjs";
import { Registration } from "./views/attendance/Registration.mjs";
import { QRCode } from "./views/attendance/QRCode.mjs";

const app = Vue.createApp({
    data() {
        return {

        };
    },
    methods: {
        
    },
    mounted() {
    }
});

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(), 
    routes: [
        { path: '/', component: Home },
        { path: '/registration', component: Registration },
        { path: '/scan', component: QRCode }
    ]
})

app.component('Button', PrimeVue.Button);
app.component('Drawer', PrimeVue.Drawer);


app.use(router);
app.use(PrimeVue.Config, {
    theme: {
        preset: PrimeVue.Themes.Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'false',
            cssLayer: true
        }
    }
});
app.mount('#app');

export default app;