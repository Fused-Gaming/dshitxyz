import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-purple-primary hover:bg-purple-hover
    text-text-primary
    border border-purple-primary hover:border-purple-hover
  `,
  secondary: `
    bg-surface-elevated hover:bg-surface-elevated
    text-text-primary
    border border-border hover:border-purple-hover hover:text-purple-hover
  `,
  ghost: `
    bg-transparent
    text-text-secondary hover:text-text-primary
    border border-border hover:border-text-secondary
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-lg py-sm text-label',
  md: 'px-xl py-md text-body',
  lg: 'px-2xl py-lg text-body-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        font-body font-500
        rounded-sm
        transition-all duration-standard
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-md
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-1em w-1em" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : icon ? (
        icon
      ) : null}
      {children}
    </button>
  );
}
