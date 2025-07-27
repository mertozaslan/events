import Link from 'next/link';
import { Button } from '@/components';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Sayfa Bulunamadı</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek etkinlikleri keşfedebilirsiniz.
        </p>
        <Link href="/">
          <Button size="lg">
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>
    </div>
  );
} 