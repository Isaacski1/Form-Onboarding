import React from 'react';
import { FormData, FormErrors } from '../types';
import { InputField, SelectField, TextAreaField } from './FormControls';
import { BUSINESS_TYPES, WEBSITE_STYLES, FEATURES_LIST, BUDGET_RANGES, TIMELINES } from '../constants';
import { Layout, Globe, Palette, Layers, CheckCircle2 } from 'lucide-react';

interface StepProps {
  formData: FormData;
  updateData: (updates: Partial<FormData>) => void;
  errors: FormErrors;
}

// --- Step 1 ---
export const Step1BasicInfo: React.FC<StepProps> = ({ formData, updateData, errors }) => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => updateData({ fullName: e.target.value })}
          error={errors.fullName}
        />
        <InputField
          label="Business Name"
          placeholder="Acme Corp"
          value={formData.businessName}
          onChange={(e) => updateData({ businessName: e.target.value })}
          error={errors.businessName}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => updateData({ email: e.target.value })}
          error={errors.email}
        />
        <InputField
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={(e) => updateData({ phone: e.target.value })}
          error={errors.phone}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Location"
          placeholder="City, Country"
          value={formData.location}
          onChange={(e) => updateData({ location: e.target.value })}
          error={errors.location}
        />
        <SelectField
          label="Business Industry"
          options={BUSINESS_TYPES}
          value={formData.businessType}
          onChange={(e) => updateData({ businessType: e.target.value })}
          error={errors.businessType}
        />
      </div>

      {formData.businessType === 'Other' && (
        <InputField
          label="Please Specify"
          placeholder="e.g. Pet Grooming"
          value={formData.otherBusinessType}
          onChange={(e) => updateData({ otherBusinessType: e.target.value })}
          error={errors.otherBusinessType}
        />
      )}
    </div>
  );
};

// --- Step 2 ---
export const Step2Preferences: React.FC<StepProps> = ({ formData, updateData, errors }) => {
  const toggleFeature = (feature: string) => {
    const newFeatures = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature];
    updateData({ features: newFeatures });
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Style & Color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Desired Website Style"
          options={WEBSITE_STYLES}
          value={formData.websiteStyle}
          onChange={(e) => updateData({ websiteStyle: e.target.value })}
          error={errors.websiteStyle}
        />
        
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Primary Color Preference</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={formData.primaryColor}
              onChange={(e) => updateData({ primaryColor: e.target.value })}
              className="h-12 w-20 p-1 rounded-lg border border-slate-200 bg-white cursor-pointer"
            />
            <span className="text-sm text-slate-500 font-mono bg-slate-50 px-2 py-1 rounded">
              {formData.primaryColor}
            </span>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div>
        <label className="text-sm font-medium text-slate-700 mb-3 block">Layout Structure</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => updateData({ layoutPreference: 'Single Page' })}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-brand-300 flex items-center gap-4 ${formData.layoutPreference === 'Single Page' ? 'border-brand-500 bg-brand-50' : 'border-slate-100 bg-white'}`}
          >
            <div className={`p-2 rounded-lg ${formData.layoutPreference === 'Single Page' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              <Layout size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Single Page</h4>
              <p className="text-xs text-slate-500">All content on one scrollable landing page.</p>
            </div>
          </div>

          <div 
            onClick={() => updateData({ layoutPreference: 'Multi-Page' })}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-brand-300 flex items-center gap-4 ${formData.layoutPreference === 'Multi-Page' ? 'border-brand-500 bg-brand-50' : 'border-slate-100 bg-white'}`}
          >
            <div className={`p-2 rounded-lg ${formData.layoutPreference === 'Multi-Page' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              <Layers size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Multi-Page</h4>
              <p className="text-xs text-slate-500">Separate pages for Home, About, Services, etc.</p>
            </div>
          </div>
        </div>
        {errors.layoutPreference && <span className="text-xs text-red-500 mt-1">{errors.layoutPreference}</span>}
      </div>

      {/* Features */}
      <div>
        <label className="text-sm font-medium text-slate-700 mb-3 block">Features Needed</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FEATURES_LIST.map((feature) => {
            const isSelected = formData.features.includes(feature);
            return (
              <div 
                key={feature}
                onClick={() => toggleFeature(feature)}
                className={`px-3 py-2.5 rounded-lg border text-sm font-medium cursor-pointer transition-all select-none flex items-center justify-between group
                  ${isSelected 
                    ? 'border-brand-500 bg-brand-500 text-white shadow-md shadow-brand-500/20' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-600'}`}
              >
                {feature}
                {isSelected && <CheckCircle2 size={16} className="text-white" />}
              </div>
            );
          })}
        </div>
        {errors.features && <span className="text-xs text-red-500 mt-1">{errors.features}</span>}
      </div>
    </div>
  );
};

// --- Step 3 ---
export const Step3Requirements: React.FC<StepProps> = ({ formData, updateData, errors }) => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <label className="text-sm font-medium text-slate-700 mb-3 block">Do you have an existing website?</label>
        <div className="flex gap-4">
          {['Yes', 'No'].map((opt) => (
             <label key={opt} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
              ${formData.hasWebsite === opt 
                ? 'border-brand-500 bg-brand-50 text-brand-700 font-semibold' 
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}>
                <input 
                  type="radio" 
                  name="hasWebsite" 
                  value={opt} 
                  checked={formData.hasWebsite === opt} 
                  onChange={() => updateData({ hasWebsite: opt as 'Yes' | 'No' })}
                  className="hidden" 
                />
                <Globe size={18} />
                {opt}
             </label>
          ))}
        </div>
        {errors.hasWebsite && <span className="text-xs text-red-500 mt-1">{errors.hasWebsite}</span>}
      </div>

      {formData.hasWebsite === 'Yes' && (
        <InputField
          label="Current Website URL"
          placeholder="https://www.yourwebsite.com"
          value={formData.currentUrl}
          onChange={(e) => updateData({ currentUrl: e.target.value })}
          error={errors.currentUrl}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Project Budget"
          options={BUDGET_RANGES}
          value={formData.budget}
          onChange={(e) => updateData({ budget: e.target.value })}
          error={errors.budget}
        />
        <SelectField
          label="Desired Timeline"
          options={TIMELINES}
          value={formData.timeline}
          onChange={(e) => updateData({ timeline: e.target.value })}
          error={errors.timeline}
        />
      </div>

      <TextAreaField
        label="Detailed Project Description"
        placeholder="Tell us about your goals, target audience, inspiration, and any specific requirements you have..."
        value={formData.description}
        onChange={(e) => updateData({ description: e.target.value })}
        error={errors.description}
      />
    </div>
  );
};

// --- Step 4 ---
export const Step4Review: React.FC<StepProps> = ({ formData }) => {
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
        {children}
      </div>
    </div>
  );

  const Item = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
    <div>
      <span className="block text-slate-500 mb-1">{label}</span>
      <span className="font-semibold text-slate-800 break-words">{value || '-'}</span>
    </div>
  );

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Review & Submit</h2>
        <p className="text-slate-500 text-sm mt-1">Please ensure all details are correct before submitting.</p>
      </div>

      <Section title="Basic Information">
        <Item label="Full Name" value={formData.fullName} />
        <Item label="Business Name" value={formData.businessName} />
        <Item label="Email" value={formData.email} />
        <Item label="Phone" value={formData.phone} />
        <Item label="Location" value={formData.location} />
        <Item label="Industry" value={formData.businessType === 'Other' ? formData.otherBusinessType : formData.businessType} />
      </Section>

      <Section title="Preferences">
        <Item label="Website Style" value={formData.websiteStyle} />
        <Item label="Layout" value={formData.layoutPreference} />
        <Item 
          label="Color Preference" 
          value={<div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border border-slate-300" style={{background: formData.primaryColor}}></div>{formData.primaryColor}</div>} 
        />
        <div className="col-span-1 md:col-span-2">
          <span className="block text-slate-500 mb-2">Features Needed</span>
          <div className="flex flex-wrap gap-2">
            {formData.features.map(f => (
              <span key={f} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-700">{f}</span>
            ))}
            {formData.features.length === 0 && <span className="text-slate-400 italic">None selected</span>}
          </div>
        </div>
      </Section>

      <Section title="Project Details">
        <Item label="Existing Website" value={formData.hasWebsite === 'Yes' ? formData.currentUrl : 'No'} />
        <Item label="Budget" value={formData.budget} />
        <Item label="Timeline" value={formData.timeline} />
        <div className="col-span-1 md:col-span-2">
          <Item label="Description" value={formData.description} />
        </div>
      </Section>
    </div>
  );
};