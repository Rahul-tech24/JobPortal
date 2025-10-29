import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    },
  phoneNumber: {
      type: String,
        required: true,
  },
  role: {
    type: String,
    enum: ["student", "recruiter"],
    required: true,
    },
  profile : {
     bio: { type: String, default: "" },
     skills: { type: [String], default: [] },
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
      profilePicture: { type: String, default: "" },
      resume: { type: String, default: "" },
      resumeOriginalName: { type: String, default: "" }
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;