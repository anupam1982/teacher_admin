const express = require('express');
const connection = require('../Helpers/connection');
const query = require('../Helpers/query');

const router = express.Router();
const dbConfig = require('../dbConfig');

const studentRepo = require('../Repository/studentRepo');
const studentsRepository = new studentRepo();

const teacherRepo = require('../Repository/teacherRepo');
const teachersRepository = new teacherRepo();

const teacherStudentRepo = require('../Repository/teacherStudentRepo');
const teachersStudentsRepository = new teacherStudentRepo();

router.post('/', async (req, res) => {
  const { teacher, students } = req.body;
  const conn = await connection(dbConfig).catch(e => { });
  let results = await teachersRepository.getTeacherByEmail(teacher);
  if (results && results.length <= 0) {
    let data = await teachersRepository.insertTeacherRecord(teacher);
  }
  let all_students = await studentsRepository.getAllStudents();
  let existing_students = [];
  all_students.forEach(async elem => {
    existing_students.push(elem.email);
  });
  let exclusive_students = [];
  for (var i = 0; i < students.length; i++) {
    if (existing_students.indexOf(students[i] < 0)) {
      exclusive_students.push(students[i])
    }
  }
  for (var j = 0; j < exclusive_students.length; j++) {
    await studentsRepository.insertStudentRecord(exclusive_students[j]);
  }

  // Get teacher id
  let tid = await teachersRepository.getTeacherIds(teacher);
  if (tid && tid[0] && tid[0].id) {
    // let existing_students_mapping = await query(conn, `SELECT email FROM students JOIN teachers_students ON students.id = teachers_students.student_id
    //                                   AND teachers_students.teacher_id=?`, [tid[0].id]);
    let existing_students_mapping = await teachersStudentsRepository.getTeacherStudentMapping(tid);
    let existing_arr = [];
    existing_students_mapping.forEach(async element => {
      existing_arr.push(element.email)
    });
    if (existing_arr.length > 0) {
      students.forEach(async elem => {
        if (existing_arr.indexOf(elem) < 0) {
          let stu = await studentsRepository.getStudentID(elem);
          if (stu) {
            await teachersStudentsRepository.insertTeacherStudentRecord(tid[0].id, stu[0].id);
          }
        }
      });
    }
    else {
      students.forEach(async elem => {
        let stu = await studentsRepository.getStudentID(elem);
        if (stu) {
          await teachersStudentsRepository.insertTeacherStudentRecord(tid[0].id, stu[0].id);
        }
      });
    }
  }
  res.status(204).send()
});

module.exports = router;