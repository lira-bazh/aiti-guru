import { Button } from "antd";
import { ArrowsClockwiseIcon } from "@/ui/Icons";
import { AddButton } from "./components";
import styles from './ProductsTitle.module.scss';

export const ProductsTitle = () => {
  return (
    <div className={styles["products-title"]}>
      <h2>Все позиции</h2>
      <div className={styles["products-title-actions"]}>
        <Button className={styles.refresh} icon={<ArrowsClockwiseIcon />} />
        <AddButton />
      </div>
    </div>
  );
};

