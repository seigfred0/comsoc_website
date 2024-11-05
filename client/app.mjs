import { Home } from "./views/Home.mjs";
import { Registration } from "./views/attendance/Registration.mjs";
import { QRCode } from "./views/attendance/QRCode.mjs";
import { Dashboard } from "./views/dashboard/Dashboard.mjs";
import { Login } from "./views/Login.mjs";
import apis from "./api/apis.mjs";
import { GenerateQR } from "./views/dashboard/GenerateQR.mjs";

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
        { path: '/', component: Home, name: 'Home' },
        { path: '/registration', component: Registration },
        { path: '/scan', component: QRCode, name: 'Scan'},
        { path: '/admin', component: Dashboard, name: 'Dashboard', meta: { requiresAuth: true }},
        { path: '/login', component: Login, name: 'Login'},
        { path: '/generate', component: GenerateQR, name: 'GenerateQRCode'}
    ]
})

router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('authToken');
    console.log('Token:', token);

    console.log(to)
    console.log(token)

    if (to.meta.requiresAuth && !token) {
        sessionStorage.setItem('intendedRoute', to.fullPath)
        next({ name: 'Login' }); 
    } else {
        next(); 
    }
    
});

app.component('Button', PrimeVue.Button);
app.component('Drawer', PrimeVue.Drawer);
app.component('FloatLabel', PrimeVue.FloatLabel);
app.component('InputText', PrimeVue.InputText);
app.component('Select', PrimeVue.Select);
app.component('Avatar', PrimeVue.Avatar);
app.component('DataTable', PrimeVue.DataTable);
app.component('Column', PrimeVue.Column);
app.component('AutoComplete', PrimeVue.AutoComplete);
app.component('DatePicker', PrimeVue.DatePicker);


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