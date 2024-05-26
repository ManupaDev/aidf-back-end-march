import express from "express";
import { createJobApplication, getJobApplications } from "../application/jobApplication";

const jobApplicationRouter = express.Router();

jobApplicationRouter.route("/").post(createJobApplication).get(getJobApplications)

export default jobApplicationRouter;