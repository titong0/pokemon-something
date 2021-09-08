import React from "react";
import Form from "./Form";
export interface FormProps {}

const Search: React.FC<FormProps> = () => {
  return (
    <div>
      <Form infoType="pokemon" color="pink" />
      <Form infoType="type" color="red" />
    </div>
  );
};

export default Search;
