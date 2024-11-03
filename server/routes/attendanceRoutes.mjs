import express from 'express';
import studentCtrl from '../controllers/studentController.mjs';
import attendanceCtrl from '../controllers/attendanceController.mjs';
import authCtrl from '../controllers/authController.mjs';
const router = express.Router();

router.param('studentId', studentCtrl.fetchStudent)

router.route('/students')
    .get(studentCtrl.getAllStudents)
    .post(studentCtrl.createStudent);

router.route('/students/:studentId')
    .get(studentCtrl.getOneStudent)
    .delete(studentCtrl.deleteStudent); 

router.route('/login')
    .post(authCtrl.login)

router.route('/')
    .get(attendanceCtrl.getAttendance)
    .post(attendanceCtrl.checkAttendance)


export default router;