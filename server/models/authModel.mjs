import { connect } from "../utils/dbUtils.mjs";
// purpose of this function = validate if the user is a student in STI.
const validate = async (studentData) => {
    try {
        const collection = await connect('attendance');
        const { master_list } = await collection.findOne(
            { uid: "attendance"},
            { projection: {
                master_list: 1,
                _id: 0
            }}
        );

        const { students } = await collection.findOne(
            { uid: "attendance"},
            { projection: {
                students: 1,
                _id: 0
            }}
        )
 
        const result = master_list.find((student) => {
            return student.name === studentData.name && student.year === studentData.year
        })

        const existing = students.find((student) => {
            return student.name === studentData.name
        })

        if (result && !existing) {
            return true
        }
        return false
    } catch (error) {
        console.log('Error in master list:', error);
        throw new Error('Failed to get master list');
    }
}

export default {
    validate
}
