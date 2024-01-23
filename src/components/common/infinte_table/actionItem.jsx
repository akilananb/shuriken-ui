
import EditIcon from "../../../assets/editIcon"
import DeleteIcon from "../../../assets/deleteIcon"

const ActionItem = ({ actionType, onClick }) => {
    function renderIcon(actionType) {
        switch(actionType) {
          case 'Edit':
            return <EditIcon/>;
            case 'Delete':
                return <DeleteIcon/>;

          default:
            return <></>;
        }
      }

    return (
        <button 
            onClick={onClick} 
        >
            {renderIcon(actionType)}
        </button>
    );
  };
  
  export default ActionItem;