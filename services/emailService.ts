import emailjs from '@emailjs/browser';
import { FormData } from '../types';

// Replace these with your actual EmailJS credentials
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export const sendOnboardingData = async (data: FormData): Promise<void> => {
  try {
    // We are simulating a delay here for better UX if keys are missing
    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
        console.warn('EmailJS keys are missing. Simulating success.');
        await new Promise(resolve => setTimeout(resolve, 2000));
        return;
    }

    const templateParams = {
      to_name: 'Agency Admin',
      from_name: data.fullName,
      message: `
        New Onboarding Submission:
        
        -- Basic Info --
        Business: ${data.businessName}
        Email: ${data.email}
        Phone: ${data.phone}
        Location: ${data.location}
        Type: ${data.businessType} (${data.otherBusinessType})

        -- Preferences --
        Style: ${data.websiteStyle}
        Color: ${data.primaryColor}
        Layout: ${data.layoutPreference}
        Features: ${data.features.join(', ')}

        -- Requirements --
        Existing Site: ${data.hasWebsite} (${data.currentUrl})
        Budget: ${data.budget}
        Timeline: ${data.timeline}
        
        -- Description --
        ${data.description}
      `
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};