export type ApplicationStatus =
  | "Applied"
  | "Interviewing"
  | "Offer"
  | "Rejected";

export interface JobApplication {
  company: string;
  role: string;
  status: ApplicationStatus;
  appliedDate: string;
}
