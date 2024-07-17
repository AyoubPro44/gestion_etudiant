const db = require('../config/db');

const saveReport = async (id_porf, report_content) => {
    return db.query(`INSERT INTO report (ID_PROFESSEUR, report_content, date_report)
                    VALUES (?, ?, NOW())`, [id_porf, report_content])
}

const getReports = async () => {
    return db.query(`
        SELECT u.firstname, u.lastname, r.id_report, r.id_professeur ,r.report_content, DATE_FORMAT(r.DATE_REPORT, '%d/%m/%Y %H:%i') as report_date
        FROM report r, professeur p, users u
        WHERE r.ID_PROFESSEUR = p.ID_PROFESSEUR
        and u.ID_USER = p.ID_USER
        ORDER BY r.DATE_REPORT DESC;
    `) 
}

module.exports = {
    saveReport,
    getReports
};
