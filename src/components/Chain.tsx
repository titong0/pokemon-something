import {
  EvolChainInterface,
  PokemonInterface,
  // evolution_details,
} from "../interfaces";
import { getEvolType, getImgFromSpecies, idFromSpecies } from "../helpers";
import { useHistory } from "react-router";

export interface ChainProps {
  chain: EvolChainInterface;
  pkmnData: PokemonInterface;
}

// const evolutionText = (evolDetails: evolution_details): string => {
//   const { name } = evolDetails.trigger;
//   if (name === "level-up") {
//     if (evolDetails) {
//     }
//   }

//   return "";
// };

const Chain: React.FC<ChainProps> = (props) => {
  const routerHistory = useHistory();

  const evolType = getEvolType(props.chain);
  return (
    <div>
      {evolType === "Eevee" ? (
        <div className="eevee-evolution">
          {props.chain.chain.evolves_to.map((i) => (
            <div>
              {i.evolution_details[0].trigger?.name === "level-up" ? "" : null}
              <img
                onClick={() =>
                  routerHistory.push("" + idFromSpecies(i.species.url))
                }
                src={getImgFromSpecies(i.species.url)}
                alt={i.species.name}
              />
            </div>
          ))}
          <img
            className="row-start-2 col-start-2"
            src={getImgFromSpecies(props.chain.chain.species.url)}
            onClick={() =>
              routerHistory.push(
                "" + idFromSpecies(props.chain.chain.species.url)
              )
            }
            alt=""
          />
        </div>
      ) : evolType === "multiple evolutions" ? (
        <div>MULTIPLE EVOLUTIONS</div>
      ) : evolType === "normal evolution chain" ? (
        <div>{}</div>
      ) : (
        <div>lmao doesnt even evolve</div>
      )}
    </div>
  );
};

// const pkmnImages = () => {
//   return <div></div>;
// };

export default Chain;
