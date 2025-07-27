import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Main Content with Enhanced Spacing */}
      <main className="pt-20">
        {children}
      </main>

      <Footer />
    </div>
  );
} 