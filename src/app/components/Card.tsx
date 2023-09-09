import React from "react";

interface iCardProps {
  children: React.ReactElement;
}

const Card = (props: iCardProps) => {
  return (
    <div className="shadow-md shadow-gray-300 border border-gray-300 min-w-[80vw] min-h-48 h-max rounded-lg flex flex-col justify-evenly p-8 my-3">
      <div className="flex items-center justify-start w-full">{props.children}</div>
    </div>
  );
};

export default Card;
