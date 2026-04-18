import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Team } from "./pages/Team";
import { Events } from "./pages/Events";
import { Projects } from "./pages/Projects";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "hakkimizda", Component: About },
      { path: "ekibimiz", Component: Team },
      { path: "etkinlikler", Component: Events },
      { path: "projeler", Component: Projects },
      { path: "iletisim", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
