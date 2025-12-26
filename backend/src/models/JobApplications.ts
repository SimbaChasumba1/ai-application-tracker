export type ApplicationStatus =

  | "Applied"

  | "Interviewing"

  | "Offer"

  | "Rejected";



export interface JobApplication {

  id: string;

  company: string;

  role: string;

  status: ApplicationStatus;

  appliedDate: string;

}



