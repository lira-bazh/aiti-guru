import { Pagination, type PaginationProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectTotalProducts } from "@/store/productsSelectors";
import { loadPage } from "@/store/productsSlice";

export const ProductsPagination = () => {
  const dispatch = useAppDispatch();
  const total = useAppSelector(selectTotalProducts);

  const onChange: PaginationProps["onChange"] = (page) => {
    dispatch(loadPage(page));
  };

  return (
    <Pagination
      onChange={onChange}
      align="end"
      defaultCurrent={1}
      total={total}
      showSizeChanger={false}
    />
  );
};
