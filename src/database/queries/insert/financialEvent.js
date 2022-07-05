import connection from "../../database.js";
const insertFinancialEvent = async (id, value, type) => {
    const sql = `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`;
    const { rowCount } = await connection.query(sql, [id, value, type]);
    return { rowCount };
}

export default insertFinancialEvent;