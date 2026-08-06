import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated';
  hoverable?: boolean;
}

export function Card({
  variant = 'default',
  hoverable = false,
  className = '',
  children,
  ...props
}: CardProps) {
  const baseStyles = `
    bg-surface
    border border-border
    rounded-md
    p-xl
    transition-all duration-standard
  `;

  const variantStyles = {
    default: 'shadow-level-2',
    elevated: 'shadow-level-4',
  };

  const hoverStyles = hoverable ? 'hover:border-purple-hover hover:shadow-level-3' : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action, className = '', ...props }: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-lg mb-xl ${className}`} {...props}>
      <div className="flex-1">
        {title && <h3 className="text-h4 text-text-primary font-display font-bold">{title}</h3>}
        {subtitle && <p className="text-body-sm text-text-secondary mt-sm">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className = '', children, ...props }: CardBodyProps) {
  return (
    <div className={`text-body text-text-primary ${className}`} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({ className = '', children, ...props }: CardFooterProps) {
  return (
    <div
      className={`flex items-center gap-lg mt-xl pt-xl border-t border-border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
