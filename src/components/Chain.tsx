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
  const first = props.chain.chain;
  const chainCols = first.evolves_to[0]?.evolves_to[0]
    ? "grid-cols-3"
    : "grid-cols-2";
  const chainRows =
    first.evolves_to[1] || first.evolves_to[0]?.evolves_to[1]
      ? "grid-rows-2"
      : "grid-rows-1";
  const routerHistory = useHistory();

  const evolType = getEvolType(props.chain);
  return (
    <div className="evol-chain-container mx-6 place-items-center">
      {!first.evolves_to[0] ? (
        <div>
          lmao doesnt even evolve
          <img src={getImgFromSpecies(first.species.url)} alt="" />
        </div>
      ) : evolType === "Eevee" ? (
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
      ) : (
        <div
          className={`grid ${chainRows}  ${chainCols} items-center place-items-center`}
        >
          <div className="row-start-1 row-end-3 h-full flex flex-col justify-end">
            <img src={getImgFromSpecies(first.species.url)} alt="" />
            <span className="bg-gray-300 p-1 border-2 rounded-md text-center">
              {first.species.name}
            </span>
          </div>

          {first.evolves_to.map((i, idx) => (
            <>
              <div className="text-center flex flex-col items-center">
                {evolutionText(i.evolution_details[0])}
                <img src={getImgFromSpecies(i.species.url)} alt="" />
                <span className="bg-gray-300 p-1 border-2 rounded-md">
                  {i.species.name}
                </span>
              </div>
              {i.evolves_to[0] ? (
                <div className="text-center flex flex-col items-center">
                  {evolutionText(i.evolves_to[0].evolution_details[0])}
                  <img
                    src={getImgFromSpecies(i.evolves_to[0].species.url)}
                    alt=""
                  />
                  <span className="bg-gray-300 p-1 border-2 rounded-md">
                    {i.evolves_to[0].species.name}
                  </span>
                </div>
              ) : null}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

// const pkmnImages = () => {
//   return <div></div>;
// };

export default Chain;
