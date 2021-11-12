import { FunctionComponent, ReactNode } from "react";
import styles from "@styles/components/common/Tooltip.module.scss";

interface Props {
  children?: ReactNode;
}

const Tooltip: FunctionComponent<Props> = ({ children }) => {
  return <div className={styles.tooltipContainer}>{children}</div>;
};

export default Tooltip;
