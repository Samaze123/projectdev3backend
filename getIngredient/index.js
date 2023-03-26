const sql = require('mssql');
const config = require('../config.js');

module.exports = async function (context, req) {
	try {
		const pool = await sql.connect(config);
		const idRec = req.query.name;

		// Verify that idIng is not null
		if (!idRec) {
			context.res = {
				status: 400,
				body: 'name parameter is required',
			};
			return;
		}
		const result = await pool
			.request()
			.query(`SELECT * FROM ingredients where nameIng='${idRec}'`);

		// Verify that result is not null
		if (!result.recordset || result.recordset.length === 0) {
			context.res = {
				status: 404,
				body: `No ingredient found with the specified name ${idRec}`,
			};
			return;
		}

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
