import { Link } from 'react-router';
import { Divider } from "antd";
import { Logo, AuthForm } from "./components";
import styles from './AuthCard.module.scss';

export const AuthCard = () => {
  return (
    <div className={styles.authCard}>
      <div className={styles["wrapper-content"]}>
        <div className={styles.content}>
          <Logo />{" "}
          <div className={styles.title}>
            <h1>Добро пожаловать!</h1>
            <div className={styles["title-text"]}>
              Пожалуйста, авторизируйтесь
            </div>
          </div>
          <div className={styles.form}>
            <AuthForm />
            <Divider>или</Divider>
          </div>
          <div className={styles["bottom-text"]}>
            Нет аккаунта? <Link to="/">Создать</Link>
          </div>
        </div>
      </div>
    </div>
  );
};