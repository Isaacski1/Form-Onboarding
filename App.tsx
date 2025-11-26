import React, { useState } from 'react';
import { StepIndicator } from './components/StepIndicator';
import { Step1BasicInfo, Step2Preferences, Step3Requirements, Step4Review } from './components/Steps';
import { FormData, FormErrors, StepStatus } from './types';
import { sendOnboardingData } from './services/emailService';
import { ChevronRight, ChevronLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const INITIAL_DATA: FormData = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  location: '',
  businessType: '',
  otherBusinessType: '',
  websiteStyle: '',
  primaryColor: '#3b82f6',
  layoutPreference: '',
  features: [],
  hasWebsite: '',
  currentUrl: '',
  budget: '',
  timeline: '',
  description: ''
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<StepStatus>(StepStatus.IDLE);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear errors for fields being updated
    const newErrors = { ...errors };
    Object.keys(updates).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
      if (!formData.businessType) newErrors.businessType = "Please select a business type";
      if (formData.businessType === 'Other' && !formData.otherBusinessType.trim()) newErrors.otherBusinessType = "Please specify your business type";
    }

    if (step === 2) {
      if (!formData.websiteStyle) newErrors.websiteStyle = "Please select a preferred style";
      if (!formData.layoutPreference) newErrors.layoutPreference = "Please select a layout preference";
      if (formData.features.length === 0) newErrors.features = "Please select at least one feature";
    }

    if (step === 3) {
      if (!formData.hasWebsite) newErrors.hasWebsite = "Please answer this question";
      if (formData.hasWebsite === 'Yes' && !formData.currentUrl.trim()) newErrors.currentUrl = "Please provide your current URL";
      if (!formData.budget) newErrors.budget = "Please select a budget range";
      if (!formData.timeline) newErrors.timeline = "Please select a timeline";
      if (!formData.description.trim()) newErrors.description = "Please provide a brief description";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return; // Re-validate step 3 just in case
    
    setStatus(StepStatus.SUBMITTING);
    try {
      await sendOnboardingData(formData);
      setStatus(StepStatus.SUCCESS);
    } catch (error) {
      setStatus(StepStatus.ERROR);
    }
  };

  // --- Modal Logic ---
  if (status === StepStatus.SUCCESS) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 animate-fade-in">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Submission Successful!</h2>
          <p className="text-slate-600 mb-6">
            Thank you, {formData.fullName.split(' ')[0]}. We have received your project details and will be in touch shortly.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors"
          >
            Start New Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Project Onboarding</h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Let's build something amazing together. Fill out the details below to get started with your new web project.
          </p>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={4} />

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative min-h-[500px] flex flex-col">
          
          <div className="p-6 md:p-10 flex-grow">
            {currentStep === 1 && <Step1BasicInfo formData={formData} updateData={updateFormData} errors={errors} />}
            {currentStep === 2 && <Step2Preferences formData={formData} updateData={updateFormData} errors={errors} />}
            {currentStep === 3 && <Step3Requirements formData={formData} updateData={updateFormData} errors={errors} />}
            {currentStep === 4 && <Step4Review formData={formData} updateData={updateFormData} errors={errors} />}
          </div>

          {/* Footer Navigation */}
          <div className="p-6 md:p-10 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            {currentStep > 1 ? (
               <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium px-4 py-2 rounded-lg transition-colors"
                disabled={status === StepStatus.SUBMITTING}
              >
                <ChevronLeft size={20} /> Back
              </button>
            ) : (
              <div></div> /* Spacer */
            )}

            {currentStep < 4 ? (
              <button 
                onClick={handleNext}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Next Step <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={status === StepStatus.SUBMITTING}
                className={`flex items-center gap-2 font-semibold px-8 py-3 rounded-xl shadow-lg transition-all 
                  ${status === StepStatus.SUBMITTING 
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98]'}`}
              >
                {status === StepStatus.SUBMITTING ? (
                  <>Processing <Loader2 size={20} className="animate-spin" /></>
                ) : (
                  <>Submit Project <CheckCircle size={20} /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Error Modal Overlay */}
      {status === StepStatus.ERROR && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Submission Failed</h3>
                <p className="text-slate-600 mb-6 text-sm">
                  Something went wrong while sending your data. Please check your connection and try again.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStatus(StepStatus.IDLE)} 
                    className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                  >
                    Try Again
                  </button>
                </div>
             </div>
        </div>
      )}
    </div>
  );
};

export default App;