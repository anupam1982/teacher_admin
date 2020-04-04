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

const HttpError = require('../Util/HttpError');

async function processRequest(ids) {
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

async function getTeacherIds(teacher) {
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
  try {
      let { teacher } = req.query;
      if (typeof (teacher) === "string") {
        teacher = [teacher];
      }
      const ids = await getTeacherIds(teacher);
      let arr = await processRequest(ids)
      intersected = Util.findCommonStudents(arr);
      response = { students: intersected };
      res.json(response).status(200).send();
    } catch(err) {
      e = new HttpError('Error Processing request', err.code, '400');
      res.status(400).send(e);
    }
});

module.exports = router;