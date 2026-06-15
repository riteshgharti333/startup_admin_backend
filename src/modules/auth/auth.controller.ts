import type { Request, Response } from "express";

import { asyncHandler } from "../../common/utils/asyncHandler";
import { apiResponse } from "../../common/utils/apiResponse";
import { authService } from "./auth.service";

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);

    return apiResponse({
      res,
      statusCode: 201,
      message: "User registered successfully",
      data: result,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);

    return apiResponse({
      res,
      message: "Login successful",
      data: result,
    });
  });


  me = asyncHandler(async (req, res) => {
  const profile = await authService.me(req.user!.userId);

  return apiResponse({
    res,
    message: "Profile fetched successfully",
    data: profile,
  });
});
}

export const authController = new AuthController();