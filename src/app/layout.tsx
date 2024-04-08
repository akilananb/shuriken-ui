import Spinner from "@/components/common/spinner";
import NavigationContainer from "@/components/layout/navigationContainer";
import "@/styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Nomura Shuriken",
  description: "Nomura Shuriken",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <NavigationContainer />
          <Suspense fallback={<Spinner fullPage={true} />}>
            <div className="content-height">{children}</div>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
