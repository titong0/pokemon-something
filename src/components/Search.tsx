import React from "react";
import Form from "./Form";
export interface FormProps {}

const Search: React.FC<FormProps> = () => {
  return (
    <div className="absolute left-0 top-9 z-10">
      <Form infoType="pokemon" color="yellow">
        Enter a pokemon name or ID
      </Form>
      <Form infoType="type" color="blue">
        Enter a type (english!)
      </Form>
    </div>
  );
};

export default Search;
