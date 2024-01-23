import Image from "next/image";
import EditIcon from "../../../../public/static/images/editIcon.svg";
import DeleteIcon from "../../../../public/static/images/deleteIcon.svg";

const ActionItem = ({ actionType, onClick }) => {
  function renderIcon(actionType) {
    switch (actionType) {
      case "Edit":
        return EditIcon;
      case "Delete":
        return DeleteIcon;

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
