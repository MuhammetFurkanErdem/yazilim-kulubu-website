import { Outlet, ScrollRestoration } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AnalyticsTracker } from './AnalyticsTracker';

export function Layout() {
  return (
    <div className="min-h-screen bg-page text-primary transition-colors duration-300">
      <AnalyticsTracker />
      <ScrollRestoration />
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
