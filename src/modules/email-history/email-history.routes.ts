import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware";
import { emailHistoryController } from "./email-history.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import { createEmailHistorySchema } from "../../common/utils/validation";

const router = Router();

// All routes admin-only
router.use(authMiddleware, authorize("ADMIN"));

// IMPORTANT: Specific routes before parameterized
router.get("/search", emailHistoryController.searchEmailHistory);

router.get("/filter", emailHistoryController.filterEmailHistory);

router.get(
  "/business/:businessId",
  emailHistoryController.getEmailHistoryByBusinessId,
);

router.get("/", emailHistoryController.getAllEmailHistory);

router.get("/:id", emailHistoryController.getEmailHistoryById);

router.post(
  "/",
  validate(createEmailHistorySchema),
  emailHistoryController.createEmailHistory,
);

router.put("/:id", emailHistoryController.updateEmailHistory);

router.delete("/:id", emailHistoryController.deleteEmailHistory);

export { router as emailHistoryRouter };