import { useState } from "react";
import { AntSwitch } from "./style";
import { ToggleButtonProps } from "./types";

export default function ToggleButton(props: ToggleButtonProps) {
  const { isChecked = false, title = "", onCheckListener } = props;
  const [_isChecked, setChecked] = useState(isChecked);

  return (
    <div className="flex items-center gap-1">
      <AntSwitch
        checked={_isChecked}
        inputProps={{ "aria-label": "ant design" }}
        onChange={() => {
          setChecked(!_isChecked);
          onCheckListener?.(!_isChecked);
        }}
      />
      <div className="nomura-14px-regular text-nomura-dark-grey">{title}</div>
    </div>
  );
}
