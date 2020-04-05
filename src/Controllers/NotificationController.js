const express = require('express');
const router = express.Router();

const teacherRepo = require('../Repository/teacherRepo');
const teachersRepository = new teacherRepo();

const UtilityMethods = require('../Util/utilityMethods');
const Util = new UtilityMethods();

const teacherStudentRepo = require('../Repository/teacherStudentRepo');
const teachersStudentsRepository = new teacherStudentRepo();

const HttpError = require('../Util/HttpError');


async function getRegisteredStudents(tid) {
  var existing_arr = [];
  if (tid) {
    let existing_students_mapping = await teachersStudentsRepository.getNonSuspendedMapping(tid);
    existing_students_mapping.forEach(element => {
      existing_arr.push(element.email)
    });
  }
  return existing_arr;
}


exports.notificationlist = async function (req, res) {
  try {
    let { teacher, notification } = req.body;
    const emaillist = await Util.extractEmails(notification);
    const tid = await teachersRepository.getTeacherIds(teacher);
    const registeredStudents = []
    if(tid && tid[0] && tid[0].id)
    {
      registeredStudents = await getRegisteredStudents(tid[0].id)
    }
    var uniqueList = [...new Set(emaillist.concat(registeredStudents))];
    let response = { recipients: uniqueList };
    res.json(response).status(200).send();
  } catch (e) {
    err = new HttpError('Error Processing request', e.code, '400');
    res.status(400).send(err);
  }
}