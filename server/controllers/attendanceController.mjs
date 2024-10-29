import { connect } from "../utils/dbUtils.mjs"


const checkSession = (session) => {
    console.log(session)
    // if session 
}

const checkAttendance = async (req, res) => {
    try {
        const data = req.body;
        const collection = await connect('attendance');

        for (const studentData of data) {
            const date = studentData.date;

            checkSession(studentData.session)

            const result = await collection.updateOne(
                { uid: "attendance" },
                {
                    $push: {
                        [`attendance.${date}`]: {
                            studentId: studentData.studentId,
                            name: studentData.name,
                            session: {
                                amIn: studentData.session,
                                amOut: studentData.session,
                                pmIn: studentData.session,
                                pmOut: studentData.session
                            }
                        }
                    }
                },
                { upsert: true }
            )
            console.log(result)
        }

        res.send('received something')
    } catch (error) {
        console.log('error',error)   
    }
}

/*
 for (const record of data) {
            const date = record.date; // Extract date from each record

            const result = await collection.updateOne(
                { uid: "attendance" },
                {
                    $push: {
                        [`attendance.${date}`]: {
                            studentId: record.studentId,
                            uid: record.uid,
                            name: record.name,
                            amIn: record.amIn,
                            amOut: record.amOut,
                            pmIn: record.pmIn,
                            pmOut: record.pmOut
                        }
                    }
                },
                { upsert: true }
            );

            console.log(result);
        }


*/


export default {checkAttendance}