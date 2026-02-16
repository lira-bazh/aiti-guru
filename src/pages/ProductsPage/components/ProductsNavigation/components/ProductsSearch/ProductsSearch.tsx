import { Input } from "antd";
import { CloseIcon, SearchIcon } from "@/ui/Icons";
import { useAppDispatch } from "@/store";
import { searchProducts } from "@/store/productsSlice";
import styles from "./ProductsSearch.module.scss";

export const ProductsSearch = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles["search"]}>
      <Input
        prefix={<SearchIcon />}
        allowClear={{ clearIcon: <CloseIcon /> }}
        onChange={(e) => {
          dispatch(searchProducts(e.target.value));
        }}
      />
    </div>
  );
};
