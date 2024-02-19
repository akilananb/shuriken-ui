import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";

function Footer() {

  const [ userInfo, setUserInfo ] = useState({});
  useEffect(() => {
    fetch('/shuriken/api/auth')
    .then(response => response.json())
    .then(data => setUserInfo(data));
  }, []);
      
  return (
    <div>
      <div className="px-4 py-3">
        <div className="flex gap-2">
          <Avatar size={40} icon={<UserOutlined />} />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900"> {userInfo?.commonName}</span>
            <span className="text-xs font-normal text-gray-400">
             {userInfo?.roles?.map(role => role).join(', ')}
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex justify-center text-xs font-normal text-gray-400">
        {userInfo?.env}
      </div>
    </div>
  );
}

export default Footer;
