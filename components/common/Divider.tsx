import { FunctionComponent } from "react";
import styles from "../../styles/components/common/Divider.module.css";

interface Props {
  small?: boolean;
}
const Divider: FunctionComponent<Props> = ({ small = false }) => {
  return (
    <hr
      className={
        small ? `${styles.divider} ${styles.dividerSmall}` : `${styles.divider}`
      }
    />
  );
};

export default Divider;
