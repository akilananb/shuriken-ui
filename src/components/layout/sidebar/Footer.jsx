import { Avatar } from "antd";
import { useContext } from "react";
import { UserOutlined } from "@ant-design/icons";
import { SessionContext } from '@/context/AuthContext';

function Footer() {
  const { session } = useContext(SessionContext);
  
  return (
    <div>
      <div className="px-4 py-3">
        <div className="flex gap-2">
          <Avatar size={40} icon={<UserOutlined />} />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900"> {session?.commonName}</span>
            <span className="text-xs font-normal text-gray-400">
             {session?.roles?.map(role => role).join(', ')}
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex justify-center text-xs font-normal text-gray-400">
        {session?.env}
      </div>
    </div>
  );
}

export default Footer;
