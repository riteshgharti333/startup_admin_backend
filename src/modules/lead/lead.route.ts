import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware";
import { leadController } from "./lead.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import {
  createLeadSchema,
  updateLeadSchema,
} from "../../common/utils/validation";

const router = Router();

// Public route - anyone can submit a lead
router.post(
  "/",
  validate(createLeadSchema),
  leadController.createLead
);

// Admin only routes
router.get(
  "/search",
  authMiddleware,
  authorize("ADMIN"),
  leadController.searchLeads
);

router.get(
  "/filter",
  authMiddleware,
  authorize("ADMIN"),
  leadController.filterLeads
);

router.get(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  leadController.getAllLeads
);

router.get(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  leadController.getLeadById
);

router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  validate(updateLeadSchema),
  leadController.updateLead
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  leadController.deleteLead
);

export { router as leadRouter };