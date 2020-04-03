const express = require('express');
const studentRepo = require('../Repository/studentRepo');
const router = express.Router();

let studentsRepository = new studentRepo();

router.post('/', async (req, res) => {
  const { student } = req.body;
  await studentsRepository.updateStudentStatus(student);
  res.status(204).send()
});

module.exports = router;