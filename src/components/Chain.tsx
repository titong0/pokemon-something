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
          <div className="md:row-start-2 col-start-2 flex justify-center ">
            <img
              className=""
              src={getImgFromSpecies(props.chain.chain.species.url)}
              onClick={() =>
                routerHistory.push(
                  "" + idFromSpecies(props.chain.chain.species.url)
                )
              }
              alt=""
            />
          </div>
          {props.chain.chain.evolves_to.map((i) => (
            <div className="flex justify-center items-center flex-col">
              <span>{evolutionText(i.evolution_details[0])}</span>
              <img
                onClick={() =>
                  routerHistory.push("" + idFromSpecies(i.species.url))
                }
                src={getImgFromSpecies(i.species.url)}
                alt={i.species.name}
              />
            </div>
          ))}
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
            {props.chain.chain.evolves_to[0].evolves_to[0] ? (
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
