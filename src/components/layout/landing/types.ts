import { LTVSearch } from "@/types/search.types";

export interface SingleLtvSearchProps {
  value?: string;
  pdpId?: string;
  quantity?: string;
  onSelectedItem?: (selectedItem: LTVSearch | null) => void;
  onChangeListener?: (value: string) => void;
}

export interface MultiLtvSearchProps {
  onChangeListener?: (values: SearchValue[]) => void;
}

export interface SearchValue {
  pdpId?: string;
  isin?: string;
  ltvSearchValue?: LTVSearch;
  quantity?: string;
}
