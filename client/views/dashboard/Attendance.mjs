import apis from "../../api/apis.mjs"


export const Attendance = {
    name: 'AttendanceComponent',
    template: `
            <div class="main-panel">
                <div class="attendance-panel">
                    <div class="attendance-top">
                        <div class="top-text">
                            <h1>Student Attendance</h1>
                            <p>View the attendance for each day or for a specific student.</p>
                        </div>
                        <div class="top-btns">
                            <button class="search-btn" @click="search">Search</button>
                            <AutoComplete v-model="selectedStudent" optionLabel="name"  class="custom-autocomplete" placeholder="student name" />

                            <!--@complete="search" <DatePicker v-model="date" class="custom-datepicker" placeholder="Date"/> -->

                        </div>
                    </div>
                    <div class="attendance-middle">
                        <DataTable :value="attendance" tableStyle="min-width: 50rem" class="custom-datatable" paginator :rows="7">
                            <template #paginatorstart>
                                <div style="display: flex; gap: 8px;">
                                    <Button @click="reset" type="button" icon="pi pi-refresh" text class="data-btns" />
                                    <Button @click="exportToExcel" type="button" icon="pi pi-download" text class="data-btns" />
                                </div>
                            </template>
                            <Column field="name" header="Student Name" style="width: 230px"></Column>
                            <Column field="year" header="Year" sortable></Column>
                            <Column field="date" header="Date" sortable></Column>
                            <Column field="session.amIn" header="am In"></Column>
                            <Column field="session.amOut" header="am Out"></Column>
                            <Column field="session.pmIn" header="pm In"></Column>
                            <Column field="session.pmOut" header="pm Out"></Column>
                        </DataTable>
                    </div>
                    <div class="attendance-bottom"></div>
                </div>
                
            </div>
    `,
    data() {
        return {
            attendance: [],
            searchAttendance: [],
            date: null,
            selectedStudent: "",
     
        }
    },
    methods: {
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
        },
        
    },
    async mounted() {
        const result = await apis.getAttendance();
        console.log('hhhh', result)
        this.attendance = result;
    },
}

