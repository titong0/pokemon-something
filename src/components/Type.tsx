// import React, { useState, useEffect } from "react";
// import { typesURLs } from "../service";

const Type: React.FC<{ match: any }> = ({ match }) => {
  return <div>{match.params.type}</div>;
  
};

export default Type;
