import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
} from "react";

type ButtonVariants = "CONTAINED" | "OUTLINED";

type ButtonProps = {
  variant?: ButtonVariants;
};

const Button: FunctionComponent<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonProps
> = (props) => {
  const className: Record<ButtonVariants, string> = {
    CONTAINED: "bg-green-700 hover:bg-green-600 disabled:bg-gray-500",
    OUTLINED:
      "border border-green-600 bg-transparent hover:border-green-500 active:border-green-500 disabled:border-gray-500",
  };
  return (
    <button
      className={`${
        props.className || ""
      } rounded px-4 py-2 hover:cursor-pointer disabled:hover:cursor-default ${
        className[props.variant || "CONTAINED"]
      }`}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
