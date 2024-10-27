

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

                    
                    <qrcode-stream v-show="scanStatus" @detect="onDetect"></qrcode-stream>
                    
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
                <p>{{result}}</p>
            
        </div> 
    `,
    data() {
        return{
            result: 'QR Code Result',
            session: true,
            scanStatus: false,
            scannedData: []
        }
    },
    methods: {
        toggleSession() {
            this.session = !this.session
            console.log(this.session)

        },
        scanQRCode() {
            console.log('session Type',this.session)
            this.scanStatus = !this.scanStatus
        },
        onDetect(data) {
            const rawValue = data[0].rawValue;
            const [uid, name, year] = rawValue.split("&");

            this.scannedData = {
                uid: uid.trim(),
                name: name.trim(),
                year: year.trim(),
            }
            
            this.result = `${uid}, name is: ${name}, year is ${year}`;
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
// ]