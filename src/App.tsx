import { RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import { router } from '@/router/routes';

import { AuthProvider } from "@/contexts/AuthContext";

function RouteLoadingFallback() {
  return (
    <div role="status" aria-live="polite" className="min-h-screen bg-page text-primary flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-default border-t-[var(--brand-primary)] animate-spin" aria-hidden="true" />
      <p className="text-sm font-medium text-muted">Sayfa yükleniyor...</p>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <Suspense fallback={<RouteLoadingFallback />}>
          <RouterProvider router={router} />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}
