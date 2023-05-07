import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  baseClassName?: string;
  icon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  baseClassName = "w-full bg-blue-500 hover:bg-blue-700 text-neutral-200 uppercase py-2 px-4 rounded",
  ...rest
}) => {
  const classNames = `${baseClassName} ${rest.className || ""}`;

  return (
    <button className={classNames} {...rest}>
      {icon ? (
        <span className="flex justify-center items-center space-x-2">
          {icon}
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
};
