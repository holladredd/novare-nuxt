import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((label, index) => {
        const isComplete = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isComplete
                    ? "bg-step-complete text-primary-foreground"
                    : isActive
                      ? "bg-step-active text-primary-foreground shadow-lg shadow-primary/30"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isComplete ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? "text-primary"
                    : isComplete
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-3 mt-[-1.5rem] transition-colors duration-300 ${
                  isComplete ? "bg-step-complete" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
