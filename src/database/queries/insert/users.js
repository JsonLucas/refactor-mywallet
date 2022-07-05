import connection from "../../database.js";

const setUser = async (name, email, hashedPassword) => {
    const sql = `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`;
    const { rowCount } = await connection.query(sql, [name, email, hashedPassword]);
    return { rowCount };
}

export default setUser;