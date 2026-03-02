interface TagProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

const variantClass = {
  primary: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  secondary: 'border-blue-200 bg-blue-50 text-blue-700',
  outline: 'border-gray-200 bg-white text-gray-600',
};

export default function Tag({ text, variant = 'outline' }: TagProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${variantClass[variant]}`}
    >
      {text}
    </span>
  );
}
