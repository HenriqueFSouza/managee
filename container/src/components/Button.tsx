import React from 'react';
import Loading from './Loading';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', isLoading, className, ...props }) => {
  const baseClasses = 'py-2 px-4 rounded-md outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = variant === 'primary'
    ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
    : 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500';

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props} disabled={isLoading}>
      {isLoading ? <Loading /> : children}
    </button>
  );
};

export default Button;
