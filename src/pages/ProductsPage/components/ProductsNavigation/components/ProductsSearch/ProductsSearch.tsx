import { Input } from "antd";
import { CloseIcon, SearchIcon } from "@/ui/Icons";
import { useAppDispatch } from "@/store";
import { searchProducts } from "@/store/productsSlice";
import styles from "./ProductsSearch.module.scss";

export const ProductsSearch = () => {
  const dispatch = useAppDispatch();

  return (
    <Input
      className={styles["search"]}
      prefix={<SearchIcon />}
      allowClear={{ clearIcon: <CloseIcon /> }}
      onChange={(e) => {
        dispatch(searchProducts(e.target.value));
      }}
      placeholder="Найти"
    />
  );
};
