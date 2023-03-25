const sql = require('mssql');
const config = require('../config.js');

module.exports = async function (context, req) {
	try {
		const pool = await sql.connect(config);
		// console.log('Connected to SQL database');

		const result = await pool.request().query('SELECT * FROM recipes');
		// console.log(result.recordset.length + ' rows returned');

		context.res = {
			// body: 'Connected to SQL database',
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
