import { connect } from '../utils/dbUtils.mjs';

const checkAttendance = async (studentInformation) => {
    try {
        const data = studentInformation;
        const collection = await connect('attendance');
        const results = [];
        
        for (const studentData of data) {
            const sessionField = checkSession(studentData.session, studentData.time);

            const attendanceRecord = await collection.findOne({
                uid: "attendance_records",
                [`attendance.${studentData.date}`]: { $exists: true }
            });

            if (attendanceRecord) {
                const existingStudent = attendanceRecord.attendance[studentData.date].find((item) => item.studentId === studentData.studentId);
               
                if (existingStudent) {
                    await collection.updateOne(
                        {
                            uid: "attendance_records",
                            [`attendance.${studentData.date}.studentId`]: studentData.studentId
                        },
                        {
                            $set: {
                                [`attendance.${studentData.date}.$[studentz].session.${sessionField}`]: studentData.time
                            }
                        },
                        {
                            arrayFilters: [{ "studentz.studentId": studentData.studentId }]
                        }
                    );
                    results.push({ studentId: studentData.studentId, name: studentData.name, status: 'updated' });
                } else {
                    await collection.updateOne(
                        { uid: "attendance_records" },
                        {
                            $push: {
                                [`attendance.${studentData.date}`]: {
                                    studentId: studentData.studentId,
                                    name: studentData.name,
                                    session: { [sessionField]: studentData.time }
                                }     
                            }
                        },
                        { upsert: true }
                    );
                    results.push({ studentId: studentData.studentId, name: studentData.name, status: 'created' });
                }
            } else {
                await collection.updateOne(
                    { uid: "attendance_records" },
                    {
                        $set: {
                            [`attendance.${studentData.date}`]: [
                                {
                                    studentId: studentData.studentId,
                                    name: studentData.name,
                                    session: { [sessionField]: studentData.time }
                                }
                            ]
                        }
                    },
                    { upsert: true }
                );
                results.push({ studentId: studentData.studentId, name: studentData.name, status: 'created new record' });
            }
        }

        return {
            message: 'Attendance processed successfully',
            results
        };
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while processing attendance: ' + error.message);
    }
};



// JUST HELPER FUNCTIONS
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
    const [timePart, sessionPart] = time.split(' ');
    const [hours, minutes, seconds] = timePart.split(':');

    const dayTime = getHourIn24Format(time);

    console.log('daytime',dayTime)
    console.log(hours)

    if (sessionType.toLowerCase() === 'in') {
        const sessionIn = sessionPart === 'AM' ? 'amIn' : 'pmIn';
        console.log('testAM', sessionIn)
        return sessionIn;
    } else if (sessionType.toLowerCase() === 'out') {
        const sessionOut = sessionPart === 'AM' ? 'amOut' : 'pmOut';
        console.log('testPM', sessionOut)
        return sessionOut;

    }
}

export default {
    checkAttendance
}

