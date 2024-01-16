"use client";
import { Layout } from "antd";
import SideBar from "@/components/layout/sidebar";
import { useState } from "react";
import NavBar from "@/components/layout/navbar";
import { Inter } from 'next/font/google'
import "./index.css";

const inter = Inter({ subsets: ['latin'] })


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
      <body className={inter.className}>
        <Layout>
          <SideBar onClose={onClose} open={open} />
          <Layout className="site-layout">
            <NavBar showDrawer={showDrawer} />
          </Layout>
          <Content className="content-height">{children}</Content>
        </Layout>
      </body>
    </html>
  );
}
