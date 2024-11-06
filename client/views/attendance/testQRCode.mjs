import api from '../../api/apis.mjs';

// https://docs.google.com/spreadsheets/d/17L_wPeeG2LRJjVMhtQzRjPqDBpRZ3SkoK4nXHIk9Jew/edit?gid=802696440#gid=802696440

export const QRCode = {
    /* html */
    template: 
    `
        <div class="qr-page">
            <div class="qr-page_container container">
                <Button icon="pi pi-times" @click="goHome" class="close-btn_qrpage mobile-only"/>
                <div>     
                    <h1 class="font-heading">Student QR Code</h1>
                    <p class="font-sub_heading">Scan and mark their attendance</p>
                </div>


                <div class="qr-container">
                    <qrcode-stream  @detect="onDetect">
                      
                    </qrcode-stream>
                    <div class="qr-counter">{{ attendanceCounter }}</div>
                </div>
                <div class="qr-page_buttons">           
                    <p class="qr-page-error" v-show="error">{{ error }}</p>
                    <Button 
                        :label="session ? 'In' : 'Out'" 
                        :class="['secondary-btn', session ? 'btn-in' : 'btn-out']"
                        icon="pi pi-clock"  
                        @click="toggleSession"
                    />
                    <Button class="mobile-only" label="View" icon="pi pi-qrcode" @click="scanQRCode" class="cta-btn"/>
                </div>
            </div>
            <div class="desktop-qr">

                <div class="drawer_list-scannedData">
                    <ul class="test">
                        <li v-for="(item, index) in scannedData" :key="index" class="scan-list">
                            <div class="list-top">
                                <p>{{ item.name }}</p>
                                <p>Session {{ item.session }}</p>
                            </div>
                            <div class="list-bottom">
                                <p>{{ item.year }}</p>
                                <p>{{ item.time }}</p>
                            </div>
                        </li>
                        <!-- 
                        
                        <li class="scan-list">
                            <div class="list-top">
                                <p>Seigfred Sayson</p>
                                <p>Session In</p>
                            </div>
                            <div class="list-bottom">
                                <p>2nd Year</p>
                                <p>9:30am</p>
                            </div>
                        </li>
                        
                        
                        -->

                    </ul>
                </div>  
                <div class="drawer-btns desktop">
                    <Button label="Mark Attendance" icon="pi pi-check-circle" @click="sendAttendance" class="cta-btn"/>
                </div>
            </div>
            <Drawer v-model:visible="visibleBottom" header="Attendance" position="bottom" :show-close-icon="false" class="drawer">
                <div class="drawer_list-scannedData">
                    <ul class="test">
                        <li v-for="(item, index) in scannedData" :key="index" class="scan-list">
                            <div class="list-top">
                                <p>{{ item.name }}</p>
                                <p>Session {{ item.session }}</p>
                            </div>
                            <div class="list-bottom">
                                <p>{{ item.year }}</p>
                                <p>{{ item.time }}</p>
                            </div>
                        </li>
                        <!-- 
                        
                        <li class="scan-list">
                            <div class="list-top">
                                <p>Seigfred Sayson</p>
                                <p>Session In</p>
                            </div>
                            <div class="list-bottom">
                                <p>2nd Year</p>
                                <p>9:30am</p>
                            </div>
                        </li>
                        
                        
                        -->

                    </ul>
                </div>
                <div class="drawer-btns mobile">
                    <Button label="Scan Again" icon="pi pi-qrcode" @click="closeDrawer" class="secondary-btn"/>
                    <Button label="Mark Attendance" icon="pi pi-check-circle" @click="sendAttendance" class="cta-btn"/>
                </div>
            </Drawer>
            
        </div> 
    `,
    data() {
        return{
            attendanceCounter: 0,
            result: 'data is',
            session: ['morning IN', 'morning OUT', 'afternoon In', 'afternoon OUT'],
            scanStatus: true,
            scannedData: [],
            error: undefined,
            allData: [],

            // Components
            visibleBottom: false
        }
    },
    methods: {
        goHome() {
            this.$router.push("/")
        },
        closeDrawer() {
            this.visibleBottom = false
        },
        async sendAttendance() {
            const result = await api.sendAttendance(this.scannedData)
            this.scannedData = []

        },
        toggleSession() {
            this.session = !this.session
            console.log(this.session)

        },
        scanQRCode() {
            this.visibleBottom = !this.visibleBottom;
        },
        onDetect(data) {
            if (data && data.length > 0) {
                const rawValue = data[0].rawValue;
                const values = rawValue.split("&");

                if (values.length >= 3) {
                    this.error = false;
                    const [studentId, name, year] = values;
                    const currentDate = new Date()

                    const newData = {
                        studentId: studentId.trim(),
                        name: name.trim(),
                        year: year.trim(),
                        session: this.session ? 'In' : 'Out',
                        time: currentDate.toLocaleTimeString(),
                        date: currentDate.toLocaleDateString()
                    };
                    console.log('new', newData)
                    this.scannedData.push(newData); 
                    this.attendanceCounter = this.scannedData.length;
                } else {
                    this.error = true;
                    this.error = 'Invalid QR Code, Try again'
                }
                this.allData.push(values)
                console.log(this.allData)
            }
        }

    },
    components: {
        'qrcode-stream': window.VueQrcodeReader.QrcodeStream
    }
}


