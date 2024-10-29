
const url = "http://localhost:5000/attendance"

const sendAttendance = async (data) => {
    try {
        // const data = { name: 'seigfreda' }
        const result = await axios.post(url, data)
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export default {sendAttendance}