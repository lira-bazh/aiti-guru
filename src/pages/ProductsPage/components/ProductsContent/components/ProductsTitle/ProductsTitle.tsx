import { Button } from "antd";
import { ArrowsClockwiseIcon, PlusCircleIcon } from "@/ui/Icons";
import styles from './ProductsTitle.module.scss';

export const ProductsTitle = () => {
  return (
    <div className={styles["products-title"]}>
      <h2>Все позиции</h2>
      <div className={styles["products-title-actions"]}>
        <Button icon={<ArrowsClockwiseIcon />} />
        <Button type="primary" icon={<PlusCircleIcon />}>
          Добавить
        </Button>
      </div>
    </div>
  );
};
