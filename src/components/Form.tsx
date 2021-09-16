import React, { useState } from "react";
import { useHistory } from "react-router";

export interface FormProps {
  infoType: string;
  color: string;
}

const Form: React.FC<FormProps> = (props) => {
  const [data, setData] = useState("");
  const routerHistory = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  const handleSubmit = () => {
    routerHistory.push(`${props.infoType}/${data.toLowerCase()}`);
  };
  return (
    <form
      className={`flex flex-col bg-${props.color}-300 p-3`}
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl">Inspect a {props.infoType}</h2>
      <input
        placeholder="enter a pokemon name or ID"
        type="text"
        className="p-2 bg-blue-200 border-4 my-2"
        value={data}
        onChange={(e) => handleChange(e)}
      />
      <button
        className="w-1/5 border-2 rounded-lg text-white bg-blue-700"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
