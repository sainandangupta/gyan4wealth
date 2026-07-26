import React from 'react';
import { Link } from 'react-router-dom';
import { SHIMMER_BTN_CLASS } from '../utils/animations';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  to,
  onClick,
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-sans font-bold text-sm px-7 py-3.5 rounded-sm transition-all duration-200';

  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = `${SHIMMER_BTN_CLASS} bg-gold hover:bg-gold/90 text-navy shadow-lg shadow-gold/20 hover:shadow-glow-gold`;
  } else if (variant === 'secondary') {
    variantClasses = 'bg-navy hover:bg-navy-dark text-white shadow-lg hover:shadow-glow-navy';
  } else if (variant === 'outline') {
    variantClasses =
      'border-2 border-white/30 hover:border-white/60 text-white hover:bg-white/5';
  }

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};
