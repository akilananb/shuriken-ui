import Image from "next/image";
import EditIcon from "../../../../public/static/images/editIcon.svg";
import DeleteIcon from "../../../../public/static/images/deleteIcon.svg";

const ActionItem = ({ actionType, onClick }) => {
  function renderIcon(actionType) {
    switch (actionType) {
      case "Edit":
        return <Image priority src={EditIcon} />;
      case "Delete":
        return <Image priority src={DeleteIcon} />;

      default:
        return <></>;
    }
  }

  return <button onClick={onClick}>{renderIcon(actionType)}</button>;
};

export default ActionItem;
