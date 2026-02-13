import { AuthCard } from "./components";
import styles from './Auth.module.scss';

export const Auth = () => {
  return <div className={styles.auth}><AuthCard /></div>;
};