import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, label: "Basic Info" },
    { id: 2, label: "Preferences" },
    { id: 3, label: "Requirements" },
    { id: 4, label: "Review" },
  ];

  return (
    <div className="w-full mb-8">
      <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto px-4">
        {/* Background Line */}
        <div className="absolute left-0 top-5 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>
        
        {/* Active Progress Line */}
        <div 
            className="absolute left-0 top-5 h-1 bg-brand-500 -z-0 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                    <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 
                        ${isActive 
                            ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/30 scale-110' 
                            : isCompleted 
                                ? 'bg-brand-500 border-brand-500 text-white' 
                                : 'bg-white border-slate-200 text-slate-400'
                        }`}
                    >
                        {isCompleted ? <Check size={18} strokeWidth={3} /> : <span className="font-semibold text-sm">{step.id}</span>}
                    </div>
                    <span className={`text-xs font-medium transition-colors duration-300 ${isActive || isCompleted ? 'text-brand-900' : 'text-slate-400'}`}>
                        {step.label}
                    </span>
                </div>
            );
        })}
      </div>
    </div>
  );
};