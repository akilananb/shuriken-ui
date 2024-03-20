import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BellOutlinedIcon from "@mui/icons-material/BellOutlined";
import BrandLogoFull from "@/components/common/brand_logo_full";
import Link from "next/link";

NavBar.propTypes = {
  showDrawer: PropTypes.func.isRequired,
};

function NavBar({ showDrawer }) {
  return (
    <AppBar
      position="static"
      data-testid="shuriken-header"
      className="flex align-center p-3  !bg-nomura-off-white opacity-80"
    >
      <Toolbar className="p-3">
        <div className="flex items-center gap-6">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={showDrawer}
            className="text-white hover:text-white"
          >
            <MenuOutlinedIcon />
          </IconButton>
          <div className="relative">
            <Link href="/">
              <div className="bg-nomura-off-white h-16 p-4 w-[120px] flex items-center logo-bannar cursor-pointer">
                <BrandLogoFull />
              </div>
            </Link>
          </div>
          <div>
            <Typography
              variant="subtitle1"
              component="div"
              className="text-white font-bold text-sm"
            >
              Shuriken
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              className="text-white font-bold text-sm"
            >
              手裏剣
            </Typography>
          </div>
        </div>
        <div className="flex-1 flex justify-end gap-4">
          <IconButton
            color="inherit"
            aria-label="notification"
            className="text-white hover:text-white"
          >
            <BellOutlinedIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
