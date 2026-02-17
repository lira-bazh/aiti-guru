import { Pagination, type PaginationProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectTotalProducts } from "@/store/productsSelectors";
import { loadPage } from "@/store/productsSlice";
import styles from './ProductsPagination.module.scss';
import { PRODUCTS_PORTION } from "@/constants";

export const ProductsPagination = () => {
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectTotalProducts);

  const onChange: PaginationProps["onChange"] = (page) => {
    dispatch(loadPage(page));
  };

  return (
    <Pagination
      onChange={onChange}
      className={styles["products-pagination"]}
      showTotal={(total, range) => (
        <>
          Показано{" "}
          <span className={styles["total-numbers"]}>
            {range[0]}-{range[1]}
          </span>{" "}
          из <span className={styles["total-numbers"]}>{total}</span>
        </>
      )}
      align="end"
      defaultCurrent={1}
      total={total}
      showSizeChanger={false}
      pageSize={PRODUCTS_PORTION}
    />
  );
};
