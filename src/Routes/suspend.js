const express = require('express');
const studentRepo = require('../Repository/studentRepo');
const router = express.Router();

const HttpError = require('../Util/HttpError');

let studentsRepository = new studentRepo();

router.post('/', async (req, res) => {
  try {
    const { student } = req.body;
    await studentsRepository.updateStudentStatus(student);
    res.status(204).send()
  } catch (err) {
      e = new HttpError('Error Processing request', err.code, '400');
      res.status(400).send(e);
  }
});

module.exports = router;