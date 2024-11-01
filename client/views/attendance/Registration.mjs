import api from '../../api/apis.mjs';


export const Registration = {
    /*html*/
    template: 
    `
        <div class="registration_page">
            <img class="registration-star" src="/assets/svg/orange-star.svg" alt="Orange Star" />

            <div class="registration-container container">
                <Button icon="pi pi-times" @click="navigate('/')" class="register_close"/>
                <div class="registration-text">
                    <h1 class="font-heading">Register</h1>
                    <p>Join the fun. Witness skills.</p>
                </div>


                <form class="registration-form" @submit.prevent="submitForm">
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
                        <button type="submit" class="register-btn">Register</button> 
                    </div>
                </form>


            </div>
        
        </div>
    
    `,
    data() {
        return{
            name: '',
            selectedYear: null, 
            year: [
                { name: 'Grade 11', code: '11G' },
                { name: 'Grade 12', code: '12G' },
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
                console.log('complete it!!!')
                alert('Invalid ')
                return
            }

            const data = {
                name: newName,
                year: this.selectedYear['code'] 
            }

            console.log(data)

            const result = await api.createStudent(data);
        }

    },
    components: {

    }
}