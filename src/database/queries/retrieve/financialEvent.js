import connection from "../../database.js";
export const getFinancialEvents = async (id) => {
    const sql = `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`;
    const { rowCount, rows } = await connection.query(sql, [id]);
    return { rowCount, rows };
}