import { ProductsTitle, ProductsTable, ProductsPagination } from "./components";
import styles from './ProductsContent.module.scss';

export const ProductsContent = () => {
  return (
    <div className={styles["products-content"]}>
      <ProductsTitle />
      <ProductsTable />
      <ProductsPagination />
    </div>
  );
};