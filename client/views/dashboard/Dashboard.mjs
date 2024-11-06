import apis from "../../api/apis.mjs";
import { Attendance } from "./Attendance.mjs";
import { GenerateQR } from "./GenerateQR.mjs";
import { Tabulation } from "./Tabulation.mjs";

export const Dashboard = {
    /* html */
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
                        <li @click="goTo('')"  :class="{highlight: currentPage === ''}">Attendance</li>
                        <li @click="goTo('tabulation')" :class="{highlight: currentPage === 'tabulation'}">Tabulation</li>
                        <li @click="goTo('generate')" :class="{highlight: currentPage === 'generate'}">QR Code</li>
                    </ul>
                </div>
                <div class="side-bottom">
                    <button @click="logOut">Log Out</button>
                </div>
            </div>
            <div class="main-panel">
                <component :is="currentPageComponent" />                
            </div>
        </div>
    `,
    data() {
        return {
            attendance: [],
            searchAttendance: [],
            date: null,
            selectedStudent: "",
            currentPage: '',
            currentPage: ''
        }
    },
    methods: {
        logOut() {
            console.log('he')
            sessionStorage.removeItem('authToken');
            this.$router.push('/')
        },
        goTo(page) {
            this.currentPage = page;
            // this.$router.push(`/admin/${page}`);
        },
        exportToExcel() {
            const transformedData = this.attendance.map(student => {
                return {
                    date: student.date,
                    name: student.name,
                    year: student.year,
                    amIn: student.session.amIn || '', 
                    amOut: student.session.amOut || '', 
                    pmIn: student.session.pmIn || '', 
                    pmOut: student.session.pmOut || '' 
                };
            });
            const worksheet = XLSX.utils.json_to_sheet(transformedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
            XLSX.writeFile(workbook, 'StudentsData.xlsx');
        },
        search() {
            const foundStudent = this.findStudentByName(this.selectedStudent);
            if (foundStudent) {
                this.attendance = [foundStudent]
                console.log('Found student:', foundStudent);
            } else {
                console.log('Student not found');
            }
        },
        findStudentByName(name) {
            return this.attendance.find(student => 
                student.name.toLowerCase().startsWith(name.toLowerCase())
            );
        },
        async reset() {
            const result = await apis.getAttendance();
            this.attendance = result;
            this.selectedStudent = '';

        },
        generateQRPage() {
            this.$router.push('/admin/generate')
        }
    },
    computed: {
        // filteredStudents() {
        //     return this.attendance.map(student => {
        //         return { name: student.name }; 
        //     });
            

        // }
        currentPageComponent() {
            switch (this.currentPage) {
                case 'attendance':
                    return Attendance;
                case 'tabulation':
                    return Tabulation;
                case 'generate':
                    return GenerateQR;
                default:
                    return Attendance; 
            }
        }
    },
    async mounted() {
        const result = await apis.getAttendance();
        console.log('hhhh', result)
        this.attendance = result;
    },
    components: {
        Attendance
    }
}