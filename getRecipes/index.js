const sql = require('mssql');
const config = require('../config.js');

module.exports = async function (context, req) {
	try {
		const pool = await sql.connect(config);

		const result = await pool.request().query('SELECT * FROM recipes');

		context.res = {
			status: 200,
			body: result.recordset,
		};
	} catch (err) {
		console.log(err);
		context.res = {
			status: 500,
			body: 'Failed to execute query',
		};
	}
};
