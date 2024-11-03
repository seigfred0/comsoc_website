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
            // const newName = this.name.trim().toLowerCase();
            // const newPassword = this.password.trim().toLowerCase();

            // if (!this.name || !this.password) {
            //     this.errorMessage = 'Please fill in all fields';
            //     return
            // }

            // const data = {
            //     name: newName,
            //     password: newPassword
            // }



            // const result = await apis.login(data)

            this.$router.push('/scan')

            // console.log(result)

            // if (result) {
            //     this.$router.push('/scan');
            // } else {
            //     this.errorMessage = result.message || 'Login failed. Please try again.';
            // }
            // this.errorMessage = result.message
        }

    },
    components: {

    }
}