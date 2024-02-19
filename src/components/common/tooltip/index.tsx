import { TooltipProps } from "./tooltip.types";
import Tooltip from "@mui/material/Tooltip";

const TooltipComponent: React.FC<TooltipProps> = (props: TooltipProps) => {
  const { children, tooltipMsg } = props;

  return (
    <>
      <Tooltip title={tooltipMsg} arrow>
        <>{children}</>
      </Tooltip>
    </>
  );
};

export default TooltipComponent;
