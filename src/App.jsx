import { useState } from "react";

import { Layout } from "antd";
import Home from "@pages/home";
import SideBar from "@components/layout/sidebar";
import Overrides from "@pages/overrides";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const { Content } = Layout;
import "./App.css";
import NavBar from "@components/layout/navbar";

function App() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Router>
      <Layout>
        <SideBar onClose={onClose} open={open} />
        <Layout className="site-layout">
          <NavBar showDrawer={showDrawer} />
        </Layout>
        <Content className="content-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/overrides" element={<Overrides />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
