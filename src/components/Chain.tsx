import { EvolChainInterface, PokemonInterface } from "../interfaces";
import {
  getEvolType,
  getImgFromSpecies,
  idFromSpecies,
  evolutionText,
} from "../helpers";
import { useHistory } from "react-router";

export interface ChainProps {
  chain: EvolChainInterface;
  pkmnData: PokemonInterface;
}

const Chain: React.FC<ChainProps> = (props) => {
  const routerHistory = useHistory();

  const evolType = getEvolType(props.chain);
  return (
    <div className="evol-chain-container flex justify-center">
      {evolType === "Eevee" ? (
        <div className="eevee-evolution">
          {props.chain.chain.evolves_to.map((i) => (
            <div>
              {evolutionText(i.evolution_details[0])}
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
        <div>
          branched evolutions
          <img src={getImgFromSpecies(props.chain.chain.species.url)} alt="" />
        </div>
      ) : evolType === "normal evolution chain" ? (
        <div className="inline-block">
          regular evolution
          <img src={getImgFromSpecies(props.chain.chain.species.url)} alt="" />
          <div>
            {evolutionText(
              props.chain.chain.evolves_to[0].evolution_details[0]
            )}
            <img
              src={getImgFromSpecies(
                props.chain.chain.evolves_to[0].species.url
              )}
              alt=""
            />
            {props.chain.chain.evolves_to[0].evolves_to ? (
              <>
                {evolutionText(
                  props.chain.chain.evolves_to[0].evolves_to[0]
                    .evolution_details[0]
                )}
                <img
                  src={getImgFromSpecies(
                    props.chain.chain.evolves_to[0].evolves_to[0].species.url
                  )}
                  alt=""
                />
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <div>
          lmao doesnt even evolve
          <img src={getImgFromSpecies(props.chain.chain.species.url)} alt="" />
        </div>
      )}
    </div>
  );
};

// const pkmnImages = () => {
//   return <div></div>;
// };

export default Chain;
