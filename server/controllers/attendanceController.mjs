import { connect } from "../utils/dbUtils.mjs"
import attendanceModel from "../models/attendanceModel.mjs";



const checkAttendance = async (req, res) => {
    try {
        const studentInformation = req.body; 
        const result = await attendanceModel.checkAttendance(studentInformation);
        
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

// const checkAttendance = async (req, res) => {
//     try {
//         const data = req.body
//         const collection = await connect('attendance');
//         const results = [];
        
//         for (const studentData of data) {
//             const sessionField = checkSession(studentData.session, studentData.time);

//             const attendanceRecord = await collection.findOne({
//                 uid: "attendance_records",
//                 [`attendance.${studentData.date}`]: { $exists: true }
//             })

//             console.log(attendanceRecord)
            
//             if (attendanceRecord) {
//                 const existingStudent = attendanceRecord.attendance[studentData.date].find((item) => item.studentId === studentData.studentId)
               
//                 if (existingStudent) {
//                     await collection.updateOne(
//                         {
//                             uid: "attendance_records",
//                             [`attendance.${studentData.date}.studentId`]: studentData.studentId
//                         },
//                         {
//                             // [student]?
//                             $set: {
//                                 [`attendance.${studentData.date}.$[studentz].session.${sessionField}`]: studentData.time
//                                 // [`attendance.${studentData.date}.$[student].name`]: studentData.name
//                             }
//                         },
//                         {
//                             arrayFilters: [{ "studentz.studentId": studentData.studentId}]
//                         }
//                     );
//                     results.push({ studentId: studentData.studentId, name: studentData.name, status: 'updated' });
//                 } else {
//                     await collection.updateOne(
//                         { uid: "attendance_records" },
//                         {
//                             $push: {
//                                 [`attendance.${studentData.date}`]: 
//                                     {
//                                         studentId: studentData.studentId,
//                                         name: studentData.name,
//                                         session: { [sessionField]: studentData.time }
//                                     }     
//                             }
//                         },
//                         { upsert: true }
//                     )
//                     results.push({ studentId: studentData.studentId, name: studentData.name, status: 'created' });

//                 }
//             } else {
//                 await collection.updateOne(
//                     { uid: "attendance_records" },
//                     {
//                         $set: {
//                             [`attendance.${studentData.date}`]: [
//                                 {
//                                     studentId: studentData.studentId,
//                                     name: studentData.name,
//                                     session: { [sessionField]: studentData.time }
//                                 }
//                             ]
//                         }
//                     },
//                     { upsert: true }
//                 );
//                 results.push({ studentId: studentData.studentId, name: studentData.name, status: 'created new record' });
//             }

//         }
//         res.status(200).json({
//             message: 'Attendance processed successfully',
//             results
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'An error occurred while processing attendance',
//             error: error.message
//         });
//     }
    
// }


// const checkAttendance = async (req, res) => {
//     try {
//         const data = req.body;
//         const collection = await connect('attendance');

//         console.log(data)
        
//         const isExisiting = async (day) => {
//             const result = await collection.find(
//                 {
//                     uid: "attendance_records",
//                 },
                
//             ).toArray()
//             const attendanceRecord = result[0]['attendance'][day];
//             console.log('99',attendanceRecord)

//             return [attendanceRecord]
//         }

//         for (const studentData of data) {
//             const sessionField = checkSession(studentData.session, studentData.time);

//             const userExist = await isExisiting(studentData.date)

//             const finaltest = userExist.find((student) => {
//                 return student.studentId === studentData.studentId
//             })

//             console.log('------', finaltest)


//             if (!finaltest) {
//                 const result = await collection.updateOne(
//                     {   
//                         uid: "attendance_records"
//                     },
//                     {
//                         $push: {
//                             [`attendance.${studentData.date}`]: {  
//                                 studentId: studentData.studentId,
//                                 name: studentData.name,
//                                 session: {
//                                     [sessionField]: studentData.time
//                                 }
//                             }
//                         }
//                     },
//                     {
//                         upsert: true  
//                     }
//                 );
//                 console.log(result)
//             } else {
//                 const result = await collection.updateOne(
//                     {   
//                         uid: "attendance_records"
//                     },
//                     {
//                         $set: {
//                             [`attendance.${studentData.date}`]: {  
//                                 studentId: studentData.studentId,
//                                 name: studentData.name,
//                                 session: {
//                                     [sessionField]: studentData.time
//                                 }
//                             }
//                         }
//                     },
//                     {
//                         upsert: true  
//                     }
//                 );
//             }


//             console.log('heyyy',finaltest)
          
//             // const attendanceRecord = await collection.find(
//             //     {
//             //         uid: "attendance_records",
//             //     },
                
//             // ).toArray()

    

//             // const result = await collection.updateOne(
//             //     {   
//             //         uid: "attendance_records"
//             //     },
//             //     {
//             //         $push: {
//             //             [`attendance.${studentData.date}`]: {  
//             //                 studentId: studentData.studentId,
//             //                 name: studentData.name,
//             //                 session: {
//             //                     [sessionField]: studentData.time
//             //                 }
//             //             }
//             //         }
//             //     },
//             //     {
//             //         upsert: true  
//             //     }
//             // );



//             // const attendanceRecord = await collection.findOne({
//             //     uid: "attendance_records",
//             //     [`attendance.10/29/2024.studentId`]: studentData.studentId
//             // });
//             // const attendanceRecord = await collection.findOne({
//             //     uid: "attendance_records",
//             //     attendance: {
//             //         $elemMatch: {
//             //             "10/29/2024": {
//             //                 studentId: studentData.studentId
//             //             }
//             //         }
//             //     }
//             // });
//             // const attendanceRecord = await collection.findOne({
//             //     uid: "attendance_records",
//             //     [`attendance.${studentData.date}`]: {
//             //         $elemMatch: { studentId: studentData.studentId }
//             //     }
//             // });



//             // const testDate = '10/29/2024'

//             // const attendanceRecord = await collection.findOne({
//             //     uid: "attendance_records",
//             //     [`attendance.${testDate}.studentId`]: studentData.studentId
//             // });

//             // console.log('Does it exist',attendanceRecord)



//             // const testId = { studentId: "34ba1b13-e419-47e2-be1d-0f6e54ec3314" };
//             // const testDate = '10/29/2024';

//             // const attendanceRecord = await collection.findOne({
//             // uid: "attendance_records",
//             // attendance: {
//             //     [testDate]: {
//             //         $elemMatch: {
//             //             studentId: studentData.studentId
//             //         }
//             //     }
//             // }
//             // });
            

//             // console.log('hey',attendanceRecord)



        
            
             
            
//             // const result = await collection.updateOne(
//             //     { 
//             //         uid: "attendance",
//             //         [`attendance.${date}.studentId`]: studentData.studentId

//             //     },
//             //     {
//             //         $push: {
//             //             [`attendance.${date}`]: {
//             //                 studentId: studentData.studentId,
//             //                 name: studentData.name,
//             //                 session: {
//             //                     [sessionField]: studentData.time
//             //                 }
//             //             }
//             //             // [`attendance.${date}.$.session.${sessionField}`]: studentData.time,
//             //             // [`attendance.${date}.$.name`]: studentData.name
//             //         }
//             //     },
//             //     { upsert: true }
//             // )

//         }
//         res.send('received something')
//     } catch (error) {
//         console.log('error',error)   
//     }
// }

/*

*/


export default {checkAttendance}