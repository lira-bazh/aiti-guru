import { AuthCard } from "./components";
import styles from "./AuthPage.module.scss";

export const AuthPage = () => {
  return (
    <div className={styles["auth-page"]}>
      <AuthCard />
    </div>
  );
};