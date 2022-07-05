import setUser from "../database/queries/insert/users.js";
import bcrypt from "bcrypt";

const signUpController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.sendStatus(422);
        }

        const existingUsers = await getExistingUser(email);

        if (existingUsers.rowCount > 0) {
            return res.sendStatus(409);
        }

        const hashedPassword = bcrypt.hashSync(password, 12);

        await setUser(name, email, hashedPassword);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default signUpController;