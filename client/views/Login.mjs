import api from '../../api/apis.mjs';
import apis from '../api/apis.mjs';


export const Login = {
    /*html*/
    template: 
    `
        <div class="registration_page">
            <img class="registration-star" src="/assets/svg/orange-star.svg" alt="Orange Star" />

            <div class="loading-container">
                <div v-if="isLoading" class="loader"></div>
            </div>

            <div class="registration-container container">
                <Button icon="pi pi-times" @click="navigate('/')" class="register_close"/>

                <div  v-if="steps.one" class="registration-text">
                    <h1 class="font-heading">Login</h1>
                    <p>Club Officers Only</p>
                </div>

                <div>
                
                    <FloatLabel variant="on">
                        <InputText id="username-login" v-model="name"/>
                        <label for="username-login">Name</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="password-login" v-model="password"/>
                        <label for="password-login">Password</label>
                    </FloatLabel>
                    <div class="form-bottom">
                    <p v-show="errorMessage" class="registration-error">{{ errorMessage }}</p>
                        <button @click="submitForm" class="register-btn">Login</button> 
                    </div>
                </div>
              


            </div>
        
        </div>
    
    `,
    data() {
        return{

            steps: {
                one: true,
                two: false
            } ,
            isLoading: false,
            errorMessage: null,
            name: '',
            password: '',
        }
    },
    methods: {
        navigate(where) {
            this.$router.push(where);
        },
        async submitForm() {
            const data = {
                name: this.name,
                password: this.password
            }

            console.log(data)
            const loginApi = await apis.login(data);

            if (loginApi.data.token) {
                const token = loginApi.data.token;
                console.log('yyyy', token)
                sessionStorage.setItem('authToken', token);

                const intendedRoute = sessionStorage.getItem('intendedRoute');
                if (intendedRoute) {
                    sessionStorage.removeItem('intendedRoute'); 
                    this.$router.push(intendedRoute); 
                } else {
                    this.$router.push({ name: 'Home' }); 
                }
                this.$router.push({ name: 'Home' });
            } else {
                this.errorMessage = loginApi.data.message
            }

        }

    },
    components: {

    }
}