import type React from 'react';
import styles from './ProductName.module.scss';

interface ProductNameProps {
  title: string;
  category: string;
  images: string[]
}

export const capitalizeFirst = (str?: string | null): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const ProductName: React.FC<ProductNameProps> = ({
  title,
  category,
  images
}) => {
  return (
    <div className={styles.name}>
      {Array.isArray(images) && images.length && (
        <img
          src={images[0]}
          alt={`image of ${title}`}
          className={styles.image}
        />
      )}
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <div className={styles.category}>{capitalizeFirst(category)}</div>
      </div>
    </div>
  );
};