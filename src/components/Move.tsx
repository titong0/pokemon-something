import React from "react";

const Move: React.FC<{ match: any }> = ({ match }) => {
  return <div>{match.params.name}</div>;
};

export default Move;
