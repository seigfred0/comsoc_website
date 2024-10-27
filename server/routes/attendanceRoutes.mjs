import express from 'express';
import studentCtrl from '../controllers/studentController.mjs';

const router = express.Router();

router.param('studentId', studentCtrl.fetchStudent)
router.route('/students')
    .get(studentCtrl.getAllStudents)
    .post(studentCtrl.createStudent);

router.route('/students/:studentId')
    .get(studentCtrl.getOneStudent)
    .delete(studentCtrl.deleteStudent); 




export default router;