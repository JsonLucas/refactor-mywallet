import { Router } from "express";
import financialEventsSumController from "../../controllers/financialEventsSumController.js";
import getFinancialEventsController from "../../controllers/getFinancialEventsController.js";
import postFinancialEventController from "../../controllers/postFinancialEventController.js";

const financial = Router();

financial.post("/financial-events", postFinancialEventController);
financial.get("/financial-events", getFinancialEventsController);
financial.get("/financial-events/sum", financialEventsSumController);

export default financial;