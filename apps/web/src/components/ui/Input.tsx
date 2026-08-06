import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export function Input({
  label,
  error,
  helperText,
  icon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-label font-body font-500 text-text-secondary mb-sm">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-lg top-1/2 transform -translate-y-1/2 text-text-tertiary">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full
            bg-bg-secondary
            border border-border
            rounded-sm
            px-lg py-md
            text-body text-text-primary
            placeholder-text-tertiary
            transition-colors duration-standard
            focus:outline-none focus:border-purple-primary focus:bg-surface
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-3xl' : ''}
            ${error ? 'border-error focus:border-error' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-body-sm text-error mt-sm">{error}</p>}
      {helperText && !error && (
        <p className="text-body-sm text-text-tertiary mt-sm">{helperText}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
}

export function Textarea({
  label,
  error,
  helperText,
  maxLength,
  showCount = true,
  className = '',
  ...props
}: TextareaProps) {
  const [count, setCount] = React.useState(0);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-label font-body font-500 text-text-secondary mb-sm">
          {label}
        </label>
      )}
      <textarea
        maxLength={maxLength}
        onChange={(e) => {
          setCount(e.target.value.length);
          props.onChange?.(e);
        }}
        className={`
          w-full
          bg-bg-secondary
          border border-border
          rounded-sm
          px-lg py-md
          text-body text-text-primary
          placeholder-text-tertiary
          transition-colors duration-standard
          focus:outline-none focus:border-purple-primary focus:bg-surface
          disabled:opacity-50 disabled:cursor-not-allowed
          resize-none
          ${error ? 'border-error focus:border-error' : ''}
          ${className}
        `}
        {...props}
      />
      {maxLength && showCount && (
        <p className="text-body-sm text-text-tertiary mt-sm">
          {count} / {maxLength}
        </p>
      )}
      {error && <p className="text-body-sm text-error mt-sm">{error}</p>}
      {helperText && !error && (
        <p className="text-body-sm text-text-tertiary mt-sm">{helperText}</p>
      )}
    </div>
  );
}
