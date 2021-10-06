import {
  getPokemon,
  typesImgs,
  getEvolutionChain,
  getSpecies,
  betterColors,
  getEvolType,
} from "../service";
import { useState, useEffect } from "react";
import {
  PokemonInterface,
  EvolChainInterface,
  SpeciesInterface,
} from "../interfaces";

import Moves from "./Moves";
import Chain from "./Chain";

const Pokemon: React.FC<{ match: any }> = ({ match }) => {
  const [pkmnData, setpkmnData] = useState<PokemonInterface | null>(null);
  const [pkmnSpecies, setpkmnSpecies] = useState<SpeciesInterface | null>(null);
  const [evolChain, setevolChain] = useState<EvolChainInterface | null>(null);
  const [showShiny, setshowShiny] = useState(false);

  useEffect(() => {
    setpkmnData(null);
    getPokemon(match.params.name).then((i: PokemonInterface) => {
      document.title = i.species.name;
      setpkmnData(i);
    });
    getSpecies(match.params.name)
      .then((i) => {
        setpkmnSpecies(i);
        return i;
      })
      .then((i) => {
        getEvolutionChain(i.evolution_chain.url).then((i) => setevolChain(i));
      });
  }, [match.params.name]);

  return (
    <div>
      {pkmnData !== null ? (
        <div
          className="pokemon-container"
          style={{
            backgroundColor: betterColors[pkmnSpecies?.color?.name || ""],
          }}
        >
          <h1 className="text-6xl text-center mb-3 text-gray-900 font-semibold uppercase">
            {pkmnData.species.name}
          </h1>
          <div className="grid sm:grid-cols-2 gap-2 items-start ">
            <div className="col-span-2">
              {evolChain ? (
                <Chain chain={evolChain} pkmnData={pkmnData}></Chain>
              ) : null}
            </div>
            <span className="flex row-start-2 col-start-1 mt-1 ">
              <a href={`/type/${pkmnData.types[0].type.name}`}>
                <img
                  className="type-img"
                  src={typesImgs[pkmnData.types[0].type.name.toUpperCase()]}
                  alt={pkmnData.types[0].type.name}
                />
              </a>
              <a href={`/type/${pkmnData.types[1]?.type.name}`}>
                <img
                  className="type-img"
                  src={typesImgs[pkmnData.types[1]?.type.name.toUpperCase()]}
                  alt={pkmnData.types[1]?.type.name}
                />
              </a>
            </span>
          </div>
          <Moves pkmnData={pkmnData}></Moves>
        </div>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default Pokemon;
