import React from "react";

interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className = "" }: IconProps) {
  if (!name) return null;

  const isFontAwesome = name.startsWith("fa") || name.includes("fa-");

  if (isFontAwesome) {
    return <i className={`${name} ${className}`}></i>;
  }

  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}
