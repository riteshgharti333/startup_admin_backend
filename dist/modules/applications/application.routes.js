"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouter = void 0;
const express_1 = require("express");
const validate_middleware_1 = require("../../common/middleware/validate.middleware");
const application_controller_1 = require("./application.controller");
const application_validation_1 = require("./application.validation");
const upload_1 = require("../../common/middleware/upload");
const router = (0, express_1.Router)();
exports.applicationRouter = router;
// Public route - submit application with file upload
router.post("/", upload_1.upload.single("resume"), (0, validate_middleware_1.validate)(application_validation_1.createApplicationSchema), application_controller_1.applicationController.createApplication);
// Admin only routes
// router.get("/", authMiddleware, authorize("ADMIN"), applicationController.getAllApplications);
// router.get("/:id", authMiddleware, authorize("ADMIN"), applicationController.getApplicationById);
// router.delete("/:id", authMiddleware, authorize("ADMIN"), applicationController.deleteApplication);
router.get("/", application_controller_1.applicationController.getAllApplications);
router.get("/:id", application_controller_1.applicationController.getApplicationById);
router.delete("/:id", application_controller_1.applicationController.deleteApplication);
