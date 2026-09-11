import { createBrowserRouter } from "react-router";
import { Layout } from '@/components/layout/Layout';

// Auth & Protection
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, lazy: async () => ({ Component: (await import('@/pages/public/Home')).Home }) },
      { path: "hakkimizda", lazy: async () => ({ Component: (await import('@/pages/public/About')).About }) },
      { path: "ekibimiz", lazy: async () => ({ Component: (await import('@/pages/public/Team')).Team }) },
      { path: "etkinlikler", lazy: async () => ({ Component: (await import('@/pages/public/Events')).Events }) },
      { path: "etkinlikler/:id", lazy: async () => ({ Component: (await import('@/pages/public/EventDetail')).EventDetail }) },
      { path: "projeler", lazy: async () => ({ Component: (await import('@/pages/public/Projects')).Projects }) },
      { path: "iletisim", lazy: async () => ({ Component: (await import('@/pages/public/Contact')).Contact }) },
      { path: "*", lazy: async () => ({ Component: (await import('@/pages/public/NotFound')).NotFound }) },
    ],
  },
  {
    path: "/admin/login",
    lazy: async () => ({ Component: (await import('@/pages/auth/Login')).Login }),
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        lazy: async () => ({ Component: (await import('@/layouts/AdminLayout')).AdminLayout }),
        children: [
          { index: true, lazy: async () => ({ Component: (await import('@/pages/admin/Dashboard')).Dashboard }) },
          { path: "etkinlikler", lazy: async () => ({ Component: (await import('@/pages/admin/Events')).Events }) },
          { path: "projeler", lazy: async () => ({ Component: (await import('@/pages/admin/Projects')).Projects }) },
          { path: "ekip", lazy: async () => ({ Component: (await import('@/pages/admin/Team')).Team }) },
          { path: "basvurular", lazy: async () => ({ Component: (await import('@/pages/admin/Submissions')).Submissions }) },
          { path: "ayarlar", lazy: async () => ({ Component: (await import('@/pages/admin/Settings')).Settings }) },
          { path: "*", lazy: async () => ({ Component: (await import('@/pages/public/NotFound')).NotFound }) },
        ]
      }
    ],
  }
]);
