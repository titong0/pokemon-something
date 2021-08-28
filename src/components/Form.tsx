import React, { useState } from "react";

export interface FormProps {}

const Form: React.FC<FormProps> = () => {
  const [pokemon, setpokemon] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpokemon(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("algo");
    window.history.replaceState("null", "", pokemon);
    window.location.href = `pokemon/${pokemon}`;
    e.preventDefault();
  };
  return (
    <form
      className="flex flex-col bg-pink-300 p-3"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        className="p-2 bg-blue-200 border-4"
        value={pokemon}
        onChange={(e) => handleChange(e)}
      />
      GET https://pokeapi.co/api/v2/pokemon/{pokemon}
      <button
        className="w-1/5 border-2 rounded-lg text-white bg-blue-700"
        type="submit"
      >
        Submit
      </button>
      o
    </form>
  );
};

export default Form;
