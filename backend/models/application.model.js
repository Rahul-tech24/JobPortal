import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
   status: {
    type: String,
    enum: ["applied", "under review", "interview", "rejected", "hired"],
    default: "applied",
  },
}, {
  timestamps: true,
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
