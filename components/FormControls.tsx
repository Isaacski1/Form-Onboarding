import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <input
      className={`px-4 py-3 rounded-xl border bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all duration-200 ${
        error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200'
      } ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  error?: string;
  placeholder?: string;
}

export const SelectField: React.FC<SelectProps> = ({ label, options, error, placeholder = "Select an option", ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <div className="relative">
      <select
        className={`w-full px-4 py-3 rounded-xl border bg-white appearance-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all duration-200 ${
          error ? 'border-red-500' : 'border-slate-200'
        }`}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
    {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextAreaField: React.FC<TextAreaProps> = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <textarea
      className={`px-4 py-3 rounded-xl border bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all duration-200 min-h-[120px] resize-y ${
        error ? 'border-red-500' : 'border-slate-200'
      }`}
      {...props}
    />
    {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
  </div>
);