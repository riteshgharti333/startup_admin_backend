import { Router } from "express";

import { authRouter } from "../modules/auth/auth.routes";
import { userRouter } from "../modules/users/user.routes";
import { applicationRouter } from "../modules/applications/application.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
});

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/application", applicationRouter);


export default router;