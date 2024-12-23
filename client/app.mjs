import { Home } from "./views/Home.mjs";
import { Registration } from "./views/attendance/Registration.mjs";
import { QRCode } from "./views/attendance/QRCode.mjs";
import { Dashboard } from "./views/dashboard/Dashboard.mjs";
import { Login } from "./views/Login.mjs";
import apis from "./api/apis.mjs";
import { GenerateQR } from "./views/dashboard/GenerateQR.mjs";
import { Tabulation } from "./views/dashboard/Tabulation.mjs";
import { Attendance } from "./views/dashboard/Attendance.mjs";
import { TabulationPage } from "./views/TabulationPage.mjs";

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
        { 
            path: '/admin', 
            component: Dashboard, 
            name: 'Dashboard', 
            meta: { requiresAuth: true },
            children: [
                { path: 'generate', component: GenerateQR, name: 'AdminGenerateQR' },
                { path: 'tabulation', component: Tabulation, name: 'Tabulation' },
                { path: '', component: Attendance, name: 'Attendance' },
            ]
        },
        { path: '/login', component: Login, name: 'Login' },
        { path: '/tabulation', component: TabulationPage, name: 'Tabulation' },
        // { path: '/generate', component: GenerateQR, name: 'GenerateQRCode'}
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

    // next(async vm => {
    //     try {
    //         const result = await apis.getAttendance();
    //         vm.attendance = result;
    //     } catch (error) {
    //         console.error('Error fetching attendance data:', error);
    //     }
    // });
    
});

app.use(PrimeVue.ToastService);

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
app.component('Toast', PrimeVue.Toast);



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