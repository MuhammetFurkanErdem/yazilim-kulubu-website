import { RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import { router } from '@/router/routes';

import { AuthProvider } from "@/contexts/AuthContext";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
