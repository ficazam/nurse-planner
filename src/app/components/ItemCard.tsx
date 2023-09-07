import React from "react";
import Card from "./Card";

interface iCardItemProps {
  item: Expense | Savings | Intake;
}

const ItemCard = (props: iCardItemProps) => {
  return (
    <Card>
      <>
        <div className="flex flex-col items-start w-full">
          <h1 className="text-2xl">
            {props.item.name} - ${props.item.amount}
          </h1>
          <p>{props.item.date?.toDateString()}</p>
        </div>
        <div className="flex flex-col items-end justify-around pl-2 w-full">
          <p className="">
            {props.item.type} {props.item.typeName}
          </p>
          {props.item.typeName === "Expense" && (
            <p className="italic">{props.item.category}</p>
          )}
          {(props.item.typeName === "Savings" ||
            props.item.typeName === "Intake") && (
            <p className="italic">{props.item.recurring}</p>
          )}
        </div>
      </>
    </Card>
  );
};

export default ItemCard;
