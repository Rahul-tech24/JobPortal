import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    
  },
  website: {
    type: String,
    
    },
  description: {
    type: String,
    },
  logo: {
    type: String,
    },
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Company = mongoose.model("Company", companySchema);

export default Company;
