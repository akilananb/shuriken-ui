import Spinner from "@/components/common/spinner";
import NavigationContainer from "@/components/layout/navigationContainer";
import "@/styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AntdRegistry>
          <AppRouterCacheProvider>
            <NavigationContainer />
            <Suspense fallback={<Spinner fullPage={true} />}>
              <div className="content-height">{children}</div>
            </Suspense>
          </AppRouterCacheProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
