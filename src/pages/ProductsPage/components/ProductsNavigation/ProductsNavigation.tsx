import { ProductsSearch } from "./components";
import styles from "./ProductsNavigation.module.scss";

export const ProductsNavigation = () => {
  return (
    <div className={styles["products-navigation"]}>
      <h1>Товары</h1>
      <ProductsSearch />
    </div>
  );
};