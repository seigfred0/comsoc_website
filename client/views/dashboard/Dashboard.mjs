
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
                        <li>Dashboard</li>
                        <li class="highlight">Attendance</li>
                        <li>Tabulation</li>
                        <li>QR Code</li>
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
                            <h1>Student Attendance</h1>
                            <p>View the attendance for each day or for a specific student.</p>
                        </div>
                        <div class="top-btns">
                            <button class="search-btn">Search</button>
                            
                                <AutoComplete v-model="selectedCountry" optionLabel="name" :suggestions="filteredCountries" @complete="search"  class="custom-autocomplete"
                                 placeholder="Select a country" />

                            <DatePicker v-model="date" class="custom-datepicker" placeholder="Date"/>

                        </div>
                    </div>
                    <div class="attendance-middle">

                        <DataTable :value="students" tableStyle="min-width: 50rem" class="custom-datatable" paginator :rows="7">
                            <template #paginatorstart>
                                <div style="display: flex; gap: 8px;">
                                    <Button type="button" icon="pi pi-refresh" text class="data-btns" />
                                    <Button type="button" icon="pi pi-download" text class="data-btns" />
                                </div>
                            </template>
                    
                            <Column field="studentName" header="Student Name" style="width: 230px"></Column>
                            <Column field="year" header="Year"></Column>
                            <Column field="date" header="Date"></Column>
                            <Column field="time" header="Time" sortable></Column>
                            <Column field="session" header="Session"></Column>
                            <Column field="status" header="Status">
                                <template #body="slotProps">
                                    <span
                                        class="status-button"
                                        :class="{'status-in': slotProps.data.status === 'In', 'status-out': slotProps.data.status === 'Out'}">
                                        {{ slotProps.data.status }}
                                    </span>
                                </template>
                            </Column>
                        </DataTable>
                    
                    </div>
                    <div class="attendance-bottom"></div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            students: [
                {
                    studentName: 'Seigfred Sayson Espenosa',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '☀️ 8:56 am',
                    session: 'morning', 
                    status: 'In'
                },
                {
                    studentName: 'Seigfred Sayson Random Names XYZ',
                    year: '2Y',
                    date: '10/22/2024',
                    time: '🌄 10:56 am',
                    session: 'morning', 
                    status: 'In'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '🌙 8:56 am',
                    session: 'morning', 
                    status: 'In'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '11:56 am',
                    session: 'morning', 
                    status: 'Out'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: 'morning', 
                    status: 'In'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: '☀️ morning', 
                    status: 'Out'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: '☀️ morning', 
                    status: 'Out'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: '☀️ morning', 
                    status: 'In'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: '☀️ morning', 
                    status: 'Out'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: 'morning', 
                    status: 'Out'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: 'morning', 
                    status: 'In'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: 'morning', 
                    status: 'In'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: 'morning', 
                    status: 'Out'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: 'morning', 
                    status: 'Out'
                },
                {
                    studentName: 'Seigfred Sayson',
                    year: '1Y',
                    date: '10/22/2024',
                    time: '8:56 am',
                    session: 'morning', 
                    status: 'In'
                }
            ]

        }
    },
    methods: {

    },
    components: {

    }
}