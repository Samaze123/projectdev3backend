const sql = require('mssql');
const config = require('../config.js');

module.exports = async function (context, req) {
	try {
		const pool = await sql.connect(config);
		const idIng = req.query.id;

		// Verify that idIng is not null
		if (!idIng) {
			context.res = {
				status: 400,
				body: 'id parameter is required',
			};
			return;
		}
		const result = await pool
			.request()
			.query(`SELECT * FROM recipes where idRec=${idIng}`);

		// Verify that result is not null
		if (!result.recordset || result.recordset.length === 0) {
			context.res = {
				status: 404,
				body: `No recipes found with the specified id ${idIng}`,
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
