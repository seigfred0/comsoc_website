

export const QRCode = {
    /* html */
    template: 
    `
        <div class="qr-page">
            <div class="qr-page_container container">
                <Button icon="pi pi-times" class="close-btn_qrpage"/>
                <div>     
                    <h1 class="font-heading">Student QR Code</h1>
                    <p class="font-sub_heading">Scan and mark their attendance</p>
                </div>

                <div class="qr-container">
                    <!-- 
                    
                        <qrcode-stream v-show="scanStatus" @detect="onDetect"></qrcode-stream>
                    -->
                    <div class="qr-counter">{{ attendanceCounter }}</div>
                </div>
                <div class="qr-page_buttons">           
                    <Button 
                        :label="session ? 'In' : 'Out'" 
                        :class="['secondary-btn', session ? 'btn-in' : 'btn-out']"
                        icon="pi pi-clock"  
                        @click="toggleSession"
                    />
                    <Button label="Scan" icon="pi pi-qrcode" @click="scanQRCode" class="cta-btn"/>
                </div>
            </div>

            <Drawer v-model:visible="visibleBottom" header="Attendance" position="bottom" >
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
                    </ul>
                </div>
                <div class="drawer-btns">
                    <Button label="Scan Again" icon="pi pi-qrcode" @click="" class="secondary-btn"/>
                    <Button label="Mark Attendance" icon="pi pi-check-circle" @click="" class="cta-btn"/>
                </div>
            </Drawer>
            
        </div> 
    `,
    data() {
        return{
            attendanceCounter: 0,
            result: 'data is',
            session: true,
            scanStatus: false,
            scannedData: [],

            // Components
            visibleBottom: false
        }
    },
    methods: {
        toggleSession() {
            this.session = !this.session
            console.log(this.session)

        },
        scanQRCode() {
            const newData = {
                name: 'seigfredaaaa',
                session: this.session ? "in" : "out"
            }

            this.scannedData.push(newData);
            
            this.attendanceCounter = this.scannedData.length
            console.log(this.scannedData)

            this.visibleBottom = !this.visibleBottom

        },
        onDetect(data) {
            const rawValue = data[0].rawValue;
            const [uid, name, year] = rawValue.split("&");

            const date = new Date().toISOString().slice(0, 10);
            const time = new Date().toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const newData = {
                uid: uid.trim(),
                name: name.trim(),
                year: year.trim(),
                session: this.session ? "in" : "out",
                time: time,
                date: date
            }

            this.scannedData.push(newData)
            
            
            this.result = uid + name + year;
        }

    },
    components: {
        'qrcode-stream': window.VueQrcodeReader.QrcodeStream
    }
}


// [ 
//     { 
//     "boundingBox": { "x": 76, "y": 215, "width": 219, "height": 221, "top": 215, "right":   295, "bottom": 436, "left": 76 }, 
//     "rawValue": "7f02c2c7-d90a-46e9-8b89-3a1387806931&daven&1Y", 
//     "format": "qr_code", 
//     "cornerPoints": [ { "x": 77, "y": 215 }, { "x": 295, "y": 223 }, { "x": 286, "y": 436 }, { "x": 76, "y": 429 } ] 
//     } 
// ] http://127.0.0.1:4040 

