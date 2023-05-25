import styles from "./Loading.module.css"

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
