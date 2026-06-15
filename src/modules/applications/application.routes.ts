import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware";
import { applicationController } from "./application.controller";
import { createApplicationSchema } from "./application.validation";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import { upload } from "../../common/middleware/upload";

const router = Router();

// Public route - submit application with file upload
router.post(
  "/",
  upload.single("resume"),
  validate(createApplicationSchema),
  applicationController.createApplication,
);

// Admin only routes
// router.get("/", authMiddleware, authorize("ADMIN"), applicationController.getAllApplications);
// router.get("/:id", authMiddleware, authorize("ADMIN"), applicationController.getApplicationById);
// router.delete("/:id", authMiddleware, authorize("ADMIN"), applicationController.deleteApplication);

router.get("/", applicationController.getAllApplications);
router.get("/:id", applicationController.getApplicationById);
router.delete("/:id", applicationController.deleteApplication);

export { router as applicationRouter };
