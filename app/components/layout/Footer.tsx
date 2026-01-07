import { FooterProps } from '@/app/types';

export default function Footer({ total }: FooterProps) {
  return (
    <footer className="mt-16 text-center">
      <p className="text-sm text-custom-text">
        {total !== undefined ? `Total de elementos: ${total}` : 'IA Agent Generator'}
      </p>
    </footer>
  );
}

