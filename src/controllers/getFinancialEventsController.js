import { getFinancialEvents } from "../database/queries/retrieve/financialEvent.js";
import jwt from "jsonwebtoken";

const getFinancialEventsController = async (req, res) => {
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

        const {rows} = await getFinancialEvents(user.id);

        res.send(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default getFinancialEventsController;