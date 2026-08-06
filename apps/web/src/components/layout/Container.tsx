import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '7xl';
}

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '7xl': 'max-w-7xl',
};

export function Container({
  maxWidth = '7xl',
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={`w-full mx-auto px-lg ${maxWidthMap[maxWidth]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
