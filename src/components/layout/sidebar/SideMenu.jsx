"use client";
import { CopyOutlined, SearchOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { SessionContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useContext } from "react";

const SideMenu = ({ onClose }) => {
  const { session } = useContext(SessionContext);

  const router = useRouter();

  const items = [
    {
      key: "1",
      icon: <SearchOutlined />,
      label: "LTV Search",
      path: "/",
    },
  ];

  session?.roles?.includes("shuriken_admin") &&
    items.push({
      key: "2",
      icon: <CopyOutlined />,
      label: "Override",
      path: "/overrides",
    });

  const handleClick = ({ key }) => {
    router.push(items[parseInt(key) - 1].path);
    onClose();
  };

  return (
    <div className="flex items-center h-full justify-center overflow-auto hide-scrollbar">
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        className="!items-center !self-sttretch !px-4 !p-3 !border-none !justify-around w-80"
      />
    </div>
  );
};

SideMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SideMenu;
