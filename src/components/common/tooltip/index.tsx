import { TooltipProps } from "./tooltip.types";
import Tooltip from "@mui/material/Tooltip";

const TooltipComponent: React.FC<TooltipProps> = (props: TooltipProps) => {
  const { children, tooltipMsg, placement } = props;

  return (
    <>
      <Tooltip title={tooltipMsg} arrow placement={placement}>
        <div>{children}</div>
      </Tooltip>
    </>
  );
};

export default TooltipComponent;
