import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware";
import { activityLogController } from "./activity-log.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import { createActivityLogSchema } from "../../common/utils/validation";

const router = Router();

// All routes admin-only
router.use(authMiddleware, authorize("ADMIN"));

// IMPORTANT: Specific routes before parameterized
router.get("/search", activityLogController.searchActivityLogs);

router.get("/filter", activityLogController.filterActivityLogs);

router.get(
  "/business/:businessId",
  activityLogController.getActivityLogsByBusinessId,
);

router.get("/", activityLogController.getAllActivityLogs);

router.get("/:id", activityLogController.getActivityLogById);

router.post(
  "/",
  validate(createActivityLogSchema),
  activityLogController.createActivityLog,
);

// No PUT route — activity logs are append-only
router.delete("/:id", activityLogController.deleteActivityLog);

export { router as activityLogRouter };