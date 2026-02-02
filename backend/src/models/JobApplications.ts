import mongoose, { Schema, Document } from "mongoose";
import { JobApplication } from "./JobApplication.types";

export interface JobApplicationDoc
  extends JobApplication,
    Document {}

const JobApplicationSchema = new Schema<JobApplicationDoc>({
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: {
    type: String,
    enum: ["Applied", "Interviewing", "Offer", "Rejected"],
    required: true,
  },
  appliedDate: { type: String, required: true },
});

const JobApplicationModel = mongoose.model<JobApplicationDoc>(
  "JobApplication",
  JobApplicationSchema
);

export default JobApplicationModel;
