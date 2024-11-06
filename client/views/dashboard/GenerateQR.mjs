import apis from "../../api/apis.mjs"


export const GenerateQR = {
    template: `
        <div class="dashboard_page">
            <div class="side-panel">
                <div class="side-top">
                    <Avatar label="AV" class="mr-2" size="xlarge" shape="circle" />
                    <h4 class="dashboard-name">seigfred</h4>
                    <p>Administrator</p>
                </div>
                <div class="side-middle">
                    <ul>
                        <li>Dashboard</li>
                        <li class="highlight">Attendance</li>
                        <li>Tabulation</li>
                    </ul>
                </div>
                <div class="side-bottom">
                    <button>Log Out</button>
                </div>
            </div>
            <div class="main-panel">
                <div class="attendance-panel">
                    <div class="attendance-top">
                        <div class="top-text">
                            <h1>Get Attendance</h1>
                            <p>Forgot your QR Code?</p>
                        </div>
                        <div class="top-btns">
                            <button class="search-btn">Search</button>
                           

                            <!--@complete="search" <DatePicker v-model="date" class="custom-datepicker" placeholder="Date"/> -->

                        </div>
                    </div>
                    <div class="attendance-middle">
                        <img :src="qrCode"/>
                        <button @click="findQR">Find</button>
                        <input v-model="studentName" />
                        
                    </div>
                    <div class="attendance-bottom"></div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            qrCode: '',
            name: '',
            studentName: ''
            
        }
    },
    methods: {
        async findQR() {
            const name = {
                studentName: this.studentName
            }
            const qr = await apis.getQR(name);
            this.qrCode = qr.data;
            console.log(this.studentName)
            console.log(qr.data)
        }

    }
}

