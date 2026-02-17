import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import classNames from "classnames";
import { EllipsisCircleIcon, PlusIcon } from "@/ui/Icons";
import {
  selectDataIsLoading,
  selectProducts,
  selectSortedInfo
} from "@/store/productsSelectors";
import { loadPage, changeSort } from "@/store/productsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ProductName } from "./components";
import type { IProduct } from "@/types";
import styles from "./ProductsTable.module.scss";

const LOW_RATING = 3;

export const ProductsTable = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectDataIsLoading)
  const sortedInfo = useAppSelector(selectSortedInfo);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleChange: NonNullable<TableProps<IProduct>["onChange"]> = (_1, _2, sorter) => {
    if (!Array.isArray(sorter)) {
      dispatch(changeSort({ columnKey: sorter.columnKey, order: sorter.order }));
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
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
      sorter: (a, b) => a.title.length - b.title.length,
      width: "30%"
    },
    {
      title: "Вендор",
      dataIndex: "brand",
      key: "brand",
      render: (value) => <div className={styles.brand}>{value}</div>,
      sortOrder: sortedInfo.columnKey === "brand" ? sortedInfo.order : null,
      sorter: (a, b) => a.brand.length - b.brand.length,
      width: "15%"
    },
    {
      title: "Артикул",
      dataIndex: "sku",
      key: "article",
      width: "15%"
    },
    {
      title: "Оценка",
      dataIndex: "rating",
      key: "rating",
      render: (value) => (
        <div className={styles.rating}>
          <span
            className={classNames({
              ["low-rating"]: Number(value) < LOW_RATING
            })}
          >
            {value}
          </span>
          /5
        </div>
      ),
      sortOrder: sortedInfo.columnKey === "rating" ? sortedInfo.order : null,
      sorter: (a, b) => a.rating - b.rating,
      width: "10%"
    },
    {
      title: "Цена, ₽",
      dataIndex: "price",
      key: "price",
      render: (value) => {
        const [whole, decimal] = value
          .toLocaleString("ru-RU", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
          .toString()
          .split(",");

        return (
          <div className={styles.price}>
            {whole}
            <span className={styles["price-decimal"]}>,{decimal}</span>
          </div>
        );
      },
      sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
      sorter: (a, b) => a.price - b.price,
      width: "10%"
    },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: () => (
        <div className={styles.actions}>
          <Button
            className={styles["btn-plus"]}
            type="primary"
            icon={<PlusIcon />}
          />
          <Button
            className={styles["btn-ellipsis"]}
            type="text"
            shape="circle"
            icon={<EllipsisCircleIcon />}
          />
        </div>
      )
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
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
        pagination={false}
        loading={loading}
      />
    </div>
  );
};

