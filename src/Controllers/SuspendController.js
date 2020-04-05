
const studentRepo = require('../Repository/studentRepo');

const HttpError = require('../Util/HttpError');

let studentsRepository = new studentRepo();

exports.suspend = async function (req, res) {
  try {
    const { student } = req.body;
    if(student === undefined || student === ""){
      throw new HttpError("Invalid Payload", 400);
    }
    await studentsRepository.updateStudentStatus(student, 'false');
    res.status(204).send()
  } catch (err) {
      e = new HttpError('Error Processing request', 400, '400');
      res.status(400).send(e);
  }
};