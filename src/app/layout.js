"use client";
import { Layout } from "antd";
import SideBar from "@/components/layout/sidebar";
import { useState, Suspense } from "react";
import NavBar from "@/components/layout/navbar";
import "@/styles/globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Spinner from "@/components/common/spinner";

export default function RootLayout({ children }) {
  const { Content } = Layout;

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <SideBar onClose={onClose} open={open} />
            <NavBar showDrawer={showDrawer} />
            <Suspense fallback={<Spinner fullPage={true}/>}>
                <div className="content-height">{children}</div>
            </Suspense>
        </AntdRegistry>
      </body>
    </html>
  );
}
