import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  optionalColor?: string;
}

const variantBg = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-accent-blue)',
};

const sizeClass = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
};

export default function Button({
  text,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  optionalColor,
}: ButtonProps) {
  const bg = optionalColor ?? variantBg[variant];
  return (
    <button
      type="button"
      disabled={disabled}
      className={twMerge(
        'text-white px-4 py-2  font-medium',
        sizeClass[size],
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      style={{ backgroundColor: bg }}
    >
      {text}
    </button>
  );
}
