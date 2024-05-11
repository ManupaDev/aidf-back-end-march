import express from "express";
import { Request, Response } from "express";

const app = express();
app.use(express.json());

const jobs = [
    {
        _id: "1",
        title: "Intern - Software Engineer",
        type: "Full-time",
        location: "Remote",
    },
    {
        _id: "2",
        title: "Software Engineer",
        type: "Full-time",
        location: "Remote",
    },
];

const getAllJobs = (req: Request, res: Response) => {
    return res.json(jobs);
}

const createJob = (req: Request, res: Response) => {
    jobs.push(req.body);
    return res.status(201).send();
}


const getJobById = (req: Request, res: Response) => {
    const job = jobs.find(el => el._id === req.params._id);
    if (!job) {
        return res.status(404).send();
    }
    return res.json(job);
}

const deleteJob = (req: Request, res: Response) => {
    const indexToRemove = jobs.findIndex(el => el._id === req.params._id);
    if (indexToRemove === -1) {
        return res.status(404).send();
    }
    jobs.splice(indexToRemove, 1);
    return res.status(204).send();
}

const updateJob = (req: Request, res: Response) => {
    const indexToUpdate = jobs.findIndex(el => el._id === req.params._id);
    if (indexToUpdate === -1) {
        return res.status(404).send();
    }
    jobs[indexToUpdate].title = req.body.title;
    jobs[indexToUpdate].location = req.body.location;
    jobs[indexToUpdate].type = req.body.type;
    return res.status(204).send();
}


app.get("/jobs", getAllJobs).post("/jobs", createJob).get("/jobs/:_id", getJobById).delete("/jobs/:_id", deleteJob).put("/jobs/:_id", updateJob);


app.listen(8000, () => console.log("Server is listening on port 8000."));