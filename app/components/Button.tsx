import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
} from "react";

const Button: FunctionComponent<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  return (
    <button
      className={`${
        props.className || ""
      } rounded bg-green-700 px-4 py-2 hover:bg-green-600 active:bg-green-500`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
