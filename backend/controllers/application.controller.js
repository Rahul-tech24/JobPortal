import Application from '../models/application.model.js';
import Job from '../models/job.model.js';

export const applyForJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const applicantId = req.user.id;

        // Validate ObjectId format
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(jobId)) {
            return res.status(400).json({ message: "Invalid job ID format" });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if user has already applied for this job
        const existingApplication = await Application.findOne({ 
            job: jobId, 
            applicant: applicantId 
        });
        
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        // Create new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: applicantId,
            status: "applied"
        });

        // Add application to job's applications array
        await Job.findByIdAndUpdate(jobId, {
            $push: { applications: newApplication._id }
        });

        res.status(201).json({ 
            message: "Application submitted successfully", 
            application: newApplication 
        });
    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMyApplications = async (req, res) => {
    try {
        const applicantId = req.user.id;

        const applications = await Application.find({ applicant: applicantId })
            .populate('job', 'title company location salary jobType')
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name location'
                }
            })
            .sort({ createdAt: -1 });

        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getJobApplications = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user.id;

        // Validate ObjectId format
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(jobId)) {
            return res.status(400).json({ message: "Invalid job ID format" });
        }

        // Check if job exists and user is authorized to view applications
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Only job creator can view applications
        if (job.created_by.toString() !== userId) {
            return res.status(403).json({ 
                message: "You are not authorized to view applications for this job" 
            });
        }

        const applications = await Application.find({ job: jobId })
            .populate('applicant', 'fullName email phoneNumber profile')
            .sort({ createdAt: -1 });
        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching job applications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        const userId = req.user.id;

        // Validate ObjectId format
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(applicationId)) {
            return res.status(400).json({ message: "Invalid application ID format" });
        }

        // Validate status
        const validStatuses = ["applied", "under review", "interview", "rejected", "hired"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                message: "Invalid status", 
                validStatuses 
            });
        }

        // Find application and check authorization
        const application = await Application.findById(applicationId).populate('job');
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Only job creator can update application status
        if (application.job.created_by.toString() !== userId) {
            return res.status(403).json({ 
                message: "You are not authorized to update this application" 
            });
        }

        application.status = status;
        await application.save();

        res.status(200).json({ 
            message: "Application status updated successfully", 
            application 
        });
    } catch (error) {
        console.error("Error updating application status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteApplication = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const userId = req.user.id;

        // Validate ObjectId format
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;
        if (!objectIdRegex.test(applicationId)) {
            return res.status(400).json({ message: "Invalid application ID format" });
        }

        // Find application
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        // Only applicant can delete their own application
        if (application.applicant.toString() !== userId) {
            return res.status(403).json({ 
                message: "You are not authorized to delete this application" 
            });
        }

        // Remove application from job's applications array
        await Job.findByIdAndUpdate(application.job, {
            $pull: { applications: applicationId }
        });

        // Delete application
        await Application.findByIdAndDelete(applicationId);

        res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
        console.error("Error deleting application:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};