import authRouter from "./auth.js";
import tagsRouter from "./tags.js";
import uploadRouter from "./upload.js";
import postsRouter from "./posts.js";

const routes = (app) => {
  app.use("/auth", authRouter);
  app.use("/posts", postsRouter);
  app.use("/tags", tagsRouter);
  app.use("/upload", uploadRouter);
};
export default routes;
