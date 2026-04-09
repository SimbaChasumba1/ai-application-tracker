export type ApplicationStatus = "Applied" | "Interviewing" | "Offer" | "Rejected";

export interface JobApplication {
  id?: string;              
  company: string;
  role: string;
  status: ApplicationStatus;
  date_applied?: string;   
  job_url?: string;
  notes?: string;
  salary_range?: string;
  created_at?: string;      
}