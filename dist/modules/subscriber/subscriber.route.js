"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberRouter = void 0;
const express_1 = require("express");
const validate_middleware_1 = require("../../common/middleware/validate.middleware");
const subscriber_controller_1 = require("./subscriber.controller");
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const authorize_middleware_1 = require("../../common/middleware/authorize.middleware");
const validation_1 = require("../../common/utils/validation");
const router = (0, express_1.Router)();
exports.subscriberRouter = router;
// Public route - anyone can subscribe
router.post("/", (0, validate_middleware_1.validate)(validation_1.subscribeEmailSchema), subscriber_controller_1.subscriberController.subscribe);
// Admin only routes
router.get("/search", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), subscriber_controller_1.subscriberController.searchSubscribers);
router.get("/", auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorize)("ADMIN"), subscriber_controller_1.subscriberController.getAllSubscribers);
