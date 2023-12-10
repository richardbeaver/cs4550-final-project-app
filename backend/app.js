import express from "express";
import EnrollmentRoutes from "./enrollments/routes.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
import LikesRoutes from "./likes/routes.js";
import FollowsRoutes from "./follows/routes.js";
import SectionRoutes from "./sections/routes.js";
import cors from "cors";
import session from "express-session";
import "dotenv/config";

mongoose.connect(process.env.DB_CONNECTION_STRING);

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.use(express.json());

FollowsRoutes(app);
LikesRoutes(app);
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
SectionRoutes(app);
EnrollmentRoutes(app);

app.listen(4000);
