const express = require('express');
const connection = require('../Helpers/connection');
const query = require('../Helpers/query');
const dbConfig = require('../dbConfig');

module.exports = class studentRepo {
    async  updateStudentStatus(student, status) {
        const conn = await connection(dbConfig).catch(e => { });
        let results = await query(conn, `UPDATE students SET status=? WHERE email=?`, [status, student]);
        return results;
    }

    async  getStudentID(elem) {
        const conn = await connection(dbConfig).catch(e => { });
        let results = await query(conn, `SELECT id FROM students WHERE email=?`, [elem]);
        return results;
    }

    async  getStudentStatus(elem) {
        const conn = await connection(dbConfig).catch(e => { });
        let results = await query(conn, `SELECT status FROM students WHERE email=?`, [elem]);
        return results;
    }

    async  getAllStudents() {
        const conn = await connection(dbConfig).catch(e => { });
        let results = await query(conn, `SELECT * FROM students`);
        return results;
    }

    async  insertStudentRecord(student) {
        const conn = await connection(dbConfig).catch(e => { });
        let results = query(conn, `INSERT INTO students (name, email) VALUES (NULL , '${student}')`);
        return results;
    }
}