

export const Home = {
    /* html */
    template: `
       
        <div class="home_page">
            <div class="navigation">
                <div class="navigation-links">
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Tools</li>
                    </ul>
                    <button @click="navigate('registration')">
                        Register
                    </button>
                </div>
            </div>

            
            <div class="home_page-header">
                <h1>This is main header</h1>
            </div>

            <div class="home_page-about">
                <div class="about-container container">
                    <div class="about-top">
                        <h1 class="home-h1">
                            About us
                        </h1>
                        <img src="/assets/svg/star.svg" alt="star">    
                    </div>
                    <div class="about-bottom">
                        <div class="about-p first">
                            <h3>Computer Society Club</h3>
                            <p>
                                At the heart of the Computer Society Club is a group of passionate minds eager to dive into tech, innovate, and grow together in the ever-evolving digital landscape
                            </p>
                        </div>
                        <div class="about-p">
                            <h3>Just for fun</h3>
                            <p>
                                Just for fun! We're here to share our passions, showcase our creativity, and spread a little joy. Join us on this lighthearted journey as we explore what brings us happiness!
                            </p>
                        </div>
                        <div class="about-p">
                            <h3>Objective</h3>
                            <p>
                                Our main goal is to ignite interest in technology and innovation at our ICT event. Join us as we explore the latest trends, share knowledge, and connect with fellow tech enthusiasts!
                            </p>
                        </div>
                    </div>
                </div>
                <div class="white-fade">
                    <img src="/assets/imgs/white-fade.png" />
                </div>
            </div>




            <div class="home_page-timeline">
                <div class="planets">
                    <img class="uranus planet" src="/assets/svg/uranus.svg" alt="uranus" />
                    <img class="venus planet" src="/assets/svg/venus.svg" alt="venus" />
                    <img class="neptune planet" src="/assets/svg/neptune.svg" alt="neptune" />
                </div>
              
                <div class="timeline_container container">
                    <div class="timeline-top">
                        <p class="subtitle">Events</p>
                        <h1 class="home-h1">ICT Days Event Dates</h1>
                        <p>
                            Join us for three exciting days filled with innovation, hands-on activities, and opportunities to dive deep into the world of technology.
                        </p>
                        <button>REGISTER NOW</button>
                    </div>
                    
                    <div class="timeline-bottom">
                        <div class="timeline-row">
                            <img src="/assets/svg/timeline.svg" alt="line" />
                            <div>
                                <h2 class="row-date">Nov. 6, 2024</h2>
                                <h3 class="row-day">Wednesday</h3>
                                <ul class="row-list">
                                    <li>Opening | 1:00 - 4:00 pm</li>
                                    <li>Multiplayer Games</li>
                                    <li>Type Shark</li>
                                    <li>Codefest</li>
                                </ul>
                            </div>
                            
                        </div>
                        <div class="timeline-row">
                            <img src="/assets/svg/timeline.svg" alt="line" />
                            <div>
                                <h2 class="row-date">Nov. 7, 2024</h2>
                                <h3 class="row-day">Thursday</h3>
                                <ul class="row-list">
                                    <li>Opening | 1:00 - 4:00 pm</li>
                                    <li>Multiplayer Games</li>
                                    <li>Type Shark</li>
                                    <li>Codefest</li>
                                </ul>
                            </div>
                        </div>
                        <div class="timeline-row">
                            <img src="/assets/svg/timeline.svg" alt="line" />
                            <div>
                                <h2 class="row-date">Nov. 8, 2024</h2>
                                <h3 class="row-day">Friday</h3>
                                <ul class="row-list">
                                    <li>Opening | 1:00 - 4:00 pm</li>
                                    <li>Multiplayer Games</li>
                                    <li>Type Shark</li>
                                    <li>Codefest</li>
                                </ul>
                            </div>
                        </div>


                    </div>
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
