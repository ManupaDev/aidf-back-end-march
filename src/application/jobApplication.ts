import { NextFunction, Request, Response } from "express";
import JobApplication from "../infrastructure/schemas/jobApplication";


export const createJobApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const jobApplication = req.body;
      const createdJobApplication= await JobApplication.create(jobApplication);
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  };

  
export const getJobApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {jobid} = req.query;
   
    if(jobid){
      const jobApplications = await JobApplication.find({job:jobid})
      return res.status(200).json(jobApplications);
    }

    const jobApplications = await JobApplication.find().populate("job").exec();
    return res.status(200).json(jobApplications);
 
  } catch (error) {
    next(error);
  }
};