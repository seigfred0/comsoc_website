import { connect } from '../utils/dbUtils.mjs';

const createStudent = async (userData) => {
    try {
        const collection = await connect('attendance');
        const result = await collection.updateOne(
            { uid: "attendance"},
            {
                $push: {
                    students: userData
                }
            }
        )
        
        if (result) {
            return { message: 'New Student Registered' }
        }
    } catch (error) {
        console.log('Error creating students:', error);
        throw new Error('Failed to create students');
    }
}

const getAllStudents = async () => {
    try {
        const collection = await connect('attendance');
        const result = await collection.findOne(
            { uid: "attendance"},
            {
                projection: {
                    students: 1,
                    _id: 0
                }
            }
        );
        return result.students ? result.students : null;
    } catch (error) {
        console.log('Error getting all students:', error);
        throw new Error('Failed to fetch students');
    }
}

const deleteStudent = async (studentId) => {
    try {
        const collection = await connect('attendance');
        const result = await collection.updateOne(
            { uid: 'attendance'},
            {
                $pull: {
                    students: { uuid: studentId }
                }
            }
        )
        
        if (result.modifiedCount) {
            return { message: 'Student Deleted' }
        }
    } catch (error) {
        console.log('Error deleting:', error);
        throw new Error('Failed to delete student');
    }
}



const fetchStudent = async (studentId) => {
    try {
        const collection = await connect('attendance');
        const result = await collection.findOne(
            { uid: "attendance"},
            { projection: {
                students: 1,
                _id: 0
            }}
        );

        if (result && result.students) {
            const foundStudent = result.students.find(student => student.uuid === studentId)
            return foundStudent
        }
        return null;
    } catch (error) {
        console.log(error)
        throw error
    } 
}

export default {    
    fetchStudent,
    getAllStudents,
    deleteStudent,
    createStudent
}

