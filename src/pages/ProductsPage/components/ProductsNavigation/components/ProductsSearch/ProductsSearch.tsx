import { useEffect, useState } from "react";
import { Input } from "antd";
import { CloseIcon, SearchIcon } from "@/ui/Icons";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch } from "@/store";
import { searchProducts } from "@/store/productsSlice";
import styles from "./ProductsSearch.module.scss";

export const ProductsSearch = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 700);

  useEffect(() => {
    dispatch(searchProducts(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  return (
    <Input
      className={styles["search"]}
      prefix={<SearchIcon />}
      allowClear={{ clearIcon: <CloseIcon /> }}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Найти"
    />
  );
};
