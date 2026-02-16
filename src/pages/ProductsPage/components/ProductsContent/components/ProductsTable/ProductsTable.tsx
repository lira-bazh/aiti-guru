import { useEffect } from "react";
import { Button, Table } from "antd";
import { PlusIcon } from "@/ui/Icons";
import {
  selectDataIsLoading,
  selectProducts,
  selectSortedInfo
} from "@/store/productsSelectors";
import { loadPage, changeSort } from "@/store/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ProductName } from "./components";
import type { IProduct, SortInfo } from "@/types";
import styles from "./ProductsTable.module.scss";

export const ProductsTable = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectDataIsLoading)
  const sortedInfo = useAppSelector(selectSortedInfo);

  const handleChange: NonNullable<TableProps<IProduct>["onChange"]> = (_1, _2, sorter) => {
    dispatch(changeSort(sorter as SortInfo));
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Наименование",
      dataIndex: "title",
      key: "title",
      render: (_, { title, category, images }) => (
        <ProductName title={title} category={category} images={images} />
      ),
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
      sorter: (a, b) => a.title.length - b.title.length
    },
    {
      title: "Вендор",
      dataIndex: "brand",
      key: "brand",
      render: (value) => <div className={styles.brand}>{value}</div>,
      sortOrder: sortedInfo.columnKey === "brand" ? sortedInfo.order : null,
      sorter: (a, b) => a.brand.length - b.brand.length
    },
    {
      title: "Артикул",
      dataIndex: "sku",
      key: "article"
    },
    {
      title: "Оценка",
      dataIndex: "rating",
      key: "rating",
      render: (value) => <div className={styles.rating}>{value}/5</div>,
      sortOrder: sortedInfo.columnKey === "rating" ? sortedInfo.order : null,
      sorter: (a, b) => a.rating - b.rating
    },
    {
      title: "Цена, ₽",
      dataIndex: "price",
      key: "price",
      render: (value) => (
        <div className={styles.price}>
          {value.toLocaleString("ru-RU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
      ),
      sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
      sorter: (a, b) => a.price - b.price
    },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: () => <Button icon={<PlusIcon />} />
    }
  ];

  useEffect(() => {
    dispatch(loadPage(1));
  }, [dispatch]);

  return (
    <div className={styles["products-table"]}>
      <Table<IProduct>
        columns={columns}
        dataSource={products}
        onChange={handleChange}
        pagination={false}
        loading={loading}
      />
    </div>
  );
};
