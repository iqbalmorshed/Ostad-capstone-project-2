export interface Category {
  name: string;
  count: number;
}

/** Job from API (matches backend Job entity) */
export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type?: string;
  tags?: string[];
  companyLogo?: string;
}

export interface ApplicationFormData {
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
}
