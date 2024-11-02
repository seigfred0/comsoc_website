
const url = "http://localhost:5000"

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

export default {
    sendAttendance,
    createStudent

}