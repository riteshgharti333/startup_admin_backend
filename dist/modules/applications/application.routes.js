"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRouter = void 0;
const express_1 = require("express");
const validate_middleware_1 = require("../../common/middleware/validate.middleware");
const application_controller_1 = require("./application.controller");
const application_validation_1 = require("./application.validation");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const authorize_middleware_1 = require("../../common/middleware/authorize.middleware");
const router = (0, express_1.Router)();
exports.applicationRouter = router;
// Public route - submit application (no file upload)
router.post("/", (0, validate_middleware_1.validate)(application_validation_1.createApplicationSchema), application_controller_1.applicationController.createApplication);
// Admin only routes
router.get("/", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), application_controller_1.applicationController.getAllApplications);
router.get("/:id", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), application_controller_1.applicationController.getApplicationById);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), application_controller_1.applicationController.deleteApplication);
