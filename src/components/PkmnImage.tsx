import Types from "./Types";
import { getImgFromUrl, idFromSpecies, evolutionText } from "../helpers";
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
          className={`flex flex-col gap-1 items-center ${
            props.classes ? props.classes : ""
          } md:my-8`}
        >
          <span className="max-w-xs text-center text-xl">
            {props.text ?? evolutionText(props.pkmn.evolution_details[0])}
          </span>
          <img
            className="cursor-pointer transform hover:scale-105"
            onClick={() =>
              routerHistory.push("" + idFromSpecies(props.pkmn.species.url))
            }
            src={getImgFromUrl(props.pkmn.species.url)}
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
