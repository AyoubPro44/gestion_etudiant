const Report = require('../models/reportModel');
const jwt = require('jsonwebtoken');

class ReportController {
    async getReports(req, res) {
        try {
            const [reports] = await Report.getReports()
            return res.status(200).json({ reports: reports});
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

}

module.exports = new ReportController();
