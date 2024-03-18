import { Layout, Button } from "antd";
import PropTypes from "prop-types";
import { MenuOutlined, BellOutlined } from "@ant-design/icons";
const { Header } = Layout;
import BrandLogoFull from "@/components/common/brand_logo_full";
import Link from "next/link";

NavBar.propTypes = {
  showDrawer: PropTypes.func.isRequired,
};

function NavBar({ showDrawer }) {
  return (
    <Header
      data-testid="shuriken-header"
      className="flex align-center p-3  !bg-nomura-off-white opacity-80"
    >
      <div className="flex items-center gap-6 ">
        <Button
          data-testid="shuriken-hamburger"
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          className="text-base !w-10 h-10 text-white hover:text-white"
        />
        <div className="relative">
          <Link href="/">
            <div className="bg-nomura-off-white h-16 p-4 w-[120px] flex items-center logo-bannar cursor-pointer">
              <BrandLogoFull />
            </div>
          </Link>
        </div>
        <div>
          <div className="text-white font-bold text-sm">Shuriken</div>
          <div className="text-white font-bold text-sm">手裏剣</div>
        </div>
      </div>
      <div className="flex-1 flex justify-end gap-4">
        <Button
          type="text"
          data-testid="shuriken-notification"
          icon={<BellOutlined />}
          className="text-base !w-10 h-10 text-white hover:text-white"
        />
      </div>
    </Header>
  );
}

export default NavBar;
