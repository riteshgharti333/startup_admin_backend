import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware";
import { applicationController } from "./application.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import {
  createApplicationSchema,
  updateApplicationSchema,
} from "../../common/utils/validation";

const router = Router();

// Public route - submit application (no file upload)
router.post(
  "/",
  validate(createApplicationSchema),
  applicationController.createApplication,
);

// Admin only routes
// IMPORTANT: Specific routes must come before parameterized routes
router.get(
  "/search",
  authMiddleware,
  authorize("ADMIN"),
  applicationController.searchApplications,
);

router.get(
  "/filter",
  authMiddleware,
  authorize("ADMIN"),
  applicationController.filterApplications,
);

router.get(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  applicationController.getAllApplications,
);

router.get(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  applicationController.getApplicationById,
);

router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  validate(updateApplicationSchema),
  applicationController.updateApplication,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  applicationController.deleteApplication,
);

export { router as applicationRouter };
