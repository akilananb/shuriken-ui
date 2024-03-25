"use client";
import List from "@mui/material/List";
import { SessionContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";

const SideMenu = ({ onClose }) => {
  const { session } = useContext(SessionContext);
  const [selectedKey, setSelectedKey] = useState("1");

  const router = useRouter();

  const items = [
    {
      key: "1",
      icon: <SearchIcon />,
      label: "LTV Search",
      path: "/",
    },
  ];

  session?.roles?.includes("shuriken_admin") &&
    items.push({
      key: "2",
      icon: <ContentCopyIcon />,
      label: "Override",
      path: "/overrides",
    });

  function handleClick(key) {
    setSelectedKey(key);
    router.push(items[parseInt(key) - 1].path);
    onClose();
  }

  return (
    <div className="flex items-center h-full justify-center overflow-auto hide-scrollbar">
      <List className="!items-center !self-sttretch !px-4 !p-3 !border-none !justify-around w-80">
        {items.map((item) => (
          <ListItem key={item.key} onClick={() => handleClick(item.key)}>
            <ListItemButton
              sx={{
                borderRadius: "8px",
                color: selectedKey === item.key ? "#D71133" : "#323232",
                backgroundColor:
                  selectedKey === item.key ? "#FFEFF2" : "transparent",
                "&:hover": {
                  backgroundColor: "#FFEFF2",
                },
              }}
            >
              <ListItemIcon
                sx={{ color: selectedKey === item.key ? "#D71133" : "#323232" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

SideMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SideMenu;
