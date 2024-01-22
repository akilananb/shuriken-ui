import PropTypes from "prop-types";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import BrandLogoFull from "@/components/common/brand_logo_full";

const drawerStyle = {
  header: "flex !pb-4 !px-0 !pt-0 items-center gap-[106px] self-stretch",
  content: "pt-8 px-4 pb-0",
  body: "!p-0",
};

const SideBar = ({ open, onClose }) => (
  <Drawer
    id="shuriken-sidebar"
    width={352}
    title={<BrandLogoFull className="brand-logo-sidebar" />}
    placement="left"
    extra={
      <CloseOutlined
        className="absolute top-4 right-4"
        width={24}
        height={24}
        onClick={onClose}
      />
    }
    open={open}
    closable={false}
    classNames={drawerStyle}
    footer={<Footer />}
  >
    <SideMenu onClose={onClose} />
  </Drawer>
);

SideBar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideBar;
