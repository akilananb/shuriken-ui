import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Footer() {
  return (
    <div>
      <div className="px-4 py-3">
        <div className="flex gap-2">
          <Avatar size={40} icon={<UserOutlined />} />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">Name</span>
            <span className="text-xs font-normal text-gray-400">
              Sales Representative
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex justify-center text-xs font-normal text-gray-400">
        Dev v 0.0.1
      </div>
    </div>
  );
}

export default Footer;
