import Company from "../models/company.model.js";


export const createCompany = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
      }
      const existingCompany = await Company.findOne({ name });
      if (existingCompany) {
        return res.status(400).json({ message: "Company already exists" });
      }

      const newCompany = await Company.create({ name, userId: req.user.id });
      
    res.status(201).json({ message: "Company created successfully", company: newCompany });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ message: "Internal server error not " });
  }
};

export const getCompanies = async (req, res) => {
    try {
        const userId = req.user.id;
        const companies = await Company.find({ userId });
        if (companies.length === 0) {
            return res.status(404).json({ message: "No companies found" });
        }

        res.status(200).json({ companies });
    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({ company });
    } catch (error) {
        console.error("Error fetching company:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateCompany = async (req, res) => {
    try {
       const { name, location, website, description, logo } = req.body;
        const companyId = req.params.id;
        const updates = { name, location, website, description, logo };

        const company = await Company.findByIdAndUpdate(companyId, updates, { new: true });
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({ company });
    } catch (error) {
        console.error("Error updating company:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findByIdAndDelete(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
        console.error("Error deleting company:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};