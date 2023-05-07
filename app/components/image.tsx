import React from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export const Image: React.FC<Props> = ({ src, alt, className }) => {
  return <img className={`block mx-auto ${className}`} src={src} alt={alt} />;
};
