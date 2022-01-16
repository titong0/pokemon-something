import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getPokedex } from "../service";

export interface FormProps {
  infoType: string;
  color: string;
  children?: string;
}

const Form: React.FC<FormProps> = (props) => {
  const [pkmnNames, setPkmnNames] = useState<string[] | null>(null);
  const [formValue, setFormValue] = useState("");
  const routerHistory = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue(e.target.value);
  };

  const handleSubmit = () => {
    routerHistory.replace("");
    routerHistory.push(`${props.infoType}/${formValue.toLowerCase()}`);
  };

  useEffect(() => {
    if (props.infoType !== "pokemon") return;
    getPokedex().then((pokedex) => {
      const names = pokedex.pokemon_entries.map(
        (i: any) => i.pokemon_species.name
      );
      setPkmnNames(names);
    });
  }, []);

  return (
    <form
      className={`flex flex-col bg-${props.color}-300 p-3 text-gray-600`}
      autoComplete="false"
      onSubmit={handleSubmit}
    >
      <label htmlFor={props.infoType} className="text-2xl">
        Inspect a {props.infoType}
      </label>
      <input
        placeholder={props.children || "nothing"}
        type="text"
        className="p-2 bg-blue-200 border-4 my-2 relative"
        value={formValue}
        onChange={(e) => handleChange(e)}
      />
      {/* autocomplete */}
      {pkmnNames !== null && formValue.length >= 2
        ? pkmnNames
            .filter((i: string) => i.startsWith(formValue))
            .map((i: string) => (
              <button
                className="text-left w-24"
                tabIndex={0}
                onClick={() => setFormValue(i)}
              >
                {i}
              </button>
            ))
        : null}
      <button
        className="border-2 rounded-lg text-white bg-blue-700"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
