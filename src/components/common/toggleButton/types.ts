export interface ToggleButtonProps {
  title?: string;
  isChecked?: boolean;
  onCheckListener?: (selectedItem: boolean) => void;
}
