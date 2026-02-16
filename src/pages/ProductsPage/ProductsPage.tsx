import { ProductsNavigation, ProductsContent } from "./components";
import styles from "./ProductsPage.module.scss";

export const ProductsPage = () => {
  return (
    <div className={styles["products-page"]}>
      <ProductsNavigation />
      <ProductsContent />
    </div>
  );
};