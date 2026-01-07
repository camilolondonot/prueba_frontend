import { ButtonProps } from '@/app/types';

const Button = ({ buttonProps }: { buttonProps: ButtonProps }) => {

  const { children, type, className, disabled, loading, icon, iconPosition, iconSize, iconColor, iconBackgroundColor, iconBorderRadius, iconBorderColor, iconBorderWidth, onClick } = buttonProps;
  
  const iconClasses = `w-${iconSize} h-${iconSize} ${iconColor} ${iconBackgroundColor} ${iconBorderRadius} ${iconBorderColor} ${iconBorderWidth}`;
  const buttonClasses = `btn shadow-none ${className} ${disabled ? 'btn-disabled' : ''} ${loading ? 'btn-loading' : ''}`;
  
  return (
    <button type={type} className={buttonClasses} disabled={disabled} onClick={onClick}>
      {icon && iconPosition === 'left' && <span className={iconClasses}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className={iconClasses}>{icon}</span>}
    </button>
  );
};

export default Button;