import { createBrowserRouter } from "react-router";
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/public/Home';
import { About } from '@/pages/public/About';
import { Team } from '@/pages/public/Team';
import { Events } from '@/pages/public/Events';
import { EventDetail } from '@/pages/public/EventDetail';
import { Projects } from '@/pages/public/Projects';
import { Contact } from '@/pages/public/Contact';
import { NotFound } from '@/pages/public/NotFound';

// Admin Imports
import { AdminLayout } from '@/layouts/AdminLayout';
import { Dashboard as AdminDashboard } from '@/pages/admin/Dashboard';
import { Events as AdminEvents } from '@/pages/admin/Events';
import { Projects as AdminProjects } from '@/pages/admin/Projects';
import { Team as AdminTeam } from '@/pages/admin/Team';
import { Settings as AdminSettings } from '@/pages/admin/Settings';
import { Submissions as AdminSubmissions } from '@/pages/admin/Submissions';

// Auth & Protection
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { Login } from '@/pages/auth/Login';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "hakkimizda", Component: About },
      { path: "ekibimiz", Component: Team },
      { path: "etkinlikler", Component: Events },
      { path: "etkinlikler/:id", Component: EventDetail },
      { path: "projeler", Component: Projects },
      { path: "iletisim", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin/login",
    Component: Login,
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        Component: AdminLayout,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "etkinlikler", Component: AdminEvents },
          { path: "projeler", Component: AdminProjects },
          { path: "ekip", Component: AdminTeam },
          { path: "basvurular", Component: AdminSubmissions },
          { path: "ayarlar", Component: AdminSettings },
          { path: "*", Component: NotFound },
        ]
      }
    ],
  }
]);
