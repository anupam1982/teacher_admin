const express = require('express');
const connection = require('../Helpers/connection');
const query = require('../Helpers/query');

const router = express.Router();
const dbConfig = require('../dbConfig');

const teacherRepo = require('../Repository/teacherRepo');
const teachersRepository = new teacherRepo();

const UtilityMethods = require('../Util/utilityMethods');
const Util = new UtilityMethods();

const teacherStudentRepo = require('../Repository/teacherStudentRepo');
const teachersStudentsRepository = new teacherStudentRepo();


async function getRegisteredStudents(conn, tid) {
    var existing_arr = [];
    if (tid) {
      let existing_students_mapping = await teachersStudentsRepository.getNonSuspendedMapping(tid);
      existing_students_mapping.forEach(element => {
        existing_arr.push(element.email)
      });
    }
  return existing_arr;
}


router.post('/', async (req, res) => {

 let { teacher, notification} = req.body;
 const emaillist = await Util.extractEmails(notification);
 const conn = await connection(dbConfig).catch(e => { });
 const tid = await teachersRepository.getTeacherIds(teacher);
 const registeredStudents = await getRegisteredStudents(conn, tid[0].id)
 var uniqueList = [ ...new Set(emaillist.concat(registeredStudents))];
 let response = {recipients: uniqueList};
 res.json(response).status(200).send();
});

module.exports = router;