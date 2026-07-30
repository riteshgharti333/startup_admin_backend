"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadRouter = void 0;
const express_1 = require("express");
const validate_middleware_1 = require("../../common/middleware/validate.middleware");
const lead_controller_1 = require("./lead.controller");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const authorize_middleware_1 = require("../../common/middleware/authorize.middleware");
const validation_1 = require("../../common/utils/validation");
const router = (0, express_1.Router)();
exports.leadRouter = router;
// Public route - anyone can submit a lead
router.post("/", (0, validate_middleware_1.validate)(validation_1.createLeadSchema), lead_controller_1.leadController.createLead);
// Admin only routes
router.get("/search", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), lead_controller_1.leadController.searchLeads);
router.get("/filter", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), lead_controller_1.leadController.filterLeads);
router.get("/", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), lead_controller_1.leadController.getAllLeads);
router.get("/:id", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), lead_controller_1.leadController.getLeadById);
router.put("/:id", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validate)(validation_1.updateLeadSchema), lead_controller_1.leadController.updateLead);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), lead_controller_1.leadController.deleteLead);
