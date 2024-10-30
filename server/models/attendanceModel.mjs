


const updateAttendance = () => {}
// const getHourIn24Format = (timeString) => {
//     const dateObj = new Date(`01/01/2000 ${timeString}`);
//     if (isNaN(dateObj)) {
//         console.error('Invalid date:', timeString);
//         return null;
//     }
//     const hour = dateObj.getHours();
//     return hour;
// }

// const checkSession = (sessionType, time) => {
//     const split = time.split(' ');
//     const [hours, minutes, seconds] = split[0].split(':');

//     const dayTime = getHourIn24Format(time);

//     if (sessionType.toLowerCase() === 'in') {
//         const sessionIn = hours < dayTime && split === 'AM' ? 'amIn' : 'pmIn';
//         console.log('testAM', sessionIn)
//         return sessionIn
//     } else if (sessionType.toLowerCase() === 'out') {
//         const sessionOut = hours < dayTime && split == "PM" ? 'pmIn' : 'pmOut'
//         console.log('testPM', sessionOut)
//         return sessionOut;
//     }
// }


const checkAttendance = async (req, res) => {
    try {
        const data = req.body;
        const collection = await connect('attendance');

        for (const studentData of data) {
            const sessionField = checkSession(studentData.session, studentData.time);

            // Check if the attendance record for the specific date exists
            const attendanceRecord = await collection.findOne({
                uid: "attendance_records",
                [`attendance.${studentData.date}`]: { $exists: true }
            });

            if (attendanceRecord) {
                // Check if the student already exists for that date
                const existingStudent = attendanceRecord.attendance[studentData.date].find(
                    (entry) => entry.studentId === studentData.studentId
                );

                if (existingStudent) {
                    // Update the existing student's session
                    await collection.updateOne(
                        {
                            uid: "attendance_records",
                            [`attendance.${studentData.date}.studentId`]: studentData.studentId
                        },
                        {
                            $set: {
                                [`attendance.${studentData.date}.$[student].session.${sessionField}`]: studentData.time
                            }
                        },
                        {
                            arrayFilters: [{ "student.studentId": studentData.studentId }]
                        }
                    );
                    console.log(`Updated session for student ${studentData.studentId} on ${studentData.date}`);
                } else {
                    // Add a new student record for the date if the student doesn't exist
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
                        }
                    );
                    console.log(`Added new session for student ${studentData.studentId} on ${studentData.date}`);
                }
            } else {
                // If the date itself does not exist, create it with the new entry
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
                console.log(`Created date ${studentData.date} with first attendance for student ${studentData.studentId}`);
            }
        }
        res.send('Attendance processed successfully');
    } catch (error) {
        console.log('Error processing attendance:', error);
        res.status(500).send('Error processing attendance');
    }
};
