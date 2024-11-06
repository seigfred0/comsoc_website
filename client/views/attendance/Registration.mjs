import api from '../../api/apis.mjs';


export const Registration = {
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
                    <h1 class="font-heading">Register</h1>
                    <p>Join the fun. Witness skills.</p>
                </div>

                <div v-show="steps.two" class="registration-text step-two">
                    <h1 class="font-heading">Registration Complete</h1>
                    <p>
                        Download or screenshot your QR Code. 
                        You will use this throughout the event.
                    </p>

                    
                    <div class="qr-code">
                        <img :src="success.qrCode"/>
                    </div>

                    <div class="qr-button">
                        <!-- save qr code -->
                        <a 
                            :href="success.qrCode" 
                            download="QR_Code.png" 
                            class="save-btn"
                        >
                            Save QR Code
                        </a>
                    </div>




                </div>


                <form  v-if="steps.one" class="registration-form" @submit.prevent="submitForm">
                    <FloatLabel variant="on">
                        <InputText id="username" v-model="name"/>
                        <label for="username">Name</label>
                    </FloatLabel>
                    <Select 
                        v-model="selectedYear" 
                        :options="year" 
                        optionLabel="name" 
                        placeholder="Select your year" 
                        class="w-full md:w-56" 
                    />
                    <div class="form-bottom">
                    <p v-show="errorMessage" class="registration-error">{{ errorMessage }}</p>
                        <button type="submit" class="register-btn">Register</button> 
                    </div>
                </form>


            </div>
        
        </div>
    
    `,
    data() {
        return{
            success: {
                qrCode: null,
                message: '',
            },
            steps: {
                one: true,
                two: false
            } ,
            isLoading: false,
            errorMessage: null,
            name: '',
            selectedYear: null, 
            year: [
                { name: 'Grade 11', code: 'G11' },
                { name: 'Grade 12', code: 'G12' },
                { name: '1st Year', code: '1Y' },
                { name: '2nd Year', code: '2Y' },
                { name: '3rd Year', code: '3Y' },
                { name: '4th Year', code: '4Y' },
            ],
        }
    },
    methods: {
        navigate(where) {
            this.$router.push(where);
        },
        async submitForm() {
            const newName = this.name.trim().toLowerCase();

            if (!this.name || !this.selectedYear) {
                this.errorMessage = 'Please fill in all fields';
                return
            }

            const data = {
                name: newName,
                year: this.selectedYear['code'] 
            }



            console.log(data)

            // console.log('waiting for api')
            const result = await api.createStudent(data);

            if (result && result.qrCodeData) {
                
                this.success.qrCode = result.qrCodeData;
                this.steps.one = false;
                this.steps.two = true;

            }
            console.log(result)
            this.errorMessage = result.message
        }

    },
    components: {

    }
}