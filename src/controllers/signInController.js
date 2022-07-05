import { getExistingUser } from "../database/queries/retrieve/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(422);
        }

        const { rows } = await getExistingUser(email);
        const [user] = rows;

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.sendStatus(401);
        }

        const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_SECRET
        );

        res.send({
            token,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default signInController;