import { EvolChainInterface, PokemonInterface } from "../interfaces";
import { getEvolType } from "../service";

export interface ChainProps {
  chain: EvolChainInterface;
  pkmnData: PokemonInterface;
}

const pad = (number: number | string, length: number): string => {
  let str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
};

const getChain = (chain: EvolChainInterface) => {
  let current = chain.chain;
  const arr = [];
  while (true) {
    let thisone = (
      <div className="border-4">
        {current.species.name}
        {current.evolves_to.map((i) => (
          <div>
            evolves to {i.species.name}
            {i.evolves_to ? " evolves to" : null}
            {i.evolves_to.map((i) => {
              return <span> {i.species.name}</span>;
            })}
          </div>
        ))}
      </div>
    );
    arr.push(thisone);
    break;
  }
  console.log(arr);
  return arr;
};

const Chain: React.FC<ChainProps> = (props) => {
  const evolType = getEvolType(props.chain);
  return (
    <div>
      {/* <pre>{props.chain ? <div>{getChain(props.chain)}</div> : null}</pre> */}

      {evolType === "Eevee" ? (
        <div>EEVEE</div>
      ) : evolType === "multiple evolutions" ? (
        <div>MULTIPLE EVOLUTIONS</div>
      ) : evolType === "normal evolution chain" ? (
        <div>EVOLVES NORMALLY</div>
      ) : (
        <div>lmao doesnt even evolve</div>
      )}
      <div className="pokemon-image">
        <img
          className="w-48"
          src={props.pkmnData.sprites.front_default ?? ""}
          alt={props.pkmnData.species.name}
        />
        <img
          className="w-48"
          src={
            props.pkmnData.sprites.other["official-artwork"].front_default ?? ""
          }
          alt=""
        />
      </div>
    </div>
  );
};


const pkmnImages = () => {
  return <div></div>;
};

export default Chain;
