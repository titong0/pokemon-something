import Types from "./Types";
import { getImgFromSpecies, idFromSpecies, evolutionText } from "../helpers";
import { useHistory } from "react-router";

export interface imgProps {
  pkmn: any;
  text?: string;
  classes?: string;
  types: Map<string, any>;
}
const PkmnImage: React.FC<imgProps> = (props) => {
  const routerHistory = useHistory();
  return (
    <>
      {props.pkmn ? (
        <div
          className={`my-8 flex flex-col justify-between items-center ${
            props.classes ? props.classes : ""
          }`}
        >
          <span className="max-w-xs text-center text-xl">
            {props.text ?? evolutionText(props.pkmn.evolution_details[0])}
          </span>
          <img
            className="cursor-pointer transform hover:scale-105"
            onClick={() =>
              routerHistory.push("" + idFromSpecies(props.pkmn.species.url))
            }
            src={getImgFromSpecies(props.pkmn.species.url)}
            alt={props.pkmn.species.name}
          />
          <div className="h-10">
            <Types types={props.types.get(props.pkmn.species.name)} />
          </div>

          <span className="bg-gray-300 p-1 border-2 rounded-md mt-2">
            {props.pkmn.species.name}
          </span>
        </div>
      ) : null}
    </>
  );
};

export default PkmnImage;
