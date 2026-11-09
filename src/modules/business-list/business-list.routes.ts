import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware";
import { businessListController } from "./business-list.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import {
  createBusinessListSchema,
  updateBusinessListSchema,
} from "../../common/utils/validation";

const router = Router();

// All routes admin-only
router.use(authMiddleware, authorize("ADMIN"));

// IMPORTANT: Specific routes must come before parameterized routes
router.get("/search", businessListController.searchBusinessLists);

router.get("/filter", businessListController.filterBusinessLists);

router.get("/", businessListController.getAllBusinessLists);

router.get("/:id", businessListController.getBusinessListById);

router.post(
  "/",
  validate(createBusinessListSchema),
  businessListController.createBusinessList,
);

router.put(
  "/:id",
  validate(updateBusinessListSchema),
  businessListController.updateBusinessList,
);

router.delete("/:id", businessListController.deleteBusinessList);

export { router as businessListRouter };