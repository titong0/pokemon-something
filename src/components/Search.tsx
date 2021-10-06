import React from "react";
import Form from "./Form";
export interface FormProps {}

const Search: React.FC<FormProps> = () => {
  return (
    <div>
      <Form infoType="pokemon" color="yellow" />
      <Form infoType="type" color="red" />
      <Form infoType="move" color="blue" />
    </div>
  );
};

export default Search;
