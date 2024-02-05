import Image from "next/image";
import { BASE_NAME } from "@/config/appConfig";

const ActionItem = ({ actionType, onClick }) => {
  function renderIcon(actionType) {
    switch (actionType) {
      case "Edit":
        return `${BASE_NAME}/static/images/editIcon.svg`;
      case "Delete":
        return `${BASE_NAME}/static/images/deleteIcon.svg`;

      default:
        return "";
    }
  }

  return (
    <button onClick={onClick}>
      <Image width={16} height={16} alt="Logo" src={renderIcon(actionType)} />
    </button>
  );
};

export default ActionItem;
