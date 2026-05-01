import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Team } from "./pages/Team";
import { Events } from "./pages/Events";
import { EventDetail } from "./pages/EventDetail";
import { Projects } from "./pages/Projects";
import { Contact } from "./pages/Contact";
import { Join } from "./pages/Join";
import { Auth } from "./pages/Auth";
import { NotFound } from "./pages/NotFound";

// Admin Imports
import { AdminLayout } from "./admin/AdminLayout";
import { Dashboard as AdminDashboard } from "./admin/Dashboard";
import { Events as AdminEvents } from "./admin/Events";
import { Projects as AdminProjects } from "./admin/Projects";
import { Team as AdminTeam } from "./admin/Team";
import { Settings as AdminSettings } from "./admin/Settings";

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
      { path: "katil", Component: Join },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "etkinlikler", Component: AdminEvents },
      { path: "projeler", Component: AdminProjects },
      { path: "ekip", Component: AdminTeam },
      { path: "ayarlar", Component: AdminSettings },
      { path: "*", Component: NotFound },
    ],
  }
]);
