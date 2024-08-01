import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import StoreProvider from "@/lib/StoreProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppBar, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import Navbar from "@/components/ui/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <AppRouterCacheProvider>
            {" "}
            {/* For resetting css with material ui */}
            <CssBaseline />
            {/* Store provider for zusand */}
            <StoreProvider lastUpdate={new Date().getTime()}>
              <Navbar>{children}</Navbar>
            </StoreProvider>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
