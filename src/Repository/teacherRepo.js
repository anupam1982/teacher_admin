const express = require('express');
const connection = require('../Helpers/connection');
const query = require('../Helpers/query');
const dbConfig = require('../dbConfig');

module.exports = class teacherRepo {

    async  insertTeacherRecord(teacher) {
        const conn = await connection(dbConfig).catch(e => { });
        let results = await query(conn, `INSERT INTO teachers (name, email) VALUES (NULL , '${teacher}')`);
        return results;
    }

    async  getTeacherByEmail(teacher) {
        const conn = await connection(dbConfig).catch(e => { });
        let results = await query(conn, `SELECT * FROM teachers WHERE email=?`, [teacher]);
        return results;
    }

    async  getTeacherIds(teacher) {
        const conn = await connection(dbConfig).catch(e => { });
        let results = await query(conn, `SELECT id FROM teachers WHERE email=?`, [teacher]);
        return results;
    }

    async  deleteTeacherRecord(teacher) {
        const conn = await connection(dbConfig).catch(e => { });
        let results = await query(conn, `DELETE FROM teachers WHERE email=?`, [teacher]);
        return results;
    }
}