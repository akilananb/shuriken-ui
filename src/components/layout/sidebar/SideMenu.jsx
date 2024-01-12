'use client';

import { Menu } from "antd";
import PropTypes from "prop-types";
import { SearchOutlined, CopyOutlined, SoundOutlined } from "@ant-design/icons";

const items = [
  {
    key: "1",
    icon: <SearchOutlined />,
    label: "LTV Security Search",
    path: "/",
  },
  {
    key: "2",
    icon: <SearchOutlined />,
    label: "Margin Ratio Search",
  },
  {
    key: "3",
    icon: <SearchOutlined />,
    label: "ELN Search",
  },
  {
    key: "4",
    icon: <CopyOutlined />,
    label: "Override",
    path: "/overrides",
  },
  {
    key: "5",
    icon: <SoundOutlined />,
    label: "Announcements",
  },
];


const SideMenu = ({ onClose }) => {

  const handleClick = ({key}) => {
    router.push(items[parseInt(key) - 1].path)
  };

  return (
    <div className="flex items-center h-full justify-center overflow-auto hide-scrollbar">
      <Menu
        onClick={
          handleClick
        }
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
