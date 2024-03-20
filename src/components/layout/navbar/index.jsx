import PropTypes from "prop-types";
import Button from "@/components/common/button";
import BrandLogoFull from "@/components/common/brand_logo_full";
import Link from "next/link";
import Image from "next/image";
import { BASE_NAME } from "@/config/appConfig";

NavBar.propTypes = {
  showDrawer: PropTypes.func.isRequired,
};

function Header({ children, className }) {
  return <div className={className}>{children}</div>;
}

function NavBar({ showDrawer }) {
  return (
    <Header
      data-testid="shuriken-header"
      className="flex p-3 !bg-nomura-white h-16 justify-between bg-shuriken-img"
    >
      <div className="flex items-center gap-6 ">
        <Button
          data-testid="shuriken-hamburger"
          icon={
            <Image
              src={`${BASE_NAME}/static/images/Hamburger.svg`}
              alt="hamburger"
              width="24"
              height="24"
            />
          }
          onClick={showDrawer}
          className="text-base dark:invert !w-10 h-10 p-2 text-white bg-red-900 hover:text-white"
        />

        <div className="relative flex">
          <img
            src={`${BASE_NAME}/static/images/nomura-back.png`}
            alt="nomura Logo"
            className="h-[64px]"
          />
          <div className="absolute top-0 left-12">
            <img
              src={`${BASE_NAME}/static/images/nomura-text.png`}
              alt="nomura Logo"
              className="h-[64px]"
            />
          </div>
          <div>
            <img
              src={`${BASE_NAME}/static/images/shuriken-text.png`}
              alt="nomura Logo"
              className="h-[64px]"
            />
          </div>
        </div>
      </div>
      <div className="flex pl-4 border-l border-nomura-off-gray ">
        <Button
          type="text"
          data-testid="shuriken-notification"
          icon={
            <Image
              src={`${BASE_NAME}/static/images/Heartbeat.svg`}
              alt="hamburger"
              width="24"
              height="24"
            />
          }
          className="text-base dark:invert !w-10 h-10 text-white hover:text-white"
        />
      </div>
    </Header>
  );
}

export default NavBar;
