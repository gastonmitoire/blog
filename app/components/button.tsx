import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  baseClassName?: string;
};

export const Button: React.FC<ButtonProps> = ({
  baseClassName = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
  children,
  ...rest
}) => {
  const classNames = `${baseClassName} ${rest.className || ""}`;

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};
