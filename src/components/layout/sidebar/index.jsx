import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "@/components/layout/sidebar/Footer";
import SideMenu from "@/components/layout/sidebar/SideMenu";
import BrandLogoFull from "@/components/common/brand_logo_full";
import { Divider } from "@mui/material";

const SideBar = ({ open, onClose }) => {
  const drawerWidth = 352;

  const handleDrawerClose = () => {
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={handleDrawerClose}
      anchor="left"
      variant="persistent"
      id="shuriken-sidebar"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between">
          <BrandLogoFull className="brand-logo-sidebar mt-3.5 w-[88] h-[16]" />
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleDrawerClose} />
        </div>
        <Divider />
        <div className="flex-grow">
          <SideMenu onClose={handleDrawerClose} />
        </div>
        <Divider />
        <Footer />
      </div>
    </Drawer>
  );
};

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideBar;
