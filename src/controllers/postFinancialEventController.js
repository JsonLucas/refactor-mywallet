import insertFinancialEvent from "../database/queries/insert/financialEvent.js";
import jwt from "jsonwebtoken";

const postFinancialEventController = async (req, res) => {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.replace("Bearer ", "");

        if (!token) {
            return res.sendStatus(401);
        }

        let user;

        try {
            user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.sendStatus(401);
        }

        const { value, type } = req.body;

        if (!value || !type) {
            return res.sendStatus(422);
        }

        const financialTypes = ["INCOME", "OUTCOME"];
        if (!financialTypes.includes(type)) {
            return res.sendStatus(422);
        }

        if (value < 0) {
            return res.sendStatus(422);
        }

        await insertFinancialEvent(user.id, value, type);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
} 

export default postFinancialEventController;