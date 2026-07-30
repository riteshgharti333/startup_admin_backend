"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouter = void 0;
const express_1 = require("express");
const validate_middleware_1 = require("../../common/middleware/validate.middleware");
const application_controller_1 = require("./application.controller");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const authorize_middleware_1 = require("../../common/middleware/authorize.middleware");
const validation_1 = require("../../common/utils/validation");
const router = (0, express_1.Router)();
exports.applicationRouter = router;
// Public route - submit application (no file upload)
router.post("/", (0, validate_middleware_1.validate)(validation_1.createApplicationSchema), application_controller_1.applicationController.createApplication);
// Admin only routes
// IMPORTANT: Specific routes must come before parameterized routes
router.get("/search", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), application_controller_1.applicationController.searchApplications);
router.get("/filter", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), application_controller_1.applicationController.filterApplications);
router.get("/", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), application_controller_1.applicationController.getAllApplications);
router.get("/:id", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), application_controller_1.applicationController.getApplicationById);
router.put("/:id", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validate)(validation_1.updateApplicationSchema), application_controller_1.applicationController.updateApplication);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), application_controller_1.applicationController.deleteApplication);
