import PropTypes from "prop-types";
import Button from "@/components/common/button";
import BrandLogoFull from "@/components/common/brand_logo_full";
import Link from "next/link";
import Image from 'next/image';

NavBar.propTypes = {
  showDrawer: PropTypes.func.isRequired,
};


 function Header({children, className}) {
  return (
    <div className={className}>{children}</div>
  )
}



function NavBar({ showDrawer }) {

  return (

    <Header
      data-testid="shuriken-header"
      className="flex p-3 !bg-nomura-white h-16 justify-between"
    >
       <div className="flex items-center gap-6 ">
         <Button
           data-testid="shuriken-hamburger"
           icon={<Image src="/static/images/Hamburger.svg" alt="hamburger" width="24" height="24"/>}
           onClick={showDrawer}
           className="text-base dark:invert !w-10 h-10 p-2 text-white bg-red-900 hover:text-white"
         />
         <div className="relative">
           <Link href="/">
             <div
               className=" h-16 p-4 w-[120px] flex items-center logo-bannar cursor-pointer"
             >
               <BrandLogoFull />
             </div>
             </Link>
         </div>
         <div>
           <div className="font-semibold text-sm">Shuriken</div>
           <div className="font-semibold text-sm">手裏剣</div>
         </div>
       </div>
       <div className="flex pl-4 border-l border-nomura-off-gray ">
         <Button
          type="text"
          data-testid="shuriken-notification"
          icon={<Image src="/static/images/Heartbeat.svg" alt="hamburger" width="24" height="24"/>}
           className="text-base dark:invert !w-10 h-10 text-white hover:text-white"
         />
       </div>

    </Header>
  );
}

export default NavBar;
