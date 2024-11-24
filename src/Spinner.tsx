import style from "./Spinner.module.css";

type SpinnerProps = {
  label?: string;
};

export const Spinner = ({ label = "Loading..." }: SpinnerProps) => {
  return (
    <div
      className={style.loader}
      role="status"
      aria-label={label}
      aria-live="polite"
    ></div>
  );
};
