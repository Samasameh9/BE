import { Router } from "express";
import { successResponse } from "../../common/utils/success.response.js";
import { deleteUser, updateUser, users } from "./user.service.js";


const router = Router();

router.get("/:userId", async (req, res, next) => {
  const data =await users(req);
  return successResponse({ res, data });
});

router.patch("/:userId", async (req, res, next) => {
  const data =await updateUser(req);
  return successResponse({ res, data });
});

router.delete("/:userId", async (req, res, next) => {
  const data =await deleteUser(req);
  return successResponse({ res, data });
});


export default router