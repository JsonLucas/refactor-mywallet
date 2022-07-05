import { getFinancialEvents } from "../database/queries/retrieve/financialEvent.js";
import jwt from "jsonwebtoken";

const financialEventsSumController = async (req, res) => {
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

        const sum = rows.reduce(
            (total, event) =>
                event.type === "INCOME" ? total + event.value : total - event.value,
            0
        );

        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default financialEventsSumController;