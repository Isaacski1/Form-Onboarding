export interface FormData {
  // Step 1: Basic Info
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  location: string;
  businessType: string;
  otherBusinessType: string;

  // Step 2: Preferences
  websiteStyle: string;
  primaryColor: string;
  layoutPreference: 'Single Page' | 'Multi-Page' | '';
  features: string[];

  // Step 3: Requirements
  hasWebsite: 'Yes' | 'No' | '';
  currentUrl: string;
  budget: string;
  timeline: string;
  description: string;
}

export interface FormErrors {
  [key: string]: string;
}

export enum StepStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}