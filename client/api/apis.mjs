
const url = "http://localhost:5000"
// const url = "http://47.128.83.182:5000"
// const url = "http://ec2-47-128-83-182.ap-southeast-1.compute.amazonaws.com:5000"
// const url = "http://comsocmalaybalay.online:5000"

const sendAttendance = async (data) => {
    try {
        // const data = { name: 'seigfreda' }
        const result = await axios.post(`${url}/attendance`, data)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

const createStudent = async (data) => {
    try {
        const result = await axios.post(`${url}/attendance/students`, data);
        console.log(result.data)
        return result.data
    } catch (error) {
     console.log(error)   
    }
}

const getAttendance = async () => {
    try {
        const result = await axios.get(`${url}/attendance`)
        console.log(result.data)
        return result.data
    } catch (error) {
        console.log(error)
    }
}



// AUTHENTICATION

const login = async (data) => {
    try {
        const response = await axios.post(`${url}/attendance/login`, data);
        // const { token } = response.data;
        // localStorage.setItem('authToken', token); 
        console.log(response);
       if (response) {
        return false
       }     
    } catch (error) {
        console.log(error)
        return false
    }
}

const logout = () => {
    localStorage.removeItem('authToken'); 
}

const isAuthenticated = () => {
    return localStorage.getItem('isLoggedIn') === 'true';

}



export default {
    sendAttendance,
    createStudent,
    getAttendance,
    login,
    logout,
    isAuthenticated
}