import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware";
import { businessController } from "./business.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import {
  createBusinessSchema,
  updateBusinessSchema,
  bulkImportBusinessSchema,
} from "../../common/utils/validation";

const router = Router();

// All routes admin-only
router.use(authMiddleware, authorize("ADMIN"));

// IMPORTANT: Specific routes must come before parameterized routes
router.get("/search", businessController.searchBusinesses);

router.get("/filter", businessController.filterBusinesses);

router.post(
  "/bulk",
  validate(bulkImportBusinessSchema),
  businessController.bulkImport,
);

router.get("/", businessController.getAllBusinesses);

router.get("/:id", businessController.getBusinessById);

router.post(
  "/",
  validate(createBusinessSchema),
  businessController.createBusiness,
);

router.put(
  "/:id",
  validate(updateBusinessSchema),
  businessController.updateBusiness,
);

router.delete("/:id", businessController.deleteBusiness);

export { router as businessRouter };