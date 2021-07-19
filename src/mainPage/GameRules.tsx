import React from "react";

interface IProps {
  rules: Array<string>;
}

const GameRules: React.FC<IProps> = (props) => {
  return (
    <div>
      <ol>
        {props.rules.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ol>
    </div>
  );
};

export default GameRules;
