import { Router } from "express";

import { authRouter } from "../modules/auth/auth.routes";
import { userRouter } from "../modules/users/user.routes";
import { applicationRouter } from "../modules/applications/application.routes";
import { leadRouter } from "../modules/lead/lead.route";
import { subscriberRouter } from "../modules/subscriber/subscriber.route";
import { businessListRouter } from "../modules/business-list/business-list.routes";
import { businessRouter } from "../modules/business/business.routes";
import { emailHistoryRouter } from "../modules/email-history/email-history.routes";
import { whatsappHistoryRouter } from "../modules/whatsapp-history/whatsapp-history.routes";
import { activityLogRouter } from "../modules/activity-log/activity-log.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
});

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/application", applicationRouter);
router.use("/lead", leadRouter);
router.use("/subscribe", subscriberRouter);
router.use("/business-lists", businessListRouter);
router.use("/businesses", businessRouter);
router.use("/email", emailHistoryRouter);
router.use("/whatsapp", whatsappHistoryRouter);
router.use("/api/v1/activity-logs", activityLogRouter);

export default router;