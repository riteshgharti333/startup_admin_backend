import { Router } from "express";
import { validate } from "../../common/middleware/validate.middleware";
import { whatsappHistoryController } from "./whatsapp-history.controller";
import { authMiddleware } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/authorize.middleware";
import {
  createWhatsAppHistorySchema,
  updateWhatsAppHistorySchema,
} from "../../common/utils/validation";

const router = Router();

// All routes admin-only
router.use(authMiddleware, authorize("ADMIN"));

// IMPORTANT: Specific routes before parameterized
router.get("/search", whatsappHistoryController.searchWhatsAppHistory);

router.get("/filter", whatsappHistoryController.filterWhatsAppHistory);

router.get(
  "/business/:businessId",
  whatsappHistoryController.getWhatsAppHistoryByBusinessId,
);

router.get("/", whatsappHistoryController.getAllWhatsAppHistory);

router.get("/:id", whatsappHistoryController.getWhatsAppHistoryById);

router.post(
  "/",
  validate(createWhatsAppHistorySchema),
  whatsappHistoryController.createWhatsAppHistory,
);

router.put(
  "/:id",
  validate(updateWhatsAppHistorySchema),
  whatsappHistoryController.updateWhatsAppHistory,
);

router.delete("/:id", whatsappHistoryController.deleteWhatsAppHistory);

export { router as whatsappHistoryRouter };