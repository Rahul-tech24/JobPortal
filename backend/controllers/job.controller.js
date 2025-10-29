import Job from '../models/job.model.js';


export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, experienceLevel, location, jobType, position, company } = req.body;
        const created_by = req.user.id;

        // Validate required fields
        if (!title || !description || !salary || !experienceLevel || !location || !jobType || !position || !company) {
            return res.status(400).json({ 
                message: "All fields are required",
                required: ["title", "description", "salary", "experienceLevel", "location", "jobType", "position", "company"]
            });
        }

        // Validate data types
        if (isNaN(parseInt(position))) {
            return res.status(400).json({ 
                message: "Position must be a valid number" 
            });
        }

        if (isNaN(parseInt(salary))) {
            return res.status(400).json({ 
                message: "Salary must be a valid number" 
            });
        }

        if (isNaN(parseInt(experienceLevel))) {
            return res.status(400).json({ 
                message: "Experience level must be a valid number" 
            });
        }

        // Validate ObjectId format for company
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(company)) {
            return res.status(400).json({ 
                message: "Invalid company ID format. Must be a valid MongoDB ObjectId" 
            });
        }

        const newJob = await Job.create({
            title,
            description,
            requirements: Array.isArray(requirements) ? requirements : [requirements],
            salary: parseInt(salary),
            experienceLevel: parseInt(experienceLevel),
            location,
            jobType,
            position: parseInt(position),
            company,
            created_by
        });

        res.status(201).json({ message: "Job posted successfully", job: newJob });
    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('company').populate('created_by');
        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate('company').populate('created_by');
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ job });
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getJobsPostedByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobs = await Job.find({ created_by: userId }).populate('company');
        if (jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this user" });
        }
        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching jobs posted by user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const updates = req.body;
        const userId = req.user.id;

        // Validate ObjectId format
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(jobId)) {
            return res.status(400).json({ message: "Invalid job ID format" });
        }

        // Find the job and check if user is authorized to update it
        const existingJob = await Job.findById(jobId);
        if (!existingJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the user is the creator of the job
        if (existingJob.created_by.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this job" });
        }

        // Validate data types if they are being updated
        if (updates.position && isNaN(parseInt(updates.position))) {
            return res.status(400).json({ message: "Position must be a valid number" });
        }

        if (updates.salary && isNaN(parseInt(updates.salary))) {
            return res.status(400).json({ message: "Salary must be a valid number" });
        }

        if (updates.experienceLevel && isNaN(parseInt(updates.experienceLevel))) {
            return res.status(400).json({ message: "Experience level must be a valid number" });
        }

        if (updates.company && !objectIdRegex.test(updates.company)) {
            return res.status(400).json({ message: "Invalid company ID format" });
        }

        // Convert numeric fields to numbers
        if (updates.position) updates.position = parseInt(updates.position);
        if (updates.salary) updates.salary = parseInt(updates.salary);
        if (updates.experienceLevel) updates.experienceLevel = parseInt(updates.experienceLevel);

        const job = await Job.findByIdAndUpdate(jobId, updates, { new: true, runValidators: true });
        res.status(200).json({ message: "Job updated successfully", job });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user.id;

        // Validate ObjectId format
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(jobId)) {
            return res.status(400).json({ message: "Invalid job ID format" });
        }

        // Find the job first to check authorization
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the user is the creator of the job
        if (job.created_by.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this job" });
        }

        await Job.findByIdAndDelete(jobId);
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};