const express = require('express');
const connection = require('../Helpers/connection');
const query = require('../Helpers/query');
const dbConfig = require('../dbConfig');

module.exports = class teacherStudentRepo {

  async getTeacherStudentMapping(tid) {

    const conn = await connection(dbConfig).catch(e => { });
    let results = await query(conn, `SELECT email FROM students JOIN teachers_students ON students.id = teachers_students.student_id
    AND teachers_students.teacher_id=?`, [tid[0].id]);
    return results;
  }

  async getNonSuspendedMapping(tid) {

    const conn = await connection(dbConfig).catch(e => { });
    let results = await query(conn, `SELECT email, status FROM students JOIN teachers_students 
                                     ON students.id = teachers_students.student_id
                                     AND students.status = ? AND teachers_students.teacher_id=?`, ['true', tid]);
    return results;
  }

  async insertTeacherStudentRecord(tid, sid) {
    const conn = await connection(dbConfig).catch(e => { });
    let results = await query(conn, `INSERT INTO teachers_students (teacher_id, student_id) VALUES (${tid} , ${sid})`);
    return results;
  }

}