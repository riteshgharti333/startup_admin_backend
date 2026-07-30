import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware";
import { subscriberController } from "./subscriber.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import { subscribeEmailSchema } from "../../common/utils/validation";

const router = Router();

// Public route - anyone can subscribe
router.post(
  "/",
  validate(subscribeEmailSchema),
  subscriberController.subscribe,
);

// Admin only routes
router.get(
  "/search",
  authMiddleware,
  authorize("ADMIN"),
  subscriberController.searchSubscribers,
);

router.get(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  subscriberController.getAllSubscribers,
);

export { router as subscriberRouter };
