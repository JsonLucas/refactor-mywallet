import connection from "../../database.js";

export const getExistingUser = async (email) => { 
    const sql = `SELECT * FROM "users" WHERE "email"=$1`;
    const {rowCount, rows} = await connection.query(sql, [email]);
    return { rowCount, rows };
}
