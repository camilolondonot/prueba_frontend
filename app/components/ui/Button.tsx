import { ButtonProps } from '@/app/types';

const Button = ({ buttonProps }: { buttonProps: ButtonProps }) => {
  const { 
    children, 
    type, 
    className = '', 
    disabled, 
    loading, 
    icon, 
    iconPosition = 'left',
    iconSize = 16,
    onClick 
  } = buttonProps;
  
  // Mapear iconSize a clases de Tailwind válidas
  const getIconSizeClass = (size: number | undefined) => {
    if (!size) return 'w-4 h-4';
    if (size <= 12) return 'w-3 h-3';
    if (size <= 16) return 'w-4 h-4';
    if (size <= 20) return 'w-5 h-5';
    if (size <= 24) return 'w-6 h-6';
    return 'w-4 h-4';
  };

  const iconSizeClass = getIconSizeClass(iconSize);
  const buttonClasses = `btn ${className || ''} ${disabled ? 'btn-disabled' : ''} ${loading ? 'btn-loading' : ''}`.trim();
  
  return (
    <button 
      type={type} 
      className={buttonClasses} 
      disabled={disabled || loading} 
      onClick={onClick}
    >
      {icon && iconPosition === 'left' && (
        <span className={`${iconSizeClass} flex items-center justify-center`}>
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={`${iconSizeClass} flex items-center justify-center`}>
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;