import { Request, Response } from "express";
import jobs from "../infrastructure/jobs";

export const getAllJobs = (req: Request, res: Response) => {
    return res.json(jobs);
}

export const createJob = (req: Request, res: Response) => {
    
    const job = req.body;
    
    if (!(typeof job.title === "string" && typeof job._id === "string" && typeof job.location === "string" && typeof job.type === "string")) {
        return res.status(400).send();
    }
    jobs.push(req.body);
    return res.status(201).send();
}


export const getJobById = (req: Request, res: Response) => {
    const job = jobs.find(el => el._id === req.params._id);
    if (!job) {
        return res.status(404).send();
    }
    return res.json(job);
}

export const deleteJob = (req: Request, res: Response) => {
    const indexToRemove = jobs.findIndex(el => el._id === req.params._id);
    if (indexToRemove === -1) {
        return res.status(404).send();
    }
    jobs.splice(indexToRemove, 1);
    return res.status(204).send();
}

export const updateJob = (req: Request, res: Response) => {
    const indexToUpdate = jobs.findIndex(el => el._id === req.params._id);
    if (indexToUpdate === -1) {
        return res.status(404).send();
    }
    jobs[indexToUpdate].title = req.body.title;
    jobs[indexToUpdate].location = req.body.location;
    jobs[indexToUpdate].type = req.body.type;
    return res.status(204).send();
}