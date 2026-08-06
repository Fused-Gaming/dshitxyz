import React from 'react';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  label?: string;
  showPercent?: boolean;
}

const variantStyles: Record<string, string> = {
  default: 'bg-purple-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
};

export function Progress({
  value,
  max = 100,
  variant = 'default',
  label,
  showPercent = false,
  className = '',
  ...props
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full ${className}`} {...props}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-sm">
          {label && <p className="text-body-sm text-text-secondary">{label}</p>}
          {showPercent && <p className="text-body-sm text-text-secondary">{Math.round(percentage)}%</p>}
        </div>
      )}
      <div className="w-full h-2 bg-surface-elevated rounded-xs overflow-hidden">
        <div
          className={`h-full rounded-xs transition-all duration-standard ${variantStyles[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

interface StepperStep {
  label: string;
  description?: string;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
}

export function Stepper({
  steps,
  currentStep,
  orientation = 'horizontal',
  className = '',
  ...props
}: StepperProps) {
  return (
    <div
      className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} gap-lg ${className}`}
      {...props}
    >
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div
            key={index}
            className={`flex-1 ${orientation === 'vertical' ? '' : 'flex items-center'}`}
          >
            {/* Step indicator */}
            <div className="flex items-center gap-md">
              <div
                className={`
                  flex-shrink-0 w-2xl h-2xl
                  rounded-full
                  flex items-center justify-center
                  font-mono font-500 text-sm
                  transition-all duration-standard
                  ${
                    isCompleted
                      ? 'bg-success text-text-primary'
                      : isActive
                        ? 'bg-purple-primary text-text-primary'
                        : 'bg-surface-elevated text-text-tertiary'
                  }
                `}
              >
                {isCompleted ? '✓' : index + 1}
              </div>

              {/* Step content */}
              <div className="flex-1">
                <p
                  className={`text-body font-500 ${
                    isActive || isCompleted ? 'text-text-primary' : 'text-text-tertiary'
                  }`}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-body-sm text-text-tertiary">{step.description}</p>
                )}
              </div>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  ${orientation === 'vertical' ? 'h-lg ml-3xl' : 'w-lg'}
                  border-t ${orientation === 'vertical' ? 'border-l' : ''}
                  border-border
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
