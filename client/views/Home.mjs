

export const Home = {
    /* html */
    template: `
        <h2>Welcome to the Home Page</h2>
        <router-link to="/scan">Scanner</router-link>
        <div class="home_page">
            <div class="home_page-header"></div>
            <div class="home_page-about"></div>




            <div class="home_page-timeline">
                <div class="timeline_container">
                    <div class="timeline-top">
                        
                    </div>
                    <div class="timeline-bottom"></div>
                </div>
            </div>





            <div class="home_page-tools">
                <img src="/assets/svg/white-star.svg" alt="White Star" />
                <div class="tools_container container">
                    <p class="subtitle">Tools</p>
                    <div class="tools-div">
                        <div class="tools-link" @click="navigate('tabulation')">
                            <p class="number">01</p>
                            <h1 class="title">pagaent tabulation</h1>
                        </div>
                        <div class="tools-link" @click="navigate('admin')">
                            <p class="number">02</p>
                            <h1 class="title">admin</h1>
                        </div>
                        <div class="tools-link" @click="navigate('scan')">
                            <p class="number">03</p>
                            <h1 class="title">attendance</h1>
                        </div>
                        <div class="tools-link" @click="navigate('resources')">
                            <p class="number">04</p>
                            <h1 class="title">resources</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="home_page-footer"></div>
        </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        navigate(where) {
            this.$router.push(`/${where}`)
        }

    }
}
