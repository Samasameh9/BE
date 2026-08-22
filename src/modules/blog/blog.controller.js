import { Router } from "express";
import {
  allBlogs,
  createBlog,
  deleteuserBlog,
  updateuserBlog,
  userBlog,
} from "./blog.service.js";
import { successResponse } from "../../common/utils/success.response.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const data = await createBlog(req.body);
  return successResponse({ res, status: 201, data });
});

router.get("/lists", async (req, res, next) => {
  const data = await allBlogs(req.body);
  return successResponse({ res, data });
});

router.get("/lists/:id", async (req, res, next) => {
  const data = await userBlog(req);
  return successResponse({ res, data });
});

router.delete("/:id", async (req, res, next) => {
  const data = await deleteuserBlog(req.params.id);
  return successResponse({ res, data });
});

router.patch("/:id", async (req, res, next) => {
  const data = await updateuserBlog(req);
  return successResponse({ res, data });
});

export default router;
