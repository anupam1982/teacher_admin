const express = require('express');
const connection = require('../Helpers/connection');
const query = require('../Helpers/query');

const router = express.Router();
const dbConfig = require('../dbConfig');

const UtilityMethods = require('../Util/utilityMethods');
const Util = new UtilityMethods();

const teacherRepo = require('../Repository/teacherRepo');
const teachersRepository = new teacherRepo();


const teacherStudentRepo = require('../Repository/teacherStudentRepo');
const teachersStudentsRepository = new teacherStudentRepo();

async function processRequest(conn, ids) {
  var overall_arr = [];
  for (var i = 0; i < ids.length; i++) {
    var tid = ids[i];
    let existing_arr = [];
    if (tid) {
      let existing_students_mapping = await teachersStudentsRepository.getNonSuspendedMapping(tid);
      existing_students_mapping.forEach(element => {
        existing_arr.push(element.email)
      });
    }
    overall_arr.push(existing_arr);
  }
  return overall_arr;
}

async function getTeacherIds(conn, teacher) {
  var ids_arr = [];
  for (var i = 0; i < teacher.length; i++) {
    let tid = await teachersRepository.getTeacherIds(teacher[i])
    if (tid && tid[0]) {
      ids_arr.push(tid[0].id);
    }
  }
  return ids_arr;
}
router.get('/', async (req, res) => {
  let { teacher } = req.query;
  if (typeof (teacher) === "string") {
    teacher = [teacher];
  }
  const conn = await connection(dbConfig).catch(e => { });
  const ids = await getTeacherIds(conn, teacher);
  let arr = await processRequest(conn, ids)
  intersected = Util.findCommonStudents(arr);
  response = { students: intersected };
  res.json(response).status(200).send();
});

module.exports = router;