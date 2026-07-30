"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/users/user.routes");
const application_routes_1 = require("../modules/applications/application.routes");
const lead_route_1 = require("../modules/lead/lead.route");
const subscriber_route_1 = require("../modules/subscriber/subscriber.route");
const router = (0, express_1.Router)();
router.get("/health", (_req, res) => {
    res.json({
        success: true,
        message: "API is healthy",
    });
});
router.use("/auth", auth_routes_1.authRouter);
router.use("/users", user_routes_1.userRouter);
router.use("/application", application_routes_1.applicationRouter);
router.use("/lead", lead_route_1.leadRouter);
router.use("/subscribe", subscriber_route_1.subscriberRouter);
exports.default = router;
