import { connect } from "../utils/dbUtils.mjs"

const getHourIn24Format = (timeString) => {
    const dateObj = new Date(`01/01/2000 ${timeString}`);
    if (isNaN(dateObj)) {
        console.error('Invalid date:', timeString);
        return null;
    }
    const hour = dateObj.getHours();
    return hour;
}

const checkSession = (sessionType, time) => {
    // const time = date;
    // console.log(time)
    const split = time.split(' ');
    const [hours, minutes, seconds] = split[0].split(':');

    const dayTime = getHourIn24Format(time);

    if (sessionType.toLowerCase() === 'in') {
        const sessionIn = hours < dayTime && split === 'AM' ? 'amIn' : 'pmIn';
        console.log('testAM', sessionIn)
        return sessionIn
    } else if (sessionType.toLowerCase() === 'out') {
        const sessionOut = hours < dayTime && split == "PM" ? 'pmIn' : 'pmOut'
        console.log('testPM', sessionOut)
        return sessionOut;
    }
}

const checkAttendance = async (req, res) => {
    // problem: this creates a new data everytime. It does not update existing data!
    try {
        const data = req.body;
        const collection = await connect('attendance');

        console.log(data)

        for (const studentData of data) {
            const sessionField = checkSession(studentData.session, studentData.time)

            // const result = await collection.updateOne(
            //     {   
            //         uid: "attendance_records"
            //     },
            //     {
            //         $push: {
            //             [`attendance.${studentData.date}`]: {  
            //                 studentId: studentData.studentId,
            //                 name: studentData.name,
            //                 session: {
            //                     [sessionField]: studentData.time
            //                 }
            //             }
            //         }
            //     },
            //     {
            //         upsert: true  
            //     }
            // );
            
            
            // const result = await collection.updateOne(
            //     { 
            //         uid: "attendance",
            //         [`attendance.${date}.studentId`]: studentData.studentId

            //     },
            //     {
            //         $push: {
            //             [`attendance.${date}`]: {
            //                 studentId: studentData.studentId,
            //                 name: studentData.name,
            //                 session: {
            //                     [sessionField]: studentData.time
            //                 }
            //             }
            //             // [`attendance.${date}.$.session.${sessionField}`]: studentData.time,
            //             // [`attendance.${date}.$.name`]: studentData.name
            //         }
            //     },
            //     { upsert: true }
            // )


            console.log(result)
        }
        res.send('received something')
    } catch (error) {
        console.log('error',error)   
    }
}

/*

*/


export default {checkAttendance}