import { JSX } from "react";

const RandomIcon = ({ className }: { className: string }): JSX.Element => {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="m13 12h-2c-1 0-1.7-1.2-2.4-2.7-.3.7-.6 1.5-1 2.3.8 1.4 1.8 2.4 3.4 2.4h2v2l3-3-3-3z" />
      <path d="m5.4 6.6c.3-.7.6-1.5 1-2.2-.8-1.4-1.9-2.4-3.4-2.4h-3v2h3c1 0 1.7 1.2 2.4 2.6z" />
      <path d="m16 3-3-3v2h-2c-2.7 0-3.9 3-5 5.7-.8 2.1-1.7 4.3-3 4.3h-3v2h3c2.6 0 3.8-2.8 4.9-5.6.9-2.2 1.8-4.4 3.1-4.4h2v2z" />
    </svg>
  );
};

export default RandomIcon;
