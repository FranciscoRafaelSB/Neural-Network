import React from "react";

interface Props {
  axonWeight: number;
}

const FinalOutputDesition = ({ axonWeight }: Props) => {
  return (
    <div>
      <h2>
        {axonWeight > 4
          ? `Keep trying until your dreams comes true. You are a good person.`
          : "You are doing well, keep trying."}
      </h2>
    </div>
  );
};

export default FinalOutputDesition;
