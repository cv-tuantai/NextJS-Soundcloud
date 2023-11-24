import AppFooter from "@/components/footer/appFooter";
import AppHeader from "@/components/header/appHeader";
import ThemeRegistry from "@/components/theme-registry/theme.registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppHeader />
          {children}
          <AppFooter />
        </ThemeRegistry>
      </body>
    </html>
  );
}
